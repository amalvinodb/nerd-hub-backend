import Post from "../model/postMode";
import { IUser, Posts } from "../types/user.interface";
import { rejects } from "assert";
import { ObjectId } from "mongodb";

export default {
	getPosts(userId: string) {
		return new Promise((resolve, reject) => {
			Post.find({ userId: userId })
				.then((posts) => {
					resolve(posts);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},

	setPost(post: Posts) {
		return new Promise((resolve, reject) => {
			const data = new Post({
				userId: post.userId,
				uploadDate: post.uploadDate,
				status: true,
				image: post.image,
				comment_count: post.commentCount,
				comments: post.comments,
				likes_count: post.likes_count,
				likes: post.likes,
				discription: post.discription,
			});
			data
				.save()
				.then((data) => {
					resolve("post have been sucessfully added");
				})
				.catch((error) => {
					reject("an error occoured while making the post");
				});
		});
	},

	findPost(postId: string) {
		return new Promise((resolve, reject) => {
			Post.findOne({ _id: new ObjectId(postId) })
				.then((data) => {
					resolve(data);
				})
				.catch((error) => {
					reject("couldnot find the post");
				});
		});
	},
	likePost(post: Posts, user: IUser) {
		return new Promise((resolve, reject) => {
			if (!post.likes.includes(user._id!)) {
				post.likes.push(user._id!);
				Post.updateOne(
					{ _id: new ObjectId(post._id) },
					{
						$set: {
							likes_count: post.likes_count + 1,
							likes: post.likes,
						},
					}
				)
					.then((data) => {
						resolve("successfully liked the post");
					})
					.catch((error) => {
						console.log(error);
						reject("could not like the post");
					});
			} else {
				let index = -1;
				for (let i = 0; i <= post.likes.length - 1; i++) {
					if (post.likes[i] === user._id) {
						index = i;
						break;
					}
				}
				if (index != -1) {
					for (let i = index; i <= post.likes.length - 2; i++) {
						post.likes[i] = post.likes[i + 1];
					}
				}
				post.likes.pop();
				Post.updateOne(
					{ _id: new ObjectId(post._id) },
					{
						$set: {
							likes_count: post.likes_count - 1,
							likes: post.likes,
						},
					}
				)
					.then((data) => {
						resolve("successfully removed liked the post");
					})
					.catch((error) => {
						console.log(error);
						reject("could not like the post");
					});
			}
		});
	},
	getAllPosts() {
		return new Promise((resolve, reject) => {
			Post.find({})
				.sort({ uploadDate: 1 })
				.then((data) => {
					resolve(data);
				})
				.catch((err) => {
					reject(err);
				});
		});
	},
};
