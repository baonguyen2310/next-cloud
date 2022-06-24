import nextConnect from 'next-connect';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

//Storage to local server
// const uploadFile = multer({
//     storage: multer.diskStorage({
//         destination: './public/images',
//         filename: (req, file, cb) => cb(null, file.originalname)
//     })
// })

//Storage to cloud 
const uploadFile = multer({
    storage: multer.memoryStorage()
})

const apiRoute = nextConnect();

const uploadMiddleware = uploadFile.single('imageData');

apiRoute.use(uploadMiddleware);

apiRoute.post((req, res) => {
    let streamUpload = (req) => {
        return new Promise((resolve, reject) => {
            let stream = cloudinary.uploader.upload_stream(
                (error, result) => {
                    if (result) {
                        resolve(result)
                    } else {
                        reject(error)
                    }
                }
            )
            streamifier.createReadStream(req.file.buffer).pipe(stream)
        })
    }

    streamUpload(req)
        .then((result) => {
            res.json({url: result.url})
        })

    // async function upload(req) {
    //    let result = await streamUpload(req)
    //     console.log(result);
    //     res.json({url: result.url});
    // }

    // upload(req); 
})

export default apiRoute;

export const config = {
    api: {
        bodyParser: false
    }
}