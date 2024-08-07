import db from "../models/index";
import bcrypt from "bcrypt";

let handleUserLogin = (email, password) =>{
    return new Promise(async(resolve, reject)=>{
        try {
            let userData ={};
            let isExist = await checkUserEmail(email);
            if(isExist){
                //user already exist
                //compare password
                let user = await db.User.findOne({
                    attributes:['email', 'roleId', 'password'],
                    where: { email: email  },
                    raw : true,
                    // attributes: {
                    //    include: ['password']
                    // }
                });
                if(user){
                    let check = bcrypt.compareSync(password, user.password); // true
                //    let check = true;
                    if(check){
                        userData.errCode = 0;
                        userData.errMessage =`Ok`;

                        delete user.password;
                        userData.user = user;
                    }else{
                        userData.errCode = 3;
                        userData.errMessage =`Wrong password`;
                    }
                }else{
                    userData.errCode = 2;
                    userData.errMessage = `User is not exist`;

                }
            }else{
                userData.errCode = 1;
                userData.errMessage = `Your's Email isn't exist in your system.`
            }
            resolve(userData);
        } catch (e) {
            reject(e)
        }
    })
}

let checkUserEmail = (userEmail)=>{
    return new Promise(async(resolve, reject)=>{
        try {
            let user = await db.User.findOne({
                where: {email: userEmail}
            })
            if(user){
                resolve(true);
            }else{
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
    checkUserEmail: checkUserEmail,
}