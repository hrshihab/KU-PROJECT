"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CareerRoutes = void 0;
const express_1 = __importDefault(require("express"));
const career_controller_1 = require("./career.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const career_validation_1 = require("./career.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.post('/create-career', (0, auth_1.default)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN), (0, validateRequest_1.default)(career_validation_1.CareerValidation.createCareer), career_controller_1.careerController.createCareer);
router.get('/', career_controller_1.careerController.getAllCareers);
router.get('/:id', career_controller_1.careerController.getCareerById);
router.patch('/:id', (0, auth_1.default)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN), (0, validateRequest_1.default)(career_validation_1.CareerValidation.updateCareer), career_controller_1.careerController.updateCareer);
router.delete('/:id', (0, auth_1.default)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN), career_controller_1.careerController.softDeleteCareer);
exports.CareerRoutes = router;
