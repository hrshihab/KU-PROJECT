import express from 'express';
import { nocController } from './noc.controller';
import validateRequest from '../../middlewares/validateRequest';
import { NOCValidation } from './noc.validation';
import auth from '../../middlewares/auth';
import { UserRole } from '@prisma/client';

const router = express.Router();

router.post(
    '/create-noc',
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
    validateRequest(NOCValidation.createNOC),
    nocController.createNOC
);

router.get('/', nocController.getAllNOCs);
router.get('/:id', nocController.getNOCById);

router.patch(
    '/:id',
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
    validateRequest(NOCValidation.updateNOC),
    nocController.updateNOC
);

router.delete(
    '/:id',
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
    nocController.softDeleteNOC
);

export const NOCRoutes = router; 