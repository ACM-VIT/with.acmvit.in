require("dotenv").config();

const express = require("express");
const maps = require("./map");
const app = express();
const port = 3000;

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
  res.status(301).redirect("https://bootcamp.acmvit.in");
  return res.json({ success: true });
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
app.get("/:id", async (req, res) => {
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
  const redirect_to = maps.map(({ title, url }) => {
    if (title == param) return url;
  });

  console.log(redirect_to);
  res.status(301).redirect(redirect_to);
  // return res.json({ success: "looks like you're lost :(" });
});

/** listen for connections */
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
