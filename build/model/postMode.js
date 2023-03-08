"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const schema = new mongoose_1.default.Schema({
    userId: {
        type: String,
    },
    uploadDate: {
        type: Date,
    },
    status: {
        type: Boolean,
    },
    image: {
        type: String,
    },
    comment_count: {
        type: Number,
    },
    comments: {
        type: Array,
    },
    likes_count: {
        type: Number,
    },
    likes: {
        type: Array,
    },
    discription: {
        type: String,
    }
});
const Post = mongoose_1.default.model("Post", schema);
exports.default = Post;
