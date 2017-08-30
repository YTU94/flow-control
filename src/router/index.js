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
import roleManage from '@/components/personnel/roleManage'
import roleAdd from '@/components/personnel/roleAdd'
import roleUpdate from '@/components/personnel/roleUpdate'
import memberManage from '@/components/personnel/memberManage'
import memberAdd from '@/components/personnel/memberAdd'
import memberUpdate from '@/components/personnel/memberUpdate'
import materialManage from '@/components/personnel/materialManage'
import materialAdd from '@/components/personnel/materialAdd'
import materialUpdate from '@/components/personnel/materialUpdate'
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
          redirect: 'approvalAll',
          component: approvalAll
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
      name: 'lookApproval',
      component: lookApproval
    },
    {
      path: '/personnel',
      component: personnel
    },
    {
      path: '/roleManage',
      component: roleManage
    },
    {
      path: '/roleAdd',
      name: 'roleAdd',
      component: roleAdd
    },
    {
      path: '/roleUpdate',
      name: 'roleUpdate',
      component: roleUpdate
    },
    {
      path: '/memberAdd',
      component: memberAdd
    },
    {
      path: '/memberUpdate',
      name: 'memberUpdate',
      component: memberUpdate
    },
    {
      path: '/memberManage',
      component: memberManage
    },
    {
      path: '/materialAdd',
      component: materialAdd
    },
    {
      path: '/materialManage',
      component: materialManage
    },
    {
      path: '/materialUpdate',
      component: materialUpdate
    },
    {
      path: '/approvalDetail',
      name: 'approvalDetail',
      component: approvalDetail
    },
    {
      path: '/addFlow',
      name: 'addFlow',
      component: addFlow
    }
  ]
})
