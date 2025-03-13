import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { Request, Response } from "express";
import { newsService } from "./news.service";
import { IAuthUser } from "../../interfaces/common";
import ApiError from "../../errors/ApiError";

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
    const result = await newsService.getAllNews();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "News retrieved successfully!",
        data: result
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
