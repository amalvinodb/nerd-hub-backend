import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";

dotenv.config();

export default {
	authenticateTocken: (req: Request, res: Response, next: NextFunction) => {
		let tocken = req.headers["authentication"] || " ";
		tocken = tocken + "";
			const data = jwt.verify(tocken,process.env.TOCKEN_SECRET!);
			if (data) {
				next();
			} else {
				res.status(400).json({
					status: false,
					message: "the auth tocken is invalid",
				});
			}
	},
};
