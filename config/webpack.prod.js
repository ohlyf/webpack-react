import { merge } from "webpack-merge";
import common from "./webpack.common.js";
import { resolveApp } from "./paths.js";

export default merge(common, {
  output: {
    // bundle 文件名称 【只有这里和开发环境不一样】
    filename: "[name].[contenthash].bundle.js",

    // bundle 文件路径
    path: resolveApp("dist"),

    // 编译前清除目录
    clean: true,
  },
  mode: "production",
});
