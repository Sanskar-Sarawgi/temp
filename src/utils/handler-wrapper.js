import logger from "../../config/logger.js"
import status_message from "./error-status.js"

const asyncHandler = (fn) => (req, res, next) => {
    return Promise.resolve(fn(req,res,next)).catch((err) => {
        if(err.message) logger.error(err.message)
        else if (err.original) logger.error(err.original)
        logger.info(err.stack)
    
        if(err.statusCode != undefined)
            res.status(err.statusCode).send(err.message)
        else
            res.status(500).send('Internal Server Error')
    })
}

class ApiError extends Error {
    constructor(statusCode, message, errors=[], stack=''){
        if(message == undefined){
            message = status_message[statusCode] == undefined ? 
                        "something went wrong" : 
                        status_message[statusCode] 
        }
        super(message)
        this.statusCode = statusCode
        this.message = message
        this.data = null
        this.errors = errors
        if(stack){
            this.stack = stack
        }else{
            Error.captureStackTrace(this , this.constructor)
        }
    }
}

export {asyncHandler, ApiError}