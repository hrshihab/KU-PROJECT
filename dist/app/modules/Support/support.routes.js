"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupportRoutes = void 0;
const express_1 = __importDefault(require("express"));
const support_controller_1 = require("./support.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const support_validation_1 = require("./support.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.post('/create-support', (0, validateRequest_1.default)(support_validation_1.SupportValidation.createSupport), support_controller_1.supportController.createSupport);
router.get('/', support_controller_1.supportController.getAllSupports);
router.get('/:id', support_controller_1.supportController.getSupportById);
router.patch('/:id', (0, auth_1.default)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN), (0, validateRequest_1.default)(support_validation_1.SupportValidation.updateSupport), support_controller_1.supportController.updateSupport);
router.delete('/:id', (0, auth_1.default)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN), support_controller_1.supportController.softDeleteSupport);
exports.SupportRoutes = router;
