const express = require("./express");

const app = express();

app.post(
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
    res.end("post end");
    next();
  }
);

app.get("/", (req, res) => {
  console.log("2");
  res.end("get end");
});

app.listen(3003);
