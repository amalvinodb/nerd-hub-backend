import { Request, Response } from "express";
import userRepository from "../repositories/user.repository";
import { IUser, body, FUser, headers } from "../types/user.interface";

export default {
	getUserProfile(req: Request, res: Response) {
        userRepository.getUserFromTocken(req.headers).then((user:IUser|any)=>{
            console.log(user)
            res.status(200).json({ userName: user.name, phone: user.phoneno, email:user.email, dateOfBirth: user.birth, image: user.image, discription: user.discription, posts: user.posts, followers: user.followers, following: user.following })
        }).catch((error)=>{
                res.status(404).json({ status: false, error })
        })
	},
// 	editUserProfile(req: Request, res: Response) {
// 		console.log(req.body);
// 		res.status(200).json({ status: true, message: "user Details have been edited" });
// 	},
};
