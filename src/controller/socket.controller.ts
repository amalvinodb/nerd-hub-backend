import { Request, Response } from "express";
import {io} from '../server'

export default {
    logMessage(req:Request,res:Response){
        console.log(req.body);     
        res.status(101).json({message:"sucess"})  
    }
};

