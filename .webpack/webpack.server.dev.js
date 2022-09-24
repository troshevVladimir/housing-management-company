import path from "path"
import { fileURLToPath } from 'url';
import baseConf from './webpack.base.dev.js'
import { merge } from 'webpack-merge'

const nodeExternals = require('webpack-node-externals');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default merge(baseConf, {
  devtool: 'source-map',
  entry: './src/entry-server.js',
  mode: "development",
  output: {
    libraryTarget: 'commonjs2'
  },
  target: "node",
  plugins: [
    new VueSSRServerPlugin()
  ]
});
