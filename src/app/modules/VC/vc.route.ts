import { VCMessageController } from "./vc.controller";
import { VCMessageValidation } from "./vc.validation";
import { Request, RequestHandler, Response } from "express";
import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import validateRequest from "../../middlewares/validateRequest";

const router = express.Router();

router.post('/create-vc-message', auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),

 //validateRequest(VCMessageValidation.createVCMessageZodSchema),
  VCMessageController.createVCMessage);

router.get('/get-vc-message',
     auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
 VCMessageController.getVCMessage);

 router.put('/update-vc-message/:id',
 auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
 validateRequest(VCMessageValidation.updateVCMessageZodSchema),
 VCMessageController.updateVCMessage);

export const VCMessageRoutes = router;


