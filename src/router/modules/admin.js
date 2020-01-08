/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const adminRouter = {
  path: '/admin',
  component: Layout,
  redirect: '/admin/adminList',
  name: 'Admin',
  meta: {
    title: '志愿审核',
    icon: 'table',
    roles: ['ksy', 'base']
  },
  children: [
    {
      path: 'adminList',
      component: () => import('@/views/voluntary/voAdminList'),
      name: 'AdminList',
      meta: { title: '志愿审核' }
    }
  ]
}
export default adminRouter
