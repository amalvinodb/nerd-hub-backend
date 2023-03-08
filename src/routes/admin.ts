import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
	res.status(200).json({ status: true, message: "this is admin side" });
});

export default router;
