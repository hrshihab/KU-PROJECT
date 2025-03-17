"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NOCRoutes = void 0;
const express_1 = __importDefault(require("express"));
const noc_controller_1 = require("./noc.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const noc_validation_1 = require("./noc.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.post('/create-noc', (0, auth_1.default)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN), (0, validateRequest_1.default)(noc_validation_1.NOCValidation.createNOC), noc_controller_1.nocController.createNOC);
router.get('/', noc_controller_1.nocController.getAllNOCs);
router.get('/:id', noc_controller_1.nocController.getNOCById);
router.patch('/:id', (0, auth_1.default)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN), (0, validateRequest_1.default)(noc_validation_1.NOCValidation.updateNOC), noc_controller_1.nocController.updateNOC);
router.delete('/:id', (0, auth_1.default)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN), noc_controller_1.nocController.softDeleteNOC);
exports.NOCRoutes = router;
