import baseConf from './webpack.base.dev.js'
import { merge } from 'webpack-merge'
import path from "path"
import { fileURLToPath } from 'url'
// import VueSSRServerPlugin from 'vue-server-renderer/server-plugin.js'
import { WebpackManifestPlugin } from 'webpack-manifest-plugin';
import nodeExternals from 'webpack-node-externals';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default merge(baseConf, {
  devtool: 'source-map',
  entry: './src/index.ts',
  mode: "development",
  output: {
    filename: "js/[name].bundle.[fullhash].js",
    path: path.join(__dirname, "..", "public"),
    clean: true,
    libraryTarget: 'commonjs2'
  },
  target: "node",
  externals: [nodeExternals({
    allowlist: [/\.(css|vue)$/]
  })],
  plugins: [
    // new VueSSRServerPlugin(),
    new WebpackManifestPlugin({
      fileName: 'ssr-manifest.json'
    })
  ]
});
