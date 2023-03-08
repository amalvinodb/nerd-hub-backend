import { Request, Response } from "express";
import userRepository from "../repositories/user.repository";
import { IUser, body, FUser, headers } from "../types/user.interface";
import tockenRepository from "../repositories/tocken.repository";
import postRepository from "../repositories/post.repository";

export default {
	getUserProfile(req: Request, res: Response) {
		tockenRepository
			.getUserFromTocken(req.headers)
			.then((user: IUser | any) => {
				res.status(200).json({ userName: user.name, phone: user.phoneno, email: user.email, dateOfBirth: user.birth, image: user.image, discription: user.discription, posts: user.posts, followers: user.followers, following: user.following });
			})
			.catch((error) => {
				res.status(404).json({ status: false, error });
			});
	},
	editUserName(req: Request, res: Response) {
		tockenRepository
			.getUserFromTocken(req.headers)
			.then((user: IUser | any) => {
				if(req.file!=undefined){
					userRepository.editUserImage(req.file,user._id).then((data)=>{
						//
					}).catch((err)=>{
						res.status(400).json(err)
						return;
					})
				}
				userRepository
					.editUserName(req.body.userName, user)
					.then((message) => {
						tockenRepository
							.generateTocken(req.body.userName)
							.then((tocken) => {
							
								res.status(200).json({ tocken, message });
							})
							.catch((error) => {
						
								res.status(400).json({ error });
							});
					})
					.catch((error) => {
				
						res.status(400).json({ error });
					});
			})
			.catch((error) => {
				
				res.status(400).json({ error });
			});
	},
	makeFriend(req: Request, res: Response) {
		tockenRepository
			.getUserFromTocken(req.headers)
			.then((user: IUser | any) => {
				userRepository.makeFriend(user, req.body.userId);
			})
			.catch((error) => {
				res.status(400).json({ error });
			});
	},

};
