import baseConf from './webpack.base.dev.js'
import { merge } from 'webpack-merge'
import path from "path"
import { fileURLToPath } from 'url'
import { WebpackManifestPlugin } from 'webpack-manifest-plugin';
import nodeExternals from 'webpack-node-externals';
// import VueSSRServerPlugin from '@vue/server-renderer/'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default merge(baseConf, {
  devtool: 'source-map',
  entry: './src/server-entry.ts',
  mode: "development",
  output: {
    filename: "js/[name].bundle.[fullhash].js",
    path: path.join(__dirname, "..", "public/server/"),
    clean: true,
    libraryTarget: 'commonjs2'
  },
  target: "node",
  externals: [nodeExternals({
    allowlist: [/\.(css|vue)$/]
  })],
  plugins: [
    new WebpackManifestPlugin({
      fileName: 'ssr-manifest.json'
    }),
    // new VueSSRServerPlugin(),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".vue", ".jsx", ".js", ".json"],
    alias: {
      vue: "@vue/runtime-dom",
      '@': path.resolve('src'),
      "vue3-component-library/components": path.resolve(__dirname, "node_modules/vue3-component-library/dist/cjs")
    },
  },
});
