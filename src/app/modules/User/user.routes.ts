import express, { NextFunction, Request, Response } from 'express';
import { userController } from './user.controller';
import auth from '../../middlewares/auth';
import { UserRole } from '@prisma/client';
import { fileUploader } from '../../../helpars/fileUploader';
import { userValidation } from './user.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.get(
    '/',
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
    userController.getAllFromDB
);

router.get(
    '/me',
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
    userController.getMyProfile
)

router.post(
    "/create-admin",
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
    validateRequest(userValidation.createAdmin),
    userController.createAdmin
    // fileUploader.upload.single('file'),
    // (req: Request, res: Response, next: NextFunction) => {
    //     req.body = userValidation.createAdmin.parse(JSON.parse(req.body.data))
    //     return userController.createAdmin(req, res, next)
    // }
);


router.patch(
    '/:id/status',
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
    validateRequest(userValidation.updateStatus),
    userController.changeProfileStatus
);

router.patch(
    "/update-my-profile",
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
    // fileUploader.upload.single('file'),
    // (req: Request, res: Response, next: NextFunction) => {
    //     req.body = JSON.parse(req.body.data)
    //     return userController.updateMyProfie(req, res, next)
    // }
    userController.updateMyProfie
);


export const userRoutes = router;