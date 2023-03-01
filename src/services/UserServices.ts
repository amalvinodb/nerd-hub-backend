import User from "../model/userModel";
import { IUser } from "../types/user.interface";

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
};
