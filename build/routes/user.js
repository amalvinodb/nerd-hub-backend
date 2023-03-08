"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controller/user.controller"));
const router = express_1.default.Router();
const user_auth_1 = __importDefault(require("../middleware/user-auth"));
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({}),
    fileFilter: (req, file, cb) => {
        cb(null, true);
    },
});
// multer({limits: {fileSize: 5 * 1024 * 1024}})
router.get("/user-profile", user_auth_1.default.authenticateTocken, user_controller_1.default.getUserProfile);
router.get("/userPosts", user_auth_1.default.authenticateTocken, user_controller_1.default.getUserPost);
router.post("/editUserName", user_auth_1.default.authenticateTocken, upload.single("image"), user_controller_1.default.editUserName);
router.post("/makePost", user_auth_1.default.authenticateTocken, upload.single("image"), user_controller_1.default.createPosts);
exports.default = router;
//
