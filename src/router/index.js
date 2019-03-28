import Vue from "vue";
import VueRouter from "vue-router";

if (process.env.NODE_ENV === "development") {
    Vue.use(VueRouter);
}

import { ROUTER_MODE } from "../config/app";

import Home from "../views/home/index.vue";

// 管理组相关
import adminRouter from "../views/userManage/admin/router.vue";
import authAdmin from "../views/userManage/admin/authAdmin.vue";
import authRole from "../views/userManage/admin/authRole.vue";
import authPermissionRule from "../views/userManage/admin/authPermissionRule.vue";

// 上传相关
import tinymce from "../views/components/tinymce-demo.vue";
import upload from "../views/components/upload-demo.vue";

// 广告管理
import adSite from "../views/adManage/adSite.vue";
import ad from "../views/adManage/ad.vue";

// Vue.use(VueRouter);

const err401 = r =>
require.ensure([], () => r(require("../views/error/err401.vue")), "home");
const err404 = r =>
require.ensure([], () => r(require("../views/error/err404.vue")), "home");
const login = r =>
require.ensure([], () => r(require("../views/login/index.vue")), "home");
const main = r =>
require.ensure([], () => r(require("../views/home/main.vue")), "home");

// 注意 权限字段 authRule （严格区分大小写）
export const constantRouterMap = [
{
    path: "*",
    component: err404,
    hidden: true
},
{
    path: "/401",
    component: err401,
    name: "401",
    hidden: true
},
{
    path: "/404",
    component: err404,
    name: "404",
    hidden: true
},
{
    path: "/500",
    component: err404,
    name: "500",
    hidden: true
},
{
    path: "/login",
    component: login,
    name: "登录",
    hidden: true
},
{
    path: "/",
    component: Home,
    redirect: "/readme",
    name: "首页",
    hidden: true
},
{
    path: "/readme",
    component: Home,
    redirect: "/readme/main",
    icon: "shouye",
    name: "控制台",
    noDropdown: true,
    children: [
    {
        path: "main",
        component: main
    }
    ]
},
{
    path: "/components",
    redirect: "/components/uploadList",
    component: Home,
    name: "components",
    icon: "tongyong",
    children: [
    {
        path: "uploadList",
        name: "上传图片的展示",
        component: r =>
        require.ensure(
            [],
            () => r(require("../views/components/uploadList.vue")),
            "home"
            )
    },
    {
        path: "tinymce",
        name: "tinymce富文本编辑器",
        component: tinymce
    },
    {
        path: "upload",
        name: "上传的demo",
        component: upload
    }
    ]
}
];


export const asyncRouterMap = [
{
    path: "*",
    component: err404,
    hidden: true
},
{
    path: "/401",
    component: err401,
    name: "401",
    hidden: true
},
{
    path: "/404",
    component: err404,
    name: "404",
    hidden: true
},
{
    path: "/500",
    component: err404,
    name: "500",
    hidden: true
},
{
    path: "/login",
    component: login,
    name: "登录",
    hidden: true
},
{
    path: "/",
    component: Home,
    redirect: "/home",
    name: "首页",
    hidden: true
},
{
    path: "/home",
    component: Home,
    redirect: "/home/main",
    icon: "shouye",
    name: "ANIS",
    noDropdown: true,
    children: [
    {
        path: "main",
        component: main
    }
    ]
},
{
        path: "/views/adManage/ad",
        component: r =>
        require.ensure(
            [],
            () => r(require("../views/adManage/ad.vue")),
            "home"
            ),
        name: "首页",
        hidden: true
    },
{
    path:'/views',
    redirect:'/views/anis/index',
    name:'Anis任务',
    icon:'tongyong',
    component:Home,
    noDropdown: true,
    children: [
    {
        path: "index",
        component: r =>
        require.ensure(
            [],
            () => r(require("../views/anis/index.vue")),
            "home"
            )
    },
    {
        path:'/common/',
        name:'评论',
        // redirect:'/views/anis/common/:id',
        component: r =>
        require.ensure(
            [],
            () => r(require("../views/anis/common.vue")),
            "home"
            ),
    },
    ],
},
 {
        path:'/views/anis',
        redirect:'/views/anis/log',
        name:'日志',
        icon:'guanggao',
        component:Home,
        noDropdown: true,
        children: [
            {
                path: "log",
                component: r =>
                    require.ensure(
                        [],
                        () => r(require("../views/anis/log.vue")),
                        "home"
                    )
            },
        ]
    },
    {
        path:'/views/anis',
        redirect:'/views/anis/source',
        name:'来源',
        icon:'guanliyuan',
        component:Home,
        noDropdown: true,
        children: [
            {
                path: "source",
                component: r =>
                    require.ensure(
                        [],
                        () => r(require("../views/anis/source.vue")),
                        "home"
                    )
            },
        ]
    },
    {
        path:'/views/anis',
        redirect:'/views/anis/progress',
        name:'每日统计',
        icon:'shijiebei',
        component:Home,
        noDropdown: true,
        children: [
            {
                path: "progress",
                component: r =>
                    require.ensure(
                        [],
                        () => r(require("../views/anis/progress.vue")),
                        "home"
                    )
            },
        ]
    },
    {
        path:'/views/config',
        redirect:'/views/config/config',
        name:'系统配置',
        icon:'jiaose',
        component:Home,
        noDropdown: true,
        children: [
            {
                path: "config",
                component: r =>
                    require.ensure(
                        [],
                        () => r(require("../views/config/config.vue")),
                        "home"
                    )
            },
        ]
    },
    {
        path:'/views/config',
        redirect:'/views/config/notice',
        name:'消息通知',
        icon:'cloud-permissions',
        component:Home,
        noDropdown: true,
        children: [
            {
                path: "notice",
                component:  r =>
                    require.ensure(
                        [],
                        () => r(require("../views/config/notice.vue")),
                        "home"
                        )
            },
        ]
    }
];
export default new VueRouter({
    // mode: 'history', //后端支持可开
    mode: ROUTER_MODE,
    routes: asyncRouterMap,
    strict: process.env.NODE_ENV !== "production"
});
