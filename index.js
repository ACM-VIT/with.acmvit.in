require("dotenv").config();

const express = require("express");
const app = express();
const port = 3000;

app.use((req, res, next) => {
  res.set("Cache-Control", "no-cache");
  next();
});

/** load peer services */
const { worker } = require("./firebase");
const {
  getMemory,
  setMemory,
  setMemoryArray,
  triggerLastUpdated,
  isMemoryEmpty,
  clearMemory,
} = require("./memory");

/** route to return success on root */
app.get("/", (req, res) => {
  console.log("visited root");
  return res.status(301).redirect("https://acmvit.in");
});

/** to handle database updates and memory saves */
app.get("/update", async (req, res) => {
  try {
    const routeMappings = await worker();
    clearMemory();
    setMemoryArray(routeMappings);
    return res.json({ success: true });
  } catch (e) {
    return res.json({ success: false, error: e.message });
  }
});

/** to list all routes */
app.get("/debug", (req, res) => {
  return res.json(getMemory());
});

/** to accept an id in url param and call the service */
app.get("/:id", async (req, res) => {
  /** if memory is empty, then call database */

  if (isMemoryEmpty()) {
    try {
      const routeMappings = await worker();
      setMemoryArray(routeMappings);
      console.log("memory was empty, fetched new values : ", getMemory());
    } catch (e) {
      return res.json({ success: false, step: 57, error: e.message });
    }
  }

  /** get id from URL param */
  const { id } = req.params;

  // /** loop over all routes stored in memory and see if key matches */
  const routes = getMemory();
  console.log("listing all routes", routes);

  try {
    if (routes[id]) {
      return res.status(301).redirect(routes[id]);
    }
  } catch (e) {
    return res.json({ success: false, error: e.message });
  }

  let redirectTarget = Object.keys(routes).find((key) => key === id);

  console.log("redirecting to", redirectTarget);

  if (redirectTarget === undefined) {
    redirectTarget = { url: "https://acmvit.in" };
  }

  return res.json(redirectTarget);
  // return res.status(301).redirect(redirectTarget.url);
});

/** listen for connections */
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
