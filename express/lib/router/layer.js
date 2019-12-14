const { pathToRegexp } = require("path-to-regexp");

function Layer(path, handler) {
  this.path = path;
  this.handler = handler;

  this.regexp = pathToRegexp(this.path, (this.keys = []));
}

Layer.prototype.match = function(pathname) {
  // 中间件路径匹配规则
  if (!this.route) {
    if (this.path === "/" || pathname.startsWith(this.path + "/")) {
      return true;
    }
  } else {
    // 路由的话则进行正则匹配
    let [, ...matches] = pathname.match(this.regexp);
    if (matches) {
      this.params = this.keys.reduce((memo, cur, index) => {
        memo[cur.name] = matches[index];
        return memo;
      }, {});
      return true;
    }
  }
  return this.path === pathname;
};

module.exports = Layer;
