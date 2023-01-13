import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/userModel";
import IUser from "../types/user.interface";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();
export default {
	async doSignUp(req: Request, res: Response) {
		if (req.body.name && req.body.password && req.body.email && req.body.phone && req.body.birth) {
			req.body.password = await bcrypt.hash(req.body.password, 10);
			const user = new User({
				name: req.body.name,
				email: req.body.email,
				birth: req.body.birth,
				phoneno: req.body.phone,
				signup: new Date(),
				status: true,
				password: req.body.password,
				image: "https://res.cloudinary.com/dzmqstses/image/upload/v1671766702/this%20folder/swbcutmiczsin2vaglh9.jpg",
			});
			user
				.save()
				.then((data) => {
					res.status(200).json({ status: true, message: "the user have been added", body: data });
				})
				.catch((err) => {
					//
					res.status(400).json({ status: false, message: "user already exist", error: err });
				});
		} else {
			res.status(400).json({ status: false, message: "insufficient data", body: req.body });
		}
        // res.json({status:true,message:"ok sucess"})
	},
	doLogin(req: Request, res: Response) {
		User.findOne({name:req.body.name}).then(async (data)=>{
            if(data!=null){
                await bcrypt.compare(req.body.password,data.password!).then((status:boolean)=>{
                    //
                    if(status){
                        if(data.status){
                            const user={
                                name:data.name,
                                image:data.name,
                                birth:data.birth,
                                phoneno:data.phoneno,
                                email:data.email,
                                signup:data.signup,
                            }
                            const acessTocken: string = jwt.sign(user, process.env.TOCKEN_SECRET! , { expiresIn: "2h" });
                            res.status(200).json({status:true,message:"successfully logged in to the user account",body:user,tocken:acessTocken});
                        }else{
                            res.status(400).json({status:false,message:"user is blocked"})
                        } 
                    }else{
                        res.status(400).json({status:false,error:"incorrect password"})
                    }
                })

                // 
            }else{
                res.status(400).json({status:false,error:"user dosenot exist"})
            }   
        }).catch((err)=>{
            res.status(400).json({status:false,message:"error have happened"})
        })

		// res.status(200).json({ status: true, message: "login success", body: req.body });
	},
	sent_otp(req: Request, res: Response) {
		res.status(200).json({ status: true, message: "otp sucessfully sent" });
	},
	confirm_otp(req: Request, res: Response) {
		res.status(200).json({ status: true, message: "otp confirmed to load the proper pages" });
	},
};
