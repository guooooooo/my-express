const express = require("./express");

const app = express();

app.get(
  "/",
  (req, res, next) => {
    console.log("1");
    next();
  },
  (req, res, next) => {
    console.log("11");
    next();
  },
  (req, res, next) => {
    console.log("111");
    next();
  }
);

app.get("/", (req, res) => {
  console.log("2");
  res.end("end");
});

app.listen(3003);
