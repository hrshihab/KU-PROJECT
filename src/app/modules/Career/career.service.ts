import httpStatus from "http-status";
import prisma from "../../../shared/prisma";
import ApiError from "../../errors/ApiError";
import { IAuthUser } from "../../interfaces/common";
import { ICareer } from "./career.interface";

const createCareer = async (data: ICareer, user: IAuthUser): Promise<ICareer> => {
    //console.log("data", data);
    
    if (!user?.email) {
        throw new ApiError(httpStatus.BAD_REQUEST, "User email is required");
    }
    
    const result = await prisma.career.create({
        data: {
            ...data,
            createdBy: user.email
        }
    });
    return result;
};

const getAllCareers = async (): Promise<ICareer[]> => {
    const result = await prisma.career.findMany({
        where: {
            isDeleted: false
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
    return result;
};

const getCareerById = async (id: string): Promise<ICareer | null> => {
    const result = await prisma.career.findFirst({
        where: {
            id,
            isDeleted: false
        }
    });
    if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, "Career not found");
    }
    return result;
};

const updateCareer = async (id: string, payload: Partial<ICareer>): Promise<ICareer> => {
    const exists = await prisma.career.findFirst({
        where: {
            id,
            isDeleted: false
        }
    });
    
    if (!exists) {
        throw new ApiError(httpStatus.NOT_FOUND, "Career not found");
    }

    const result = await prisma.career.update({
        where: { id },
        data: payload
    });
    return result;
};

const softDeleteCareer = async (id: string): Promise<ICareer> => {
    const exists = await prisma.career.findFirst({
        where: {
            id,
            isDeleted: false
        }
    });
    
    if (!exists) {
        throw new ApiError(httpStatus.NOT_FOUND, "Career not found");
    }

    const result = await prisma.career.update({
        where: { id },
        data: { isDeleted: true }
    });
    return result;
};

export const careerService = {
    createCareer,
    getAllCareers,
    getCareerById,
    updateCareer,
    softDeleteCareer
}; 