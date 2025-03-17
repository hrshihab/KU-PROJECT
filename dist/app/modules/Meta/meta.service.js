"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetaService = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const fetchDashboardMetaData = (user) => __awaiter(void 0, void 0, void 0, function* () {
    let metaData;
    switch (user === null || user === void 0 ? void 0 : user.role) {
        case client_1.UserRole.SUPER_ADMIN:
            metaData = yield getSuperAdminMetaData();
            break;
        case client_1.UserRole.ADMIN:
            metaData = yield getAdminMetaData();
            break;
        default:
            throw new Error('Invalid user role!');
    }
    return metaData;
});
const getSuperAdminMetaData = () => __awaiter(void 0, void 0, void 0, function* () {
    const newsCount = yield prisma_1.default.news.count();
    const supportCount = yield prisma_1.default.support.count({
        where: {
            isDeleted: false
        }
    });
    const careerCount = yield prisma_1.default.career.count({
        where: {
            isDeleted: false
        }
    });
    const adminCount = yield prisma_1.default.admin.count({
        where: {
            isDeleted: false
        }
    });
    const nocCount = yield prisma_1.default.nOC.count({
        where: {
            isDeleted: false
        }
    });
    // Support status distribution
    const supportStatusDistribution = yield prisma_1.default.support.groupBy({
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
    };
});
const getAdminMetaData = () => __awaiter(void 0, void 0, void 0, function* () {
    // Admin sees the same data as super admin for now
    return getSuperAdminMetaData();
});
const getBarChartData = () => __awaiter(void 0, void 0, void 0, function* () {
    const appointmentCountByMonth = yield prisma_1.default.$queryRaw `
        SELECT DATE_TRUNC('month', "createdAt") AS month,
        CAST(COUNT(*) AS INTEGER) AS count
        FROM "news"
        GROUP BY month
        ORDER BY month ASC
    `;
    return appointmentCountByMonth;
});
const getPieChartData = () => __awaiter(void 0, void 0, void 0, function* () {
    const appointmentStatusDistribution = yield prisma_1.default.support.groupBy({
        by: ['status'],
        _count: { id: true }
    });
    const formattedAppointmentStatusDistribution = appointmentStatusDistribution.map(({ status, _count }) => ({
        status,
        count: Number(_count.id)
    }));
    return formattedAppointmentStatusDistribution;
});
exports.MetaService = {
    fetchDashboardMetaData
};
