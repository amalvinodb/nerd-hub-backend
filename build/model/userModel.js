"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const schema = new mongoose_1.default.Schema({
    name: {
        type: String,
        require: true,
        unique: true,
        dropDubs: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
        dropDubs: true,
    },
    birth: {
        type: Date,
        require: true,
    },
    phoneno: {
        type: String,
        require: true,
    },
    signup: {
        type: Date,
        require: true,
    },
    status: {
        type: Boolean,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    image: {
        type: String,
    },
    posts: {
        type: Number,
    },
    followingCount: {
        type: Number,
    },
    following: {
        type: Array,
    },
    followersCount: {
        type: Number,
    },
    followers: {
        type: Array,
    },
    discription: {
        type: String,
    },
});
const User = mongoose_1.default.model("User", schema);
exports.default = User;
