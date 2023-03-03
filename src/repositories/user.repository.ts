import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IUser, body, FUser, postBody,Posts } from "../types/user.interface";
import UserServices from "../services/UserServices";
import * as dotenv from "dotenv";

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
								reject(error)
							});
					}
				})
				.catch((error) => {
					reject("user dose not exist");
				});
		});
	},
	generateTocken(userName: string) {
		return new Promise((resolve, reject) => {
			UserServices.getUserDetails(userName)
				.then((user: IUser | any) => {
					if (user != null) {
						const userData = {
							_id: user._id,
							name: user.name,
							email: user.email,
							phoneno: user.phoneno,
							image: user.image,
							status: user.status,
							birth: user.birth,
							signUP: user.signup,
						};
						const acessTocken: string = jwt.sign(userData, process.env.TOCKEN_SECRET!, { expiresIn: "2h" });
						resolve(acessTocken);
					}
				})
				.catch((error) => {
					reject(error);
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
	getUserFromTocken(header: any) {
		return new Promise((resolve, reject) => {
			const tocken = header["authorization"] || " ";
			const data: any = jwt.verify(tocken, process.env.TOCKEN_SECRET!);

			UserServices.getUserDetails(data.name)
				.then((user:IUser|any) => {
					if (user) {
						resolve(user);
					} else {
						reject("user dose not exits");
					}
				})
				.catch((error) => {
					reject("user dose not exits");
				});
		});
	},
	editUserName(newName:string,currentUser:IUser){
		return new Promise((resolve,reject)=>{
			if(newName === currentUser.name){
				resolve("nothing have been changed")
			}else{
				UserServices.editUserName(newName,currentUser.name!).then((message)=>{
					resolve(message)
				}).catch((error)=>{
					reject(error)
				})
			}
		})
		
	},
	generatePost(data:postBody,userId:string){
		return new Promise((resolve,reject)=>{
			const post:Posts = {
				image: 'string',
				userId: 'string',
				discription: 'string',
				likesCount: 0,
				commentCount: 0,
				uploadDate:new Date(),
				likes: [],
				comments: [],
			}
			UserServices.setPost(post).then((message)=>{
				resolve(message)
			}).catch((error)=>{
				reject(error)
			})
		})
	}
};
