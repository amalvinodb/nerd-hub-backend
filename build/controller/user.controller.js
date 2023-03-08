"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_repository_1 = __importDefault(require("../repositories/user.repository"));
const cloudinary_1 = __importDefault(require("cloudinary"));
cloudinary_1.default.v2.config({
    cloud_name: "dzmqstses",
    api_key: "496591628439112",
    api_secret: "UErHHUocO5UkUIJMQZNXaUZm-IU",
});
exports.default = {
    getUserProfile(req, res) {
        user_repository_1.default
            .getUserFromTocken(req.headers)
            .then((user) => {
            console.log(user);
            res.status(200).json({ userName: user.name, phone: user.phoneno, email: user.email, dateOfBirth: user.birth, image: user.image, discription: user.discription, posts: user.posts, followers: user.followers, following: user.following });
        })
            .catch((error) => {
            console.log(error);
            res.status(404).json({ status: false, error });
        });
    },
    // async editUserProfile(req: Request, res: Response) {
    // 	console.log(req.file)
    // 	console.log(req.body)
    // 	console.log(req.headers['content-type'])
    // },
    editUserName(req, res) {
        console.log(req.file);
        user_repository_1.default
            .getUserFromTocken(req.headers)
            .then((user) => {
            user_repository_1.default
                .editUserName(req.body.userName, user)
                .then((message) => {
                user_repository_1.default
                    .generateTocken(req.body.userName)
                    .then((tocken) => {
                    res.status(200).json({ tocken, message });
                })
                    .catch((error) => {
                    res.status(400).json({ error });
                });
            })
                .catch((error) => {
                res.status(400).json({ error });
            });
        })
            .catch((error) => {
            res.status(400).json({ error });
        });
    },
    createPosts(req, res) {
        // console.log(req.file)
        console.log(req.body);
        // console.log(req.files.{'image'})
        // userRepository
        // 	.getUserFromTocken(req.headers)
        // 	.then((user: IUser | any) => {
        // 		userRepository
        // 			.generatePost(req.body, user._id)
        // 			.then((message) => {
        // 				console.log(message)
        // 				res.status(200).json({ message });
        // 			})
        // 			.catch((error) => {
        // 				res.status(400).json({ error });
        // 			});
        // 	})
        // 	.catch((error) => {
        // 		res.status(400).json({ error });
        // 	});
    },
    makeFriend(req, res) {
        user_repository_1.default.getUserFromTocken(req.headers).then((user) => {
            user_repository_1.default.makeFriend(user, req.body.userId);
        }).catch((error) => {
            res.status(400).json({ error });
        });
    },
    likePost(req, res) {
        user_repository_1.default.getUserFromTocken(req.headers).then((user) => {
            user_repository_1.default.likePost(user, req.body.postId);
        });
    },
    getUserPost(req, res) {
        console.log("hello");
        user_repository_1.default.getUserFromTocken(req.headers).then((user) => {
            user_repository_1.default.getAllPost(user._id).then((posts) => {
                res.status(200).json({ posts });
            }).catch((error) => {
                res.status(400).json({ error });
            });
        }).catch((error) => {
            res.status(400).json({ error });
        });
    }
};
