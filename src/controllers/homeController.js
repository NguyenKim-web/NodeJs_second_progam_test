import db from "../models/index";
import crudservice from "../server/crudservice";

let getHomePage = async(req, res)=>{
    try {
        let data = await db.User.findAll();
        //show on terminal:
        // console.log("----------------");
        // console.log(data);
        // console.log("----------------");
        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        }); 
    } catch (e) {
        console.log(e);
    }
}
let getAbout = (req, res)=>{
    return res.render('about.ejs');
}
let getCRUD = (req, res)=>{
    // return res.send("day la tu file crud");
    return res.render('crud.ejs');
}
let postCRUD = async(req, res)=>{
    let message = await crudservice.createNewUser(req.body);
    console.log(message); // hien thong bao thanh cong o terminal
    // await crudservice.createNewUser(req.body);
    // console.log(req.body);
    // return res.render('crud.ejs');
    return res.send("form tu post-crud: create user successfully");
}

let displayCRUD = async(req, res)=>{
    let data = await crudservice.getAllUser();
    // console.log(data);
    // return res.send('display CRUD from home Controller');
    return res.render('display_crud.ejs',{
        dataTable : data
    });
}

let getEditCRUD = async (req, res)=>{
    let userId = req.query.id;
    if (userId) {
        let userData = await crudservice.getUserInfoById(userId);
        return res.render('edit_crud.ejs',{
            user: userData
        });
    } else {
        return res.send("User not found!");
    }
}
let putCRUD = async (req, res)=>{
    let data = req.body;
    let allUsers = await crudservice.updateUserData(data);
    return res.render('display_crud.ejs',{
        dataTable : allUsers
    });
}
let getDelCRUD = async (req, res)=>{
    let userId = req.query.id;
    if (userId) {
        await crudservice.delUserInfoById(userId);
        return res.send("Delete User is success!");
    } else {
        return res.send("User not found!");
    }
}
module.exports = {
    getHomePage: getHomePage,
    getAbout: getAbout,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayCRUD: displayCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    getDelCRUD: getDelCRUD,

}