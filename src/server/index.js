import express from "express"
import formData from 'express-form-data'
import router from './router.js'
import path from "path"
import { fileURLToPath } from 'url';
import launchMiddleware from 'launch-editor-middleware'


const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(formData.parse());

app.use(router)

app.use('/__open-in-editor', launchMiddleware())

// app.get('/', (req, res) => {
//     res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'))
// })

app.use(express.static(path.resolve(__dirname, '../../public/')))

app.listen(3000, () => {
    console.log('listen...');
})