import { Request, Response } from "express";
import userRepository from "../repositories/user.repository";

export default {
	async doSignUp(req: Request, res: Response) {
		userRepository
			.setUser(req.body)
			.then((message) => {
				res.status(200).json({ status: true, message });
			})
			.catch((error) => {
				res.status(200).json({ status: false, error });
			});
	},
	async doLogin(req: Request, res: Response) {
		
		userRepository.confirmPassword(req.body).then((status)=>{
			if (status) {
				userRepository
					.generateTocken(req.body.name)
					.then((tocken) => {
						res.status(200).json({ status: true, message: "successfully logged in to the user account", tocken });
					})
					.catch((error) => {
						res.status(400).json({ status: false, error });
					});
			}
		}).catch((error)=>{
			res.status(400).json({ status: false, error });
		})
		
	},
};
