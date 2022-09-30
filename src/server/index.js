import express from "express"
import formData from 'express-form-data'
import router from './router.js'
import path from "path"
import fs from "fs"
import { fileURLToPath } from 'url';
import launchMiddleware from 'launch-editor-middleware'
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const serverManifest = require('../../public/server/ssr-manifest.json')
const clientManifest = require('../../public/client/ssr-manifest.json')
const appPath = path.join(__dirname, '../../public/server/', serverManifest['main.cjs'])
// const styelPath = path.join(__dirname, '../../public/server/', manifest['main.css'])
const styelPath = serverManifest['main.css']
let jsPath = clientManifest['main.js']
let vendorJsPath = clientManifest['js/vendors-node_modules_vue_runtime-dom_dist_runtime-dom_esm-bundler_js-node_modules_jwt-decode_-096634.bundle.js']

function removeAuto(path) {
    path = path.split('/')
    path.shift()
    path = path.join('/')

    return path
}

const createApp = require(appPath).default;

const server = express()

const indexTemplate = fs.readFileSync(
    path.join(__dirname, './../../public/client/index.html'),
    'utf-8'
);

server.use(express.json())
server.use(express.urlencoded({ extended: false }))
server.use(formData.parse());
server.use(router)
server.use('/__open-in-editor', launchMiddleware())

server.use(express.static(path.resolve(__dirname, '../../public/')))

server.get('*', async (req, res) => {

    const appContent = await createApp(req);

    const html = indexTemplate
        .toString()
        .replace('<div id="app">', `<div id="app">${appContent}`)
        .replace('##style', `<link rel="stylesheet" href="../server/${styelPath}">`)
        .replace('##js', `<script defer src="./${removeAuto(jsPath)}"></script>`)
        .replace('##vue', `<script defer src="./${removeAuto(vendorJsPath)}"></script>`)
    res.setHeader('Content-Type', 'text/html');
    res.send(html);
})



server.listen(3000, () => {
    console.log('listen...');
})