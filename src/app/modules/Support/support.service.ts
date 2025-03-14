import httpStatus from "http-status";
import prisma from "../../../shared/prisma";
import ApiError from "../../errors/ApiError";
import { ISupport } from "./support.interface";

const createSupport = async (data: ISupport): Promise<ISupport> => {
    const result = await prisma.support.create({
        data: {
            ...data,
            status: "PENDING"
        }
    });
    return result;
};

const getAllSupports = async (): Promise<ISupport[]> => {
    const result = await prisma.support.findMany({
        where: {
            isDeleted: false
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
    return result;
};

const getSupportById = async (id: string): Promise<ISupport | null> => {
    const result = await prisma.support.findFirst({
        where: {
            id,
            isDeleted: false
        }
    });
    if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, "Support request not found");
    }
    return result;
};

const updateSupport = async (id: string, payload: Partial<ISupport>): Promise<ISupport> => {
    const exists = await prisma.support.findFirst({
        where: {
            id,
            isDeleted: false
        }
    });
    
    if (!exists) {
        throw new ApiError(httpStatus.NOT_FOUND, "Support request not found");
    }

    const result = await prisma.support.update({
        where: { id },
        data: payload
    });
    return result;
};

const softDeleteSupport = async (id: string): Promise<ISupport> => {
    const exists = await prisma.support.findFirst({
        where: {
            id,
            isDeleted: false
        }
    });
    
    if (!exists) {
        throw new ApiError(httpStatus.NOT_FOUND, "Support request not found");
    }

    const result = await prisma.support.update({
        where: { id },
        data: { isDeleted: true }
    });
    return result;
};

export const supportService = {
    createSupport,
    getAllSupports,
    getSupportById,
    updateSupport,
    softDeleteSupport
}; 