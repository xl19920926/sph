/**
 * 应用主程序
 */
import { createApp } from 'vue';
//路由
import Router from '@/router';
//仓库
import Store from '@/store';
//根组件
import App from './App.vue';
//全局组件
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import Pagination from '@/components/Pagination';
//引入图片懒加载插件
import VueLazyload from 'vue-lazyload';
//引入element-plus(完整导入)
import ElementPlus from 'element-plus';
//element-plus样式文件
import 'element-plus/dist/index.css';
//swiper
import "swiper/css/swiper.css";
//mock  (json,图片等资源默认对外导出)
import '@/mock';
//创建应用实例
const app = createApp(App);
//注册全局组件
app.component(Header.name, Header);
app.component(Footer.name, Footer);
app.component(Nav.name, Nav);
app.component(Pagination.name, Pagination);
//挂载路由
app.use(Router);
//挂载仓库
app.use(Store);
//挂载element-plus
app.use(ElementPlus);
//挂载懒加载插件
app.use(VueLazyload, {
  //加载时的默认图片
  loading: ''
})
app.mount('#app');