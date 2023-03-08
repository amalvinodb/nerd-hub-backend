import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IUser, body, FUser, postBody, Posts } from "../types/user.interface";
import UserServices from "../services/User.service";
import * as dotenv from "dotenv";
import imageService from "../services/imageUpload.service";

dotenv.config();

export default {
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

	getUserFromTocken(header: any) {
		return new Promise((resolve, reject) => {
			const tocken = header["authorization"] || " ";
			const data: any = jwt.verify(tocken, process.env.TOCKEN_SECRET!);

			UserServices.getUserDetails(data.name)
				.then((user: IUser | any) => {
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
};
