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

let counters = { cars: { counter: 0 } };

app.post("/counter/:name/increment", (req, res) => {
  let newValue;
  const name = req.params.name;
  if (name in counters) {
    newValue = counters[name].counter += 1;
  } else {
    counters = { ...counters, [name]: { counter: 1 } };
  }
  res.json({ [name]: newValue });
});

app.post("/counter/:name/decrement", (req, res) => {
  let newValue;
  const name = req.params.name;
  if (name in counters) {
    newValue = counters[name].counter -= 1;
  } else {
    counters = { ...counters, [name]: { counter: -1 } };
  }
  res.json({ [name]: newValue });
});

app.post("/counter/:name/double", (req, res) => {
  let newValue;
  const name = req.params.name;
  if (name in counters) {
    newValue = counters[name].counter += counters[name].counter;
  } else {
    counters = { ...counters, [name]: { counter: 0 } };
  }
  res.json({ [name]: newValue });
});

app.delete("/counter/:name", (req, res) => {
  const name = req.params.name;
  res.json({ [name]: counters[name].counter });
  counters[name].counter = 0;
});

app.get("/counter/:name", (req, res) => {
  const name = req.params.name;
  res.json({ [name]: counters[name].counter });
});
