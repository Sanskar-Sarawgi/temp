import bcrypt from 'bcrypt'
import db from '../models/index.js'
import jwt from "jsonwebtoken"

const { User } = db;

export const generateToken = (user_info) => {
    return jwt.sign(
        {
            uuid: user_info.uuid,
            email: user_info.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_TIME
        }
    )
}

export const checkPassword = async (email, password) => {
    let UserInstance = await User.findOne({
        where: { email: email }
    })
    if(UserInstance == undefined) return false
 
    return bcrypt.compare(password + process.env.PASSWORD_SALT, UserInstance.password_hash)
}


export const generatePasswordHash = async (password) => {
    let  salted_password = password + process.env.PASSWORD_SALT
    password = await bcrypt.hash(salted_password,10)
    return password
}