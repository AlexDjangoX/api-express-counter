const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const port = 3030;
const app = express();

const baseUrl = "http://localhost:3030";

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

let counterObject = { counter: 0 };

app.get("/", (req, res) => {
  res.json("Hello!!");
});

app.get("/counter", (req, res) => {
  res.json({ counter: counterObject.counter });
});

app.post("/counter/increment", (req, res) => {
  const newCount = (counterObject.counter += 1);
  counterObject = { counter: newCount };
  res.json({ counter: newCount });
});

app.post("/counter/decrement", (req, res) => {
  const newCount = (counterObject.counter -= 1);
  counterObject = { counter: newCount };
  res.json({ counter: newCount });
});

app.post("/counter/double", (req, res) => {
  const newCount = counterObject.counter * 2;
  counterObject = { counter: newCount };
  res.json({ counter: newCount });
});

app.put("/counter", (req, res) => {
  const value = Number(req.query.value);
  counterObject = { counter: value };
  res.json({ counter: value });
});

app.delete("/delete", (req, res) => {
  res.json({ counter: counterObject.counter });
  counterObject = { counter: 0 };
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

let carObject = { counter: 0 };

app.post("/counter/cars/increment", (req, res) => {
  const newCount = (carObject.counter += 1);
  carObject = { counter: newCount };
  res.json({ counter: newCount });
});

app.post("counter/cars/decrement", (req, res) => {
  const newCount = (carObject.counter -= 1);
  carObject = { counter: newCount };
  res.json({ counter: newCount });
});

app.post("/counter/cars/double", (req, res) => {
  const newCount = carObject.counter * 2;
  carObject = { counter: newCount };
  res.json({ counter: newCount });
});
