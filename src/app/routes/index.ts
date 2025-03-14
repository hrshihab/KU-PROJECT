import express from 'express';
import { userRoutes } from '../modules/User/user.routes';
import { AdminRoutes } from '../modules/Admin/admin.routes';
import { AuthRoutes } from '../modules/Auth/auth.routes';
import { MetaRoutes } from '../modules/Meta/meta.routes';
import { VCMessageRoutes } from '../modules/VC/vc.route';
import { NewsRoutes } from '../modules/News/news.route';
import { CareerRoutes } from '../modules/Career/career.routes';
import { NOCRoutes } from '../modules/NOC/noc.routes';
import { SupportRoutes } from '../modules/Support/support.routes';
const router = express.Router();

const moduleRoutes = [
    {
        path: '/user',
        route: userRoutes
    },
    {
        path: '/admin',
        route: AdminRoutes
    },
    {
        path: '/auth',
        route: AuthRoutes
    },
    
    {
        path: '/meta',
        route: MetaRoutes
    },
    {
        path: '/vc-message',
        route: VCMessageRoutes
    },
    {
        path: '/news',
        route: NewsRoutes
    },
    {
        path: '/career',
        route: CareerRoutes
    },
    {
        path: '/noc',
        route: NOCRoutes
    },
    {
        path: '/support',
        route: SupportRoutes
    }
];

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;