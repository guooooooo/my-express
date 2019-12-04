function Layer(path, handler) {
  this.path = path;
  this.handler = handler;
}

Layer.prototype.match = function(pathname) {
  // 中间件路径匹配规则
  if (!this.route) {
    if (this.path === '/' || pathname.startsWith(this.path + '/')) {
      return true
    }
  }
  return this.path === pathname;
};

module.exports = Layer;
