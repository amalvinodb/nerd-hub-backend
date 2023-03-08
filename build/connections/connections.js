"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    try {
        // mongodb connection string
        mongoose_1.default.set("strictQuery", false);
        const con = await mongoose_1.default.connect("mongodb://localhost:27017/nerd");
        console.log(`MongoDB connected`);
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
};
exports.default = connectDB;
