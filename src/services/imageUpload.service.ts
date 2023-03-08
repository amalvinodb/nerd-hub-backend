import { rejects } from "assert";
import cloudinary from "cloudinary";

cloudinary.v2.config({
	cloud_name: "dzmqstses",
	api_key: "496591628439112",
	api_secret: "UErHHUocO5UkUIJMQZNXaUZm-IU",
});

export default {
	uploadImage(image: Express.Multer.File | undefined) {
		// eslint-disable-next-line no-async-promise-executor
		return new Promise(async (resolve, reject) => {
			try {
				const path = image?.path;
				if (path) {
					const result = await new Promise((resolve, reject) => {
						cloudinary.v2.uploader.upload(path, (err: any, res: { status: (arg0: number) => { (): any; new (): any; send: { (arg0: string): any; new (): any } }; secure_url: unknown }) => {
							if (err) return res.status(500).send("uploaded image error");
							resolve(res.secure_url);
						});
					});
					if (result) {
						resolve(result);
					} else {
						reject("could not add the image");
					}
				} else {
					reject("the image is missing");
				}
			} catch (err) {
				reject(err);
			}
		});
	},
};
