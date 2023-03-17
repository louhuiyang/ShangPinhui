import Vue from "vue";
import App from "./App.vue";
//引入VueRouter
import VueRouter from "vue-router";
//引入路由器
import router from "@/router";
//引入全局组件
import TypeNav from "@/components/TypeNav";
import MyCarousel from "@/components/Carousel";
import MyPagination from "@/components/Pagination";
//全局注册组件
Vue.component("TypeNav", TypeNav);
Vue.component("MyCarousel", MyCarousel);
Vue.component("MyPagination", MyPagination);
//注册全局组件
import { Button, MessageBox } from "element-ui";
Vue.component(Button.name, Button);
//ElementUI注册组件的时候，还有一种写法，挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

import VueLazyload from "vue-lazyload";
import atm from "@/assets/1.gif";
Vue.use(VueLazyload, {
  preLoad: 1.3,

  loading: atm,
});
//应用插件
Vue.use(VueRouter);
//引入仓库
import store from "./store";
Vue.config.productionTip = false;

//引入MockServer.js----mock数据
import "@/mock/mockServe";

//引入swiper样式
import "swiper/css/swiper.css";
// import { reqGetSearchInfo } from "@/api";
// console.log(reqGetSearchInfo({}));
//接口api
import * as API from "@/api";

//引入表单校验插件
import "@/plugins/validate";

new Vue({
  render: (h) => h(App),
  router, //注册路由，组件实例上多了$router和$route属性
  store, //注册仓库，组件实例上多了$store属性
  beforeCreate() {
    Vue.prototype.$bus = this; //安装全局事件总线，$bus就是当前应用的vm
    Vue.prototype.$API = API;
  },
}).$mount("#app");
