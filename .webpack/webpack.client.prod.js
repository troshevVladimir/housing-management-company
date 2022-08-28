import path from "path"
import { fileURLToPath } from 'url';
import webpack from 'webpack'
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
import HtmlWebpackPlugin from 'html-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
import {VueLoaderPlugin} from 'vue-loader'


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isDev = false;

export default {
  devtool: false,
  entry: {
    main: "./src/index.ts",
  },
  mode: "production",
  output: {
    path: path.join(__dirname, "..", "public"),
    filename: "js/[name].bundle.[fullhash].js",
    chunkFilename: "chunks/[name].chunk.[fullhash].js",
    publicPath: "/"
  },
  target: "web",
  module: {
    rules: [
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
            return false
          }
          // Don't transpile node_modules
          return /node_modules/.test(file)
        },
        use: ['thread-loader', 'babel-loader'],
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
        test: /\.vue$/,
        use: "vue-loader",
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
          //   options: {
          //   }
          // },
          'vue-style-loader',
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
    runtimeChunk: false,
    splitChunks: {
      cacheGroups: {
        default: false,
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor_app",
          chunks: "all",
          minChunks: 2
        }
      }
    },
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false
          },
          compress: {
            passes: 3,
            pure_getters: true,
            unsafe: true
          },
          ecma: undefined,
          warnings: false,
          parse: {
            html5_comments: false
          },
          mangle: true,
          module: false,
          toplevel: false,
          nameCache: null,
          ie8: false,
          keep_classnames: false,
          keep_fnames: false,
          safari10: false
        }
      }),
      new CssMinimizerPlugin(),
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    // new HardSourceWebpackPlugin()
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.join(__dirname, "..", "index.html"),
      inject: true,
      minify: true
    }),
    // new MiniCssExtractPlugin({
    //   filename: "css/[name].bundle.[fullhash].css",
    //   chunkFilename: "chunks/[id].chunk.[fullhash].css"
    // }),
    new VueLoaderPlugin(),
  ],
  stats: {
    children: true,
    errorDetails: true
  },
  resolve: {
    extensions: [".tsx", ".ts", ".vue", ".jsx", ".js", ".json"],
    alias: {
      vue: "@vue/runtime-dom",
      '@': path.resolve('src'),
    },
  },
};
