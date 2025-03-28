import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { Request, Response } from "express";
import { newsService } from "./news.service";
import { IAuthUser } from "../../interfaces/common";
import ApiError from "../../errors/ApiError";
import { newsFilterableFields } from "./news.constant";
import pick from "../../../shared/pick";
const createNews = catchAsync(async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;
    if (!user) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'User not found');
    }
    const result = await newsService.createNews(req.body, user);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "News Created successfuly!",
        data: result
    })
});

const getAllNews = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, newsFilterableFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])
    //console.log(options) 
    const result = await newsService.getAllNews(filters, options);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "News retrieved successfully!",
        meta: result.meta,
        data: result.data
    });
});

const getNewsById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await newsService.getNewsById(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "News retrieved successfully!",
        data: result
    });
});

const updateNews = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await newsService.updateNews(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "News updated successfully!",
        data: result
    });
});

const deleteNews = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await newsService.deleteNews(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "News deleted successfully!",
        data: result
    });
});

export const newsController = {
    createNews,
    getAllNews,
    getNewsById,
    updateNews,
    deleteNews
};
