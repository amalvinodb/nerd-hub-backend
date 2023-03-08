"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_repository_1 = __importDefault(require("../repositories/user.repository"));
exports.default = {
    async doSignUp(req, res) {
        user_repository_1.default
            .setUser(req.body)
            .then((message) => {
            res.status(200).json({ status: true, message });
        })
            .catch((error) => {
            res.status(200).json({ status: false, error });
        });
    },
    async doLogin(req, res) {
        user_repository_1.default.confirmPassword(req.body).then((status) => {
            if (status) {
                user_repository_1.default
                    .generateTocken(req.body.name)
                    .then((tocken) => {
                    res.status(200).json({ status: true, message: "successfully logged in to the user account", tocken });
                })
                    .catch((error) => {
                    res.status(400).json({ status: false, error });
                });
            }
        }).catch((error) => {
            res.status(400).json({ status: false, error });
        });
    },
};
