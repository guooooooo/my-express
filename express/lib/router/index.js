const url = require("url");

function Router() {
  this.stack = [];
}

Router.prototype.get = function(path, handler) {
  this.stack.push({
    path,
    method: "get",
    handler
  });
};

Router.prototype.handle_request = function(req, res, out) {
  let idx = 0;
  const next = () => {
    if (idx === this.stack.length) {
      return out();
    }
    let layer = this.stack[idx++];
    let { pathname } = url.parse(req.url);
    if (layer.method === req.method.toLowerCase() && layer.path === pathname) {
      layer.handler(req, res, next);
    } else {
      next();
    }
  };
  next();
};

module.exports = Router;
