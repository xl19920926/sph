export default {
    name: 'search',
    // ?代表可有可无
    path: '/search/:keyword?',
    component: () => import('@/views/Search'),
    meta: {
        title: '搜索',
    }
}