import {
  reqGetCode,
  reqUserRegister,
  reqUserLogin,
  reqUserInfo,
  reqLoginout,
} from "@/api";
import { setToken, getToken, removeToken } from "@/utils/token";
//准备state对象——保存具体的数据
const state = {
  code: "",
  token: getToken(),
  userInfo: {},
};
//准备actions对象——响应组件中用户的动作
const actions = {
  async getCode({ commit }, phone) {
    let result = await reqGetCode(phone);
    if (result.code == 200) {
      commit("GETCODE", result.data);
      return "ok";
    } else {
      return Promise.reject(new Error("fail"));
    }
  },
  //用户注册
  async userRegister({ commit }, user) {
    let result = await reqUserRegister(user);
    console.log(result);
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("fail"));
    }
  },
  //登录业务
  async userLogin({ commit }, data) {
    let result = await reqUserLogin(data);
    console.log(result);
    //服务器下发token，用户唯一标识符(uuid)
    //将来经常通过带token找服务器要用户信息进行展示
    if (result.code == 200) {
      //用户已经登录成功且获取到token
      commit("USERLOGIN", result.data.token);
      //持久化存储token
      setToken(result.data.token);
      return "ok";
    } else {
      return Promise.reject(new Error("fail"));
    }
  },
  //获取用户信息
  async getUserInfo({ commit }) {
    let result = await reqUserInfo();
    console.log(result);
    if (result.code == 200) {
      //提交用户信息
      commit("GETUSERINFO", result.data);
      return "ok";
    } else {
      return Promise.reject(new Error("fail"));
    }
  },
  //退出登录
  async userLoginout({ commit }) {
    //只是向服务器发起一次请求，通知服务器清除token
    let result = await reqLoginout();
    //action里面不能操作state，提交mutation修改state
    if (result.code == 200) {
      commit("CLEAR");
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
};
//准备mutations对象——修改state中的数据的唯一手段
const mutations = {
  GETCODE(state, code) {
    state.code = code;
  },
  USERLOGIN(state, token) {
    state.token = token;
  },
  GETUSERINFO(state, userInfo) {
    state.userInfo = userInfo;
  },
  //清除本地数据
  CLEAR(state) {
    //帮仓库中先关用户信息清空
    state.token = "";
    state.userInfo = {};
    //本地存储数据清空
    removeToken();
  },
};
//理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {};

//创建并暴露
export default {
  state,
  actions,
  mutations,
  getters,
};
