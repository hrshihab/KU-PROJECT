import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { Request, RequestHandler, Response } from "express";
import { VCMessageService } from "./vc.service";




const createVCMessage = catchAsync(async (req: Request, res: Response) => {
    console.log(req.body)
    const result = await VCMessageService.createVCMessage(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'VC Message created successfully',
        data: result
    });
});

const getVCMessage = catchAsync(async (req: Request, res: Response) => {
    const result = await VCMessageService.getVCMessage();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'VC Message fetched successfully',
        data: result
    });
});

const updateVCMessage = catchAsync(async (req: Request, res: Response) => {
    const result = await VCMessageService.updateVCMessage(req.params.id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'VC Message updated successfully',
        data: result
    });
});


export const VCMessageController = {
    createVCMessage,
    getVCMessage,
    updateVCMessage
};
