const express = require("express");
const app = express();
const path = require("path");
const db = require("./db")("./vacations.json", () => {});
const PORT = 3000;

app.listen(PORT, () => {
  // console.log(__dirname);
  console.log(`listening on port ${PORT}`);
});

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "./index.html"));
});

app.use(express.json());

app.use((err, req, res, next) => {
  console.log(`you called ${req.url} as a ${req.url}`);
  res.status(500).send({ message: err.message });
});

app.get("/api/vacations", async (req, res, next) => {
  try {
    res.send(await db.findAll());
  } catch (ex) {
    next(ex);
  }
});

app.post("/api/vacations", async (req, res, next) => {
  console.log(req.body);
  try {
    res.send(await db.create(req.body));
  } catch (ex) {
    next(ex);
  }
});

app.delete("/api/vacations/:id", async (req, res, next) => {
  console.log(req.params);

  try {
    res.send(await db.destroy(req.params.id));
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});
