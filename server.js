const express = require("./express");

const app = express();

const router = express.Router()

router.get('/add', (erq, res, next) => {
  res.end('add')
})

router.get('/del', (erq, res, next) => {
  res.end('del')
})

app.use('/user', router)
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
