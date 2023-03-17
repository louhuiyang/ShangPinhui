//统一管理项目接口的模块
//引入二次封装的axios（带有请求、响应的拦截器）
import requests from "./ajax";
import mockRequests from "./mockAjax";

//三级菜单的请求地址  /api/product/getBaseCategoryList   GET    没有任何参数
//对外暴露一个函数，只要外部调用这个函数，就向服务器发起ajax请求、获取三级菜单数据。当前咱们这个函数只需要把服务器返回结果返回即可。
export const reqCategoryList = () => {
  return requests.get(`/product/getBaseCategoryList`);
};
//切记:当前函数执行需要把服务器返回结果返回
//获取banner（Home首页轮播图接口）
export const reqGetBannerList = () => {
  return mockRequests.get("/banner");
};
//获取floor数据
export const reqFloorList = () => mockRequests.get("/floor");
//search模块
// 发起一个post请求
// axios({
//   method: 'post',
//   url: '/user/12345',
//   data: {
//     firstName: 'Fred',
//     lastName: 'Flintstone'
//   }
// });
export const reqGetSearchInfo = (params) =>
  requests({
    method: "post",
    url: "/list",
    data: params,
  });

//获取产品详情信息的接口  URL: /api/item/{ skuId }  请求方式：get
export const reqGoodsInfo = (goodsId) => {
  return requests({ url: `/item/${goodsId}`, method: "get" });
};

//将产品添加到购物车中（获取更新某一个产品的个数）
///api/cart/addToCart/{ skuId }/{ skuNum }  POST
export const reqAddOrUpdateShopCart = (goodsId, goodsNum) =>
  requests({ url: `/cart/addToCart/${goodsId}/${goodsNum}`, method: "post" });
//购物车列表
export const reqCartList = () => {
  return requests.get(`/cart/cartList`);
};
//删除购物车
export const reqDeleteCartById = (goodsId) => {
  return requests({
    url: `/cart/deleteCart/${goodsId}`,
    method: "delete",
  });
};

//修改商品的选中状态
//URL:/api/cart/checkCart/{skuId}/{isChecked}   method:get
export const reqUpdateCheckedByid = (skuId, isChecked) => {
  return requests({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: "get",
  });
};

//获取验证码 / api / user / passport / sendCode / { phone };
export const reqGetCode = (phone) => {
  return requests.get(`/user/passport/sendCode/${phone}`);
};

//注册
//url:/api/user/passport/register  method:post    phone code password

export const reqUserRegister = (data) =>
  requests({ url: "/user/passport/register", data, method: "post" });

//登录
//URL:/api/user/passport/login  method:post phone password
export const reqUserLogin = (data) =>
  requests({ url: "/user/passport/login", data, method: "post" });
//获取用户信息【需要带着用户的token向服务器要用户信息】
//URL:/api/user/passport/auth/getUserInfo  method:get
export const reqUserInfo = () =>
  requests({ url: "/user/passport/auth/getUserInfo", method: "get" });

//退出登录
//URL:/api/user/passport/logout  get
export const reqLoginout = () =>
  requests({ url: "/user/passport/logout", method: "get" });

//获取用户地址信息
//URL:/api/user/userAddress/auth/findUserAddressList  method:get
// export const reqAddressInfo = () =>
//   requests({
//     url: "/user/userAddress/auth/findUserAddressList",
//     method: "get",
//   });

export const reqAddressInfo = () => {
  return mockRequests.get("/address");
};
//获取商品清单
//URL:/api/order/auth/trade   method:get
export const reqOrderInfo = () =>
  requests({ url: "/order/auth/trade", method: "get" });
//提交订单的接口
//URL:/api/order/auth/submitOrder?tradeNo={tradeNo}  method:post

export const reqSubmitOrder = (tradeNo, data) =>
  requests({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    data,
    method: "post",
  });
//获取支付信息
//URL:/api/payment/weixin/createNative/{orderId}  GET
export const reqPayInfo = (orderId) =>
  requests({ url: `/payment/weixin/createNative/${orderId}`, method: "get" });
//获取支付订单状态
//URL:/api/payment/weixin/queryPayStatus/{orderId}  get
export const reqPayStatus = (orderId) =>
  requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: "get" });

//获取个人中心的数据
//api/order/auth/{page}/{limit}  get
export const reqMyOrderList = (page, limit) =>
  requests({ url: `/order/auth/${page}/${limit}`, method: "get" });
