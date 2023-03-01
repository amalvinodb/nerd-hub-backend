import express, { Request, Response } from "express";
import userController from "../controller/userManagement.controller";
import main_page from "../controller/default_page";

const router = express.Router();

router.get("/", main_page.landing_page);

router.post("/signup", userController.doSignUp);

router.post("/login", userController.doLogin);


// router.post("/admin_login",)

export default router;
