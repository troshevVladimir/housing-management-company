import path from "path"
import webpack from 'webpack'
import { VueLoaderPlugin } from 'vue-loader'
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
const isDev = false;

export default {
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
          if (/\.vue\.jsx?$/.test(file)) {
            return false;
          }
          return /node_modules/.test(file);
        },
        use: ["thread-loader", "babel-loader"],
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
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
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
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"], //style-loader
      },
      {
        test: /\.sass$|\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
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
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: true,
    }),

    new MiniCssExtractPlugin({
      filename: "[hash]-[name].css",
      chunkFilename: "[id].css",
    }),

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
