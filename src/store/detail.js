import { reqGoodsInfo, reqAddOrUpdateShopCart } from "@/api";
//准备state对象——保存具体的数据
//封装游客身份模块uuid--->生成一个随机字符串（不能在变了）
import { getUUID } from "@/utils/uuid_token";
const state = {
  goodsInfo: {},
  //游客临时身份
  uuid_token: getUUID(),
};
//准备actions对象——响应组件中用户的动作
const actions = {
  async getGoodsInfo(context, goodsId) {
    //  console.log(context);
    let result = await reqGoodsInfo(goodsId);

    console.log("goodsinfo", result);
    if (result.code == 200) {
      context.commit("GETGOODSINFO", result.data);
    }
  },
  async addOrUpdateShopCart(context, { goodsId, goodsNum }) {
    //发请求:前端带一些参数给服务器【需要存储这些数据】，存储成功了，没有给返回数据
    //不需要在三连环（仓库存储数据了）
    //注意:async函数执行返回的结果一定是一个promise【要么成功，要么失败】
    let result = await reqAddOrUpdateShopCart(goodsId, goodsNum);

    // console.log("addshopcar", result);
    if (result.code == 200) {
      //返回的是成功的标记
      return "ok"; //非空字符串就是成功
    } else {
      //返回的是失败的标记
      return Promise.reject(new Error("fail"));
    }
  },
};
//准备mutations对象——修改state中的数据的唯一手段
const mutations = {
  GETGOODSINFO(state, goodsInfo) {
    state.goodsInfo = goodsInfo;
  },
};
//理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {
  //比如:state.goodInfo初始状态空对象，空对象的categoryView属性值undefined
  //当前计算出的 categoryView属性值至少是一个空对象，假的报错不会有了。
  categoryView(state) {
    return state.goodsInfo.categoryView || {};
  },
  //简化产品信息的数据
  skuInfo(state) {
    return state.goodsInfo.skuInfo || {};
  },
  //产品售卖属性的简化
  spuSaleAttrList(state) {
    return state.goodsInfo.spuSaleAttrList || {};
  },
};

//创建并暴露
export default {
  state,
  actions,
  mutations,
  getters,
};
