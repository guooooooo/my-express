const Layer = require("./layer");

function Route() {
  this.stack = [];
}

Route.prototype.get = function(handlers) {
  handlers.forEach(handler => {
    const layer = new Layer("", handler);
    layer.method = "get";
    this.stack.push(layer);
  });
};
// out 表示跳到下一层layer
Route.prototype.dispatch = function(req, res, out) {
  let idx = 0;
  const next = () => {
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
