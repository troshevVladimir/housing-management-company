import path from "path"
import { fileURLToPath } from 'url';
import webpack from 'webpack'
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
import HtmlWebpackPlugin from 'html-webpack-plugin'
import {VueLoaderPlugin} from 'vue-loader'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isDev = false;

export default {
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
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
        exclude: /node_modules/,
      },
      {
        test: /\.m?jsx?$/,
        exclude: (file) => {
          // always transpile js in vue files
          if (/\.vue\.jsx?$/.test(file)) {
            return false;
          }
          // Don't transpile node_modules
          return /node_modules/.test(file);
        },
        use: ["thread-loader", "babel-loader"],
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
              name: "[path][name]-[fullhash:8].[ext]",
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.sass$|\.scss$/,
        use: [
          // {
          //   loader: MiniCssExtractPlugin.loader,
          //   options: {},
          // },
          'vue-style-loader',
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
    // new HardSourceWebpackPlugin() // альтернатива cache-loader
    // new MiniCssExtractPlugin({
    //   filename: "css/[name].bundle.[fullhash].css",
    //   chunkFilename: "chunks/[id].chunk.[fullhash].css",
    // }),
    new VueLoaderPlugin(),
  ],
  stats: {
    children: true,
    errorDetails: true,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".vue", ".jsx", ".js", ".json"],
    alias: {
      vue: "@vue/runtime-dom",
      '@': path.resolve('src'),
    },
  },
};
