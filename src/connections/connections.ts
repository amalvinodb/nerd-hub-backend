import mongoose from "mongoose";

const connectDB = async () => {
	try {
		// mongodb connection string
		mongoose.set("strictQuery", false);
		const con = await mongoose.connect("mongodb://localhost:27017/nerd_hub");

		console.log(`MongoDB connected`);
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
};

export default connectDB;
