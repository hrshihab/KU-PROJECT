import express from 'express';
import { careerController } from './career.controller';
import validateRequest from '../../middlewares/validateRequest';
import { CareerValidation } from './career.validation';
import auth from '../../middlewares/auth';
import { UserRole } from '@prisma/client';

const router = express.Router();

router.post(
    '/create-career',
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
    validateRequest(CareerValidation.createCareer),
    careerController.createCareer
);

router.get('/', careerController.getAllCareers);
router.get('/:id', careerController.getCareerById);

router.patch(
    '/:id',
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
    validateRequest(CareerValidation.updateCareer),
    careerController.updateCareer
);

router.delete(
    '/:id',
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
    careerController.softDeleteCareer
);

export const CareerRoutes = router; 