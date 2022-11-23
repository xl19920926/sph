<script setup>
import { onMounted, reactive } from "vue";
import Swiper from "swiper";
import "swiper/css/swiper.css";
//父组件传入的props数据
const state = reactive({
  bannerId: `#floorSwiper${props.data.id}`,
});
const props = defineProps({
  data: Object,
});
// console.log(props.data);
onMounted(() => {
  // console.log(document.getElementById("#floorSwiper001"));
  // setTimeout(() => {
  //     // querySelector无法获取动态id
  //     console.log(document.querySelector("#floorSwiper001"));
  // }, 5000)
  const swiper = new Swiper(document.getElementById(state.bannerId), {
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
</script>
<template>
  <article class="floor">
    <div class="py-container">
      <div class="title clearfix">
        <h3 class="fl">{{ props.data.name }}</h3>
        <div class="fr">
          <ul class="nav-tabs clearfix">
            <li class="active" v-for="(navList, index) in props.data.navList" v-bind:key="index">
              <a href="#" data-toggle="tab">{{ navList.text }}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="tab-content">
        <div class="tab-pane">
          <div class="floor-1">
            <div class="blockgary">
              <ul class="jd-list">
                <li v-for="(keyword, index) in props.data.keywords" v-bind:key="index">
                  {{ keyword }}
                </li>
              </ul>
              <img v-bind:src="require(`${props.data.imgUrl}`)" />
            </div>
            <div class="floorBanner">
              <div class="swiper-container" v-bind:id="state.bannerId">
                <div class="swiper-wrapper">
                  <div class="swiper-slide">
                    <img src="./images/floor-1-b01.png" />
                  </div>
                  <div class="swiper-slide">
                    <img src="./images/floor-1-b02.png" />
                  </div>
                  <div class="swiper-slide">
                    <img src="./images/floor-1-b03.png" />
                  </div>
                </div>
                <!-- 如果需要分页器 -->
                <div class="swiper-pagination"></div>

                <!-- 如果需要导航按钮 -->
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
              </div>
            </div>
            <div class="split">
              <span class="floor-x-line"></span>
              <div class="floor-conver-pit">
                <img v-bind:src="require(`${props.data.recommendList[0]}`)" />
              </div>
              <div class="floor-conver-pit">
                <img v-bind:src="require(`${props.data.recommendList[1]}`)" />
              </div>
            </div>
            <div class="split center">
              <img v-bind:src="require(`${props.data.bigImg}`)" />
            </div>
            <div class="split">
              <span class="floor-x-line"></span>
              <div class="floor-conver-pit">
                <img v-bind:src="require(`${props.data.recommendList[2]}`)" />
              </div>
              <div class="floor-conver-pit">
                <img v-bind:src="require(`${props.data.recommendList[3]}`)" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>
<script>
export default {
  name: "Floor",
};
</script>
<style lang="less" scoped>
.floor {
  margin-top: 15px;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .title {
      .fl {
        float: left;
        color: #c81623;
        font-size: 20px;
        line-height: 30px;
        margin: 9px 0;
        font-weight: 700;
      }

      .fr {
        float: right;

        .nav-tabs {
          margin: 10px 0 0;
          display: inline-block;

          li {
            float: left;
            line-height: 18px;

            a {
              padding-top: 1px;
              font-weight: 400;
              background-color: #fff;

              &::after {
                content: "|";
                padding: 0 10px;
              }
            }

            &:nth-child(7) {
              a {
                &::after {
                  content: "";
                }
              }
            }

            &.active {
              a {
                color: #e1251b;
              }
            }
          }
        }
      }
    }

    .tab-content {
      border-top: 2px solid #c81623;
      border-bottom: 1px solid #e4e4e4;

      .tab-pane {
        .floor-1 {
          height: 360px;
          display: flex;

          .blockgary {
            width: 210px;
            height: 100%;
            background: #f7f7f7;

            .jd-list {
              padding: 15px 0;
              overflow: hidden;

              li {
                list-style-type: none;
                float: left;
                width: 40%;
                margin: 0 10px;
                border-bottom: 1px solid #e4e4e4;
                text-align: center;
                line-height: 26px;
              }
            }

            img {
              width: 100%;
            }
          }

          .floorBanner {
            width: 330px;
            height: 100%;
          }

          .split {
            width: 220px;
            height: 100%;
            position: relative;

            .floor-x-line {
              position: absolute;
              background: #e4e4e4;
              width: 220px;
              height: 1px;
              top: 180px;
            }

            .floor-conver-pit {
              width: 100%;
              height: 50%;

              img {
                width: 100%;
                height: 100%;
                transition: all 400ms;

                &:hover {
                  opacity: 0.8;
                }
              }
            }
          }

          .center {
            border: 1px solid #e4e4e4;
          }
        }
      }
    }
  }
}
</style>
