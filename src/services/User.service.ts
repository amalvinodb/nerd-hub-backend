import User from "../model/userModel";
import Post from "../model/postMode";
import { IUser, Posts } from "../types/user.interface";
import { rejects } from "assert";
import { ObjectId } from "mongodb";
export default {
	getPassword(userName: string) {
		return new Promise((resolve, reject) => {
			User.findOne({ name: userName })
				.then((data) => {
					if (data != null) {
						resolve(data);
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
				followingCount: 0,
				following: [],
				followersCount: 0,
				followers: [],
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
	editUserName(userData: any, oldName: string) {
		return new Promise((resolve, reject) => {
			User.updateOne({ name: oldName }, { $set: { name: userData.userName,discription:userData.profileDiscription } })
				.then((data) => {
					resolve("user data have been updated");
				})
				.catch((error) => {
					reject("userdata connot be updated");
				});
		});
	},
	getUserById(userId: string) {
		return new Promise((resolve, reject) => {
			User.findOne({ _id: userId })
				.then((user: IUser | any) => {
					resolve(user);
				})
				.catch((error) => {
					reject("cannot find user");
				});
		});
	},
	addFriend(user: IUser, newUser: IUser) {
		return new Promise((resolve, reject) => {
			if (!newUser.followers.includes(user._id!) && !user.following.includes(newUser._id!)) {
				User.updateOne(
					{ _id: user._id },
					{
						$set: {
							following: user.following.push(newUser._id!),
							folloingCount: user.followersCount! + 1,
						},
					}
				).then((data) => {
					User.updateOne(
						{ _id: newUser._id },
						{
							$set: {
								followers: newUser.followers.push(user._id!),
								followersCount: newUser.followersCount! + 1,
							},
						}
					)
						.then((data) => {
							resolve("updated the user");
						})
						.catch((error) => {
							reject("could not update the data");
						});
				});
			}
		});
	},
	editUserImage(imageUrl:string|any,userId:string){
		return new Promise((resolve,reject)=>{
			User.updateOne({_id:new ObjectId(userId)},{$set:{
				image:imageUrl
			}}).then((data)=>{
				resolve("the image is updated")
			}).catch((err)=>{
				reject("image could not be updated")
			})
		})
	}
};
