/* 
所有路由配置的数组
*/
// import Home from "@/pages/Home";
// // import Search from '@/pages/Search'
// //const Search = () => import("@/pages/Search");

// import Detail from "@/pages/Detail";

// import AddCartSuccess from "@/pages/AddCartSuccess";
// import ShopCart from "@/pages/ShopCart";

// import Trade from "@/pages/Trade";
// import Pay from "@/pages/Pay";
// import PaySuccess from "@/pages/PaySuccess";
// import Center from "@/pages/Center";
// import MyOrder from "@/pages/Center/myOrder";
// import GroupOrder from "@/pages/Center/groupOrder";

// import Register from "@/pages/Register";
// import Login from "@/pages/Login";
// import store from "@/store";
// import router from "@/router";

/* 
component: () => import('@/pages/Search')
1. import(modulePath): 动态import引入模块, 被引入的模块会被单独打包
2. 组件配置的是一个函数, 函数中通过import动态加载模块并返回, 
    初始时函数不会执行, 第一次访问对应的路由才会执行, 也就是说只有一次请求对应的路由路径才会请求加载单独打包的js
作用: 用于提高首屏的加载速度
*/

export default [
  {
    //重定向，首先定位到首页
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    component: () => import("@/pages/Home"),
    meta: { showFooter: true },
  },
  {
    name: "search",
    path: "/search/:keyword?", //params参数占位 ?指定params参数可传可不传
    component: () => import("@/pages/Search"),
    meta: { showFooter: true },
  },
  {
    name: "detail", // 是当前路由的标识名称
    path: "/detail/:goodsId",
    component: () => import("@/pages/Detail"),

    meta: { showFooter: true },
  },
  {
    name: "addcartsuccess",
    path: "/addcartsuccess",
    component: () => import("@/pages/AddCartSuccess"),

    meta: { showFooter: true },
  },
  {
    path: "/shopcart",
    component: () => import("@/pages/ShopCart"),
  },

  {
    path: "/trade",
    component: () => import("@/pages/Trade"),

    /* 只能从购物车界面, 才能跳转到交易界面 路由独享守卫*/
    beforeEnter(to, from, next) {
      if (from.path === "/shopcart") {
        next();
      } else {
        next("/shopcart");
      }
    },
  },
  {
    path: "/pay",
    component: () => import("@/pages/Pay"),

    // 将query参数映射成props传递给路由组件
    props: (route) => ({ orderId: route.query.orderId }),

    /* 只能从交易界面, 才能跳转到支付界面 */
    beforeEnter(to, from, next) {
      if (from.path === "/trade") {
        next();
      } else {
        next("/trade");
      }
    },
  },

  {
    path: "/paysuccess",
    component: () => import("@/pages/PaySuccess"),
    /* 只有从支付界面, 才能跳转到支付成功的界面 */
    beforeEnter(to, from, next) {
      if (from.path === "/pay") {
        next();
      } else {
        next("/pay");
      }
    },
  },
  {
    path: "/center",
    component: () => import("@/pages/Center"),
    redirect: "/center/myorder",
    children: [
      {
        path: "myorder",
        component: () => import("@/pages/Center/myOrder"),
      },
      {
        path: "grouporder",
        component: () => import("@/pages/Center/groupOrder"),
      },
    ],
  },
  {
    path: "/register",
    component: () => import("@/pages/Register"),

    meta: {
      isHideFooter: true,
    },
  },
  {
    path: "/login",
    component: () => import("@/pages/Login"),
    meta: {
      isHideFooter: true,
    },
  },
];
