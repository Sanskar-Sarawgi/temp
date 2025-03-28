'use strict';

import { Router } from 'express'
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { asyncHandler } from '../utils/handler-wrapper.js';

const router = Router()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const basename = path.basename(__filename)

let allRouterFilePath = []

const getAllRouterFile = (rootDir) => {
    fs.readdirSync(rootDir).forEach((file) => {
        let childPath =  rootDir + '/' + file
        if(fs.lstatSync(childPath).isDirectory()){
            getAllRouterFile(childPath)
        }else if(file.indexOf('.') !== 0 && file !== basename && file.slice(-3) == '.js'){
            allRouterFilePath.push(childPath)
        }
    })
}

getAllRouterFile(__dirname)

for (const routerPath of allRouterFilePath) {
    const {default: routerJson} = await import(routerPath);
    let routersConfig = routerJson.paths
    let prefixPath = routerJson.urlPrefix
    Object.keys(routersConfig).forEach((routerKey) => {
        let routerConfig = routersConfig[routerKey]
        let path = prefixPath + routerConfig.path
        switch(routerConfig.method){
            case "GET": 
                router.get(path,routerConfig.validations,asyncHandler(routerConfig.handler))
                break
            case "POST":
                router.post(path,routerConfig.validations,asyncHandler(routerConfig.handler))
                break
            case "DELETE": 
            case "PUT":
            default:
                router.get(path,routerConfig.validations,asyncHandler(routerConfig.handler))
        }

    })
}

router.use((req, res, next) => {
    res.status(404).json({ error: '404 Page Not Found' });
});


export default router;


