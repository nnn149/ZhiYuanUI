/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const schoolRouter = {
  path: '/school',
  component: Layout,
  redirect: '/school/schoolList',
  name: 'School',
  meta: {
    title: '志愿列表',
    icon: 'table',
    roles: ['school', 'base']
  },
  children: [
    {
      path: 'schoolList',
      component: () => import('@/views/voluntary/voSchoolList'),
      name: 'SchoolList',
      meta: { title: '志愿列表' }
    }
  ]
}
export default schoolRouter
