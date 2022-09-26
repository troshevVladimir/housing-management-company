import path from "path"
import { fileURLToPath } from 'url';
import webpack from 'webpack'
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { VueLoaderPlugin } from 'vue-loader'
import TerserJsPlugin from 'terser-webpack-plugin'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isDev = false;

export default {
  devtool: "inline-source-map",
  entry: {
    main: "./src/index.ts",
  },
  mode: "development",
  watch: true,
  output: {
    path: path.join(__dirname, "..", "public"),
    filename: "js/[name].bundle.[fullhash].js",
    chunkFilename: "chunks/[name].chunk.[fullhash].js",
    clean: true,
  },
  target: "web",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/],
            },
          }
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.m?jsx?$/,
        exclude: (file) => {
          if (/\.vue\.jsx?$/.test(file)) {
            return false;
          }
          return /node_modules/.test(file);
        },
        use: ['cache-loader', 'thread-loader', 'babel-loader'],
      },
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg|pdf|ico)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name]-[fullhash:8].[ext]",
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: '[local]-[hash:base64:5]'
              },
            }
          }
        ],
      },

      {
        test: /\.sass$|\.scss$/,
        use: [
          // {
          //   loader: MiniCssExtractPlugin.loader,
          //   options: {},
          // },
          'vue-style-loader',
          {
            loader: "css-loader",
            options: {
              sourceMap: isDev,
            },
          },
          {
            loader: "postcss-loader",
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: isDev,
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "svg-inline-loader",
            options: {
              limit: 10 * 1024,
              noquotes: true,
            },
          },
          {
            loader: "url-loader",
            options: {
              limit: 10 * 1024,
            },
          },
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]",
              outputPath: "images/",
              emitFile: false,
            },
          },
        ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
    // cache: true
    minimizer: [
      new TerserJsPlugin({
        // terserOptions: { ... },
        parallel: true,
      })
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      // "process.env.NODE_ENV": JSON.stringify("development"),
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: true,
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.join(__dirname, "..", "index.html"),
      inject: true,
    }),
    // new MiniCssExtractPlugin({
    //   filename: "css/[name].bundle.[fullhash].css",
    //   chunkFilename: "chunks/[id].chunk.[fullhash].css",
    // }),
    new VueLoaderPlugin(),
  ],
  // stats: {
  //   children: true,
  //   errorDetails: true,
  // },
  resolve: {
    extensions: [".tsx", ".ts", ".vue", ".jsx", ".js", ".json"],
    alias: {
      vue: "@vue/runtime-dom",
      '@': path.resolve('src'),
    },
  },
};
