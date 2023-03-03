import { Request, Response } from "express";
import userRepository from "../repositories/user.repository";
import { IUser, body, FUser, headers } from "../types/user.interface";
import cloudinary from "cloudinary";
cloudinary.v2.config({
	cloud_name: "dzmqstses",
	api_key: "496591628439112",
	api_secret: "UErHHUocO5UkUIJMQZNXaUZm-IU",
});
export default {
	getUserProfile(req: Request, res: Response) {
		userRepository
			.getUserFromTocken(req.headers)
			.then((user: IUser | any) => {
				console.log(user);
				res.status(200).json({ userName: user.name, phone: user.phoneno, email: user.email, dateOfBirth: user.birth, image: user.image, discription: user.discription, posts: user.posts, followers: user.followers, following: user.following });
			})
			.catch((error) => {
				console.log(error);
				res.status(404).json({ status: false, error });
			});
	},
	// async editUserProfile(req: Request, res: Response) {
	// 	console.log(req.file)
	// 	console.log(req.body)
	// 	console.log(req.headers['content-type'])
	// },
	editUserName(req: Request, res: Response) {
		userRepository
			.getUserFromTocken(req.headers)
			.then((user: IUser | any) => {
				userRepository
					.editUserName(req.body.userName, user)
					.then((message) => {
						userRepository
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
	createPosts(req: Request, res: Response) {
		userRepository
			.getUserFromTocken(req.headers)
			.then((user: IUser | any) => {
				userRepository
					.generatePost(req.body, user._id)
					.then((message) => {
						res.status(200).json({ message });
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
		console.log(req.body);
	},
};
