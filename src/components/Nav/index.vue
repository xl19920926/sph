<!-- TypeNav -->
<script setup>
import { useStore } from "vuex";
import useNav from '@/hooks/nav/useNav';
//路由
const store = useStore();
const { currentIndex, toSearch, itemHover, itemLeave } = useNav();

</script>
<template>
  <article>
    <!-- 导航 -->
    <nav class="type-nav" v-show="!$route.meta.navIsShow">
      <div class="container">
        <h2 class="all">全部商品分类</h2>
        <nav class="nav">
          <a href="#">服装城</a>
          <a href="#">美妆馆</a>
          <a href="#">尚品汇超市</a>
          <a href="#">全球购</a>
          <a href="#">闪购</a>
          <a href="#">团购</a>
          <a href="#">有趣</a>
          <a href="#">秒杀</a>
        </nav>
        <div class="sort" v-show="$route.meta.isHome" v-on:click.prevent="toSearch($event)">
          <!-- 1级菜单 -->
          <div class="all-sort-list2" v-for="(categoryList1, index) in store.state.nav.baseCategoryList"
            :key="categoryList1.categoryId">
            <div class="item" :class="{ cur: currentIndex == index }" @mouseenter="itemHover(index)"
              @mouseleave="itemLeave(index)">
              <h3>
                <a href="#" :data-categoryName="categoryList1.categoryName"
                  :data-category1Id="categoryList1.categoryId">
                  {{ categoryList1.categoryName }}
                </a>
              </h3>
              <div class="item-list clearfix" :style="{ display: currentIndex == index ? 'block' : 'none' }">
                <div class="subitem">
                  <!-- 2级菜单 -->
                  <dl class="fore" v-for="categoryList2 in categoryList1.categoryChild" :key="categoryList2.categoryId">
                    <dt>
                      <a href="#" :data-categoryName="categoryList2.categoryName"
                        :data-category2Id="categoryList2.categoryId">
                        {{ categoryList2.categoryName }}
                      </a>
                    </dt>
                    <dd>
                      <!-- 3级菜单 -->
                      <em v-for="categoryList3 in categoryList2.categoryChild" :key="categoryList3.categoryId">
                        <a href="#" :data-categoryName="categoryList3.categoryName"
                          :data-category3Id="categoryList3.categoryId">
                          {{ categoryList3.categoryName }}
                        </a>
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </article>
</template>
<script>
export default {
  name: "Nav"
};
</script>
<style scoped lang="less">
article {

  /* 导航 */
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
        background: #fafafa;
        z-index: 999;

        .all-sort-list2 {
          .item {
            h3 {
              line-height: 28px;
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

          .cur {
            background: skyblue;
          }
        }
      }
    }
  }
}
</style>