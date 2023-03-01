import express from "express";
import user from "../controller/user.controller"
const router = express.Router();
import middleware from '../middleware/user-auth'

router.get("/user-profile",middleware.authenticateTocken,user.getUserProfile)

router.post('/edit-User')
export default router;
