"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userManagement_controller_1 = __importDefault(require("../controller/userManagement.controller"));
const default_page_1 = __importDefault(require("../controller/default_page"));
const router = express_1.default.Router();
router.get("/", default_page_1.default.landing_page);
router.post("/signup", userManagement_controller_1.default.doSignUp);
router.post("/login", userManagement_controller_1.default.doLogin);
// router.post("/admin_login",)
exports.default = router;
