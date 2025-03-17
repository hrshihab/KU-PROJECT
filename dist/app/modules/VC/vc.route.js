"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VCMessageRoutes = void 0;
const vc_controller_1 = require("./vc.controller");
const vc_validation_1 = require("./vc.validation");
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const router = express_1.default.Router();
router.post('/create-vc-message', (0, auth_1.default)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN), 
//validateRequest(VCMessageValidation.createVCMessageZodSchema),
vc_controller_1.VCMessageController.createVCMessage);
router.get('/get-vc-message', (0, auth_1.default)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN), vc_controller_1.VCMessageController.getVCMessage);
router.put('/update-vc-message/:id', (0, auth_1.default)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN), (0, validateRequest_1.default)(vc_validation_1.VCMessageValidation.updateVCMessageZodSchema), vc_controller_1.VCMessageController.updateVCMessage);
exports.VCMessageRoutes = router;
