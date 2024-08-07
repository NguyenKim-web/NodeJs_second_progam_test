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
let getAllUser = ()=>{
    return new Promise(async(resolve, reject)=>{
        try {
            let users = db.User.findAll(
               { raw: true}
            );
            resolve(users);
        } catch (e) {
            reject(e);
        }
    })
}
let getUserInfoById = (userId)=>{
    return new Promise(async(resolve, reject)=>{
        try {
            let user = await db.User.findOne({
                where: {  id : userId  },
                raw: true,
            })
            if(user){
                resolve(user);
            }else{
                resolve({});
            }
        } catch (e) {
            reject(e);
        }
    })
}
let updateUserData= (data)=>{
    return new Promise(async(resolve, reject) =>{
        try {
            let user = await db.User.findOne({
                where: {id: data.id}
            })
            if(user){
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                await user.save()
                let allUsers = await db.User.findAll();
                resolve(allUsers);
            }else{
                resolve();
            }
        } catch (e) {
            reject(e);
        }
    })
}

let delUserInfoById = (userId)=>{
    return new Promise(async(resolve, reject)=>{
        try {
            let user = await db.User.findOne({
                where: {  id : userId  }
            })
            if(user){
                await user.destroy();
            }
            resolve();
        } catch (e) {
            reject(e);
        }
    })
}
module.exports ={
    createNewUser : createNewUser,
    hashUserPassword: hashUserPassword,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData,
    delUserInfoById: delUserInfoById,
} 