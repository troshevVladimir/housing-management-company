import path from "path"
import { fileURLToPath } from 'url';
import baseConf from './webpack.base.dev.js'
import { merge } from 'webpack-merge'
import HtmlWebpackPlugin from 'html-webpack-plugin'
// import VueSSRClientPlugin from '@vue/server-renderer/client-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default merge(baseConf, {
  devtool: "inline-source-map",
  entry: "./src/client-entry.ts",
  mode: "development",
  target: "web",
  watch: true,
  output: {
    filename: "js/[name].bundle.[fullhash].js",
    chunkFilename: "chunks/[name].chunk.[fullhash].js",
    sourceMapFilename: '[name].js.map',
    path: path.join(__dirname, "..", "public/client/"),
    clean: true,
  },
  // module: {
  //   rules: [
  //     {
  //       test: /\.css$/i,
  //       use: ["style-loader", "css-loader"],
  //     },
  //     {
  //       test: /\.sass$|\.scss$/,
  //       use: [
  //         'vue-style-loader',
  //         {
  //           loader: "css-loader",
  //           options: {
  //             sourceMap: isDev,
  //           },
  //         },
  //         {
  //           loader: "postcss-loader",
  //         },
  //         {
  //           loader: "sass-loader",
  //           options: {
  //             sourceMap: isDev,
  //           },
  //         },
  //       ],
  //     },
  //   ]
  // },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.join(__dirname, "..", "index.html"),
      inject: true,
    }),
    // new VueSSRClientPlugin(),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".vue", ".jsx", ".js", ".json"],
    alias: {
      vue: "@vue/runtime-dom",
      '@': path.resolve('src'),
      "vue3-component-library/components": path.resolve(__dirname, "node_modules/vue3-component-library/dist/esm")
    },
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
    // minimaze: true,
    // minimizer: [
      // new TerserJsPlugin({
        // terserOptions: { ... },
        // cache: true
      // })
    // ]
  },
});
