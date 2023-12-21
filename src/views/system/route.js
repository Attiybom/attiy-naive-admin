const Layout = () => import('@/layout/index.vue')

export default {
  name: 'System',
  path: '/system',
  component: Layout,
  redirect: '/system/role',
  meta: {
    title: '系统管理',
    icon: 'mdi:grid',
    role: ['SUPER_ADMIN'],
    requireAuth: true,
    order: 3,
  },
  children: [
    {
      name: 'Role',
      path: 'role',
      component: () => import('./role/index.vue'),
      meta: {
        title: '角色管理',
        icon: 'mdi:user',
        role: ['SUPER_ADMIN'],
        requireAuth: true,
        keepAlive: true,
      },
    },
    {
      name: 'User',
      path: 'user',
      component: () => import('./user/index.vue'),
      meta: {
        title: '用户管理',
        icon: 'mdi:users',
        role: ['SUPER_ADMIN'],
        requireAuth: true,
        keepAlive: true,
      },
    },
  ],
}
