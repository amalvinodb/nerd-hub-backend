import { Request, Response } from "express";
import userRepository from "../repositories/user.repository";
import { IUser, body, FUser, headers } from "../types/user.interface";
import tockenRepository from "../repositories/tocken.repository";
import postRepository from "../repositories/post.repository";

export default {
	// landing_page(req: Request, res: Response) {
	// 	res.status(200).json({ status: true, message: "this is the landing page" });
	// },
};
