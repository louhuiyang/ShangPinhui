<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <!-- 事件委派 -->
    <div class="container" @mouseleave="leaveIndex" @mouseenter="enterSearch">
      <h2 class="all">全部商品分类</h2>
      <transition name="sort">
        <div class="sort" v-show="isShow">
          <div class="all-sort-list2" @click="goSearch">
            <!-- 一级分类 -->
            <div
              class="item"
              v-for="(c1, index) in categoryList.slice(0, 15)"
              :key="c1.categoryId"
              :class="{ cur: currentIndex == index }"
            >
              <h3 @mouseenter="changeIndex(index)">
                <a
                  :data-categoryName="c1.categoryName"
                  :data-category1Id="c1.categoryId"
                  >{{ c1.categoryName }}</a
                >
                <!-- <router-link to="/search">{{ c1.categoryName }}</router-link>  -->
              </h3>
              <!-- 二级分类 -->
              <div
                class="item-list clearfix"
                :style="{ display: currentIndex == index ? 'block' : 'none' }"
              >
                <!-- v-show="currentIndex == index"-->
                <div
                  class="subitem"
                  v-for="c2 in c1.categoryChild"
                  :key="c2.categoryId"
                >
                  <dl class="fore">
                    <dt>
                      <a
                        :data-categoryName="c2.categoryName"
                        :data-category2Id="c2.categoryId"
                        >{{ c2.categoryName }}</a
                      >
                    </dt>
                    <!-- 三级分类 -->
                    <dd>
                      <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                        <a
                          :data-categoryName="c3.categoryName"
                          :data-category3Id="c3.categoryId"
                          >{{ c3.categoryName }}</a
                        >
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
//节流
import { throttle } from "lodash";
export default {
  name: "TypeNav",
  data() {
    return {
      //鼠标移动到的一级分类索引值
      currentIndex: -1,
      isShow: true,
    };
  },
  methods: {
    //鼠标进入
    // changeIndex(index) {
    //     this.currentIndex = index
    //     console.log(index);//移动速度过快时不会触发全部
    // },
    //节流 注意不能用箭头函数
    changeIndex: throttle(function (index) {
      this.currentIndex = index;
      console.log(index);
    }, 50),
    //鼠标移出
    leaveIndex() {
      this.currentIndex = -1;
      if (this.$route.path != "/home") {
        this.isShow = false;
      }
    },
    enterSearch() {
      if (this.$route.path != "/home") {
        this.isShow = true;
      }
    },

    //进行路由跳转的回调函数，绑定在各级菜单的父元素上
    goSearch(event) {
      //event.target:获取到的是触发事件的元素(div、h3、a、em、dt、dl)
      let node = event.target;
      console.log(node);
      console.log(node.dataset);
      //给a标签添加了自定义属性data-categoryName,全部的字标签当中只有a标签带有自定义属性，把属性解构出来
      let { categoryname, category1id, category2id, category3id } =
        node.dataset;
      //第二个问题解决了：点击的到底是不是a标签（只要这个标签身上带有categoryname）一定是a标签

      //当前这个if语句：一定是a标签才会进入
      if (categoryname) {
        //准备路由跳转的参数对象
        let loction = { name: "search" };
        let query = { categoryName: categoryname };
        //一定是a标签：一级目录
        if (category1id) {
          query.category1Id = category1id;
          //一定是a标签：二级目录
        } else if (category2id) {
          query.category2Id = category2id;
          //一定是a标签：三级目录
        } else {
          query.category3Id = category3id;
        }
        //判断：如果路由跳转的时候，带有params参数，捎带脚传递过去
        if (this.$route.params) {
          loction.params = this.$route.params;
          //动态给location配置对象添加query属性
          loction.query = query;
          //路由跳转
          this.$router.push(loction);
        }
      }
    },
  },
  mounted() {
    //通知vuex发送请求->store/home.js
    // console.log(this.$store);
    // this.$store.dispatch("categoryList");
    if (this.$route.path != "/home") {
      this.isShow = false;
    }
  },
  computed: {
    ...mapState({
      //对象形式 右侧是个函数，使用此计算属性时，会马上调用，参数state是大仓库的state
      categoryList: (state) => state.home.categoryList,
    }),
  },
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //     .item-list {
          //         display: block;
          //     }
          // }
        }
        //  .item:hover{
        //     background-color: skyblue;
        // }
        .cur {
          background-color: skyblue;
        }
      }
    }
    .sort-enter {
      height: 0px;
      opacity: 0.5;
    }
    // 过渡动画结束状态（进入）
    .sort-enter-to {
      height: 461px;
      opacity: 1;
    }
    // 定义动画时间、速率
    .sort-enter-active {
      transition: all 0.5s linear;
      overflow: hidden;
    }
  }
}
</style>
