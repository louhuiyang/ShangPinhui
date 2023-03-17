import { reqCategoryList, reqGetBannerList, reqFloorList } from "@/api";
//准备state对象——保存具体的数据
const state = {
  categoryList: [],
  bannerList: [],
  floorList: [],
};
//准备actions对象——响应组件中用户的动作
const actions = {
  async categoryList(context) {
    //  console.log(context);
    let result = await reqCategoryList();

    //  console.log(result);
    if (result.code == 200) {
      context.commit("CATEGORYLIST", result.data);
    }
  },
  async getBannerList(context) {
    //  console.log(context);
    let result = await reqGetBannerList();

    // console.log(result);
    if (result.code == 200) {
      context.commit("BANNERLIST", result.data);
    }
  },
  async getFloorList(context) {
    //  console.log(context);
    let result = await reqFloorList();

    // console.log(result);
    if (result.code == 200) {
      context.commit("FLOORLIST", result.data);
    }
  },
};
//准备mutations对象——修改state中的数据的唯一手段
const mutations = {
  CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList;
  },
  BANNERLIST(state, bannerList) {
    state.bannerList = bannerList;
  },
  FLOORLIST(state, floorList) {
    state.floorList = floorList;
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
