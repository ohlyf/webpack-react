import { merge } from "webpack-merge";
import common from "./webpack.common.js";
import { resolveApp } from "./paths.js";

export default merge(common, {
  output: {
    filename: "[name].bundle.js",

    path: resolveApp("dist"),

    clean: true,
  },
  mode: "development",
  // 开发环境，开启 source map，编译调试
  devtool: "eval-cheap-module-source-map",
  devServer: {
    // 告诉服务器位置
    static: {
      directory: resolveApp("dist"),
    },
    port: 1012,
    hot: true,
  },
});
