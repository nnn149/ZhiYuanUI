/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const specialityRouter = {
  path: '/speciality',
  component: Layout,
  redirect: '/speciality/specialityList',
  name: 'Speciality',
  meta: {
    title: '专业情况',
    icon: 'table',
    roles: ['school', 'base']
  },
  children: [
    {
      path: 'specialityList',
      component: () => import('@/views/speciality/specialityList'),
      name: 'SpecialityList',
      meta: { title: '专业情况' }
    }
  ]
}
export default specialityRouter
