import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { Request, Response } from "express";
import { supportService } from "./support.service";

const createSupport = catchAsync(async (req: Request, res: Response) => {
    const result = await supportService.createSupport(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Support request created successfully!",
        data: result
    });
});

const getAllSupports = catchAsync(async (req: Request, res: Response) => {
    const result = await supportService.getAllSupports();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Support requests retrieved successfully!",
        data: result
    });
});

const getSupportById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await supportService.getSupportById(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Support request retrieved successfully!",
        data: result
    });
});

const updateSupport = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await supportService.updateSupport(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Support request updated successfully!",
        data: result
    });
});

const softDeleteSupport = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await supportService.softDeleteSupport(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Support request deleted successfully!",
        data: result
    });
});

export const supportController = {
    createSupport,
    getAllSupports,
    getSupportById,
    updateSupport,
    softDeleteSupport
}; 