import express from "express";
import user from "../controller/user.controller";
const router = express.Router();
import middleware from "../middleware/user-auth";
import multer from "multer";
import landing from "../controller/default.controller";
import post from "../controller/post.controller";

const upload = multer({
	storage: multer.diskStorage({}),
	fileFilter: (req, file, cb) => {
		cb(null, true);
	},
});

router.get("/user-profile", middleware.authenticateTocken, user.getUserProfile);

router.get("/userPosts", middleware.authenticateTocken, post.getUserPost);

router.post("/editUserName", middleware.authenticateTocken, upload.single("image"), user.editUserName);

router.post("/makePost", middleware.authenticateTocken, upload.single("image"), post.createPosts);

router.get("/getAllPost", middleware.authenticateTocken, post.getAllPost);

router.post('/likePost',middleware.authenticateTocken,post.likePost)
export default router;
