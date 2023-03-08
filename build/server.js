"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const express_1 = __importDefault(require("express"));
const http_errors_1 = __importDefault(require("http-errors"));
const cors_1 = __importDefault(require("cors"));
const admin_1 = __importDefault(require("./routes/admin"));
const user_1 = __importDefault(require("./routes/user"));
const index_1 = __importDefault(require("./routes/index"));
const connections_1 = __importDefault(require("./connections/connections"));
//this is the connections and code to configure the node server project
dotenv.config();
const app = (0, express_1.default)();
const corsOptions = {
    origin: "http://localhost:4200",
    credentials: true,
    optionSucessStatus: 200,
};
app.use((0, cors_1.default)(corsOptions));
//making able to read and send responses and to read the url
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json({ limit: "50mb" }));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
(0, connections_1.default)();
//linking the base routes and urls
app.use("/", index_1.default);
app.use("/user", user_1.default);
app.use("/admin", admin_1.default);
//handling the errors of proper format
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    console.log(err);
    res.status(req.statusCode || 500);
    res.json({
        status: "error",
        message: err.message,
        stack: req.app.get("env") === "development" ? err.stack : {},
    });
});
//connections to the proper posts
app.listen(process.env.PORT_NO, () => {
    console.log("server started");
});
