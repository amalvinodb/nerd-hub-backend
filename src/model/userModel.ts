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
	birth: {
		type: Date,
		require: true,
	},
	phoneno: {
		type: String,
		require: true,
	},
	signup: {
		type: Date,
		require: true,
	},
	status: {
		type: Boolean,
		require: true,
	},
	password: {
		type: String,
		require: true,
	},
	image: {
		type: String,
	},
	posts: {
		type: Number,
	},
	followingCount: {
		type: Number,
	},
	following: {
		type: Array,
	},
	followersCount: {
		type: Number,
	},
	followers: {
		type: Array,
	},
	discription: {
		type: String,
	},
});

const User = mongoose.model("User", schema);

export default User;
