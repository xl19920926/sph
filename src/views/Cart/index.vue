<script setup>
import { onMounted } from 'vue';
import { useStore } from 'vuex';
const store = useStore();
/*
此处碰到问题，页面的数据并没有在操作后变化,
原因：网络请求存在延迟，如果操作完接口后立即调用store.dispatch('getCartList')的话，
此时仓库数据是还没有回来的,
已解决store.dispatch('getCartList')操作应该放在修改的接口中的异步操作之后执行，
而不应该放在组件中的同步操作中
*/
//操作购物车逻辑
const changeNum = (event, type, disNum, cart) => {
  // 根据传入的type分别是何种操作;
  // 减少操作
  if (type == 'mins') {
    // console.log(cart.skuNum);
    // 如果大于1 则给服务器传-1
    if (cart.skuNum > 1) {
      store.dispatch('updateCartList', { skuId: cart.skuId, skuNum: -1 });
    }
    // 如果小于1 则给服务器传0
    else {
      store.dispatch('updateCartList', { skuId: cart.skuId, skuNum: 0 });
    }
  }
  //增加操作
  else if (type == 'plus') {
    // console.log(cart.skuNum);
    store.dispatch('updateCartList', { skuId: cart.skuId, skuNum: 1 });
  }
  //用户自定义数量
  else {
    // console.log(cart.skuNum);
    // 还需判断用户是否输入为非法数字;
    if (Number.isNaN(Number(event.target.value)) || Number(event.target.value) < 1) {
      alert('请输入正确的数量');
      return;
    }
    store.dispatch('updateCartList', { skuId: cart.skuId, skuNum: Number(event.target.value) - cart.skuNum });
  }
}
//删除操作
const deleteCart = (skuId) => {
  store.dispatch('deleteCartList', skuId);
}
//改变勾选状态
const changeCheck = (event, skuId) => {
  //事件对象的ischeck的布尔值  true = 1，false = 0
  let checked = event.target.checked ? '1' : '0';
  store.dispatch('changeChecked', { skuId, checked });
}
//删除所有勾选
const deleteAllCheck = () => {
  store.dispatch('deleteAll');
}
//全部勾选or不勾选
const changeAllChecked = (event) => {
  // console.log(event.target.checked);
  store.dispatch('checkAll', { checked: event.target.checked });
}
//组件挂载完成后发送请求，获取购车数据
onMounted(() => {
  store.dispatch('getCartList');
})
</script>
<template>
  <article class="cart">
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
        <ul class="cart-list" v-for="item in store.state.cart.cartInfoList" v-bind:key="item.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" v-bind:checked="item.isChecked == 1"
              v-on:change="changeCheck($event, item.skuId)" />
          </li>
          <li class="cart-list-con2">
            <img v-bind:src="item.imgUrl" />
            <div class="item-msg">
              {{ item.skuName }}
            </div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ item.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a class="mins" v-on:click="changeNum($event, 'mins', -1, item)">-</a>
            <input type="text" v-bind:value="item.skuNum" class="itxt"
              v-on:change="changeNum($event, 'input', null, item)" />
            <a class="plus" v-on:click="changeNum($event, 'plus', 1, item)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ item.skuPrice * item.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" v-on:click="deleteCart(item.skuId)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <!-- 全部勾选还有一个bug(单个取消勾选后因取消勾选) -->
        <input class="chooseAll" type="checkbox" v-bind:checked="store.state.cart.cartInfoList?.length > 0"
          v-on:change="changeAllChecked($event)" />
        <span>全选</span>
      </div>
      <div class="option">
        <a v-on:click="deleteAllCheck()">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">0</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </article>
</template>
<script>
export default {
  name: 'Cart',
};
</script>
<style scoped lang="less">
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

      &>div {
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

        &>li {
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

        // .cart-list-con3 {
        //     width: 20.8333%;
        //     .item-txt {
        //         text-align: center;
        //     }
        // }
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
            cursor: pointer;
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