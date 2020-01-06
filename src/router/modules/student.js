/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const studentRouter = {
  path: '/student',
  component: Layout,
  redirect: '/student/studentList',
  name: 'Student',
  meta: {
    title: '成绩查询',
    icon: 'table',
    roles: ['student', 'base']
  },
  children: [
    {
      path: 'studentList',
      component: () => import('@/views/student/studentList'),
      name: 'StudentList',
      meta: { title: '成绩查询' }
    }
  ]
}
export default studentRouter
