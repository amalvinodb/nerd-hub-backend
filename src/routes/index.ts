import express, { Request, Response } from "express";
import userController from "../controller/userManagement.controller";
import main_page from "../controller/default.controller";
import socketController from "../controller/socket.controller";
const router = express.Router();

// router.get("/", main_page.landing_page);

router.post("/signup", userController.doSignUp);

router.post("/login", userController.doLogin);

router.get('/socket',socketController.logMessage)

export default router;
