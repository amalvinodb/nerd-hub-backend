"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = __importDefault(require("../model/userModel"));
const postMode_1 = __importDefault(require("../model/postMode"));
exports.default = {
    getPassword(userName) {
        return new Promise((resolve, reject) => {
            userModel_1.default.findOne({ name: userName })
                .then((data) => {
                if (data != null) {
                    resolve(data.password);
                }
                else {
                    reject("user dose not exist");
                }
            })
                .catch((error) => reject(error));
        });
    },
    getUserDetails(userName) {
        return new Promise((resolve, reject) => {
            userModel_1.default.findOne({ name: userName })
                .then((user) => {
                resolve(user);
            })
                .catch((error) => {
                reject(error);
            });
        });
    },
    setUser(user) {
        return new Promise((resolve, reject) => {
            const data = new userModel_1.default({
                name: user.name,
                email: user.email,
                birth: user.dateOfBirth,
                phoneno: user.phone,
                signup: new Date(),
                status: true,
                password: user.password,
                image: "https://res.cloudinary.com/dzmqstses/image/upload/v1671766702/this%20folder/swbcutmiczsin2vaglh9.jpg",
                posts: 0,
                followingCount: 0,
                following: [],
                followersCount: 0,
                followers: [],
                discription: "please enter you profile discription",
            });
            data
                .save()
                .then((data) => {
                resolve("user have been successfully added");
            })
                .catch((err) => {
                reject("user already exist");
            });
        });
    },
    editUserName(newName, oldName) {
        return new Promise((resolve, reject) => {
            userModel_1.default.updateOne({ name: oldName }, { $set: { name: newName } })
                .then((data) => {
                resolve("user data have been updated");
            })
                .catch((error) => {
                reject("userdata connot be updated");
            });
        });
    },
    setPost(post) {
        return new Promise((resolve, reject) => {
            const data = new postMode_1.default({
                userId: post.userId,
                uploadDate: post.uploadDate,
                status: true,
                image: post.image,
                comment_count: post.commentCount,
                comments: post.comments,
                likes_count: post.likesCount,
                likes: post.likes,
                discription: post.discription,
            });
            data
                .save()
                .then((data) => {
                resolve("post have been sucessfully added");
            })
                .catch((error) => {
                console.log(error);
                reject("an error occoured while making the post");
            });
        });
    },
    getUserById(userId) {
        return new Promise((resolve, reject) => {
            userModel_1.default.findOne({ _id: userId })
                .then((user) => {
                resolve(user);
            })
                .catch((error) => {
                reject("cannot find user");
            });
        });
    },
    addFriend(user, newUser) {
        return new Promise((resolve, reject) => {
            if (!newUser.followers.includes(user._id) && !user.following.includes(newUser._id)) {
                userModel_1.default.updateOne({ _id: user._id }, {
                    $set: {
                        following: user.following.push(newUser._id),
                        folloingCount: user.followersCount + 1,
                    },
                }).then((data) => {
                    userModel_1.default.updateOne({ _id: newUser._id }, {
                        $set: {
                            followers: newUser.followers.push(user._id),
                            followersCount: newUser.followersCount + 1,
                        },
                    })
                        .then((data) => {
                        resolve("updated the user");
                    })
                        .catch((error) => {
                        reject("could not update the data");
                    });
                });
            }
        });
    },
    findPost(postId) {
        return new Promise((resolve, reject) => {
            postMode_1.default.findOne({ _id: postId }).then((data) => {
                resolve(data);
            }).catch((error) => {
                reject("couldnot find the post");
            });
        });
    },
    likePost(post, user) {
        return new Promise((resolve, reject) => {
            postMode_1.default.updateOne({ _id: post._id }, { $set: {
                    likes_count: post.likesCount + 1,
                    likes: post.likes.push(user._id)
                } }).then((data) => {
                resolve("successfully liked the post");
            }).catch((error) => {
                reject("could not like the post");
            });
        });
    },
    getPosts(userId) {
        console.log("hello");
        return new Promise((resolve, reject) => {
            postMode_1.default.find({ userId: userId }).then((posts) => {
                resolve(posts);
                // console.log(posts)
            }).catch((error) => {
                reject(error);
            });
        });
    }
};
