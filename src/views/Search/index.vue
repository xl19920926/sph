<!-- Search组件 -->
<script setup>
  import { reactive, onMounted, computed, getCurrentInstance} from "vue";
  import { useRouter, useRoute } from "vue-router";
  import { mapState, useStore } from "vuex";
  import usePagnation from "@/hooks/search/usePagnation.js";
  //props
  // const props = defineProps(['pageNo', 'pageSize', 'total', 'continues']);
  //引入仓库
  const store = useStore();
  //引入路由
  const route = useRoute();
  const router = useRouter();
  //映射仓库
  const state = computed(() => store.state.search.searchData);
  //分页器逻辑hook
  const { pageNo, pageNumStart, pageNumEnd, changePage, subPage, nextPage } = usePagnation();
  //生命周期钩子
  onMounted(() => {
    //search组件挂载后，派发任务，获取搜索页数据
    store.dispatch("getSearchData", {
      //传递参数
      categoryname: route.query.categoryName,
      category1Id: route.query.category1Id,
      category2Id: route.query.category2Id,
      category3Id: route.query.category3Id,
      keyword: route.query.keyword,
      pageNo: 1
    });
  });
</script>
<template>
  <article class="main">
    <div class="py-container">
      <!-- 面包屑 -->
      <div class="bread">
        <ul class="fl sui-breadcrumb">
          <li>
            <a>全部结果</a>
          </li>
        </ul>
        <ul class="fl sui-tag">
          <li class="with-x" v-if="route.query.keyword">
            {{ route.query.keyword }}<span>×</span>
          </li>
          <li class="with-x" v-if="route.query.categoryName">
            {{ route.query.categoryName }}<i><span>×</span></i>
          </li>
          <!-- <li class="with-x" v-else="route.query.categoryId">{{route.query.categoryId}}<i><span>×</span></i></li> -->
          <!-- <li class="with-x" v-else="">OPPO<i><span>×</span></i></li> -->
        </ul>
      </div>
      <!-- 循环品牌列表 -->
      <div class="clearfix selector">
        <div class="type-wrap logo">
          <div class="fl key brand">品牌</div>
          <div class="value logos">
            <ul class="logo-list">
              <!-- v-for -->
              <li v-for="trademark in state.trademarkList" :key="trademark.tmId">
                {{ trademark.tmName }}
              </li>
              <!-- 
                  <li><img src="./images/phone06.png" /></li>
                  <li><img src="./images/phone07.png" /></li>
                  <li><img src="./images/phone08.png" /></li>
                  <li><img src="./images/phone09.png" /></li>
                  <li><img src="./images/phone10.png" /></li>
                  <li><img src="./images/phone11.png" /></li>
                  <li><img src="./images/phone12.png" /></li>
                  <li><img src="./images/phone12.png" /></li>
                  <li><img src="./images/phone14.png" /></li>
                  <li><img src="./images/phone01.png" /></li>
                  <li><img src="./images/phone06.png" /></li>
                  <li><img src="./images/phone07.png" /></li>
                  <li><img src="./images/phone02.png" /></li> 
              -->
            </ul>
          </div>
          <div class="ext">
            <a href="javascript:void(0);" class="sui-btn">多选</a>
            <a href="javascript:void(0);">更多</a>
          </div>
        </div>
        <!-- 循环属性列表 -->
        <div class="type-wrap" v-for="attr in state.attrsList" v-bind:key="attr.attrId">
          <div class="fl key">{{ attr.attrName }}</div>
          <div class="fl value">
            <ul class="type-list">
              <li v-for="(attrValue, index) in attr.attrValueList" v-bind:key="index">
                <a>{{ attrValue }}</a>
              </li>
            </ul>
          </div>
          <div class="fl ext"></div>
        </div>
      </div>
      <!--排序操作按钮-->
      <div class="details clearfix">
        <div class="sui-navbar">
          <div class="navbar-inner filter">
            <ul class="sui-nav">
              <!-- 激活的样式类名 -->
              <li class="active">
                <a>综合</a>
              </li>
              <li>
                <a>销量</a>
              </li>
              <li>
                <a>新品</a>
              </li>
              <li>
                <a>评价</a>
              </li>
              <li>
                <a>价格⬆</a>
              </li> 
              <li>
                <a>价格⬇</a>
              </li>
            </ul>
          </div>
        </div>
        <!-- 商品列表 -->
        <div class="goods-list">
          <ul class="yui3-g">
            <!-- 循环展示商品 -->
            <li
              class="yui3-u-1-5"
              v-for="(good, index) in state.goodsList"
              :key="index"  v-on:click="router.push(`/detail/${good.id}`)"
            >
              <div class="list-wrap">
                <div class="p-img">
                  <a>
                    <img :src="good.defaultImg" />
                  </a>
                </div>
                <div class="price">
                  <strong>
                    <em>¥</em>&nbsp;&nbsp;
                    <i>{{ good.price }}</i>
                  </strong>
                </div>
                <div class="attr">
                  <a
                    title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                  >
                    {{ good.title }}
                  </a>
                </div>
                <div class="commit">
                  <i class="command"
                    >已有<span>{{ Math.ceil(Math.random() * 1000) }}</span
                    >人评价</i
                  >
                </div>
                <div class="operate">
                  <a
                    href="success-cart.html"
                    target="_blank"
                    class="sui-btn btn-bordered btn-danger"
                    >加入购物车</a
                  >
                  <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <!-- 分页器 -->
        <div class="fr page">
          <div class="sui-pagination clearfix">
            <div></div>
            <ul>
              <li
                class="prev"
                v-bind:class="{disabled: store.state.search.searchData.pageNo == 1}"
                v-on:click=""
              >
                <a v-on:click="subPage(pageNo - 1)">«上一页</a>
              </li>
              <li
                v-if="store.state.search.searchData.pageNo > 3"
                v-on:click="changePage(1)"
              >
                <a href="#">1</a>
              </li>
              <li v-if="store.state.search.searchData.pageNo > 4" class="dotted"><span>...</span></li>
              <template v-for="(page, index) in pageNumEnd" v-bind:key="index">
                <li
                  v-if="page > pageNumEnd - 5" 
                  v-bind:class="{active: page == pageNo}"
                  v-on:click="changePage(page)"
                >
                  <a>{{page}}</a>
                </li>
              </template>
              <li
                v-if="store.state.search.searchData.pageNo < store.state.search.searchData.total - 3" 
                class="dotted"
              >
                <span>...</span>
              </li>
              <li
                v-if="store.state.search.searchData.pageNo < store.state.search.searchData.total - 2"
              >
                <a v-on:click="changePage(state.total)">{{state.total}}</a>
              </li>
              <li class="next" v-bind:class="{disabled: store.state.search.searchData.pageNo == state.total}">
                <a v-on:click="nextPage(pageNo + 1, state.total)">下一页»</a>
              </li>
            </ul>
            <div style="box-sizing: border-box;padding-left: 20px;height: 38px;line-height: 38px;">
              <span style="">共{{ state.total }}页</span>
            </div>
          </div>
        </div>
      </div>
      <!--hotsale-->
      <div class="clearfix hot-sale">
        <h4 class="title">热卖商品</h4>
        <div class="hot-list">
          <ul class="yui3-g">
            <li class="yui3-u-1-4">
              <div class="list-wrap">
                <div class="p-img">
                  <img src="./images/like_01.png" />
                </div>
                <div class="attr">
                  <em>Apple苹果iPhone 6s (A1699)</em>
                </div>
                <div class="price">
                  <strong>
                    <em>¥</em>
                    <i>4088.00</i>
                  </strong>
                </div>
                <div class="commit">
                  <i class="command">已有700人评价</i>
                </div>
              </div>
            </li>
            <li class="yui3-u-1-4">
              <div class="list-wrap">
                <div class="p-img">
                  <img src="./images/like_03.png" />
                </div>
                <div class="attr">
                  <em>金属A面，360°翻转，APP下单省300！</em>
                </div>
                <div class="price">
                  <strong>
                    <em>¥</em>
                    <i>4088.00</i>
                  </strong>
                </div>
                <div class="commit">
                  <i class="command">已有700人评价</i>
                </div>
              </div>
            </li>
            <li class="yui3-u-1-4">
              <div class="list-wrap">
                <div class="p-img">
                  <img src="./images/like_04.png" />
                </div>
                <div class="attr">
                  <em>256SSD商务大咖，完爆职场，APP下单立减200</em>
                </div>
                <div class="price">
                  <strong>
                    <em>¥</em>
                    <i>4068.00</i>
                  </strong>
                </div>
                <div class="commit">
                  <i class="command">已有20人评价</i>
                </div>
              </div>
            </li>
            <li class="yui3-u-1-4">
              <div class="list-wrap">
                <div class="p-img">
                  <img src="./images/like_02.png" />
                </div>
                <div class="attr">
                  <em>Apple苹果iPhone 6s (A1699)</em>
                </div>
                <div class="price">
                  <strong>
                    <em>¥</em>
                    <i>4088.00</i>
                  </strong>
                </div>
                <div class="commit">
                  <i class="command">已有700人评价</i>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </article>
</template>
<script>
  export default {
    name: "Search"
  };
</script>
<style scoped lang="less">
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
      .selector {
        border: 1px solid #ddd;
        margin-bottom: 5px;
        overflow: hidden;
        .logo {
          border-top: 0;
          margin: 0;
          position: relative;
          overflow: hidden;
          .key {
            padding-bottom: 87px !important;
          }
        }
        .type-wrap {
          margin: 0;
          position: relative;
          border-top: 1px solid #ddd;
          overflow: hidden;
          .key {
            width: 100px;
            background: #f1f1f1;
            line-height: 26px;
            text-align: right;
            padding: 10px 10px 0 15px;
            float: left;
          }
          .value {
            overflow: hidden;
            padding: 10px 0 0 15px;
            color: #333;
            margin-left: 120px;
            padding-right: 90px;
            .logo-list {
              li {
                float: left;
                border: 1px solid #e4e4e4;
                margin: -1px -1px 0 0;
                width: 105px;
                height: 52px;
                text-align: center;
                line-height: 52px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-weight: 700;
                color: #e1251b;
                font-style: italic;
                font-size: 14px;
                img {
                  max-width: 100%;
                  vertical-align: middle;
                }
              }
            }
            .type-list {
              li {
                float: left;
                display: block;
                margin-right: 30px;
                line-height: 26px;
                a {
                  text-decoration: none;
                  color: #666;
                }
              }
            }
          }
          .ext {
            position: absolute;
            top: 10px;
            right: 10px;
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
              padding: 0 10px;
              background: #fff;
              border: 1px solid #d5d5d5;
            }
            a {
              color: #666;
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
                  cursor: pointer;
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
                      margin-left: -5px;
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
          display: flex;
          // justify-content: center;
          width: 100%;
          height: 66px;
          overflow: hidden;
          // float: right;
          .sui-pagination {
            display: flex;
            justify-content: center;
            margin: 18px 0;
            width: 100%;
            ul {
              // align-self: center;
              margin-left: 0;
              margin-bottom: 0;
              vertical-align: middle;
              // float: left;
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
                  cursor: pointer;
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
      .hot-sale {
        margin-bottom: 5px;
        border: 1px solid #ddd;
        .title {
          font-weight: 700;
          font-size: 14px;
          line-height: 21px;
          border-bottom: 1px solid #ddd;
          background: #f1f1f1;
          color: #333;
          margin: 0;
          padding: 5px 0 5px 15px;
        }
        .hot-list {
          padding: 15px;
          ul {
            display: flex;
            li {
              width: 25%;
              height: 100%;
              .list-wrap {
                .p-img,
                .price,
                .attr,
                .commit {
                  padding-left: 15px;
                }
                .p-img {
                  img {
                    max-width: 100%;
                    vertical-align: middle;
                    border: 0;
                  }
                }
                .attr {
                  width: 85%;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;
                  overflow: hidden;
                  margin-bottom: 8px;
                  min-height: 38px;
                  cursor: pointer;
                  line-height: 1.8;
                }
                .price {
                  font-size: 18px;
                  color: #c81623;
                  strong {
                    font-weight: 700;
                    i {
                      margin-left: -5px;
                    }
                  }
                }
                .commit {
                  height: 22px;
                  font-size: 13px;
                  color: #a7a7a7;
                }
              }
            }
          }
        }
      }
    }
  }
</style>