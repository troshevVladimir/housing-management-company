import express from "express"
import formData from 'express-form-data'
import router from './router.js'
import path from "path"
import fs from "fs"
import { fileURLToPath } from 'url';
import launchMiddleware from 'launch-editor-middleware'
import { renderToString } from 'vue/server-renderer'
// import serialize from 'serialize-javascript';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const pathToMainJs = JSON.parse(fs.readFileSync('./public/server/ssr-manifest.json'))['main.js'];
const appPath = path.resolve(__dirname, '../../public/server/', pathToMainJs)
const vueApp = fs.readFileSync(appPath)

const server = express()

server.use(express.json())
server.use(express.urlencoded({ extended: false }))
server.use(formData.parse());
server.use(router)
server.use('/__open-in-editor', launchMiddleware())

server.get('*', async (req, res) => {

    const appContent = await renderToString(vueApp)

    const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <script src="https://api-maps.yandex.ru/2.1/?apikey=Your API key&lang=en_US" type="text/javascript"></script>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title></title>
        </head>

        <body>
            ${appContent}
        </body>
        </html>
    `

    res.end(html)
})

// server.use(express.static(path.resolve(__dirname, '../../public/')))

server.listen(3000, () => {
    console.log('listen...');
})