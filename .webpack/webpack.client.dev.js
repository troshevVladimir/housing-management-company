import path from "path"
import { fileURLToPath } from 'url';
import baseConf from './webpack.base.dev.js'
import { merge } from 'webpack-merge'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default merge(baseConf, {
  devtool: "inline-source-map",
  entry: "./src/client-entry.ts",
  mode: "development",
  target: "web",
  // watch: true,
  output: {
    filename: "js/[name].bundle.[fullhash].js",
    chunkFilename: "chunks/[name].chunk.[fullhash].js",
    sourceMapFilename: '[name].js.map',
    path: path.join(__dirname, "..", "public/client/"),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.join(__dirname, "..", "index.html"),
      inject: true,
    }),
  ],
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
