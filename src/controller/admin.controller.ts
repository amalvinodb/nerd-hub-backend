import { Request, Response } from "express";
import adminRepo from "../repositories/admin.repository";
import tockenRepository from "../repositories/tocken.repository";
export default {
	login(req: Request, res: Response) {
		adminRepo
			.confirmAdmin(req.body)
			.then((data:any) => {
				tockenRepository.generateTocken(data).then((tocken)=>{
                    console.log(tocken);
                })
			})
			.catch((err) => {
				console.log(err);
			});
	},
	getUsers(req: Request, res: Response) {
		console.log(req.body);
	},
};
