import User from "../model/userModel";
import Post from "../model/postMode"
import { IUser,Posts } from "../types/user.interface";

export default {
	getPassword(userName: string) {
		return new Promise((resolve, reject) => {
			User.findOne({ name: userName })
				.then((data) => {
					if (data != null) {
						resolve(data.password);
					} else {
						reject("user dose not exist");
					}
				})
				.catch((error) => reject(error));
		});
	},
	getUserDetails(userName: string) {
		return new Promise((resolve, reject) => {
			User.findOne({ name: userName })
				.then((user: IUser | any) => {
					resolve(user);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},
	setUser(user: any) {
		return new Promise((resolve, reject) => {
			const data = new User({
				name: user.name,
				email: user.email,
				birth: user.dateOfBirth,
				phoneno: user.phone,
				signup: new Date(),
				status: true,
				password: user.password,
				image: "https://res.cloudinary.com/dzmqstses/image/upload/v1671766702/this%20folder/swbcutmiczsin2vaglh9.jpg",
				posts: 0,
				following: 0,
				followers: 0,
				discription: "please enter you profile discription",
			});
			data
				.save()
				.then((data) => {
					resolve("user have been successfully added");
				})
				.catch((err) => {
					reject("user already exist");
				});
		});
	},
	editUserName(newName:string,oldName:string){
		return new Promise((resolve,reject)=>{
			User.updateOne({name:oldName},{$set:{name:newName}}).then((data)=>{
				resolve("user data have been updated")
			}).catch((error)=>{
				reject("userdata connot be updated")
			})
		})
	},
	setPost(post:Posts){
		return new Promise((resolve,reject)=>{
			const data = new Post({
				userId:post.userId,
				uploadDate:post.uploadDate,
				status:true,
				image:post.image,
				comment_count:post.commentCount,
				comments:post.comments,
				likes_count:post.likesCount,
				likes:post.likes,
				discription:post.discription
			})
			data.save().then((data)=>{
				resolve("post have been sucessfully added")
			}).catch((error)=>{
				reject("an error occoured while making the post")
			})
		})
	}
};
