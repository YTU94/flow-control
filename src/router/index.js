import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login/login'
import home from '@/components/home/home'
import addFlow from '@/components/home/addFlow'
import approvalDetail from '@/components/home/approvalDetail'
import approval from '@/components/approval/approval'
import lookApproval from '@/components/approval/lookApproval'
import approvalUn from '@/components/approval/state/approvalUn'
import approvalAlready from '@/components/approval/state/approvalAlready'
import approvalOk from '@/components/approval/state/approvalOk'
import approvalAll from '@/components/approval/state/approvalAll'
import personnel from '@/components/personnel/personnel'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      component: home
    },
    {
      path: '/approval',
      component: approval,
      children: [
        {
          path: '/',
          component: approvalUn
        },
        {
          path: 'approvalUn',
          component: approvalUn
        },
        {
          path: 'approvalAlready',
          component: approvalAlready
        },
        {
          path: 'approvalOk',
          component: approvalOk
        },
        {
          path: 'approvalAll',
          component: approvalAll
        }
      ]
    },
    {
      path: '/lookApproval',
      component: lookApproval
    },
    {
      path: '/personnel',
      component: personnel
    },
    {
      path: '/approvalDetail',
      component: approvalDetail
    },
    {
      path: '/addFlow',
      name: 'addFlow',
      component: addFlow
    }
  ]
})
