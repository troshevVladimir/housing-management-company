import path from "path"
import { fileURLToPath } from 'url';
import baseConf from './webpack.base.dev.js'
import { merge } from 'webpack-merge'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default merge(baseConf, {
  devtool: "inline-source-map",
  entry: "./src/index.ts",
  mode: "development",
  watch: true,
  optimization: {
    splitChunks: {
      chunks: "all",
    },
    // minimaze: true
    // minimizer: [
    //   new TerserJsPlugin({
    //     terserOptions: { ... },
    //     cache: true
    //   })
    // ]
  },
  output: {
    filename: "js/[name].bundle.[fullhash].js",
    chunkFilename: "chunks/[name].chunk.[fullhash].js",
    sourceMapFilename: '[name].js.map',
    path: path.join(__dirname, "..", "public"),
    clean: true,
  },
  target: "web",
});
