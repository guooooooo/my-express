const url = require("url");
const Layer = require("./layer");
const Route = require("./route");

function Router() {
  this.stack = [];
}

Router.prototype.route = function(path) {
  const route = new Route();
  // 当路径匹配时 交给route的dispatch去处理
  const layer = new Layer(path, route.dispatch.bind(route));
  layer.route = route;
  this.stack.push(layer);
  return route;
};

["get", "post", "put", "delete"].forEach(method => {
  Router.prototype[method] = function(path, handlers) {
    const route = this.route(path); // 创建一个包含route属性的layer
    route[method](handlers); // 把handler挂载到layer的route属性上
  };
});

Router.prototype.handle_request = function(req, res, out) {
  let idx = 0;
  const next = () => {
    if (idx === this.stack.length) {
      return out();
    }
    let layer = this.stack[idx++];
    let { pathname } = url.parse(req.url);
    if (
      layer.match(pathname) &&
      layer.route.methods[req.method.toLowerCase()]
    ) {
      // 路径匹配时 此处执行layer对应的route.dispatch
      layer.handler(req, res, next);
    } else {
      next();
    }
  };
  next();
};

module.exports = Router;
