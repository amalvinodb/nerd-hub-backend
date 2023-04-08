import User from "../model/userModel";
import Post from "../model/postMode";
import Admin from '../model/adminModel'
import { IUser, Posts } from "../types/user.interface";
import { rejects } from "assert";
import { ObjectId } from "mongodb";

export default{
    getAdmin(admin:string){
        return new Promise((resolve,reject)=>{
          Admin.findOne({name:admin}).then((data)=>{
            if(data){
              resolve(data)
            }else{
              reject("could not find admin")
            }
          }).catch((err)=>{
            reject(err)
          })
        })
    }
}