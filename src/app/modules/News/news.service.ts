import httpStatus from "http-status";
import prisma from "../../../shared/prisma";
import ApiError from "../../errors/ApiError";
import { IAuthUser } from "../../interfaces/common";
import { INews } from "./news.interface";
import { newsSearchableFields } from "./news.constant";
import { paginationHelper } from "../../../helpars/paginationHelper";
import {  IPaginationOptions } from "../../interfaces/pagination";
import { Prisma } from "@prisma/client";
import { INewsFilterRequest } from "./news.interface";

const createNews = async (data: INews, user: IAuthUser): Promise<INews> => {
    if (!user?.email) {
        throw new ApiError(httpStatus.BAD_REQUEST, "User email is required");
    }
    const result = await prisma.news.create({
        data: {
            ...data,
            createdBy: user.email
        }
    });
    return result;
};

const getAllNews = async (filters: INewsFilterRequest, options: IPaginationOptions) => {
    const { page, limit, skip } = paginationHelper.calculatePagination(options);
    const { searchTerm, ...filterData } = filters;

    const andConditions: Prisma.NewsWhereInput[] = [];

    if (searchTerm) {
        andConditions.push({
            OR: newsSearchableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive'
                }
            }))
        });
    }

    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map(key => ({
                [key]: {
                    equals: (filterData as any)[key]
                }
            }))
        });
    }

    const whereConditions: Prisma.NewsWhereInput = { AND: andConditions };

    const result = await prisma.news.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder ? {
            [options.sortBy]: options.sortOrder
        } : {
            createdAt: 'desc'
        }
    });

    const total = await prisma.news.count({
        where: whereConditions
    });

    return {
        meta: {
            page,
            limit,
            total
        },
        data: result
    };
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
    console.log("payload", payload);
    const exists = await prisma.news.findUnique({
        where: { id }
    });
    
    if (!exists) {
        throw new ApiError(httpStatus.NOT_FOUND, "News not found");
    }

    console.log("exists", exists);

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


