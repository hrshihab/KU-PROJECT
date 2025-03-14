import httpStatus from "http-status";
import prisma from "../../../shared/prisma";
import ApiError from "../../errors/ApiError";
import { IAuthUser } from "../../interfaces/common";
import { INOC } from "./noc.interface";

const createNOC = async (data: INOC, user: IAuthUser): Promise<INOC> => {
    const result = await prisma.nOC.create({
        data: {
            ...data,
            createdBy: user?.email
        }
    });
    return result;
};

const getAllNOCs = async (): Promise<INOC[]> => {
    const result = await prisma.nOC.findMany({
        where: {
            isDeleted: false
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
    return result;
};

const getNOCById = async (id: string): Promise<INOC | null> => {
    const result = await prisma.nOC.findFirst({
        where: {
            id,
            isDeleted: false
        }
    });
    if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, "NOC not found");
    }
    return result;
};

const updateNOC = async (id: string, payload: Partial<INOC>): Promise<INOC> => {
    const exists = await prisma.nOC.findFirst({
        where: {
            id,
            isDeleted: false
        }
    });
    
    if (!exists) {
        throw new ApiError(httpStatus.NOT_FOUND, "NOC not found");
    }

    const result = await prisma.nOC.update({
        where: { id },
        data: payload
    });
    return result;
};

const softDeleteNOC = async (id: string): Promise<INOC> => {
    const exists = await prisma.nOC.findFirst({
        where: {
            id,
            isDeleted: false
        }
    });
    
    if (!exists) {
        throw new ApiError(httpStatus.NOT_FOUND, "NOC not found");
    }

    const result = await prisma.nOC.update({
        where: { id },
        data: { isDeleted: true }
    });
    return result;
};

export const nocService = {
    createNOC,
    getAllNOCs,
    getNOCById,
    updateNOC,
    softDeleteNOC
}; 