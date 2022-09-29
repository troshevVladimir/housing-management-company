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

const manifest = require('../../public/server/ssr-manifest.json')
const appPath = path.join(__dirname, '../../public/server/', manifest['main.cjs'])
const styelPath = path.join(__dirname, '../../public/server/', manifest['main.css'])
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
// server.use(express.static(path.resolve(__dirname, '../../public/')))
server.get('*', async (req, res) => {

    const appContent = await createApp(req);

    const html = indexTemplate
        .toString()
        .replace('<div id="app">', `<div id="app">${appContent}`)
        .replace('##style', `<link rel="stylesheet" href="./${styelPath}">`)



    // const html = `
    //     <!DOCTYPE html>
    //     <html lang="en">
    //     <head>
    //         <script src="https://api-maps.yandex.ru/2.1/?apikey=Your API key&lang=en_US" type="text/javascript"></script>
    //         <meta charset="utf-8" />
    //         <meta name="viewport" content="width=device-width, initial-scale=1" />
    //         <title></title>
    //     </head>

    //     <body>
    //         <div id="app">${appContent}</div>
    //     </body>
    //     </html>
    // `

    res.setHeader('Content-Type', 'text/html');
    res.send(html);
})



server.listen(3000, () => {
    console.log('listen...');
})