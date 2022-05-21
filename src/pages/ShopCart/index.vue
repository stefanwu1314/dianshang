<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="goods in cartInfoList" :key="goods.id">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="goods.isChecked == 1"
              @change="isCartChecked(goods, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="goods.imgUrl" />
            <div class="item-msg">{{ goods.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ goods.cartPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="handler('minus', -1, goods)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="goods.skuNum"
              minnum="1"
              class="itxt"
              @change="handler('change', $event.target.value * 1, goods)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="handler('add', +1, goods)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ goods.cartPrice * goods.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteCartItem(goods)"
              >删除</a
            >
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllChecked" />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="###" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import throttle from "lodash/throttle";
export default {
  name: "ShopCart",
  mounted() {
    this.getData();
  },
  methods: {
    //获取个人购物车数据
    getData() {
      this.$store.dispatch("getCartInfo");
    },
    async isCartChecked(goods, event) {
      try {
        let isChecked = event.target.checked ? "1" : "0";
        await this.$store.dispatch("CheckCart", {
          skuId: goods.skuId,
          isChecked,
        });
        this.getData();
      } catch (error) {
        // alert(error.message)
      }
    },
    // allCheck(){
    //   this.getData();
    // },
    //节流
    // throttle(fn, wait) {
    //   let timeout;
    //   return () => {
    //     let context = this;
    //     let args = arguments;
    //     // 这里不需要清除定时器 清除了会重新计算时间
    //     // 清除这个定时器不代表timeout为空
    //     if (timeout) {
    //       return false;
    //     }
    //     timeout = setTimeout(function () {
    //       console.log(args)
    //       fn.apply(context, args);
    //       timeout = null;
    //     }, wait);
    //   };
    // },
    // doThrottle(type, disNum, goods){
    //   this.throttle(this.handler(type, disNum, goods), 500);
    // },
    handler: throttle(async function (type, disNum, goods) {
      switch (type) {
        case "add":
          disNum = 1;
          break;
        case "minus":
          if (goods.skuNum > 1) {
            disNum = -1;
          } else {
            disNum = 0;
          }
          break;
        case "change":
          if (isNaN(disNum) || disNum < 1) {
            disNum = 0;
          } else {
            disNum = parseInt(disNum) - goods.skuNum;
          }
          break;
      }
      try {
        await this.$store.dispatch("addOrUpdateShopCart", {
          skuId: goods.skuId,
          skuNum: disNum,
        });
        this.getData();
      } catch (error) {}
    }, 1000),
    //修改某一个产品的个数,节流
    // async handler(type, disNum, goods){
    //   // console.log('派发action',type,disNum,goods);

    //   switch (type) {
    //     case "add":
    //       disNum = 1;
    //       break;
    //     case "minus":
    //       if (goods.skuNum > 1) {
    //         disNum = -1;
    //       } else {
    //         disNum = 0;
    //       }
    //       break;
    //     case "change":
    //       if (isNaN(disNum) || disNum < 1) {
    //         disNum = 0;
    //       } else {
    //         disNum = parseInt(disNum) - goods.skuNum;
    //       }
    //       break;
    //   }
    //   try {
    //     await this.$store.dispatch("addOrUpdateShopCart", {
    //       skuId: goods.skuId,
    //       skuNum: disNum,
    //     });
    //     this.getData();
    //   } catch (error) {}
    // },
    //删除购物车某一产品
    async deleteCartItem(goods) {
      try {
        await this.$store.dispatch("reqDeleteCartItem", goods.skuId);
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
  },
  computed: {
    ...mapGetters(["cartlist"]),
    //购物车数据
    cartInfoList() {
      return this.cartlist.cartInfoList || [];
    },
    totalPrice() {
      let sum = 0;
      this.cartInfoList.forEach((item) => {
        // if(this.cartInfoList.isChecked == 1)
        sum += item.skuNum * item.skuPrice;
      });
      return sum;
    },
    isAllChecked() {
      return this.cartInfoList.every((item) => item.isChecked == 1);
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>