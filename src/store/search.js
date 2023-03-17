import { reqGetSearchInfo } from "@/api";
//准备state对象——保存具体的数据

const state = {
  searchList: {},
};
//准备actions对象——响应组件中用户的动作
const actions = {
  async getSearchList(context, params = {}) {
    //  console.log(context);
    let result = await reqGetSearchInfo(params);

    console.log(result);
    if (result.code == 200) {
      context.commit("GETSEARCHLIST", result.data);
    }
  },
};
//准备mutations对象——修改state中的数据的唯一手段
const mutations = {
  GETSEARCHLIST(state, searchList) {
    state.searchList = searchList;
  },
};
//计算属性
//项目当中getters主要的作用是:简化仓库中的数据(简化数据而生)
//可以把我们将来在组件当中需要用的数据简化一下【将来组件在获取数据的时候就方便了】
const getters = {
  //当前形参state，当前仓库中的state，并非大仓库中的那个state
  goodsList(state) {
    //state.searchList.goodsList如果服务器数据回来了，没问题是一个数组
    //假如网络不给力|没有网state.searchList.goodsList应该返回的undefined
    //计算新的属性的属性值至少给人家来一个数组
    return state.searchList.goodsList || [];
  },
  trademarkList(state) {
    return state.searchList.trademarkList || [];
  },
  attrsList(state) {
    return state.searchList.attrsList || [];
  },
};
//创建并暴露
export default {
  // namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
