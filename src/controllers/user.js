import { ApiError } from '../utils/handler-wrapper.js'
import {createUser, isValidPassword, updateUser} from '../services/user.js'
import { generateToken } from '../services/session.js';


export const register = async (req, res) => {
    const {first_name, last_name, email, password} = req.body

    if([first_name, last_name, email, password].some(field => field?.trim() === ''))  throw new ApiError(501)
    if(!isValidPassword(password)) throw new ApiError(503) 
    const userIns = await createUser({first_name, last_name, email, password})

    let accessToken = generateToken(userIns)

    const CookieOptions = {
        httpOnly: true,
        secure: true,
        maxAge: 60 * 60 * 1000
    } 
    
    res.status(200)
        .cookie("accessToken", accessToken, CookieOptions)

    res.redirect("/user/summary");
}

export const updateDetail = async (req, res) => {
    const {first_name, last_name} = req.body

    if([first_name, last_name].some(field => field?.trim() === ''))  throw new ApiError(501)
    const userIns = await updateUser({first_name, last_name, email, password})

    let accessToken = generateToken(userIns)

    const CookieOptions = {
        httpOnly: true,
        secure: true,
        maxAge: 60 * 60 * 1000
    } 
    
    res.status(200)
        .cookie("accessToken", accessToken, CookieOptions)

    res.redirect("/user/summary");
}