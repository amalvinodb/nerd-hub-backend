import express from "express";
import user from "../controller/user.controller";
const router = express.Router();
import middleware from "../middleware/user-auth";
import multer from "multer";

const upload = multer({
	storage: multer.diskStorage({}),
	fileFilter: (req, file, cb) => {
		cb(null, true);
	},
});
// multer({limits: {fileSize: 5 * 1024 * 1024}})
router.get("/user-profile", middleware.authenticateTocken, user.getUserProfile);

// router.post("/edit-User", middleware.authenticateTocken, user.editUserProfile);
router.post("/editUserName",middleware.authenticateTocken,upload.array('image'),user.editUserName)
export default router;
//
