import { reqAddressInfo, reqOrderInfo } from "@/api";
//准备state对象——保存具体的数据
const state = {
  address: [],
  orderInfo: {},
};
//准备actions对象——响应组件中用户的动作
const actions = {
  //获取用户地址信息
  async getUserAddress({ commit }) {
    let result = await reqAddressInfo();
    //  console.log(result);
    if (result.code == 200) {
      commit("GETUSERADDRESS", result.data);
    }
  },
  //获取商品清单数据
  async getOrderInfo({ commit }) {
    let result = await reqOrderInfo();
    console.log(result);
    if (result.code == 200) {
      commit("GETORDERINFO", result.data);
    }
  },
};
//准备mutations对象——修改state中的数据的唯一手段
const mutations = {
  GETUSERADDRESS(state, address) {
    state.address = address;
  },
  GETORDERINFO(state, orderInfo) {
    state.orderInfo = orderInfo;
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
