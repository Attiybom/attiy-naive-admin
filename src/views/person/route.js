const Layout = () => import('@/layout/index.vue')

export default {
  name: 'Person',
  path: '/person',
  component: Layout,
  redirect: '/person/index',
  isHidden: true,
  meta: {
    title: '个人中心',
    // icon: 'mdi:alert-circle-outline',
    order: 99,
  },
  children: [
    {
      name: 'Index',
      path: 'index',
      component: () => import('./index.vue'),
      meta: {
        title: '个人资料',
        icon: 'mdi:user',
      },
    },
  ],
}
