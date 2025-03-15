import { UserRole } from "@prisma/client";
import { IAuthUser } from "../../interfaces/common";
import ApiError from "../../errors/ApiError";
import prisma from "../../../shared/prisma";

const fetchDashboardMetaData = async (user: IAuthUser) => {
    let metaData;
    switch (user?.role) {
        case UserRole.SUPER_ADMIN:
            metaData = await getSuperAdminMetaData();
            break;
        case UserRole.ADMIN:
            metaData = await getAdminMetaData();
            break;
        default:
            throw new Error('Invalid user role!')
    }

    return metaData;
};

const getSuperAdminMetaData = async () => {
    const newsCount = await prisma.news.count();
    const supportCount = await prisma.support.count({
        where: {
            isDeleted: false
        }
    });
    const careerCount = await prisma.career.count({
        where: {
            isDeleted: false
        }
    });
    const adminCount = await prisma.admin.count({
        where: {
            isDeleted: false
        }
    });
    const nocCount = await prisma.nOC.count({
        where: {
            isDeleted: false
        }
    });

    // Support status distribution
    const supportStatusDistribution = await prisma.support.groupBy({
        by: ['status'],
        _count: { id: true },
        where: {
            isDeleted: false
        }
    });

    const formattedSupportStatusDistribution = supportStatusDistribution.map(({ status, _count }) => ({
        status,
        count: Number(_count.id)
    }));

    return { 
        newsCount, 
        supportCount, 
        careerCount, 
        adminCount, 
        nocCount,
        supportStatusDistribution: formattedSupportStatusDistribution
    }
}

const getAdminMetaData = async () => {
    // Admin sees the same data as super admin for now
    return getSuperAdminMetaData();
}



const getBarChartData = async () => {
    const appointmentCountByMonth: { month: Date, count: bigint }[] = await prisma.$queryRaw`
        SELECT DATE_TRUNC('month', "createdAt") AS month,
        CAST(COUNT(*) AS INTEGER) AS count
        FROM "news"
        GROUP BY month
        ORDER BY month ASC
    `

    return appointmentCountByMonth;
};

const getPieChartData = async () => {
    const appointmentStatusDistribution = await prisma.support.groupBy({
        by: ['status'],
        _count: { id: true }
    });

    const formattedAppointmentStatusDistribution = appointmentStatusDistribution.map(({ status, _count }) => ({
        status,
        count: Number(_count.id)
    }));

    return formattedAppointmentStatusDistribution;
}

export const MetaService = {
    fetchDashboardMetaData
}