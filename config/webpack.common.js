import HtmlWebpackPlugin from "html-webpack-plugin";
import ProgressBarPlugin from "progress-bar-webpack-plugin";

import MiniCssExtractPlugin from "mini-css-extract-plugin";
import chalk from "chalk";

import { resolveApp } from "./paths.js";
const isEnvProduction = process.env.NODE_ENV === "production";

export default {
  entry: {
    index: "./src/index.tsx",
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        include: [resolveApp("src")],
        type: "asset/resource",
      },
      {
        test: /.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /.less$/,
        use: [
          isEnvProduction
            ? ({
                loader: "style-loader",
                options: {
                  esModule: false,
                },
              },
              {
                loader: MiniCssExtractPlugin.loader,
              })
            : {
                loader: "style-loader",
              },
          "css-loader",
          "less-loader",
        ],
      },
      {
        test: /\.(js|ts|jsx|tsx)$/,
        include: resolveApp("src"),
        use: [
          {
            loader: "esbuild-loader",
            options: {
              loader: "tsx",
              target: "esNext",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // 生成html，自动引入所有bundle
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    // 进度条
    new ProgressBarPlugin({
      format: `  :msg [:bar] ${chalk.green.bold(":percent")} (:elapsed s)`,
    }),
    // 分离css
    new MiniCssExtractPlugin({
      filename: isEnvProduction ? "[name].[hash:8].css" : "[name].css",
    }),
  ],
  resolve: {
    extensions: [".tsx", "ts", ".js"],
    alias: {
      "@": resolveApp("src"),
    },
    modules: [resolveApp("src"), "node_modules"],
  },
  cache: {
    type: "filesystem", // 使用文件缓存
  },
};
