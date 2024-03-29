import { Request, Response } from "express";
import userRepository from "../repositories/user.repository";
import { IUser, body, FUser, headers } from "../types/user.interface";
import tockenRepository from "../repositories/tocken.repository";
import postRepository from "../repositories/post.repository";

export default {
	createPosts(req: Request, res: Response) {
		tockenRepository
			.getUserFromTocken(req.headers)
			.then((user: IUser | any) => {
				postRepository
					.generatePost(req.body, user, req.file)
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
	likePost(req: Request, res: Response) {
		
		tockenRepository
			.getUserFromTocken(req.headers)
			.then((user: IUser | any) => {
				postRepository
					.likePost(user, req.body.postId)
					.then((data) => {
						res.status(200).json(data);
					})
					.catch((err) => {
						res.status(400).json(err);
					});
			})
			.catch((err) => {
				res.status(400).json(err);
			});
	},
	getUserPost(req: Request, res: Response) {
		tockenRepository
			.getUserFromTocken(req.headers)
			.then((user: IUser | any) => {
				postRepository
					.getAllUserPost(user._id)
					.then((posts) => {
						res.status(200).json(posts);
					})
					.catch((error) => {
						res.status(400).json({ error });
					});
			})
			.catch((error) => {
				res.status(400).json({ error });
			});
	},
	getAllPost(req: Request, res: Response) {
		postRepository
			.getAllPost()
			.then((data) => {
		

				res.status(200).json(data);
			})
			.catch((err) => {
				res.status(400).json(err);
			});
	},
	makeComment(req: Request, res: Response) {	
		tockenRepository
			.getUserFromTocken(req.headers)
			.then((user) => {
				postRepository.makeComment(req.body, user).then((message)=>{
					postRepository.confirmPost(req.body.data.post).then((data)=>{
						res.status(200).json(data)
					}).catch((err)=>{
						res.status(400).json(err)
					})
				}).catch((err)=>{
					res.status(400).json(err)
				})
			})
			.catch((err) => {
				res.status(400).json(err)
			});
	},
	getPostDetails(req: Request, res: Response) {
		const postId = req.query.postId + "";
		postRepository
			.confirmPost(postId)
			.then((data) => {
				res.status(200).json(data);
			})
			.catch((err) => {
				res.status(400).json(err);
			});
	},
};
