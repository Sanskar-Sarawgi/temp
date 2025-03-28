import logger from "../../config/logger.js"

export const requestInfoLogger = (req, res, next) => {
    const startTime = Date.now()
    logger.info(`${req.method} '${req.url}'`)

    if (Object.keys(req.params).length>0) logger.info(`Params : ${JSON.stringify(req.params)}`)
    if (Object.keys(req.query).length>0) logger.info(`Query : ${JSON.stringify(req.query)}`)
    if (Object.keys(req.body).length>0) logger.info(`Body : ${JSON.stringify(req.body)}`)

    res.on('finish', function() {
        logger.log("info", `Completed ${this.statusCode} ${this.statusMessage} in ${Date.now() - startTime}ms`);
    })
    
    next()
}