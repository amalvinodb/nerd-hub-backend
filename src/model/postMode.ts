import mongoose from "mongoose";

const schema = new mongoose.Schema({
	userId: {
		type: String,
		require: true,
		unique: true,
		dropDubs: true,
	},
	uploadDate: {
		type: Date,
		require: true,
	},
	status: {
		type: Boolean,
		require: true,
	},
	image: {
		type: String,
        require:true,
	},
	comment_count:{
		type:Number,
        require:true,
	},
	comments:{
		type:Array,
        require:true
	},
	likes_count:{
		type:Number,
        require:true
	},
    likes:{
        type:Array,
        require:true
    },
	discription:{
		type:String,
        require:true
	}
});

const Post = mongoose.model("Post", schema);

export default Post;
