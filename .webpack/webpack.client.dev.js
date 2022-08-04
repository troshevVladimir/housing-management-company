const { join } = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");

const isDev = true;

module.exports = {
  devtool: "inline-source-map",
  entry: {
    main: "./src/index.js"
  },
  mode: "development",
  output: {
    path: join(__dirname, "..", "dist"),
    filename: "js/[name].bundle.[fullhash].js",
    chunkFilename: "chunks/[name].chunk.[fullhash].js"
  },
  target: "web",
  module: {
    rules: [
      // {
      //   loader: 'cache-loader',
      //   options: {
      //     cacheDirectory: path.resolve(
      //       __dirname,
      //       'node_modules/.cache/cache-loader'
      //     ),
      //   },
      // },
      {
        test: /\.m?jsx?$/,
        exclude: (file) => {
          // always transpile js in vue files
          if (/\.vue\.jsx?$/.test(file)) {
            return false
          }
          // Don't transpile node_modules
          return /node_modules/.test(file)
        },
        use: ['thread-loader', 'babel-loader'],
      },
      {
        test: /\.vue$/,
        // {
        //   loader: 'cache-loader',
        //   options: {
        //     cacheDirectory: path.resolve(
        //       __dirname,
        //       'node_modules/.cache/cache-loader' // то где храниться кэш, при изменении в конфиге сборки надо удалять можно испольховать nodemon для автоматизациимть
        //     ),
        //   },
        // },
        use: "vue-loader",
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg|pdf|ico)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name]-[fullhash:8].[ext]"
            }
          }
        ]
      },
      {
        test: /\.css$|sass$|\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
            }
          },
          // {
          //   loader: 'cache-loader',
          //   options: {
          //     cacheDirectory: path.resolve(
          //       __dirname,
          //       'node_modules/.cache/cache-loader'
          //     ),
          //   },
          // },
          {
            loader: "css-loader",
            options: {
              sourceMap: isDev
            }
          },
          {
            loader: "postcss-loader",
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: isDev
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "svg-inline-loader",
            options: {
              limit: 10 * 1024,
              noquotes: true
            }
          },
          {
            loader: "url-loader",
            options: {
              limit: 10 * 1024
            }
          },
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]",
              outputPath: "images/",
              emitFile: false
            }
          }
        ]
      },
    ]
  },
  optimization: {
    splitChunks: {
      chunks: "all"
    },
    // minimizer: [
    //   new TerserJsPlugin({
    //     terserOptions: { ... },
    //     cache: true
    //   })
    // ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: join(__dirname, "..", "index.html"),
      inject: true
    }),
    // new HardSourceWebpackPlugin() // альтернатива cache-loader
    new MiniCssExtractPlugin({
      filename: "css/[name].bundle.[fullhash].css",
      chunkFilename: "chunks/[id].chunk.[fullhash].css"
    }),
    new VueLoaderPlugin(),
  ],
  stats: {
    children: true,
    errorDetails: true
  },
  resolve: {
    extensions: [".vue", ".jsx", ".js", ".json"],
    alias: {
      // this isn't technically needed, since the default `vue` entry for bundlers
      // is a simple `export * from '@vue/runtime-dom`. However having this
      // extra re-export somehow causes webpack to always invalidate the module
      // on the first HMR update and causes the page to reload.
      vue: "@vue/runtime-dom",
    },
  },
};
