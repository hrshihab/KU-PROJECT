import { NOCType } from "@prisma/client";

export type INOC = {
    title: string;
    type: NOCType;
    publishedDate: Date;
    documentsUrl: string;
    createdBy: string;
    isDeleted?: boolean;
}; 