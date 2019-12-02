const http = require("http");
const Router = require("./router");

// 应用与路由拆分
function Application() {
  this.router = new Router();
}

Application.prototype.get = function(path, handler) {
  this.router.get(path, handler);
};

Application.prototype.listen = function() {
  let server = http.createServer((req, res) => {
    function done() {
      res.end(`Cannot ${req.method} ${req.url}`);
    }
    // 路由匹配
    this.router.handle_request(req, res, done);
  });
  server.listen(...arguments);
};

module.exports = Application;
