import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IUser, body, FUser, postBody, Posts } from "../types/user.interface";
import UserServices from "../services/User.service";
import * as dotenv from "dotenv";
import imageService from "../services/imageUpload.service";

dotenv.config();

export default {
	confirmPassword(body: body) {
		return new Promise((resolve, reject) => {
			UserServices.getPassword(body.name)
				.then((password) => {
					if (typeof password === "string") {
						bcrypt
							.compare(body.password, password)
							.then((status) => {
								resolve(true);
							})
							.catch((error) => {
								reject(error);
							});
					}
				})
				.catch((error) => {
					reject("user dose not exist");
				});
		});
	},
	setUser(user: FUser) {
		// eslint-disable-next-line no-async-promise-executor
		return new Promise(async (resolve, reject) => {
			if (user.name && user.password && user.birth && user.phone && user.email) {
				user.password = await bcrypt.hash(user.password, 10);
				UserServices.setUser(user)
					.then((status) => {
						resolve(status);
					})
					.catch((error: any) => {
						reject(error);
					});
			} else {
				reject("insufficient data provided");
			}
		});
	},
	editUserName(newName: string, currentUser: IUser) {
		return new Promise((resolve, reject) => {
			if (newName === currentUser.name) {
				resolve("nothing have been changed");
			} else {
				UserServices.editUserName(newName, currentUser.name!)
					.then((message) => {
						resolve(message);
					})
					.catch((error) => {
						reject(error);
					});
			}
		});
	},
	makeFriend(user: IUser, UserId: string) {
		return new Promise((resolve, reject) => {
			UserServices.getUserById(UserId)
				.then((newUser: IUser | any) => {
					UserServices.addFriend(user, newUser)
						.then((message) => {
							resolve(message);
						})
						.catch((error) => {
							reject(error);
						});
				})
				.catch((error) => {
					reject(error);
				});
		});
	},
	editUserImage(image:Express.Multer.File | undefined,userId:string){
		return new Promise((resolve,reject)=>{
			imageService.uploadImage(image).then((data:string|any)=>{
				UserServices.editUserImage(data,userId).then((data)=>{
					resolve(data)
				}).catch((err)=>{
					reject(err)
				})
			}).catch((err)=>{
				reject(err)
			})
		})
		
	}
};
