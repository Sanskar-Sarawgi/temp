import db from '../models/index.js'
import { ApiError } from '../utils/handler-wrapper.js';

const { User } = db;
const MIN_PASSWORD_LENGTH = 4

export const createUser = async (user_info) => {
    let UserInstance = await User.findOne({
        where: { email: user_info.email }
    })

    if(UserInstance != undefined) throw new ApiError(502)

        
    UserInstance =  await User.create({
        firstName: user_info.first_name,
        lastName: user_info.last_name,
        email: user_info.email,
        password_hash: user_info.password
    })

    return UserInstance
}

export const isValidPassword = async (password) => {
    if( password.trim() == '' || 
        password.length < MIN_PASSWORD_LENGTH) return false
    return true
}

export const updateUser = async (updateInfo) => {
    
}
