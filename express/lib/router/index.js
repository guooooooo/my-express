const url = require("url");
const Layer = require("./layer");
const Route = require("./route");

function Router() {
  const router = function(req, res, next) {
    // 请求到达时到子路由中匹配
    router.handle_request(req, res, next);
  };
  router.stack = [];
  router.__proto__ = proto;
  return router;
}
let proto = {};
proto.use = function(path, handler) {
  const layer = new Layer(path, handler);
  this.stack.push(layer);
};

proto.route = function(path) {
  const route = new Route();
  // 当路径匹配时 交给route的dispatch去处理
  const layer = new Layer(path, route.dispatch.bind(route));
  layer.route = route;
  this.stack.push(layer);
  return route;
};

["get", "post", "put", "delete"].forEach(method => {
  proto[method] = function(path, handlers) {
    // 二级路由
    if (!Array.isArray(handlers)) {
      handlers = [handlers];
    }
    const route = this.route(path); // 创建一个包含route属性的layer
    route[method](handlers); // 把handler挂载到layer的route属性上
  };
});

proto.handle_request = function(req, res, out) {
  let idx = 0;
  let removed = "";
  const next = err => {
    // 进入下层时若之前删除过 则补全URL
    if (removed.length > 0) {
      req.url = removed + req.url;
      removed = "";
    }
    if (idx === this.stack.length) {
      return out();
    }
    let layer = this.stack[idx++];
    let { pathname } = url.parse(req.url);

    if (err) {
      // 寻找错误中间件
      if (!layer.route) {
        if (layer.handler.length === 4) {
          layer.handler(err, req, res, next);
        } else {
          next(err);
        }
      } else {
        next(err); // 向下传递错误
      }
    } else {
      if (layer.match(pathname)) {
        if (layer.route) {
          // 路由的话需要进一步匹配方法
          if (layer.route.methods[req.method.toLowerCase()]) {
            req.params = layer.params || {};
            layer.handler(req, res, next);
          } else {
            next();
          }
        } else {
          // 中间件路径匹配 不是错误中间件就直接执行
          if (layer.handler.length !== 4) {
            // 中间件匹配可能是二级路由的情况
            // 进入二级路由路径匹配时要把当前中间件的路径从当前URL中删掉
            if (layer.path !== "/") {
              removed = layer.path;
              req.url = req.url.slice(removed.length);
            }
            layer.handler(req, res, next);
          }
        }
      } else {
        next();
      }
    }
  };
  next();
};

module.exports = Router;
