const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  productionSourceMap: false, //map文件体积大，可以删除（但不能定位错误，加密了）
  transpileDependencies: true,
  lintOnSave: false, //关闭语法检查
  devServer: {
    proxy: {
      "/api": {
        // 匹配所有以 '/api1'开头的请求路径
        target: "http://gmall-h5-api.atguigu.cn", // 代理目标的基础路径
        changeOrigin: true, //用于控制请求头中的host值  localhost5000   如果是false，实话实说 localhost8080
        // pathRewrite: { "^/api": "" }, //匹配以api开头的，防止把路径api/带到服务器，服务器找不到
      },
    },
  },
});
