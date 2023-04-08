import mongoose from "mongoose";

const schema = new mongoose.Schema({
	name: {
		type: String,
		require: true,
		unique: true,
		dropDubs: true,
	},
	email: {
		type: String,
		require: true,
		unique: true,
		dropDubs: true,
	},
	signup: {
		type: Date,
		require: true,
	},
	password: {
		type: String,
		require: true,
	},
	image: {
		type: String,
	},
});

const Admin = mongoose.model("Admin", schema);

export default Admin;
