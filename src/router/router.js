/* eslint-disable */

import Main from '@/views/Main.vue';
// test作为测试页面接口，不部署到生产阶段，路径test也只适用于开发阶段
// import Test from '@/views/test/App.vue'
// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        // title: 'Login - 登录'
    },
    component: resolve => {
        require(['@/views/login.vue'], resolve);
    }
};

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        // title: '404-页面不存在'
    },
    component: resolve => {
        require(['@/views/error-page/404.vue'], resolve);
    }
};

export const page403 = {
    path: '/403',
    meta: {
        // title: '403-权限不足'
    },
    name: 'error-403',
    component: resolve => {
        require(['@/views/error-page/403.vue'], resolve);
    }
};

export const page500 = {
    path: '/500',
    meta: {
        // title: '500-服务端错误'
    },
    name: 'error-500',
    component: resolve => {
        require(['@/views/error-page/500.vue'], resolve);
    }
};

export const preview = {
    path: '/preview',
    name: 'preview',
    component: resolve => {
        require(['@/views/form/article-publish/preview.vue'], resolve);
    }
};

export const locking = {
    path: '/locking',
    name: 'locking',
    component: resolve => {
        require(['@/views/main-components/lockscreen/components/locking-page.vue'], resolve);
    }
};

export const previewFile = {
    path: '/previewFile/:id',
    name: 'previewFile',
    component: resolve => {
        // require(['@/views/test/components/main.vue'], resolve);
        require(['@/views/woa-components/file-preview/index.vue'], resolve);
    }
}

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [
        {
            path: 'home', title: {i18n: 'home'}, name: 'home_index', component: resolve => {
            require(['@/views/home/home.vue'], resolve);
        }
        },
        {
            path: 'cannelIndex', title: '渠道首页', name: 'cannelIndex_index', component: resolve => {
                require(['@/views/home/cannel_index/cannelIndex.vue'], resolve);
            }
        },
        {
            path: 'commercialIndex', title: '商事首页', name: 'commercialIndex_index', component: resolve => {
                require(['@/views/home/commercial_index/commercialIndex.vue'], resolve);
            }
        },
        {
            path: 'accountIndex', title: '会计首页', name: 'accountIndex_index', component: resolve => {
                require(['@/views/home/account_index/accountIndex.vue'], resolve);
            }
        },
        {
            path: 'marketIndex', title: '市场首页', name: 'marketIndex_index', component: resolve => {
                require(['@/views/home/market_index/marketIndex.vue'], resolve);
            }
        },
        {
            path: 'auditIndex', title: '审计首页', name: 'auditIndex_index', component: resolve => {
                require(['@/views/home/audit_index/auditIndex.vue'], resolve);
            }
        },
        {
            path: 'planIndex', title: '企划首页', name: 'planIndex_index', component: resolve => {
                require(['@/views/home/plan_index/planIndex.vue'], resolve);
            }
        },
        {
            path: 'ownspace', title: '个人中心', name: 'ownspace_index', component: resolve => {
            require(['@/views/own-space/own-space.vue'], resolve);
        }
        },
        {
            path: 'order/:order_id', title: '订单详情', name: 'order-info', component: resolve => {
            require(['@/views/advanced-router/component/order-info.vue'], resolve);
        }
        }, // 用于展示动态路由
        {
            path: 'shopping', title: '购物详情', name: 'shopping', component: resolve => {
            require(['@/views/advanced-router/component/shopping-info.vue'], resolve);
        }
        }, // 用于展示带参路由
        {
            path: 'message', title: '消息中心', name: 'message_index', component: resolve => {
            require(['@/views/message/message.vue'], resolve);
        }
        },
        // 产品价格管理
        {
            path: 'productPrice', title: '产品价格管理', name: 'productPrice', component: resolve => {
            require(['@/views/productManagement/productList/productPrice.vue'], resolve);
        }
        },
        // 查看产品属性
        {
            path: 'productAttribute', title: '查看产品属性', name: 'productAttribute', component: resolve => {
            require(['@/views/productManagement/productList/productAttribute.vue'], resolve);
        }
        },
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    // {
    //     path: '/test',
    //     icon: 'social-windows',
    //     name: 'test',
    //     title: 'Test',
    //     component: Main,
    //     children: [
    //         {
    //             path: 'test',
    //             title: '测试页面',
    //             name: 'test_index',
    //             component: resolve => {
    //                 require(['@/views/test/components/main.vue'], resolve);
    //                 // require(['@/views/woa-components/file-preview/index.vue'], resolve);

    //             }
    //         }
    //     ]
    // },
    // {
    //     path: '/allindex',
    //     icon: 'social-windows',
    //     name: 'allindex',
    //     title: '首页',
    //     component: Main,
    //     children: [
    //         {
    //             path: 'cannelIndex', 
    //             title: '渠道首页', 
    //             name: 'cannelIndex_index', 
    //             component: resolve => {
    //                 require(['@/views/home/cannel_index/cannelIndex.vue'], resolve);
    //             }
    //         },
    //         {
    //             path: 'commercialIndex', 
    //             title: '商事首页', 
    //             name: 'commercialIndex_index', 
    //             component: resolve => {
    //                 require(['@/views/home/commercial_index/commercialIndex.vue'], resolve);
    //             }
    //         },
    //         {
    //             path: 'accountIndex', 
    //             title: '会计首页', 
    //             name: 'accountIndex_index', 
    //             component: resolve => {
    //                 require(['@/views/home/account_index/accountIndex.vue'], resolve);
    //             }
    //         },
    //         {
    //             path: 'marketIndex', 
    //             title: '市场首页', 
    //             name: 'marketIndex_index', 
    //             component: resolve => {
    //                 require(['@/views/home/market_index/marketIndex.vue'], resolve);
    //             }
    //         },
    //         {
    //             path: 'auditIndex', 
    //             title: '审计首页', 
    //             name: 'auditIndex_index', 
    //             component: resolve => {
    //                 require(['@/views/home/audit_index/auditIndex.vue'], resolve);
    //             }
    //         },
    //         {
    //             path: 'planIndex', 
    //             title: '企划首页', 
    //             name: 'planIndex_index', 
    //             component: resolve => {
    //                 require(['@/views/home/plan_index/planIndex.vue'], resolve);
    //             }
    //         },
    //     ]
    // },
    {
        access: 6001,
        meta: 6001,
        path: '/customerManagement',
        icon: 'social-windows',
        name: 'customerManagement',
        title: '客户管理',
        component: Main,
        meta:{
            keepAlive: false
        },
        children: [
            {
                access: 6002,
                meta: 6002,
                path: 'marketingManagement',
                title: '营销管理',
                name: 'marketingManagement_index',
                component: resolve => {
                    require(['@/views/customerManagement/marketingManagement/customerManagement.vue'], resolve);
                }
            },
            {
                access: 6003,
                meta: 6003,
                path: 'customerTabManagement',
                title: '客户标签管理',
                name: 'customerTabManagement_index',
                component: resolve => {
                    require(['@/views/customerManagement/customerTabManagement/customerTabManagement.vue'], resolve);
                }
            },
            {
                access: 6088,
                meta: 6088,
                path: 'customerFollowUp',
                title: '跟进记录管理',
                name: 'customerFollowUp_index',
                component: resolve => {
                    require(['@/views/customerManagement/followUpData/followUpdata.vue'], resolve);
                }
            }
        ]
    },
    // {
    //     access: 6004,
    //     path: '/companyManagement',
    //     icon: 'social-windows',
    //     name: 'companyManagement',
    //     title: '企业管理',
    //     component:Main,
    //     children:[
    //         {
    //             access: 6004,
    //             path: 'companyManagement',
    //             title: '企业管理',
    //             name: 'test',
    //             component: resolve =>{
    //                 require(['@/views/companyManagement/components/main.vue'],resolve)
    //             }
    //         }
    //     ]
    // },
    {
        path: '/customerService',
        icon: 'social-windows',
        name: 'customerService',
        access: 6060,
        title: '客服管理',
        meta:{
            keepAlive: false
        },
        component: Main,
        children: [
            {
                access: 6048,
                path: 'complaintcenter',
                title: '投诉管理',
                meta: 6048,
                name: 'complaintcenter_index',
                component: resolve => {
                    require(['@/views/complaintCenter/complaintcenter_index.vue'], resolve);
                }
            },
            {
                path: 'returnVisit',
                access: 6061,
                meta: 6061,
                title: '客户回访',
                name: 'returnVisit_index',
                component: resolve => {
                    require(['@/views/customerService/returnVisit/table/returnVisit_table.vue'], resolve);
                },
            },
            {
                path: 'offlineCustomer',
                access: 6062,
                meta: 6062,
                title: '下线客户',
                name: 'offlineCustomer_index',
                component: resolve => {
                    require(['@/views/customerService/offlineCustomer/table/offline_index.vue'], resolve);
                },
            },
            // {
            //     path: 'customerFollowUp_1',
            //     access: 6063,                
            //     title: '客户跟进记录',
            //     name: 'customerFollowUp_index_1',
            //     component: resolve => {
            //         require(['@/views/customerService/followUp/followUp_index.vue'], resolve);
            //     },
            // },
            // {
            //     path: 'temp',
            //     access: 6064,                
            //     title: '临时导出外勤记录',
            //     name: 'temp',
            //     component: resolve => {
            //         require(['@/views/customerService/followUp/temp.vue'], resolve);
            //     },
            // },
        ]
    },
    {
        access: 6005,
        path: '/channelManagement',
        icon: 'social-windows',
        name: 'channelManagement',
        title: '渠道管理',
        meta:{
            keepAlive: false
        },
        component: Main,
        children: [
            {
                access: 6006,
                path: 'channelCustomer',
                title: '渠道客户管理',
                name: 'channelCustomer_index',
                component: resolve => {
                    require(['@/views/channelManagement/channelCustomer/channelCustomer.vue'], resolve);
                },
            },
            {
                access: 6007,
                path: 'channelType',
                title: '渠道类型管理',
                name: 'channelType_index',
                component: resolve => {
                    require(['@/views/channelManagement/channelType/channelType_index.vue'], resolve);
                },
            },
            {
                access: 6008,
                path: 'transactionRecord',
                title: '交易查询',
                name: 'transactionRecord_index',
                component: resolve => {
                    require(['@/views/channelManagement/transactionRecord/transactionRecord.vue'], resolve);
                },
            },
        ]
    },
    {
        access: 6009,
        path: '/cluesLibrary',
        icon: 'social-windows',
        name: 'cluesLibrary',
        title: '线索库',
        meta:{
            keepAlive: false
        },
        component: Main,
        children: [
            {
                access: 6010,
                path: 'cluesLibraryM',
                title: '线索库管理',
                name: 'cluesLibrary_index',
                component: resolve => {
                    require(['@/views/cluesLibrary/cluesLibraryTable/cluesLibrary_table.vue'], resolve);
                }
            },
            {
                access: 6011,
                path: 'cluesLabels',
                title: '线索标签管理',
                name: 'cluesLabels_index',
                component: resolve => {
                    require(['@/views/cluesLibrary/cluesLabelManagement/cluesLabels.vue'], resolve);
                }
            },
        ]
    },
    // {
    //     access: 6012,
    //     path: '/product',
    //     icon: 'social-windows',
    //     name: 'product',
    //     title: '产品管理',
    //     component: Main,
    //     children: [
    //         {
    //             access: 6013,
    //             path: 'productList',
    //             title: '产品列表',
    //             name: 'productList_index',
    //             component: resolve => {
    //                 require(['@/views/productManagement/productList/productList.vue'], resolve);
    //             }
    //         },
    //         {
    //             access: 6014,
    //             path: 'productType',
    //             title: '产品类型',
    //             name: 'productType_index',
    //             component: resolve => {
    //                 require(['@/views/productManagement/productType/productType.vue'], resolve);
    //             }
    //         },
    //         {
    //             access: 6015,
    //             path: 'productAttribute',
    //             title: '属性管理',
    //             name: 'productAttribute_index',
    //             component: resolve => {
    //                 require(['@/views/productManagement/productType/attributeManagement.vue'], resolve);
    //             }
    //         },
    //         {
    //             access: 6016,
    //             path: 'areaManagement',
    //             title: '地区管理',
    //             name: 'areaManagement_index',
    //             component: resolve => {
    //                 require(['@/views/productManagement/productType/areaManagement.vue'], resolve);
    //             }
    //         },
    //     ]
    // },
    {
        access: 6017,
        path: '/orderManagement',
        icon: 'social-windows',
        name: 'orderManagement',
        title: '订单管理',
        meta:{
            keepAlive: false
        },
        component: Main,
        children: [
            // {
            //     access: 6019,
            //     path: 'account_index',
            //     title: '财务订单列表',
            //     name: 'account_index',
            //     component: resolve => {
            //         require(['@/views/order/accout_user/index.vue'], resolve);
            //     }
            // },
            {
                access: 6018,
                path: 'orderList',
                title: '订单列表',
                name: 'orderList_index',
                component: resolve => {
                    require(['@/views/order/orderList.vue'], resolve);
                }
            },
            {
                access: 6019,
                path: 'orderApprove',
                title: '订单审批',
                name: 'orderApprove_index',
                component: resolve => {
                    require(['@/views/order/orderApprove.vue'], resolve);
                }
            },
            {
                access: 6020,
                path: 'spareManagement',
                title: '余款管理',
                name: 'spareManagement_index',
                component: resolve => {
                    require(['@/views/order/spareManagement/spareManagement.vue'], resolve);
                }
            },
            // {
            //     access:6020,
            //     path: 'orderLog',
            //     title: '订单变更日志',
            //     name: 'orderLog_index',
            //     component: resolve => {
            //         require(['@/views/order/orderLog/index.vue'], resolve);
            //     }
            // }
        ]
    },
    {
        access: 6035,
        path: '/commercialmanagement',
        icon: 'social-windows',
        title: '商事管理',
        name: 'commercialManagement',
        component: Main,
        children: [
            {
                access:6049,
                path: 'allot',
                title: '工单分配',
                name:"'BUSSINESS'",
                // component: resolve => {
                //     require(['@/views/taskManagement/allotCommonTask/commonTask_table.vue'], resolve);
                // }
                component: resolve => {
                    require(['@/views/woa-components/allot-task/allotCommonTask/index.vue'], resolve);
                }
            },
            {
                access:6036,
                path: 'statistical',
                title: '外勤统计',
                name: 'statistical',
                component: resolve => {
                    require(['@/views/commercialManagement/statistical/statistical_index.vue'], resolve);
                }
            },
            // {
            //     access: 6037,
            //     path: 'schedule',
            //     title: '排程表',
            //     name: 'schedule',
            //     component: resolve => {
            //         require(['@/views/commercialManagement/schedule/schedule2.vue'], resolve);
            //     }
            // },
            {
                access: 6038,
                path: 'mycommontaskmanagement',
                title: '工单管理',
                name: 'mycommontaskmanagement',
                component: resolve => {
                    require(['@/views/commercialManagement/myCommonTask/myCommonTask_table.vue'], resolve);
                }
            },
            {
                access: 6039,
                path: 'rulemanagement',
                title: '规则管理',
                name: 'rulemanagement',
                component: resolve => {
                    require(['@/views/commercialManagement/rule.vue'], resolve);
                }
            }
        ]
    },
    {
        access: 6040,
        path: '/planmanagement',
        icon: 'social-windows',
        title: '企划管理',
        name: 'planManagement',
        component: Main,
        children:[
            {
                access:6051,
                path: 'allot',
                title: '工单分配',
                name:"'PLAN'",
                // component: resolve => {
                //     require(['@/views/taskManagement/allotCommonTask/commonTask_table.vue'], resolve);
                // }
                component: resolve => {
                    require(['@/views/woa-components/allot-task/allotCommonTask/index.vue'], resolve);
                }
            },
            {
                access:6052,
                path: 'plantaskmanagement',
                title: '工单管理',
                name: 'plantaskmanagement',
                component: resolve => {
                    require(['@/views/planManagement/myCommonTask/myCommonTask_table.vue'], resolve);
                }
            },
        ]
    },
    {
        access: 6042,
        path: '/accountantWorkOrder',
        icon: 'social-windows',
        name: 'accountantWorkOrder',
        title: '会计管理',
        component: Main,
        children: [
            {
                access:6050,
                path: 'allot',
                title: '工单分配',
                name:"'ACCOUNT'",
                // component: resolve => {
                //     require(['@/views/taskManagement/allotCommonTask/commonTask_table.vue'], resolve);
                // }
                component: resolve => {
                    require(['@/views/woa-components/allot-task/allotCommonTask/index.vue'], resolve);
                }
            },
            {
                access:6043,
                path: 'accounttaskmanagement',
                title: '工单管理',
                name: 'accounttaskmanagement_index',
                component: resolve => {
                    require(['@/views/accountantWorkOrder/myCommonTask/myCommonTask_table.vue'], resolve);
                }
            },
            {
                access: 6044,
                path: 'BookkeepingAgency',
                title: '代理记账管理',
                name: 'BookkeepingAgency_index',
                component: resolve => {
                    require(['@/views/accountantWorkOrder/BookkeepingAgency/BookkeepingAgency.vue'], resolve);
                }
            },
            {
                access: 6046,
                path: 'accountantOrder',
                title: '会计到家工单管理',
                name: 'accountantOrder_index',
                component: resolve => {
                    require(['@/views/accountantWorkOrder/accountantOrder/accountantOrder.vue'], resolve);
                }
            },
            {
                access: 6047,
                path: 'serviceTemplate',
                title: '服务总结模板',
                name: 'serviceTemplate_index',
                component: resolve => {
                    require(['@/views/accountantWorkOrder/serviceTemplate/serviceTemplate.vue'], resolve);
                }
            },
            {
                access: 6053,
                path: 'auditaccount',
                title: '审账',
                name: 'auditaccount_index',
                component: resolve => {
                    require(['@/views/accountantWorkOrder/auditaccount/auditaccount.vue'], resolve);
                }
            },
            {
                access: 6054,
                path: 'auditaccountrule',
                title: '审账规则',
                name: 'auditaccount_rule',
                component: resolve => {
                    require(['@/views/accountantWorkOrder/auditaccountrule/auditaccount_rule.vue'], resolve);
                }
            }

        ]
    },
    {
        access: 6071,
        path: '/auditWorkOrder',
        icon: 'social-windows',
        name: 'auditWorkOrder',
        title: '审计管理',
        component: Main,
        children: [
            {
                access:6072,
                path: 'allot',
                title: '工单分配',
                name:"'AUDIT'",
                component: resolve => {
                    require(['@/views/woa-components/allot-task/allotCommonTask/index.vue'], resolve);
                }
            },
            {
                access:6073,
                path: 'audittaskmanagement',
                title: '工单管理',
                name:"audittaskmanagement_index",
                component: resolve => {
                    require(['@/views/auditManagement/myCommonTask/myCommonTask_table.vue'], resolve);
                }
            },
        ]
    },
    {
        path: '/administrationWorkOrder',
        icon: 'social-windows',
        name: 'administrationWorkOrder',
        title: '行政管理',
        access: 6091,
        component: Main,
        children: [
            {
                access:6092,
                path: 'allot',
                title: '工单分配',
                name:"'EXECUTIVE'",
                // component: resolve => {
                //     require(['@/views/taskManagement/allotCommonTask/commonTask_table.vue'], resolve);
                // }
                component: resolve => {
                    require(['@/views/woa-components/allot-task/allotCommonTask/index.vue'], resolve);
                }
            },
            {
                access: 6093,
                path: 'administratiotaskmanagement',
                title: '工单管理',
                name:"administratiotaskmanagement",
                component: resolve => {
                    require(['@/views/administrationManagement/index.vue'], resolve);
                }
            },
        ]
    },
    {
        access: 6075,
        path: '/fieldManagement',
        icon: 'social-windows',
        name: 'fieldManagement',
        title: '外勤管理',
        component: Main,
        children: [
            {
                access:6076,
                path: 'commonfieldmanagement',
                title: '外勤管理',
                name:"commonfieldmanagement_index",
                component: resolve => {
                    require(['@/views/fieldManagement/commonfield/commonFieldIndex.vue'], resolve);
                }
            },
            {
                access:6078,
                path: 'fieldWarning',
                title: '外勤预警',
                name: 'fieldWarning_index',
                component: resolve => {
                    require(['@/views/fieldManagement/fieldWarning/fieldWarning.vue'],resolve)
                }
            }
        ]
    },
    {
        access: 6080,
        path: '/stystemcomplaint',
        icon: 'social-windows',
        name: 'stystemcomplaint',
        title: '系统反馈',
        component: Main,
        children: [
            {
                access: 6081,
                path: 'complainAndAdvice',
                title: '意见管理',
                name: 'complainAndAdvice_index',
                component: resolve => {
                    require(['@/views/stystemComplain/complainAndAdvice/complainAndAdvice.vue'], resolve);
                }
            },
            {
                access: 6082,
                path: 'complainReply',
                title: '反馈回复',
                name: 'complainReply_index',
                component: resolve => {
                    require(['@/views/stystemComplain/complainReply/complainReply.vue'], resolve);
                }
            }
        ]
    },
    {
        access: 6027,
        path: '/publicPool',
        icon: 'social-windows',
        title: '公海池',
        name: 'publicPool',
        component: Main,
        children: [
            {
                access: 6089,
                path: 'index', title: '公海池', name: 'publicPool_index', component: resolve => {
                    require(['@/views/publicPool/index/pubilcPool_table.vue'], resolve);
                }
            },
            {
                access: 6090,
                path: 'rule_index', title: '销售规则管理', name: 'rule_index', component: resolve => {
                    require(['@/views/publicPool/rule/index.vue'], resolve);
                }
            },
            {
                // access: 6090,
                path: 'person_rule_index', title: '销售规则管理', name: 'person_rule_index', component: resolve => {
                    require(['@/views/publicPool/rule/index.vue'], resolve);
                }
            }
        ]
    },
/*    {
        path: '/admin',
        icon: 'social-windows',
        name: 'admin',
        title: ' 管理员',
        component: Main,
        children: [

        ]
    },*/
    {
        access: 6028,
        path: '/systemManagement',
        icon: 'social-windows',
        name: 'systemManagement',
        title: '系统管理',
        meta:{
            keepAlive: false
        },
        component: Main,
        children: [
            {
                access: 6029,
                path: 'menuMangement',
                title: '菜单管理',
                name: 'menuMangement_index',
                component: resolve => {
                    require(['@/views/systemManagement/menuManagement/menuManagement_index.vue'], resolve);
                }
            },
            {
                access: 6030,
                path: 'roleMangement',
                title: '角色管理',
                name: 'roleMangement_index',
                component: resolve => {
                    require(['@/views/systemManagement/roleManagement/roleM_index.vue'], resolve);
                }
            },
            {
                access: 6031,
                path: 'userManagement',
                title: '用户管理',
                name: 'userManagement_index',
                component: resolve => {
                    require(['@/views/systemManagement/userManagement/userM_index.vue'], resolve);
                }
            },
            {
                access: 6032,
                path: 'sqlDeal',
                title: '管理SQL',
                name: 'admin_sql_deal',
                component: resolve => {
                    require(['@/views/sql_admin/main.vue'], resolve);
                }
            },
            {
                access: 6032,
                path: 'datacenterManagement',
                title: '数据字典管理',
                name: 'datacenterManagement_index',
                component: resolve => {
                    require(['@/views/systemManagement/dataCenterManagement/dataCenterManagement_index.vue'], resolve);
                }
            },
            {
                access: 6033,
                path: 'systemparamsManagement',
                title: '系统参数管理',
                name: 'systemparamsManagement_index',
                component: resolve => {
                    require(['@/views/systemManagement/systemparamsManagement/systemparamsManagement_index.vue'], resolve);
                }
            },
            {
                access: 6034,
                path: 'timetaskManagement',
                title: '定时任务',
                name: 'timetaskManagement',
                component: resolve => {
                    require(['@/views/systemManagement/timetaskManagement/timetaskManagement_index.vue'], resolve);
                }
            },
            {
                //  未配置，暂时使用
                access: 6086,
                path: 'attributeManagement',
                title: '属性管理',
                name: 'attributeManagement',
                component: resolve => {
                    require(['@/views/systemManagement/attributeManagement/attributeManagement_index.vue'], resolve);
                }
            }
        ]
    },
    {
        access: 6065,
        path: '/materialHouse',
        icon: 'social-windows',
        name: 'materialHouse',
        title: '资源库',
        meta:{
            keepAlive: false
        },
        component: Main,
        children: [
            {
                access: 6066,
                path: 'CompanyInformation',
                title: '公司资料',
                name: 'CompanyInformation_index',
                component: resolve => {
                    require(['@/views/material-house/CompanyInformation/CompanyInformation.vue'], resolve);
                }
            },
            {
                access: 6067,
                path: 'contractType',
                title: '合同类型',
                name: 'contractType_index',
                component: resolve => {
                    require(['@/views/material-house/contractType/contractType.vue'], resolve);
                }
            },
            {
                access: 6068,
                path: 'DepartmentInformation',
                title: '部门资料',
                name: 'DepartmentInformation_index',
                component: resolve => {
                    require(['@/views/material-house/DepartmentInformation/DepartmentInformation.vue'], resolve);
                }
            },
            {
                access: 6069,
                path: 'LearningInformation',
                title: '学习资料',
                name: 'LearningInformation_index',
                component: resolve => {
                    require(['@/views/material-house/LearningInformation/LearningInformation.vue'], resolve);
                }
            },
            {
                access: 6070,
                path: 'VideoData',
                title: '视频资料',
                name: 'VideoData_index',
                component: resolve => {
                    require(['@/views/material-house/VideoData/VideoData.vue'], resolve);
                }
            }
        ]
    },
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    preview,
    locking,
    ...appRouter,
    previewFile,
    page500,
    page403,
    page404,
    
];
