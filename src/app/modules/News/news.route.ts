import { UserRole } from "@prisma/client";
import auth from "../../middlewares/auth";
import express from "express";
import { newsController } from "./news.controller";
import { NewsValidation } from "./news.validation";
import validateRequest from "../../middlewares/validateRequest";
const router = express.Router();

router.post('/create-news',
     auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
     validateRequest(NewsValidation.createNews),
      newsController.createNews);

router.get('/all-news',
     newsController.getAllNews);

router.get('/:id',
     newsController.getNewsById);

router.patch(
        '/:id',
        auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
        validateRequest(NewsValidation.updateNewsZodSchema),
        newsController.updateNews
    );
    
router.delete(
        '/:id',
        auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
        newsController.deleteNews
    );


export const NewsRoutes = router;


