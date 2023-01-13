import express, { Request, Response } from "express";
import userLogin from "../controller/user_login_&_logout";
import main_page from "../controller/default_page";

const router = express.Router();

router.get("/", main_page.landing_page);

router.post("/signup", userLogin.doSignUp);

router.post("/login", userLogin.doLogin);

router.post("/admin_login",)

export default router;
