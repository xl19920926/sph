<script setup>
import { ref, computed, watch, onMounted, nextTick } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import Swiper from "swiper";
const store = useStore();
const route = useRoute();
const router = useRouter();
//放大镜业务逻辑start
//获取模板dom !!注意!!需要使用.value
const preview = ref(null);
const maxbox = ref(null);
const mask = ref(null);
const maxboximg = ref(null);
const skuImageList = computed(
  () => store?.state?.detail?.data?.skuInfo?.skuImageList ?? {}
);
//放大镜事件回调
const zoomEnter = () => {
  // console.log(maxbox.value.style);
  maxbox.value.style.display = "block";
  mask.value.style.display = "block";
};
const zoomMove = (event) => {
  /*
  此处会有元素不断闪烁的现象
  原因是事件源对象在不停的改变所导致
  需要给mask添加css属性pointer-events来阻止其响应事件
  */
  let left = event.offsetX - mask.value.offsetWidth / 2;
  let top = event.offsetY - mask.value.offsetHeight / 2;
  if (event.offsetX - mask.value.offsetWidth / 2 < 0) {
    left = 0;
  } else if (event.offsetX - mask.value.offsetWidth / 2 > preview.value.offsetWidth / 2) {
    left = preview.value.offsetWidth / 2;
  }
  if (event.offsetY - mask.value.offsetHeight / 2 < 0) {
    top = 0;
  } else if (
    event.offsetY - mask.value.offsetHeight / 2 >
    preview.value.offsetHeight / 2
  ) {
    top = preview.value.offsetHeight / 2;
  }
  mask.value.style.left = `${left}px`;
  mask.value.style.top = `${top}px`;
  maxboximg.value.style.left = `${-left * 2}px`;
  maxboximg.value.style.top = `${-top * 2}px`;
};
const zoomLeave = () => {
  maxbox.value.style.display = "none";
  mask.value.style.display = "none";
};
//放大镜业务逻辑end

//加入购物车业务逻辑start
// 商品件数
const skuNum = ref(1);
//用户输入商品数量
const changeSkuNum = (event) => {
  // console.log(typeof event.target.value); string
  let userInput = Number.parseInt(Number(event.target.value));
  // console.log(userInput);
  if (Number.isNaN(userInput) || userInput < 1) {
    alert("请输入正确的数字，并且商品数量不能小于1");
    skuNum.value = 1;
  } else {
    skuNum.value = userInput;
  }
}
// console.log(route.params.skuid, skuNum.value);
//加入购物车按钮回调
const toCart = async () => {
  //dispatch为async函数，异步函数返回的结果为一个promise对象
  //使用try...catch捕获async函数的错误
  try {
    await store.dispatch('updateCart', {
      skuId:route.params.skuid,
      skuNum:skuNum.value
    });
    // console.log('请求成功');
    //如果请求成功  进行路由跳转   将产品数量等参数通过路由传递
    // 复杂的数据使用会话存储传递sessionStorage
    sessionStorage.setItem(
      'skuinfo',
      JSON.stringify(store?.state?.detail?.data?.skuInfo)
    );
    router.push(`/addCart?skuNum=${skuNum.value}`);

  } catch (error) {
    //如果失败  进行提示
    alert('添加购物车失败');
  }
}
//加入购物车业务逻辑end

//侦听放大镜区域数据,初始化swiper
watch(skuImageList, () => {
  //等待dom更新完完初始化swiper
  nextTick(() => {
    new Swiper(".swiper", {
      slidesPerView: 8,
      // 如果需要滚动条
      scrollbar: {
        el: ".swiper-scrollbar",
      },
    });
  });
});
onMounted(() => {
  //派发任务 -> 请求详情页数据
  store.dispatch("getDetailInfo", route.params.skuid);
});
</script>
<template>
  <!-- 主要内容区域 -->
  <section class="con">
    <!-- 导航路径区域 -->
    <div class="conPoin">
      <div class="conPoin">
        <!-- store.getters的数据不分模块直接获取 -->
        <a v-if="store.getters.category1Name">
        {{store.getters.category1Name}}
        </a>
        <a v-if="store.getters.category2Name">
        {{store.getters.category2Name}}
        </a>
        <a v-if="store.getters.category3Name">
        {{store.getters.category3Name}}
        </a>
        <a v-if="store.getters.skuName">
        {{store.getters.skuName}}
        </a>
      </div>
    </div>
    <!-- 主要内容区域 -->
    <div class="mainCon">
      <!-- 左侧放大镜区域 -->
      <div class="previewWrap">
        <!--放大镜效果-->
        <div class="preview">
          <div class="jqzoom" ref="preview" v-on:mouseenter="zoomEnter()" v-on:mousemove="zoomMove($event)"
            v-on:mouseleave="zoomLeave()">
            <img v-bind:src="store?.state?.detail?.data?.skuInfo?.skuDefaultImg" />
          </div>
          <div class="maxbox" ref="maxbox">
            <img ref="maxboximg" v-bind:src="store?.state?.detail?.data?.skuInfo?.skuDefaultImg" />
          </div>
          <div class="mask" ref="mask"></div>
        </div>
        <!--下方的缩略图-->
        <div class="specScroll">
          <!--左按钮-->
          <a class="prev">&lt;</a>
          <!-- 中间可滑动区域 -->
          <div class="items swiper">
            <div class="itemsCon swiper-wrapper">
              <img class="swiper-slide" v-for="item in store?.state?.detail?.data?.skuInfo?.skuImageList"
                v-bind:key="item.id" v-bind:src="item?.imgUrl" />
            </div>
          </div>
          <!--右按钮-->
          <a class="next">&gt;</a>
        </div>
      </div>
      <!-- 右侧选择区域布局 -->
      <div class="InfoWrap">
        <!-- 商品信息 -->
        <div class="goodsDetail">
          <!-- 此处state.skuInfo为undefined 所以访问skuName会报错 -->
          <h3 class="InfoName">
            {{ store?.state?.detail?.data?.skuInfo?.skuName }}
          </h3>
          <p class="news">{{ store?.state?.detail?.data?.skuInfo?.skuDesc }}</p>
        </div>
        <div class="priceArea">
          <div class="priceArea1">
            <div class="title">价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格</div>
            <div class="price">
              <i>¥</i>
              <em>{{ store?.state?.detail?.data?.price }}</em>
              <span>降价通知</span>
            </div>
            <div class="remark">
              <i>累计评价</i>
              <em>65545</em>
            </div>
          </div>
          <div class="priceArea2">
            <div class="title">
              <i>促&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;销</i>
            </div>
            <div class="fixWidth">
              <i class="red-bg">加价购</i>
              <em class="t-gray">满999.00另加20.00元，或满1999.00另加30.00元，或满2999.00另加40.00元，即可在购物车换购热销商品</em>
            </div>
          </div>
        </div>
        <div class="support">
          <div class="supportArea">
            <div class="title">支&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;持</div>
            <div class="fixWidth">以旧换新，闲置手机回收 4G套餐超值抢 礼品购</div>
          </div>
          <div class="supportArea">
            <div class="title">配 送 至</div>
            <div class="fixWidth">广东省 深圳市 宝安区</div>
          </div>
        </div>
        <div class="choose">
          <div class="chooseArea">
            <div class="choosed"></div>
            <dl v-for="skuAttr in store?.state?.detail?.data?.spuSaleAttrList" v-bind:key="skuAttr.id">
              <dt class="title">{{ skuAttr.saleAttrName }}</dt>
              <dd changepirce="0" class="active" v-for="color in skuAttr.spuSaleAttrValueList" v-bind:key="color.id">
                {{ color.saleAttrValueName }}
              </dd>
            </dl>
          </div>
          <div class="cartWrap">
            <div class="controls">
              <input class="itxt" v-model="skuNum" v-on:change="changeSkuNum($event)" />
              <a class="plus" v-on:click="skuNum++">+</a>
              <a class="mins" v-on:click="skuNum > 1 ? skuNum-- : skuNum = 1">-</a>
            </div>
            <div class="add">
              <a v-on:click="toCart()">加入购物车</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 内容详情页 -->
  <section class="productDetail">
    <aside class="aside">
      <div class="tabWraped">
        <h4 class="active">相关分类</h4>
        <h4>推荐品牌</h4>
      </div>
      <div class="tabContent">
        <div class="tab-pane active">
          <ul class="partList">
            <li>手机</li>
            <li>手机壳</li>
            <li>内存卡</li>
            <li>Iphone配件</li>
            <li>贴膜</li>
            <li>手机耳机</li>
            <li>移动电源</li>
            <li>平板电脑</li>
          </ul>
          <ul class="goodsList">
            <li>
              <div class="list-wrap">
                <div class="p-img">
                  <img src="./images/part01.png" />
                </div>
                <div class="attr">Apple苹果iPhone 6s (A1699)</div>
                <div class="price">
                  <em>¥</em>
                  <i>6088.00</i>
                </div>
                <div class="operate">
                  <a href="javascript:void(0);">加入购物车</a>
                </div>
              </div>
            </li>
            <li>
              <div class="list-wrap">
                <div class="p-img">
                  <img src="./images/part02.png" />
                </div>
                <div class="attr">
                  <em>Apple苹果iPhone 6s (A1699)</em>
                </div>
                <div class="price">
                  <strong>
                    <em>¥</em>
                    <i>6088.00</i>
                  </strong>
                </div>
                <div class="operate">
                  <a href="javascript:void(0);">加入购物车</a>
                </div>
              </div>
            </li>
            <li>
              <div class="list-wrap">
                <div class="p-img">
                  <img src="./images/part03.png" />
                </div>
                <div class="attr">
                  <em>Apple苹果iPhone 6s (A1699)</em>
                </div>
                <div class="price">
                  <strong>
                    <em>¥</em>
                    <i>6088.00</i>
                  </strong>
                </div>
                <div class="operate">
                  <a href="javascript:void(0);">加入购物车</a>
                </div>
              </div>
            </li>
            <li>
              <div class="list-wrap">
                <div class="p-img">
                  <img src="./images/part02.png" />
                </div>
                <div class="attr">
                  <em>Apple苹果iPhone 6s (A1699)</em>
                </div>
                <div class="price">
                  <strong>
                    <em>¥</em>
                    <i>6088.00</i>
                  </strong>
                </div>
                <div class="operate">
                  <a href="javascript:void(0);">加入购物车</a>
                </div>
              </div>
            </li>
            <li>
              <div class="list-wrap">
                <div class="p-img">
                  <img src="./images/part03.png" />
                </div>
                <div class="attr">
                  <em>Apple苹果iPhone 6s (A1699)</em>
                </div>
                <div class="price">
                  <strong>
                    <em>¥</em>
                    <i>6088.00</i>
                  </strong>
                </div>
                <div class="operate">
                  <a href="javascript:void(0);">加入购物车</a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="tab-pane">
        <p>推荐品牌</p>
      </div>
    </aside>
    <div class="detail">
      <div class="fitting">
        <h4 class="kt">选择搭配</h4>
        <div class="good-suits">
          <div class="master">
            <img src="./images/l-m01.png" />
            <p>￥5299</p>
            <i>+</i>
          </div>
          <ul class="suits">
            <li class="suitsItem">
              <img src="./images/dp01.png" />
              <p>Feless费勒斯VR</p>
              <label>
                <input type="checkbox" value="39" />
                <span>39</span>
              </label>
            </li>
            <li class="suitsItem">
              <img src="./images/dp02.png" />
              <p>Feless费勒斯VR</p>
              <label>
                <input type="checkbox" value="50" />
                <span>50</span>
              </label>
            </li>
            <li class="suitsItem">
              <img src="./images/dp03.png" />
              <p>Feless费勒斯VR</p>
              <label>
                <input type="checkbox" value="59" />
                <span>59</span>
              </label>
            </li>
            <li class="suitsItem">
              <img src="./images/dp04.png" />
              <p>Feless费勒斯VR</p>
              <label>
                <input type="checkbox" value="99" />
                <span>99</span>
              </label>
            </li>
          </ul>
          <div class="result">
            <div class="num">已选购0件商品</div>
            <div class="price-tit">套餐价</div>
            <div class="price">￥5299</div>
            <button class="addshopcar">加入购物车</button>
          </div>
        </div>
      </div>
      <div class="intro">
        <ul class="tab-wraped">
          <li class="active">
            <a href="###"> 商品介绍 </a>
          </li>
          <li>
            <a href="###"> 规格与包装 </a>
          </li>
          <li>
            <a href="###"> 售后保障 </a>
          </li>
          <li>
            <a href="###"> 商品评价 </a>
          </li>
          <li>
            <a href="###"> 手机社区 </a>
          </li>
        </ul>
        <div class="tab-content">
          <div id="one" class="tab-pane active">
            <ul class="goods-intro">
              <li>分辨率：1920*1080(FHD)</li>
              <li>后置摄像头：1200万像素</li>
              <li>前置摄像头：500万像素</li>
              <li>核 数：其他</li>
              <li>频 率：以官网信息为准</li>
              <li>品牌： Apple</li>
              <li>商品名称：APPLEiPhone 6s Plus</li>
              <li>商品编号：1861098</li>
              <li>商品毛重：0.51kg</li>
              <li>商品产地：中国大陆</li>
              <li>热点：指纹识别，Apple Pay，金属机身，拍照神器</li>
              <li>系统：苹果（IOS）</li>
              <li>像素：1000-1600万</li>
              <li>机身内存：64GB</li>
            </ul>
            <div class="intro-detail">
              <img src="./images/intro01.png" />
              <img src="./images/intro02.png" />
              <img src="./images/intro03.png" />
            </div>
          </div>
          <div id="two" class="tab-pane">
            <p>规格与包装</p>
          </div>
          <div id="three" class="tab-pane">
            <p>售后保障</p>
          </div>
          <div id="four" class="tab-pane">
            <p>商品评价</p>
          </div>
          <div id="five" class="tab-pane">
            <p>手机社区</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 猜你喜欢 -->
  <div class="like">
    <h4 class="kt">猜你喜欢</h4>
    <ul class="like-list">
      <li class="likeItem">
        <div class="p-img">
          <img src="./images/itemlike01.png" />
        </div>
        <div class="attr">
          <em>DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</em>
        </div>
        <div class="price">
          <em>¥</em>
          <i>3699.00</i>
        </div>
        <div class="commit">已有6人评价</div>
      </li>
      <li class="likeItem">
        <div class="p-img">
          <img src="./images/itemlike02.png" />
        </div>
        <div class="attr">Apple苹果iPhone 6s/6s Plus 16G 64G 128G</div>
        <div class="price">
          <em>¥</em>
          <i>4388.00</i>
        </div>
        <div class="commit">已有700人评价</div>
      </li>
      <li class="likeItem">
        <div class="p-img">
          <img src="./images/itemlike03.png" />
        </div>
        <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</div>
        <div class="price">
          <em>¥</em>
          <i>4088.00</i>
        </div>
        <div class="commit">已有700人评价</div>
      </li>
      <li class="likeItem">
        <div class="p-img">
          <img src="./images/itemlike04.png" />
        </div>
        <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</div>
        <div class="price">
          <em>¥</em>
          <i>4088.00</i>
        </div>
        <div class="commit">已有700人评价</div>
      </li>
      <li class="likeItem">
        <div class="p-img">
          <img src="./images/itemlike05.png" />
        </div>
        <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</div>
        <div class="price">
          <em>¥</em>
          <i>4088.00</i>
        </div>
        <div class="commit">已有700人评价</div>
      </li>
      <li class="likeItem">
        <div class="p-img">
          <img src="./images/itemlike06.png" />
        </div>
        <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</div>
        <div class="price">
          <em>¥</em>
          <i>4088.00</i>
        </div>
        <div class="commit">已有700人评价</div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "Detail",
};
</script>
<style scoped lang="less">
.con {
  width: 1200px;
  margin: 15px auto 0;

  .conPoin {
    padding: 9px 15px 9px 0;

    &>a+a:before {
      content: "/\00a0";
      padding: 0 5px;
      color: #ccc;
    }
  }

  .mainCon {
    overflow: hidden;
    margin: 5px 0 15px;

    .previewWrap {
      float: left;
      width: 400px;
      position: relative;

      .preview {
        width: 400px;
        height: 400px;
        border: 1px solid #dfdfdf;

        .jqzoom {
          cursor: pointer;
          width: 400px;
          height: 400px;
          position: relative;

          img {
            width: 100%;
          }
        }

        // 放大镜mask层
        .mask {
          display: none;
          width: 200px;
          height: 200px;
          background: rgba(255, 255, 255, 0.5);
          position: absolute;
          left: 0;
          top: 0;
          border: 1px solid #ddd;
          pointer-events: none;
        }

        // 放大镜盒子
        .maxbox {
          display: none;
          width: 400px;
          height: 400px;
          position: absolute;
          left: 420px;
          top: 0px;
          overflow: hidden;
          z-index: 20;
          border: 1px solid #ddd;

          img {
            position: absolute;
            top: 0;
            left: 0;
            width: 800px;
            height: 800px;
            display: block;
          }
        }
      }

      .specScroll {
        margin-top: 5px;
        width: 400px;
        overflow: hidden;

        .prev,
        .next {
          text-align: center;
          width: 10px;
          height: 54px;
          line-height: 54px;
          border: 1px solid #ccc;
          background: #ebebeb;
          cursor: pointer;
        }

        .prev {
          float: left;
          margin-right: 4px;
        }

        .next {
          float: right;
        }

        .items {
          float: left;
          position: relative;
          width: 372px;
          height: 56px;
          overflow: hidden;

          .itemsCon {
            position: absolute;
            width: 9999px;
            height: 56px;
            left: 0;

            img {
              float: left;
              text-align: center;
              border: 1px solid #ccc;
              padding: 2px;
              width: 50px;
              height: 50px;
              margin-right: 20px;
            }
          }
        }
      }
    }

    .InfoWrap {
      width: 700px;
      float: right;

      .InfoName {
        font-size: 14px;
        line-height: 21px;
        margin-top: 15px;
      }

      .news {
        color: #e12228;
        margin-top: 15px;
      }

      .priceArea {
        background: #fee9eb;
        padding: 7px;
        margin: 13px 0;

        .priceArea1 {
          overflow: hidden;
          line-height: 28px;
          margin-top: 10px;

          .title {
            float: left;
            margin-right: 15px;
          }

          .price {
            float: left;
            color: #c81623;

            i {
              font-size: 16px;
            }

            em {
              font-size: 24px;
              font-weight: 700;
            }

            span {
              font-size: 12px;
            }
          }

          .remark {
            float: right;
          }
        }

        .priceArea2 {
          overflow: hidden;
          line-height: 28px;
          margin-top: 10px;

          .title {
            margin-right: 15px;
            float: left;
          }

          .fixWidth {
            width: 520px;
            float: left;

            .red-bg {
              background: #c81623;
              color: #fff;
              padding: 3px;
            }

            .t-gray {
              color: #999;
            }
          }
        }
      }

      .support {
        border-bottom: 1px solid #ededed;
        padding-bottom: 5px;

        .supportArea {
          overflow: hidden;
          line-height: 28px;
          margin-top: 10px;

          .title {
            margin-right: 15px;
            float: left;
          }

          .fixWidth {
            width: 520px;
            float: left;
            color: #999;
          }
        }
      }

      .choose {
        .chooseArea {
          overflow: hidden;
          line-height: 28px;
          margin-top: 10px;

          .choosed {
            mark {
              height: 30px;
              display: inline-block;
              line-height: 30px;
              background-color: snow;
              border: 1px solid #ddd;
              padding: 0 20px;
              margin-right: 20px;

              a {
                font-size: 12px;
                color: red;
                margin-left: 20px;
                cursor: pointer;
              }
            }
          }

          dl {
            overflow: hidden;
            margin: 13px 0;

            dt {
              margin-right: 15px;
              float: left;
            }

            dd {
              float: left;
              margin-right: 5px;
              color: #666;
              line-height: 24px;
              padding: 2px 14px;
              border-top: 1px solid #eee;
              border-right: 1px solid #bbb;
              border-bottom: 1px solid #bbb;
              border-left: 1px solid #eee;

              &:nth-of-type(1) {
                color: red;
              }
            }
          }
        }

        .cartWrap {
          .controls {
            width: 48px;
            position: relative;
            float: left;
            margin-right: 15px;

            .itxt {
              width: 38px;
              height: 37px;
              border: 1px solid #ddd;
              color: #555;
              float: left;
              border-right: 0;
              text-align: center;
            }

            .plus,
            .mins {
              width: 15px;
              text-align: center;
              height: 17px;
              line-height: 17px;
              background: #f1f1f1;
              color: #666;
              position: absolute;
              right: -8px;
              border: 1px solid #ccc;
              cursor: pointer;
              user-select: none;
            }

            .mins {
              right: -8px;
              top: 19px;
              border-top: 0;
            }

            .plus {
              right: -8px;
            }
          }

          .add {
            float: left;

            a {
              background-color: #e1251b;
              padding: 0 25px;
              font-size: 16px;
              color: #fff;
              height: 36px;
              line-height: 36px;
              display: block;
            }
          }
        }
      }
    }
  }
}

.productDetail {
  width: 1200px;
  margin: 30px auto 0;
  overflow: hidden;

  .aside {
    width: 210px;
    float: left;
    border: 1px solid #ccc;

    .tabWraped {
      height: 40px;

      h4 {
        border-top: 3px solid #fff;
        float: left;
        line-height: 37px;
        width: 105px;
        text-align: center;
        border-bottom: 1px solid #ccc;

        &.active {
          border-top: 3px solid #e1251b;
          border-bottom: 0;
          font-weight: normal;
        }
      }
    }

    .tabContent {
      padding: 10px;

      .tab-pane {
        display: none;

        &.active {
          display: block;
        }

        &:nth-child(1) {
          .partList {
            overflow: hidden;

            li {
              width: 50%;
              float: left;
              border-bottom: 1px dashed #ededed;
              line-height: 28px;
            }
          }

          .goodsList {
            &>li {
              margin: 5px 0 15px;
              border-bottom: 1px solid #ededed;
              padding-bottom: 5px;

              .list-wrap {
                .p-img {
                  text-align: center;

                  img {
                    width: 152px;
                  }
                }

                .price {
                  font-size: 16px;
                  color: #c81623;
                }

                .operate {
                  text-align: center;
                  margin: 5px 0;

                  a {
                    background-color: transparent;
                    border: 1px solid #8c8c8c;
                    color: #8c8c8c;
                    display: inline-block;
                    padding: 2px 14px;
                    line-height: 18px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  .detail {
    width: 980px;
    float: right;

    .fitting {
      border: 1px solid #ddd;
      margin-bottom: 15px;

      .kt {
        border-bottom: 1px solid #ddd;
        background: #f1f1f1;
        color: #333;
        padding: 5px 0 5px 15px;
      }

      .good-suits {
        height: 170px;
        padding-top: 10px;

        .master {
          width: 127px;
          height: 165px;
          text-align: center;
          position: relative;
          float: left;

          img {
            width: 87px;
          }

          p {
            color: #c81623;
            font-size: 16px;
            font-weight: 700;
          }

          i {
            position: absolute;
            top: 48px;
            right: -25px;
            font-size: 16px;
          }
        }

        .suits {
          width: 668px;
          height: 165px;
          float: left;

          .suitsItem {
            float: left;
            width: 127px;
            padding: 0 20px;
            text-align: center;

            img {
              width: 120px;
              height: 130px;
            }

            p {
              font-size: 12px;
            }

            label {
              display: block;
              position: relative;

              input {
                vertical-align: middle;
              }

              span {
                vertical-align: middle;
              }
            }
          }
        }

        .result {
          border-left: 1px solid #ddd;
          width: 153px;
          height: 165px;
          padding-left: 20px;
          float: left;

          .num {
            font-size: 14px;
            margin-bottom: 10px;
            margin-top: 10px;
          }

          .price-tit {
            font-weight: bold;
            margin-bottom: 10px;
          }

          .price {
            color: #b1191a;
            font-size: 16px;
            margin-bottom: 10px;
          }

          .addshopcar {
            background-color: #e1251b;
            border: 1px solid #e1251b;
            padding: 10px 25px;
            font-size: 16px;
            color: #fff;
            display: inline-block;
            box-sizing: border-box;
          }
        }
      }
    }

    .intro {
      .tab-wraped {
        background: #ededed;
        // border: 1px solid #ddd;
        overflow: hidden;

        li {
          float: left;

          &+li>a {
            border-left: 1px solid #ddd;
          }

          &.active {
            a {
              // border: 0;
              background: #e1251b;
              color: #fff;
            }
          }

          a {
            display: block;
            height: 40px;
            line-height: 40px;
            padding: 0 11px;
            text-align: center;
            color: #666;
            background: #fcfcfc;
            border-top: 1px solid #ddd;
            border-bottom: 1px solid #ddd;
          }
        }
      }

      .tab-content {
        .tab-pane {
          display: none;

          &.active {
            display: block;
          }

          &:nth-child(1) {
            .goods-intro {
              padding-left: 10px;

              li {
                margin: 10px 0;
              }
            }

            .intro-detail {
              img {
                width: 100%;
              }
            }
          }
        }
      }
    }
  }
}

.like {
  width: 1198px;
  border: 1px solid #ddd;
  margin: 15px auto;

  .kt {
    border-bottom: 1px solid #ddd;
    background: #f1f1f1;
    color: #333;
    margin: 0;
    padding: 5px 10px;
  }

  .like-list {
    padding: 15px 11px;
    overflow: hidden;

    .likeItem {
      width: 196px;
      float: left;

      .p-img {
        text-align: center;

        img {
          width: 167px;
          height: 123px;
        }
      }

      .attr {
        padding: 0 15px;
      }

      .price {
        padding: 0 15px;
        font-size: 16px;
        color: #c81623;
        margin-bottom: 20px;
      }

      .commit {
        padding: 0 15px;
      }
    }
  }
}
</style>
