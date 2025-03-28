import { ApiError } from '../utils/handler-wrapper.js'
import jwt from "jsonwebtoken"
import db from '../models/index.js'

const { User } = db;

export const validAuth = async (req, res, next) => {
    const token = req.cookies?.accessToken

    if(!token) throw new ApiError(505)

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

    const user = await await User.findOne({
        where: { uuid: decodedToken?.uuid }
    })

    if(!user) throw new ApiError(505)

    req.user = user
    next()
}