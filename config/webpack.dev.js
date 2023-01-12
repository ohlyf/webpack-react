import { merge } from "webpack-merge";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import SpeedMeasurePlugin from "speed-measure-webpack-plugin";
import webpack from "webpack";
import common from "./webpack.common.js";
import { resolveApp } from "./paths.js";
const smp = new SpeedMeasurePlugin();
export default smp.wrap(
  merge(common, {
    output: {
      filename: "[name].bundle.js",

      path: resolveApp("dist"),

      pathinfo: false,

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
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new ReactRefreshWebpackPlugin(),
    ],
  })
);
