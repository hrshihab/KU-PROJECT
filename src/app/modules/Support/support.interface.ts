import { SupportStatus, SupportCategory } from "@prisma/client";

export type ISupport = {
    name: string;
    designation: string;
    instituteOffice: string;
    email: string;
    buildingName?: string;
    roomNumber?: string;
    mobileNumber?: string;
    problemDescription: string;
    attachmentUrl?: string;
    status: SupportStatus;
    category: SupportCategory;
    isDeleted?: boolean;
}; 