const express = require("./express");

const app = express();

app.param("name", (req, res, next, value, key) => {
  if (value === "ming") {
    req.params.name += "tian";
    next();
  }
});

app.param("age", (req, res, next, value, key) => {
  if (key === "age") {
    req.params.age += "11";
    next();
  }
});

app.get("/user/:name/:age", (req, res, next) => {
  console.log(req.params);
  res.end("ok");
});

// const router1 = express.Router()
// const router2 = express.Router()

// router1.get('/add', (req, res, next) => {
//   res.end('add')
// })

// router1.get('/del', (req, res, next) => {
//   res.end('del')
// })

// router2.get('/test', (req, res, next) => {
//   res.end('test')
// })

// app.use('/user', router1)
// app.use('/user', router2)

// app.use((req, res, next) => {
//   console.log("1");
//   next("middle");
// });

// app.use("/u", (req, res, next) => {
//   console.log("2");
//   next();
// });

// app.use("/user", (req, res, next) => {
//   console.log("3");
//   next();
// });

// app.get(
//   "/user/add",
//   (req, res, next) => {
//     console.log("4");
//     // res.end("get end");
//     next("error");
//   },
//   (req, res, next) => {
//     res.end("ok");
//   }
// );

// app.use((err, req, res, next) => {
//   console.log(err);
//   res.end("middle err");
// });

app.listen(3003);
