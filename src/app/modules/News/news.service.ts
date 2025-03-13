// import prisma from "../../../shared/prisma";
// import { News } from "@prisma/client";
// import { IFile } from "../../interfaces/file";
// import { fileUploader } from "../../../helpars/fileUploader";
// import { INews } from "./news.interface";

// const createNews = async (req: Request): Promise<News> => {
    
//     const file = req.file as IFile;

//     if (file) {
//         const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
//         req.body.image = uploadToCloudinary?.secure_url
//     }

//         const newsData: INews = {
//         title: data.title,
//         description: data.description,
//         image: data.image
//     }

//     const result = await prisma.news.create({
//         data: newsData
//     })
//     return result;
// }

// export const newsService = {
//     createNews
// }


