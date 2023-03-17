import { reqCartList, reqDeleteCartById, reqUpdateCheckedByid } from "@/api";
//准备state对象——保存具体的数据
const state = {
  cartList: [],
};
//准备actions对象——响应组件中用户的动作
const actions = {
  //获取购物车列表数据
  async getCartList({ commit }) {
    let result = await reqCartList();
    console.log("getCartList", result);
    if (result.code == 200) {
      commit("GETCARTLIST", result.data);
    }
  },

  //删除购物车某一个产品
  async deleteCartListById({ commit }, goodsId) {
    let result = await reqDeleteCartById(goodsId);
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("fail"));
    }
  },
  //删除全部勾选的产品
  deleteAllCheckedCart({ dispatch, getters }) {
    //context:小仓库，commit【提交mutations修改state】 getters【计算属性】 dispatch【派发action】 state【当前仓库数据】
    //获取购物车中全部的产品（是一个数组）
    let PromiseAll = [];
    getters.cartList.cartInfoList.forEach((item) => {
      let promise =
        item.isChecked == 1 ? dispatch("deleteCartListById", item.skuId) : "";
      //将每一次返回的Promise添加到数组当中
      PromiseAll.push(promise);
    });
    //只要全部的p1|p2....都成功，返回结果 即为成功
    //如果有一个失败，返回即为失败结果
    return Promise.all(PromiseAll);
  },
  //修改购物车某一个产品的选中状态
  async updateCheckedById({ commit }, { skuId, isChecked }) {
    let result = await reqUpdateCheckedByid(skuId, isChecked);
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  //修改全部产品的状态
  updateAllCartIsChecked({ dispatch, state }, isChecked) {
    //数组
    let promiseAll = [];
    state.cartList[0].cartInfoList.forEach((item) => {
      let promise = dispatch("updateCheckedById", {
        skuId: item.skuId,
        isChecked,
      });
      promiseAll.push(promise);
    });
    //最终返回结果
    return Promise.all(promiseAll);
  },
};
//准备mutations对象——修改state中的数据的唯一手段
const mutations = {
  GETCARTLIST(state, cartList) {
    state.cartList = cartList;
  },
};
//理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {
  cartList(state) {
    return state.cartList[0] || {};
  },
};

//创建并暴露
export default {
  state,
  actions,
  mutations,
  getters,
};
