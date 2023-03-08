import mongoose from "mongoose";

const schema = new mongoose.Schema({
	userId: {
		type: String,
	},
	uploadDate: {
		type: Date,
	},
	status: {
		type: Boolean,
	},
	image: {
		type: String,
	},
	comment_count: {
		type: Number,
	},
	comments: {
		type: Array,
	},
	likes_count: {
		type: Number,
	},
	likes: {
		type: Array,
	},
	discription: {
		type: String,
	},
});

const Post = mongoose.model("Post", schema);

export default Post;
