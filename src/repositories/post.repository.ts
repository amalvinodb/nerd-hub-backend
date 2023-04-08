
import { IUser, body, FUser, postBody, Posts } from "../types/user.interface";
import UserServices from "../services/User.service";
import * as dotenv from "dotenv";
import imageService from "../services/imageUpload.service";

import postService from "../services/post.service";
dotenv.config();

export default {
	generatePost(data: postBody, user: IUser, image: Express.Multer.File | undefined) {
		return new Promise((resolve, reject) => {
			imageService
				.uploadImage(image)
				.then((image: string | unknown) => {
					if (image) {
						const post: Posts = {
							image: image + "",
							userId: user._id!,
							userImage: user.image!,
							userName: user.name!,
							userEmail: user.email!,
							discription: data.discription,
							likes_count: 0,
							commentCount: 0,
							uploadDate: new Date(),
							likes: [""],
							comments: [],
						};
						postService
							.setPost(post)
							.then((message) => {
								resolve(message);
							})
							.catch((error) => {
								reject(error);
							});
					} else {
						reject("image is not found");
					}
				})
				.catch((err) => {
					reject(err);
				});
		});
	},

	likePost(user: IUser, postId: string) {
		return new Promise((resolve, reject) => {
			postService
				.findPost(postId)
				.then((post: Posts | any) => {
					postService
						.likePost(post, user)
						.then((data) => {
							resolve(data);
						})
						.catch((err) => {
							reject(err);
						});
				})
				.catch((err) => {
					reject(err);
				});
			//
		});
	},
	getAllUserPost(userId: string) {
		return new Promise((resolve, reject) => {
			postService
				.getPosts(userId)
				.then((posts: any) => {
					resolve(posts);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},
	getAllPost() {
		return new Promise((resolve, reject) => {
			postService
				.getAllPosts()
				.then((data) => {
					resolve(data);
				})
				.catch((err) => {
					reject(err);
				});
		});
	},
	confirmPost(postId: string) {
		return new Promise((resolve, reject) => {
			postService
				.findPost(postId)
				.then((data: any) => {
					resolve(data);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},
	makeComment(comment: any,user:any) {
		return new Promise((resolve, reject) => {
			const commentData = {
				userId:user._id,
				userName:user.name,
				userEamil:user.email,
				userImage:user.image,
				comment:comment.data.comment,
				datePosted:new Date()
			}
			postService.findPost(comment.data.post).then((post:Posts|any)=>{
				post.comments.push(commentData)
				post.comment_count = post.comment_count + 1
				
				
				postService.addComment(comment.data.post,post).then((message)=>{
					resolve(message)
				}).catch((err)=>{
					reject(err)
				})
				
			}).catch((err)=>{
				reject(err)
				
			})
			
			
			
			
		});
	},
};
