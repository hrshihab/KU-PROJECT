import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { Request, Response } from "express";
import { nocService } from "./noc.service";
import { IAuthUser } from "../../interfaces/common";
import ApiError from "../../errors/ApiError";

const createNOC = catchAsync(async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;
    if (!user) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'User not found');
    }
    const result = await nocService.createNOC(req.body, user);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "NOC created successfully!",
        data: result
    });
});

const getAllNOCs = catchAsync(async (req: Request, res: Response) => {
    const result = await nocService.getAllNOCs();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "NOCs retrieved successfully!",
        data: result
    });
});

const getNOCById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await nocService.getNOCById(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "NOC retrieved successfully!",
        data: result
    });
});

const updateNOC = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await nocService.updateNOC(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "NOC updated successfully!",
        data: result
    });
});

const softDeleteNOC = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await nocService.softDeleteNOC(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "NOC deleted successfully!",
        data: result
    });
});

export const nocController = {
    createNOC,
    getAllNOCs,
    getNOCById,
    updateNOC,
    softDeleteNOC
}; 