import { computed } from "vue";
import { useRoute } from "vue-router";
export default () => {
  const route = useRoute();
  const skuInfo = computed(() => JSON.parse(sessionStorage.getItem('skuinfo')));
  return {
    route,
    skuInfo
  }
}