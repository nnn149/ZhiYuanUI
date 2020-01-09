/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const schoolYiRouter = {
  path: '/school',
  component: Layout,
  redirect: '/school/schoolYiList',
  name: 'SchoolYi',
  meta: {
    title: '录取结果',
    icon: 'table',
    roles: ['school', 'base']
  },
  children: [
    {
      path: 'schoolYiList',
      component: () => import('@/views/voluntary/voSchoolYiList'),
      name: 'VoSchoolYiList',
      meta: { title: '录取结果' }
    }
  ]
}
export default schoolYiRouter
