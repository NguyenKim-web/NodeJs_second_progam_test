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
    console.log(message);
    // await crudservice.createNewUser(req.body);
    // console.log(req.body);
    // return res.render('crud.ejs');
    return res.send("form tu post-crud");
}




module.exports = {
    getHomePage: getHomePage,
    getAbout: getAbout,
    getCRUD: getCRUD,
    postCRUD: postCRUD,

}