const path = require("path");
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  resolve: {
    extensions: [".mjs", ".js"]
  },
  entry: {
    bundle: [
      path.resolve(__dirname, "src/js/main.js"),
      path.resolve(__dirname, "src/scss/style.scss")
    ]
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "demo")
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /src.*\.js$/,
        exclude: /node_modules/,
        loader: 'closure-loader',
        options: {
          paths: [
            path.resolve(__dirname, 'src'),
            path.resolve(__dirname, 'node_modules/closure-builder/third_party/closure-library/closure/goog'),
          ],
          es6mode: true,
          watch: true,
          fileExt: '.js',
        }
      },
      {
        test: /node_modules.closure-builder.third_party.closure-library.closure.goog.*\.js$/,
        loader: 'closure-loader',
        options: {
          paths: [
            path.resolve(__dirname, 'node_modules/closure-builder/third_party/closure-library/closure/goog'),
          ],
          es6mode: true,
          watch: true,
          fileExt: '.js',
        },
        exclude: /node_modules.closure-builder.third_party.closure-library.closure.goog.base\.js$/,
      },
      {
        test: /node_modules.closure-builder.third_party.closure-library.closure.goog.base\.js/,
        use: [
          'imports-loader?this=>{goog:{}}&goog=>this.goog',
          'exports-loader?goog',
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'css-hot-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      goog: 'closure-builder/third_party/closure-library/closure/goog/base'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin('bundle.css')
  ],
  optimization: {
    namedModules: true
  },
  devServer: {
    contentBase: path.join(__dirname, "demo"),
    port: 9000,
    hot: true
  }
};
