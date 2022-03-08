<template>
  <div>
    <type-nav></type-nav>
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <!-- 面包屑 -->
          <ul class="fl sui-tag">
            <!-- 分类面包屑 -->
            <li class="with-x" v-if="searchparams.categoryName">
              {{ searchparams.categoryName }}
              <i @click="removeCategoryName">x</i>
            </li>
            <!-- 关键字面包屑 -->
            <li class="with-x" v-if="searchparams.keyword">
              {{ searchparams.keyword }}
              <i @click="removeKeyWord">x</i>
            </li>
            <!-- 品牌面包屑 -->
            <li class="with-x" v-if="searchparams.trademark">
              {{ searchparams.trademark.split(":")[1] }}
              <i @click="removetrademark">x</i>
            </li>
            <!-- 产品属性值面包屑 -->
            <li class="with-x" v-for="p in searchparams.props" :key="p.index">
              {{ p.split(":")[1] }}
              <i @click="removeprops(index)">x</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: isOne }" @click="changeOrder(1)">
                  <a
                    >综合<span
                      v-show="isOne"
                      class="iconfont"
                      :class="{
                        icon_up: isAsc,
                        icon_down: isDesc,
                      }"
                    >
                    </span>
                  </a>
                </li>
                <li :class="{ active: isTwo }" @click="changeOrder(2)">
                  <a
                    >价格<span
                      v-show="isTwo"
                      class="iconfont"
                      :class="{
                        icon_up: isAsc,
                        icon_down: isDesc,
                      }"
                    >
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 销售产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="goods in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img" >
                    <router-link :to="{
                      name:'detail',
                      params:{
                        skuId: goods.id
                      }
                    }"
                      ><img :src="goods.defaultImg"
                    /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ goods.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ goods.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <the-pagination
            :pageNo="searchparams.pageNo"
            :pageSize="searchparams.pageSize"
            :total="total"
            :continues="5"
            @getpageNo="getpageNo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TypeNav from "@/components/TypeNav/type-nav.vue";
import SearchSelector from "./SearchSelector/SearchSelector";
import { mapGetters, mapState } from "vuex";
export default {
  components: { TypeNav, SearchSelector },
  data() {
    return {
      searchparams: {
        //1,2,3级分类id
        category1Id: "",
        category2Id: "",
        category3Id: "",
        //分类名称
        categoryName: "",
        //搜索关键字
        keyword: "",
        // 排序
        order: "1:desc",
        //分页器默认第一页
        pageNo: 1,
        //每一页展示的数量
        pageSize: 5,
        //产品属性
        props: [],
        //品牌
        trademark: "",
      },
    };
  },
  beforeMount() {
    //合并对象
    Object.assign(this.searchparams, this.$route.query, this.$route.params);
  },
  mounted() {
    this.getSearchData();
  },
  watch: {
    //监听路由再次发送请求更新搜索展示
    $route(newvalue, oldvalue) {
      //清除1，2，3级Id
      this.searchparams.category1Id = "";
      this.searchparams.category2Id = "";
      this.searchparams.category3Id = "";
      Object.assign(this.searchparams, this.$route.query, this.$route.params);
      this.getSearchData();
    },
  },
  computed: {
    ...mapGetters(["goodsList", "attrsList", "trademarkList"]),
    ...mapState({
      total: (state) => state.search.searchList.total,
    }),
    //综合？
    isOne() {
      return this.searchparams.order.indexOf("1") !== -1;
    },
    //价格？
    isTwo() {
      return this.searchparams.order.indexOf("2") !== -1;
    },
    //升序？
    isAsc() {
      return this.searchparams.order.indexOf("asc") !== -1;
    },
    //降序？
    isDesc() {
      return this.searchparams.order.indexOf("desc") !== -1;
    },
  },
  methods: {
    //向服务器请求获取search数据(封装成函数)（要根据参数不同返回不同的数据进行展示）
    getSearchData() {
      this.$store.dispatch("getSearchList", this.searchparams);
    },
    //删除面包屑分类名字
    removeCategoryName() {
      this.searchparams.categoryName = undefined;
      //清除1，2，3级Id
      this.searchparams.category1Id = undefined;
      this.searchparams.category2Id = undefined;
      this.searchparams.category3Id = undefined;
      //还需请求
      this.getSearchData();
      //清除query,params方法：路由跳转
      if (this.$route.params) {
        this.$router.push({
          name: "search",
          params: this.$route.params,
        });
      }
    },
    //删除面包屑关键字名字
    removeKeyWord() {
      this.searchparams.keyword = undefined;
      this.getSearchData();
      this.$bus.$emit("clearKey");
      if (this.$route.query) {
        this.$router.push({
          name: "search",
          query: this.$route.query,
        });
      }
    },
    //移除品牌面包屑
    removetrademark() {
      this.searchparams.trademark = "";
      this.getSearchData();
    },
    //处理品牌传参的数据
    trademarkInfo(tmk) {
      this.searchparams.trademark = `${tmk.tmId}:${tmk.tmName}`;
      this.getSearchData();
    },
    //收集产品属性处理，整理
    attrInfo(a, value) {
      let t = `${a.attrId}:${value}:${a.attrName}`;
      if (this.searchparams.props.indexOf(t) == -1) {
        this.searchparams.props.push(t);
      }
      this.getSearchData();
    },
    //移除属性面包屑
    removeprops(index) {
      this.searchparams.props.splice(index, 1);
      this.getSearchData();
    },
    //展示排序功能
    changeOrder(flag) {
      let bfor = this.searchparams.order.split(":")[0];
      let bhin = this.searchparams.order.split(":")[1];
      let newOrder = "";
      if (flag == bfor) {
        newOrder = `${bfor}:${bhin == "desc" ? "asc" : "desc"}`;
      } else {
        newOrder = `${flag}:${"desc"}`;
      }
      this.searchparams.order = newOrder;
      this.getSearchData();
    },
    //获取页数
    getpageNo(pageNo) {
      this.searchparams.pageNo = pageNo;
      this.getSearchData();
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;

        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -1px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>
