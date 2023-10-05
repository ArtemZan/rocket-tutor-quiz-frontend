const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CaseSensitivePlugin = require("case-sensitive-paths-webpack-plugin");

module.exports = {
  entry: [
    "./src/index.js"
  ],
  output:{
    path: path.resolve(__dirname, "build"),
    publicPath: "/"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
    }),
    new CaseSensitivePlugin()
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "build"),
    },
    port: 3000,
    hot: true,
    historyApiFallback: {
      index: 'index.html'
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,

      },
      {
        test: /\.(s[ac]|c)ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      }
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  }
};