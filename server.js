const express = require("express");
const app = express();
app.use(express.static("public")); // serves files from the public folder

// Our "database": 20 items, newest first (like a feed)
let items = [];
for (let id = 20; id >= 1; id--) {
  items.push({ id, text: "Post " + id });
}

let nextId = 21; // the next new post will be "Post 21"

// Offset pagination: "skip N items, give me 5"
app.get("/offset", (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = 5;

  const skip = (page - 1) * limit;
  const result = items.slice(skip, skip + limit);

  res.json(result);
});

// Cursor pagination: "give me 5 items older than the one I last saw"
app.get("/cursor", (req, res) => {
  const limit = 5;
  const after = req.query.after ? Number(req.query.after) : Infinity;

  const result = items.filter((item) => item.id < after).slice(0, limit);

  res.json(result);
});

// Simulates someone posting something new (goes to the top of the feed)
app.get("/add", (req, res) => {
  const item = { id: nextId, text: "Post " + nextId };
  items.unshift(item); // add at the start = newest first
  nextId++;
  res.json(item);
});

// Puts everything back to the starting 20 items, so you can repeat the demo
app.get("/reset", (req, res) => {
  items = [];
  for (let id = 20; id >= 1; id--) {
    items.push({ id, text: "Post " + id });
  }
  nextId = 21;
  res.json({ message: "reset done" });
});

app.listen(3000, () => console.log("Running on http://localhost:3000"));