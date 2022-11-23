<!-- banner -->
<script setup>
import { nextTick, onMounted, reactive, watch } from "vue";
import Swiper from "swiper";
import "swiper/css/swiper.css";
const state = reactive({
  bannerList: null,
});
onMounted(() => {
  // 请求banner数据(mock)
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.status == 200 && xhr.readyState == 4) {
      // console.log(JSON.parse(xhr.response).data);
      state.bannerList = JSON.parse(xhr.response).data;
    }
  };
  xhr.open("get", "mock/banner");
  xhr.send();
  // 方法1(不完美) 因为new swiper时  请求还没返回  页面还没渲染完成
  // setTimeout(() => {
  //     const swiper = new Swiper(document.querySelector("#mySwiper"), {
  //         loop: true,
  //         pagination: {
  //             el: '.swiper-pagination'
  //         },
  //         navigation: {
  //             nextEl: ".swiper-button-next",
  //             prevEl: ".swiper-button-prev",
  //         },
  //     });
  // }, 1000);
});
/*
            方法2(完美) 因为new swiper时  请求还没返回  页面还没渲染完成 
            使用nextTick将new swiper推迟到循环bannerDom完成后执行
            此时页面Dom已经存在
        */
watch(
  () => state.bannerList,
  (newValue, oldValue) => {
    // console.log(newValue);
    // console.log(oldValue);
    // console.log('bannerList修改了');
    nextTick(() => {
      const swiper = new Swiper(document.querySelector("#mySwiper"), {
        autoplay: { delay: 2000, disableOnInteraction: false },
        loop: true,
        pagination: {
          el: ".swiper-pagination",
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
    });
  }
);
</script>
<template>
  <!-- banner -->
  <article class="list-container">
    <div class="sortList clearfix">
      <div class="center">
        <!--swiper轮播-->
        <div class="swiper-container" id="mySwiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="banner of state.bannerList" v-bind:key="banner.id">
              <img v-bind:src="require(`${banner.imgUrl}`)" />
            </div>
          </div>
          <!-- 分页器 -->
          <div class="swiper-pagination"></div>

          <!-- 导航按钮 -->
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </div>
      </div>
      <div class="right">
        <div class="news">
          <h4>
            <em class="fl">尚品汇快报</em>
            <span class="fr tip">更多 ></span>
          </h4>
          <div class="clearix"></div>
          <ul class="news-list unstyled">
            <li>
              <span class="bold">[特惠]</span>备战开学季
              全民半价购数码
            </li>
            <li>
              <span class="bold">[公告]</span>备战开学季
              全民半价购数码
            </li>
            <li>
              <span class="bold">[特惠]</span>备战开学季
              全民半价购数码
            </li>
            <li>
              <span class="bold">[公告]</span>备战开学季
              全民半价购数码
            </li>
            <li>
              <span class="bold">[特惠]</span>备战开学季
              全民半价购数码
            </li>
          </ul>
        </div>
        <ul class="lifeservices">
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">话费</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">机票</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">电影票</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">游戏</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">彩票</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">加油站</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">酒店</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">火车票</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">众筹</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">理财</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">礼品卡</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">白条</span>
          </li>
        </ul>
        <div class="ads">
          <img src="./images/ad1.png" />
        </div>
      </div>
    </div>
  </article>
</template>
<script>
export default {
  name: "Banner"
};
</script>
<style lang="less" scoped>
/* banner */
.list-container {
  width: 1200px;
  margin: 0 auto;

  .sortList {
    height: 464px;
    padding-left: 210px;

    .center {
      box-sizing: border-box;
      width: 740px;
      height: 100%;
      padding: 5px;
      float: left;
    }

    .right {
      float: left;
      width: 250px;

      .news {
        border: 1px solid #e4e4e4;
        margin-top: 5px;

        h4 {
          border-bottom: 1px solid #e4e4e4;
          padding: 5px 10px;
          margin: 5px 5px 0;
          line-height: 22px;
          overflow: hidden;
          font-size: 14px;

          .fl {
            float: left;
          }

          .fr {
            float: right;
            font-size: 12px;
            font-weight: 400;
          }
        }

        .news-list {
          padding: 5px 15px;
          line-height: 26px;

          .bold {
            font-weight: 700;
          }
        }
      }

      .lifeservices {
        border-right: 1px solid #e4e4e4;
        overflow: hidden;
        display: flex;
        flex-wrap: wrap;

        .life-item {
          border-left: 1px solid #e4e4e4;
          border-bottom: 1px solid #e4e4e4;
          margin-right: -1px;
          height: 64px;
          text-align: center;
          position: relative;
          cursor: pointer;
          width: 25%;

          .list-item {
            background-image: url(./images/icons.png);
            width: 61px;
            height: 40px;
            display: block;
          }

          .service-intro {
            line-height: 22px;
            width: 60px;
            display: block;
          }

          &:nth-child(1) {
            .list-item {
              background-position: 0px -5px;
            }
          }

          &:nth-child(2) {
            .list-item {
              background-position: -62px -5px;
            }
          }

          &:nth-child(3) {
            .list-item {
              background-position: -126px -5px;
            }
          }

          &:nth-child(4) {
            .list-item {
              background-position: -190px -5px;
            }
          }

          &:nth-child(5) {
            .list-item {
              background-position: 0px -76px;
            }
          }

          &:nth-child(6) {
            .list-item {
              background-position: -62px -76px;
            }
          }

          &:nth-child(7) {
            .list-item {
              background-position: -126px -76px;
            }
          }

          &:nth-child(8) {
            .list-item {
              background-position: -190px -76px;
            }
          }

          &:nth-child(9) {
            .list-item {
              background-position: 0px -146px;
            }
          }

          &:nth-child(10) {
            .list-item {
              background-position: -62px -146px;
            }
          }

          &:nth-child(11) {
            .list-item {
              background-position: -126px -146px;
            }
          }

          &:nth-child(12) {
            .list-item {
              background-position: -190px -146px;
            }
          }
        }
      }

      .ads {
        margin-top: 5px;

        img {
          opacity: 0.8;
          transition: all 400ms;

          &:hover {
            opacity: 1;
          }
        }
      }
    }
  }
}
</style>