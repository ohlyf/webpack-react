const { statSync } = require("fs");
const { resolve } = require("path");

class BundleSizePlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    const { limit } = this.options;
    compiler.hooks.done.tap(`BundleSizePlugin`, (stats) => {
      const { path } = stats.compilation.outputOptions;
      const bundlePath = resolve(path);
      const { size } = statSync(bundlePath);
      const bundleSize = size;
      if (bundleSize < limit) {
        console.log(
          "输出success-----bundleSize:",
          bundleSize,
          "\n limit:",
          limit,
          "小于限制大小"
        );
      } else {
        console.log(
          "输出error-----bundleSize:",
          bundleSize,
          "\n limit:",
          limit,
          "超出限制大小"
        );
      }
    });
  }
}

module.exports = BundleSizePlugin;
