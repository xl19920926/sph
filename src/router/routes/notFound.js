export default {
    name: 'notFound',
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/NotFound'),
    meta: {
        title: '404',
    }
}