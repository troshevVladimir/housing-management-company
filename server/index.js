import express from "express"
import path from "path"
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express()

app.use(express.static(path.resolve(__dirname, '../dist/')))

app.listen(3000, () => {
    console.log('listen...');
})