const Layer = require("./layer");

function Route() {
  this.stack = [];
  this.methods = {};
}

["get", "post", "put", "delete"].forEach(method => {
  Route.prototype[method] = function(handlers) {
    handlers.forEach(handler => {
      const layer = new Layer("", handler);
      layer.method = method;
      this.methods[method] = true;
      this.stack.push(layer);
    });
  };
});

// out 表示跳到下一层layer
Route.prototype.dispatch = function(req, res, out) {
  let idx = 0;
  const next = err => {
    if (err) {
      // 处理路由错误
      console.log(err);
      return res.end(err);
    }
    if (idx === this.stack.length) {
      return out();
    }
    const layer = this.stack[idx++];
    if (layer.method === req.method.toLowerCase()) {
      layer.handler(req, res, next);
    } else {
      next();
    }
  };
  next();
};

module.exports = Route;
