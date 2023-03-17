//引入Vue核心库
import Vue from "vue";
//引入Vuex，是个对象，有store方法
import Vuex from "vuex";
//应用Vuex插件 必须先Vue.use(Vuex)才能创建store，所以不能在main.js中use，会先执行import
Vue.use(Vuex);

//引入home|search模块的仓库
import home from "./home";
import search from "./search";
import detail from "./detail";
import shopcart from "./shopcart";
import user from "./user";
import trade from "./trade";
//创建并暴露Vuex.Store这个构造函数new出来的store的实例(你需要暴露这个类的实例，如果你不对外暴露，外部是不能使用的)
export default new Vuex.Store({
  //模块：把小仓库进行合并变为大仓库
  modules: {
    home,
    search,
    detail,
    shopcart,
    user,
    trade,
  },
});
