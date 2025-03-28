import { ApiError } from '../utils/handler-wrapper.js';
import { generateToken, checkPassword } from '../services/session.js';
import db from '../models/index.js'

const { User } = db;

export const login = async (req, res) => {
    const {email, password} = req.body
    
    if([email, password].some(field => field?.trim() === ''))  throw new ApiError(501)
        
    if(!await checkPassword(email, password)) throw new ApiError(504)

    let UserInstance = await User.findOne({
        where: { email: email }
    })

    let accessToken = generateToken(UserInstance)

    const CookieOptions = {
        httpOnly: true,
        secure: true,
        maxAge: 60 * 60 * 1000
    } 
    res.status(200)
        .cookie("accessToken", accessToken, CookieOptions)

    res.redirect("/user/summary");
}