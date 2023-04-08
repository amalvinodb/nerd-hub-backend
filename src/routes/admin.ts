import express from "express";
import adminController from "../controller/admin.controller";

const router = express.Router();

router.get("/", adminController.getUsers);

router.post("/login",adminController.login);

export default router;
