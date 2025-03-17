"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const user_validation_1 = require("./user.validation");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const router = express_1.default.Router();
router.get('/', (0, auth_1.default)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN), user_controller_1.userController.getAllFromDB);
router.get('/me', (0, auth_1.default)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN), user_controller_1.userController.getMyProfile);
router.post("/create-admin", (0, auth_1.default)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN), (0, validateRequest_1.default)(user_validation_1.userValidation.createAdmin), user_controller_1.userController.createAdmin
// fileUploader.upload.single('file'),
// (req: Request, res: Response, next: NextFunction) => {
//     req.body = userValidation.createAdmin.parse(JSON.parse(req.body.data))
//     return userController.createAdmin(req, res, next)
// }
);
router.patch('/:id/status', (0, auth_1.default)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN), (0, validateRequest_1.default)(user_validation_1.userValidation.updateStatus), user_controller_1.userController.changeProfileStatus);
router.patch("/update-my-profile", (0, auth_1.default)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN), 
// fileUploader.upload.single('file'),
// (req: Request, res: Response, next: NextFunction) => {
//     req.body = JSON.parse(req.body.data)
//     return userController.updateMyProfie(req, res, next)
// }
user_controller_1.userController.updateMyProfie);
exports.userRoutes = router;
