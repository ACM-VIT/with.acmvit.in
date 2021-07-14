require("dotenv").config();

const express = require("express");
const maps = require("./map");
const app = express();
const port = 3000;

app.use((req, res, next) => {
  res.set("Cache-Control", "no-cache");
  next();
});

// /** load peer services */
// const { worker } = require("./firebase");
// const {
//   getMemory,
//   setMemory,
//   setMemoryArray,
//   triggerLastUpdated,
//   isMemoryEmpty,
//   clearMemory,
// } = require("./memory");

/** route to return success on root */
app.get("/", (req, res) => {
  console.log("visited root");
  return res
    .status(301)
    .redirect("https://www.youtube.com/watch?v=4oGzfT81fIE");
});

/** to handle database updates and memory saves */
// app.get("/update", async (req, res) => {
//   try {
//     const routeMappings = await worker();
//     clearMemory();
//     setMemoryArray(routeMappings);
//     return res.json({ success: true });
//   } catch (e) {
//     return res.json({ success: false, error: e.message });
//   }
// });

/** to list all routes */
// app.get("/debug", (req, res) => {
//   return res.json(getMemory());
// });

/** to accept an id in url param and call the service */
app.get("/:id", (req, res) => {
  /** if memory is empty, then call database */

  // if (isMemoryEmpty()) {
  //   try {
  //     const routeMappings = await worker();
  //     setMemoryArray(routeMappings);
  //     console.log(getMemory());
  //   } catch (e) {
  //     return res.json({ success: false, error: e.message });
  //   }
  // }

  /** get id from URL param */
  const { id: param } = req.params;

  // /** loop over all routes stored in memory and see if key matches */
  // const routes = getMemory();

  // try {
  //   if (routes[id]) {
  //     return res.status(301).redirect(routes[id]);
  //   }
  // } catch (e) {
  //   return res.json({ success: false, error: e.message });
  // }
  let redirect_to = maps.find(({ title, url }) => {
    if (title == param) return url;
  });

  if (redirect_to === undefined) {
    redirect_to = { url: "https://www.youtube.com/watch?v=4oGzfT81fIE" };
  }

  return res.status(301).redirect(redirect_to.url);
});

/** listen for connections */
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
