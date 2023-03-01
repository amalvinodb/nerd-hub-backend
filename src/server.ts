import * as dotenv from "dotenv";
import express,{Request,Response,NextFunction} from "express";
import createError from "http-errors";
import cors from "cors";
import adminRouter from "./routes/admin";
import userRouter from "./routes/user";
import indexRouter from "./routes/index";
import connect from "./connections/connections";

//this is the connections and code to configure the node server project
dotenv.config();
const app = express();
const corsOptions={
    origin:"http://localhost:4200",
    credentials:true,
    optionSucessStatus:200 
}
app.use(cors(corsOptions))
//making able to read and send responses and to read the url
app.use(express.json());
app.use(express.urlencoded({extended:true}));
connect();
//linking the base routes and urls
app.use("/",indexRouter);
app.use("/user",userRouter);
app.use("/admin",adminRouter)
//handling the errors of proper format
app.use(function(req:Request,res:Response,next:NextFunction){
    next(createError(404));
})
app.use(function(err:Error,req:Request,res:Response,next:NextFunction){
    res.locals.message = err.message;
    console.log(err);
    res.status(req.statusCode||500);
    res.json({
        status:"error",
        message:err.message,
        stack: req.app.get("env") === "development"?err.stack:{}
    })
})
//connections to the proper posts
app.listen(process.env.PORT_NO,():void =>{
    console.log("server started");
})