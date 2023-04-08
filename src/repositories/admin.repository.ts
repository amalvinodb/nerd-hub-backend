import adminService from "../services/admin.service";

export default{
    confirmAdmin(data:any){
        return new Promise((resolve,reject)=>{
            console.log(data.user);
            adminService.getAdmin(data.user).then((data)=>{
                resolve(data)
            }).catch((err)=>{
                reject(err)
            })
        })
    }
}