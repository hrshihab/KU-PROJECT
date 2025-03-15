import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { Request, Response } from "express";
import { careerService } from "./career.service";
import { IAuthUser } from "../../interfaces/common";
import ApiError from "../../errors/ApiError";

const createCareer = catchAsync(async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;
    //console.log('create');
    if (!user) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'User not found');
    }
    const result = await careerService.createCareer(req.body, user);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Career created successfully!",
        data: result
    });
});

const getAllCareers = catchAsync(async (req: Request, res: Response) => {
    const result = await careerService.getAllCareers();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Careers retrieved successfully!",
        data: result
    });
});

const getCareerById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await careerService.getCareerById(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Career retrieved successfully!",
        data: result
    });
});

const updateCareer = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await careerService.updateCareer(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Career updated successfully!",
        data: result
    });
});

const softDeleteCareer = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await careerService.softDeleteCareer(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Career deleted successfully!",
        data: result
    });
});

export const careerController = {
    createCareer,
    getAllCareers,
    getCareerById,
    updateCareer,
    softDeleteCareer
}; 