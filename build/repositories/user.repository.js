"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserServices_1 = __importDefault(require("../services/UserServices"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
exports.default = {
    confirmPassword(body) {
        return new Promise((resolve, reject) => {
            UserServices_1.default.getPassword(body.name)
                .then((password) => {
                if (typeof password === "string") {
                    bcrypt_1.default
                        .compare(body.password, password)
                        .then((status) => {
                        resolve(true);
                    })
                        .catch((error) => {
                        reject(error);
                    });
                }
            })
                .catch((error) => {
                reject("user dose not exist");
            });
        });
    },
    generateTocken(userName) {
        return new Promise((resolve, reject) => {
            UserServices_1.default.getUserDetails(userName)
                .then((user) => {
                if (user != null) {
                    const userData = {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        phoneno: user.phoneno,
                        image: user.image,
                        status: user.status,
                        birth: user.birth,
                        signUP: user.signup,
                    };
                    const acessTocken = jsonwebtoken_1.default.sign(userData, process.env.TOCKEN_SECRET, { expiresIn: "2h" });
                    resolve(acessTocken);
                }
            })
                .catch((error) => {
                reject(error);
            });
        });
    },
    setUser(user) {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async (resolve, reject) => {
            if (user.name && user.password && user.birth && user.phone && user.email) {
                user.password = await bcrypt_1.default.hash(user.password, 10);
                UserServices_1.default.setUser(user)
                    .then((status) => {
                    resolve(status);
                })
                    .catch((error) => {
                    reject(error);
                });
            }
            else {
                reject("insufficient data provided");
            }
        });
    },
    getUserFromTocken(header) {
        return new Promise((resolve, reject) => {
            const tocken = header["authorization"] || " ";
            const data = jsonwebtoken_1.default.verify(tocken, process.env.TOCKEN_SECRET);
            UserServices_1.default.getUserDetails(data.name)
                .then((user) => {
                if (user) {
                    resolve(user);
                }
                else {
                    reject("user dose not exits");
                }
            })
                .catch((error) => {
                reject("user dose not exits");
            });
        });
    },
    editUserName(newName, currentUser) {
        return new Promise((resolve, reject) => {
            if (newName === currentUser.name) {
                resolve("nothing have been changed");
            }
            else {
                UserServices_1.default.editUserName(newName, currentUser.name).then((message) => {
                    resolve(message);
                }).catch((error) => {
                    reject(error);
                });
            }
        });
    },
    generatePost(data, userId) {
        return new Promise((resolve, reject) => {
            const post = {
                image: 'string',
                userId: userId,
                discription: data.discription,
                likesCount: 0,
                commentCount: 0,
                uploadDate: new Date(),
                likes: [""],
                comments: [],
            };
            UserServices_1.default.setPost(post).then((message) => {
                resolve(message);
            }).catch((error) => {
                reject(error);
            });
        });
    },
    makeFriend(user, UserId) {
        return new Promise((resolve, reject) => {
            UserServices_1.default.getUserById(UserId).then((newUser) => {
                UserServices_1.default.addFriend(user, newUser).then((message) => {
                    resolve(message);
                }).catch((error) => {
                    reject(error);
                });
            }).catch((error) => {
                reject(error);
            });
        });
    },
    likePost(user, postId) {
        return new Promise((resolve, reject) => {
            UserServices_1.default.findPost(postId).then((post) => {
                UserServices_1.default.likePost(post, user);
            });
            // 
        });
    },
    getAllPost(userId) {
        return new Promise((resolve, reject) => {
            UserServices_1.default.getPosts(userId).then((posts) => {
                resolve(posts);
            }).catch((error) => {
                reject(error);
            });
        });
    }
};
