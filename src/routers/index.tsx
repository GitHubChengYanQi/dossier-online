const routeList = [

    {
        name: '企业功能',
        path: '/ENT_FUNC',
        component: './Home',
    },
    {
        name: '在线建册',
        path: '/ZXJC',
        redirect: "/ZXJC/quick",
    },
    {
        name: '快速建册',
        path: '/ZXJC/quick',
        component: './ZXJC/Bookbuilding',
    },
    {
        name: '收费',
        path: '/SF',
        component: './SF',
    },{
        name: '保健',
        path: '/BJ',
        component: './BJ',
    },
    {
        name: '主 页',
        path: '/home',
        component: './Home',
    },
    {
        name: '权限演示',
        path: '/access',
        component: './Access',
    },
    {
        name: ' CRUD 示例',
        path: '/table',
        component: './Table',
    },
    {
        name: '基本功能',
        path: '/BASE_SYSTEM',
        redirect: "/BASE_SYSTEM/system",
        routes: [
            {
                name:"业务设置",
                path:"/BASE_SYSTEM/Work",
                redirect: "/BASE_SYSTEM/Work/group/groupList",
                routes: [
                    {
                        name:"检查单管理",
                        path:"/BASE_SYSTEM/Work/medical",
                        component: "./Work/Medical/medical/medicalList"
                    },
                    {
                        name:"检查分组",
                        path:"/BASE_SYSTEM/Work/group/groupList",
                        component: "./Work/Medical/medicalGroup/medicalGroupList"
                    },
                    {
                        name:"检查项目",
                        path:"/BASE_SYSTEM/Work/item/list",
                        component: "./Work/Medical/medicalItem/medicalItemList"
                    },
                    {
                        name:"科目设置",
                        path:"/BASE_SYSTEM/Work/His/subject",
                        component: "./Work/His/hisSubject/hisSubjectList"
                    },{
                        name:"科目设置",
                        path:"/BASE_SYSTEM/Work/His/hisCost",
                        component: "./Work/His/hisConstConfig/hisConstConfigList"
                    }
                ]
            },
            {
                name: '系统设置',
                path: '/BASE_SYSTEM/system',
                redirect: "/BASE_SYSTEM/system/mgr",
                routes: [
                    {
                        name: '通讯录管理',
                        path: '/BASE_SYSTEM/system',
                        redirect: "/BASE_SYSTEM/system/mgr",
                        routes: [
                            {
                                name: '用户管理',
                                path: '/BASE_SYSTEM/system/mgr/:userId',
                                component: './BASE_SYSTEM/system/mgr/components/editForm',
                            },
                            {
                                name: '通讯录管理',
                                path: '/BASE_SYSTEM/system/mgr',
                                component: './BASE_SYSTEM/system/mgr',
                            },
                        ],
                    },
                    {
                        name: '角色管理',
                        path: '/BASE_SYSTEM/system/role',
                        component: './BASE_SYSTEM/system/role',
                    },
                    {
                        name: '部门管理',
                        path: '/BASE_SYSTEM/system/dept',
                        component: './BASE_SYSTEM/system/dept',
                    },
                    {
                        name: '职位管理',
                        path: '/BASE_SYSTEM/system/position',
                        component: './BASE_SYSTEM/system/position',
                    },
                    {
                        name: '字典管理',
                        path: '/BASE_SYSTEM/system/dictType',
                        component: './BASE_SYSTEM/system/dictType',
                    },
                    {
                        name: '菜单管理',
                        path: '/BASE_SYSTEM/system/menu',
                        component: './BASE_SYSTEM/system/menu',
                    },
                    {
                        name: '登录日志',
                        path: '/BASE_SYSTEM/system/loginLog',
                        component: './BASE_SYSTEM/system/loginLog',
                    },
                    {
                        name: '业务日志',
                        path: '/BASE_SYSTEM/system/log',
                        component: './BASE_SYSTEM/system/log',
                    },
                ]
            },
            {
                name: '代码生成',
                path: '/BASE_SYSTEM/dev_tools',
                redirect: "/BASE_SYSTEM/dev_tools/gen",
                routes: [
                    {
                        name: '代码生成',
                        path: '/BASE_SYSTEM/dev_tools/gen',
                        component: './BASE_SYSTEM/dev_tools/gen',
                    }
                ]
            },
        ]
    },
    {
        name: '用户登录',
        path: '/user/login',
        component: './User/Login',
        layout: false
    },
    {
        path: "/",
        layout: false,
        redirect: "/home",
    },
]
export default routeList;
