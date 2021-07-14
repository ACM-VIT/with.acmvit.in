require("dotenv").config();

const express = require("express");
const { maps } = require("./map");
const app = express();
const port = 3000;
const defaultUrl = "https://default.com";

// app.use((req, res, next) => {
//   res.set("Cache-Control", "no-cache");
//   next();
// });

/** to accept an id in url param and call the service */
app.get("/:id", (req, res, next) => {
  const { id } = req.params;

  // handle favicon
  if (id === "favicon.ico") {
    return next();
  }

  let redirectTarget;

  for (let i = 0; i < maps.length; i++) {
    if (maps[i].title === id) {
      redirectTarget = maps[i];
      console.log(`matched ${id} : ${JSON.stringify(maps[i])}`);
    }
  }

  if (redirectTarget === undefined) {
    redirectTarget = { url: defaultUrl };
  }

  return res.status(301).redirect(redirectTarget);
  // return res.status(301).redirect(redir / ect_to.url);
});

/** route to return success on root */
app.get("/", (req, res) => {
  console.log("visited root");
  return res.status(301).json({ url: "home" });
  // return res
  // .status(301)
  // .redirect("https://www.youtube.com/watch?v=4oGzfT81fIE");
});

/** listen for connections */
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
