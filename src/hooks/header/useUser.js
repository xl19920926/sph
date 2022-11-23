import { onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
export default () => {
  const store = useStore();
  const router = useRouter();
  // 退出登录回调
  const loginOut = async () => {
    // console.log('退出登录');
    // console.log(store);
    try {
      await store.dispatch('userLoginOut');
      router.push('/');
    } catch (error) {
      alert('退出登录失败');
    }
  }
  //组件挂载后请求用户信息
  onMounted(() => {
    store.dispatch('getUserInfo');
  })
  return { store, loginOut }
}