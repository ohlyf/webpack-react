import HtmlWebpackPlugin from "html-webpack-plugin";

export default {
  entry: {
    index: "./src/index.js",
  },
  plugins: [
    // 生成html，自动引入所有bundle
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
