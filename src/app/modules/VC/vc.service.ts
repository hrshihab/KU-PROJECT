import { IFile } from "../../interfaces/file";
import prisma from "../../../shared/prisma";


const createVCMessage = async (data: {message: string, imageUrl: string}) => {
    // Ensure the message is provided in the request body
    if (!data.message || !data.imageUrl) {
        throw new Error("Message and imageUrl content is required");

    }


    // Create the VC Message in the database
    const result = await prisma.vCMessage.create({
        data: {
            message: data.message,
            imageUrl: data.imageUrl, // Image URL from Cloudinary (if available)
        },
    });

    return result; // Return the created VC Message
};

const getVCMessage = async () => {
    const result = await prisma.vCMessage.findMany();
    return result;
};

const updateVCMessage = async (id: string, data: {message: string, imageUrl: string}) => {
    const result = await prisma.vCMessage.update({
        where: { id },
        data: data
    });
    return result;
};
export const VCMessageService = {
    createVCMessage,
    getVCMessage,
    updateVCMessage
};
