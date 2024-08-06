import bcrypt from 'bcrypt';
import db from "../models/index";
const salt = bcrypt.genSaltSync(10);


let createNewUser = async (data)=>{
    return new Promise(async(resolve, reject) =>{
        try {
            let hashPWFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPWFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                gender: data.gender==='1'?true: false,
                image: data.lastName,
                phoneNumber: data.phoneNumber,
                roleId: data.roleId,  
            })
            resolve('create new user successfully');
        } catch (e) {
            reject(e);
        }
    })
}
let hashUserPassword = (myPassword)=>{
    return new Promise(async(resolve, reject) =>{
        try {
            const hash = await bcrypt.hashSync(myPassword, salt);
            resolve(hash);
        } catch (e) {
            reject(e);
        }
    })
}
module.exports ={
    createNewUser : createNewUser,
    hashUserPassword: hashUserPassword,
} 