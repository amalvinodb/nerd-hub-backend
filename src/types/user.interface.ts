export interface IUser {
	_id:string | undefined;
	name: string | undefined;
	email: string | undefined;
	birth: Date | undefined;
	phoneno: string | undefined;
	signup: Date | undefined;
	status: boolean | undefined;
	password: string | undefined;
	image: string | undefined;
	postsCount: number | undefined;
	followingCount: number | undefined;
	followersCount: number | undefined;
	following: [string];
	followers:[string];
}
export interface body {
	name: string;
	password: string;
}
export interface FUser {
	name: string;
	password: string;
	email: string;
	birth: string;
	phone: string;
}
export interface headers {
	authentication: string;
	"user-agent": string;
	accept: string;
	"postman-tocken": string;
	host: string;
	"accept-encoding": string;
	connection: string;
}
export interface Posts {
	_id?:string;
	image: string;
	userId: string;
	discription: string;
	likes_count: number;
	commentCount: number;
	uploadDate:Date;
	likes: [string] ;
	comments: [
		{
			comment: string;
			userId: string;
			date:Date;
		}
	]|[];
}
export interface postBody{
	image:FormData;
	discription:string;
}
// export default IUser;
