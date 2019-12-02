const http = require("http");
const Router = require("./router");

// 应用与路由拆分
function Application() {}

Application.prototype.lazy_router = function() {
  if (!this.router) {
    this.router = new Router();
  }
};

["get", "post", "put", "delete"].forEach(method => {
  Application.prototype[method] = function(path, ...handlers) {
    this.lazy_router();
    this.router[method](path, handlers);
  };
});

Application.prototype.listen = function() {
  let server = http.createServer((req, res) => {
    this.lazy_router();
    function done() {
      res.end(`Cannot ${req.method} ${req.url}`);
    }
    // 路由匹配
    this.router.handle_request(req, res, done);
  });
  server.listen(...arguments);
};

module.exports = Application;
