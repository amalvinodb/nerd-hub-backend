import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default {
	landing_page(req: Request, res: Response) {
		res.status(200).json({ status: true, message: "this is the landing page" });
	},
};
