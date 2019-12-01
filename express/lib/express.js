const http = require("http");
const url = require("url");

console.log("my express");

let router = [
  {
    path: "*",
    method: "*",
    handler(req, res) {
      res.end(`Cannot ${req.method} ${req.url}`);
    }
  }
];

function createApplication() {
  return {
    get(path, handler) {
      router.push({
        path,
        method: "get",
        handler
      });
    },
    listen() {
      let server = http.createServer((req, res) => {
        let m = req.method.toLowerCase();
        let pathname = url.parse(req.url).pathname;
        for (let i = 1; i < router.length; i++) {
          let { method, path, handler } = router[i];
          if (m === method && path === pathname) {
            return handler(req, res);
          }
        }
        router[0].handler(req, res);
      });
      server.listen(...arguments);
    }
  };
}

module.exports = createApplication;
