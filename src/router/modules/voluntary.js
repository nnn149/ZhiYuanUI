/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const voluntaryRouter = {
  path: '/voluntary',
  component: Layout,
  redirect: '/voluntary/voluntaryList',
  name: 'Voluntary',
  meta: {
    title: '志愿填报',
    icon: 'table',
    roles: ['admin', 'vip']
  },
  children: [
    {
      path: 'voluntaryList',
      component: () => import('@/views/voluntary/voluntaryList'),
      name: 'VoluntaryList',
      meta: { title: '志愿填报' }
    }
  ]
}
export default voluntaryRouter
