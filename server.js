import express from 'express'
import './config/load-env.js'
import router from './src/router/index.js'
import db from './src/models/index.js'
import bodyParser from 'body-parser'
import {requestInfoLogger} from './src/middleware/logger.js'
import { AddTemplateView } from './src/middleware/template.js'
import logger from './config/logger.js'
import cookieParser from "cookie-parser"
import path from 'path'
import { fileURLToPath } from 'url'

const { sequelize } = db;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()

app.use(bodyParser.json({
    limit: '100kb'
}))
app.use(requestInfoLogger)
app.use(AddTemplateView)
app.use(cookieParser())
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/src/views'))
app.use(router)


sequelize.sync().then(() => {
    console.log('Database Sync...')
    app.listen(process.env.PORT , console.log('server is running...'))
})

// to catching the unhandled error/exception
process.on("uncaughtException", function (error) {
    logger.info(`Unhandled error : ${error}`)
    logger.error(error.stack)
    process.exit(1);
});