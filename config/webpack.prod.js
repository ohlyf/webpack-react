import { merge } from "webpack-merge";
import common from "./webpack.common.js";
import TerserPlugin from "terser-webpack-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
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
  optimization: {
    runtimeChunk: true,
    moduleIds: "deterministic",
    minimizer: [
      new TerserPlugin({
        parallel: 4,
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
      }),
      new CssMinimizerPlugin({
        parallel: 4,
      }),
    ],
    splitChunks: {
      // include all types of chunks
      chunks: "all",
      // 重复打包问题
      cacheGroups: {
        // node_modules里的代码
        // 第三方模块
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
          priority: 10, // 优先级
          enforce: true,
        },
        // 公共模块
        common: {
          name: "common", // chunk名称
          priority: 0, // 优先级
          minSize: 0, // 公共模块的大小限制
          minChunks: 2, // 公共模块最少复用过几次
        },
      },
    },
  },
  mode: "production",
});
