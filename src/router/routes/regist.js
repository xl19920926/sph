export default {
    name: 'regist',
    path: '/regist',
    component: () => import('@/views/Regist'),
    meta: {
        title: '注册',
        auth: true,
        navIsShow: true
    }
}