import express from "express";
import homeController from "../controllers/homeController";

let router = express.Router();
let initWebRouter = (app)=>{
    router.get('/', homeController.getHomePage);
    router.get('/about', homeController.getAbout);
    router.get('/crud', homeController.getCRUD);
    router.post('/post-crud', homeController.postCRUD);
    router.get('/display-crud', homeController.displayCRUD);
    router.get('/edit-crud', homeController.getEditCRUD);
    router.post('/put-crud', homeController.putCRUD);
    router.get('/del-crud', homeController.getDelCRUD);
    
    return app.use("/", router);

}

module.exports = initWebRouter;