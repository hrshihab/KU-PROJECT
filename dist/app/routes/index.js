"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = require("../modules/User/user.routes");
const admin_routes_1 = require("../modules/Admin/admin.routes");
const auth_routes_1 = require("../modules/Auth/auth.routes");
const meta_routes_1 = require("../modules/Meta/meta.routes");
const vc_route_1 = require("../modules/VC/vc.route");
const news_route_1 = require("../modules/News/news.route");
const career_routes_1 = require("../modules/Career/career.routes");
const noc_routes_1 = require("../modules/NOC/noc.routes");
const support_routes_1 = require("../modules/Support/support.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/user',
        route: user_routes_1.userRoutes
    },
    {
        path: '/admin',
        route: admin_routes_1.AdminRoutes
    },
    {
        path: '/auth',
        route: auth_routes_1.AuthRoutes
    },
    {
        path: '/meta',
        route: meta_routes_1.MetaRoutes
    },
    {
        path: '/vc-message',
        route: vc_route_1.VCMessageRoutes
    },
    {
        path: '/news',
        route: news_route_1.NewsRoutes
    },
    {
        path: '/career',
        route: career_routes_1.CareerRoutes
    },
    {
        path: '/noc',
        route: noc_routes_1.NOCRoutes
    },
    {
        path: '/support',
        route: support_routes_1.SupportRoutes
    }
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
