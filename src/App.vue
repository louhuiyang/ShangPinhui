<template>
  <div id="app">
    <Header />
    <!-- 路由展示位置 -->
    <router-view></router-view>
    <Footer v-show="$route.meta.showFooter" />
  </div>
</template>

<script>
import Header from "./components/Header"; //引入组件
import Footer from "./components/Footer";
export default {
  name: "App",

  components: {
    //注册组件
    Header,
    Footer,
  },
  mounted() {
    this.$store.dispatch("categoryList");
  },
};
</script>

<style>
body {
  overflow: hidden;
  padding-right: 0 !important;
}
</style>
