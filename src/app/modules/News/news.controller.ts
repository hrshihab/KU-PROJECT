// import httpStatus from "http-status";
// import catchAsync from "../../../shared/catchAsync";
// import sendResponse from "../../../shared/sendResponse";
// import { Request, Response } from "express";
// import { newsService } from "./news.service";


// const createNews = catchAsync(async (req: Request, res: Response) => {
//     const result = await newsService.createNews(req);
//     sendResponse(res, {
//         statusCode: httpStatus.OK,
//         success: true,
//         message: "News Created successfuly!",
//         data: result
//     })
// });

// export const newsController = {
//     createNews
// }
