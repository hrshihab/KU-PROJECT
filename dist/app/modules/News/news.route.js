"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsRoutes = void 0;
const client_1 = require("@prisma/client");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const express_1 = __importDefault(require("express"));
const news_controller_1 = require("./news.controller");
const news_validation_1 = require("./news.validation");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const router = express_1.default.Router();
router.post('/create-news', (0, auth_1.default)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN), (0, validateRequest_1.default)(news_validation_1.NewsValidation.createNews), news_controller_1.newsController.createNews);
router.get('/all-news', news_controller_1.newsController.getAllNews);
router.get('/:id', news_controller_1.newsController.getNewsById);
router.patch('/:id', (0, auth_1.default)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN), (0, validateRequest_1.default)(news_validation_1.NewsValidation.updateNewsZodSchema), news_controller_1.newsController.updateNews);
router.delete('/:id', (0, auth_1.default)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN), news_controller_1.newsController.deleteNews);
exports.NewsRoutes = router;
