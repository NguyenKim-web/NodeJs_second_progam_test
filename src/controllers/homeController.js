import db from "../models/index";

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


module.exports = {
    getHomePage: getHomePage,
    getAbout: getAbout
}