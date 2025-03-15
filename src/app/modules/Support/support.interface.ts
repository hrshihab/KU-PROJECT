import { SupportStatus, SupportCategory } from "@prisma/client";

export type ISupport = {
    name: string;
    designation: string;
    instituteOffice: string;
    email: string;
    buildingName?: string | null;
    roomNumber?: string | null;
    mobileNumber?: string | null;
    problemDescription: string;
    attachmentUrl?: string | null;
    status: SupportStatus;
    category: SupportCategory;
    isDeleted?: boolean;
}; 