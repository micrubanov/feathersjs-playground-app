const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: [
    //"webpack-hot-middleware/client?http://localhost:3030/",
    "./client/src/index.js"
  ],
  output: {
    path: path.resolve(__dirname, "public"),
    publicPath: "/",
    filename: "client.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      }
    ]
  },
  plugins: [
    //new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin(["./client/src/favicon.ico"], {}),
    new HtmlWebPackPlugin({
      template: "./client/src/index.html",
      filename: "./index.html"
    })
  ]
};
