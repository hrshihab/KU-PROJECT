import httpStatus from "http-status";
import prisma from "../../../shared/prisma";
import ApiError from "../../errors/ApiError";
import { IAuthUser } from "../../interfaces/common";
import { INews } from "./news.interface";

const createNews = async (data: INews, user: IAuthUser): Promise<INews> => {
    const result = await prisma.news.create({
        data: {
            ...data,
            createdBy: user?.email
        }
    });
    return result;
};

const getAllNews = async (): Promise<INews[]> => {
    const result = await prisma.news.findMany();
    return result;
};

const getNewsById = async (id: string): Promise<INews | null> => {
    const result = await prisma.news.findUnique({
        where: { id }
    });
    if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, "News not found");
    }
    return result;
};

const updateNews = async (id: string, payload: Partial<INews>): Promise<INews> => {
    const exists = await prisma.news.findUnique({
        where: { id }
    });
    
    if (!exists) {
        throw new ApiError(httpStatus.NOT_FOUND, "News not found");
    }

    const result = await prisma.news.update({
        where: { id },
        data: payload
    });
    return result;
};

const deleteNews = async (id: string): Promise<INews> => {
    const exists = await prisma.news.findUnique({
        where: { id }
    });
    
    if (!exists) {
        throw new ApiError(httpStatus.NOT_FOUND, "News not found");
    }

    const result = await prisma.news.delete({
        where: { id }
    });
    return result;
};

export const newsService = {
    createNews,
    getAllNews,
    getNewsById,
    updateNews,
    deleteNews
};


