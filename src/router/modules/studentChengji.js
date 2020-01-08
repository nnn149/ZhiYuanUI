/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const chengjiRouter = {
  path: '/student',
  component: Layout,
  redirect: '/student/chengjiList',
  name: 'Chengji',
  meta: {
    title: '录取结果',
    icon: 'table',
    roles: ['student', 'base']
  },
  children: [
    {
      path: 'studentChengjiList',
      component: () => import('@/views/student/chengjiList'),
      name: 'ChengjiList',
      meta: { title: '录取结果' }
    }
  ]
}
export default chengjiRouter
