import express from 'express';
import { supportController } from './support.controller';
import validateRequest from '../../middlewares/validateRequest';
import { SupportValidation } from './support.validation';
import auth from '../../middlewares/auth';
import { UserRole } from '@prisma/client';

const router = express.Router();

router.post(
    '/create-support',
    validateRequest(SupportValidation.createSupport),
    supportController.createSupport
);

router.get('/', supportController.getAllSupports);
router.get('/:id', supportController.getSupportById);

router.patch(
    '/:id',
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
    validateRequest(SupportValidation.updateSupport),
    supportController.updateSupport
);

router.delete(
    '/:id',
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
    supportController.softDeleteSupport
);

export const SupportRoutes = router; 