import baseConf from './webpack.base.dev.js'
import { merge } from 'webpack-merge'
import path from "path"
import { fileURLToPath } from 'url'
import { WebpackManifestPlugin } from 'webpack-manifest-plugin';
import nodeExternals from 'webpack-node-externals';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default merge(baseConf, {
  devtool: 'source-map',
  entry: './src/server-entry.ts',
  output: {
    filename: "js/[name].bundle.[fullhash].js",
    path: path.join(__dirname, "..", "public/server/"),
    clean: true,
    libraryTarget: 'commonjs2'
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [["@babel/plugin-transform-runtime", {
              "corejs": 3
            }]]
          },

        },
        exclude: /node_modules/
      }
    ]
  },
  target: "node",
  externals: [nodeExternals({
    allowlist: [/\.(css|vue)$/]
  })],
  plugins: [
    new WebpackManifestPlugin({
      fileName: 'ssr-manifest.json'
    }),
  ],
});
