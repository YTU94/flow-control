<template>
  <div class="home">
    <div class="header border-bottom">
      远航一卡通管理系统
    </div>
    <div class="main-body">
      <router-link tag="div"  class="task" v-bind:class="{ bgBlue: parseInt(index) % 2 === 1 }" :to="{name: 'approvalDetail', params: {name: item.pname, id: item.id, nodeArray: item.nodeArray, start: item.start}}" v-for="(item, index) in approvalList" :key="item.index">
        <p class="line-h">名称: {{item.pname}}</p>
        <p class="line-h">审批流程: </p>
        <p>{{item.nodeArray}}</p>  
      </router-link>
      <div class="add-btn" v-show="auth_5 === '5'">
        <router-link to="/addFlow" tag="div">
          <i class="iconfont icon-jia"></i>添加流程          
        </router-link>
      </div>
    </div> 
    <m-footer></m-footer> 
  </div>
</template>

<script>
import MFooter from 'components/m-footer/m-footer'
import api from 'api/api'
export default {
  components: {
    MFooter
  },
  data () {
    return {
      approvalList: [],
      auth_5: sessionStorage.auth_5
    }
  },
  created() {
    // 获取审批流程
    api.getApproval(sessionStorage.id, sessionStorage.token)
      .then(res => {
        if (res.code === 200) {
          this.approvalList = res.message
        } else {
          console.log('出错啦')
        }
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    // 添加审批
    _addApprovla() {
      api.addApprovla()
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/stylus/variable'
  .line-h
    line-height 1.6!important
  .bgBlue
    background-color $color-background-blue
  .home
    color: $color-text-d
    .header
      height 1.173333rem
      line-height 1.173333rem
      font-size $font-size-medium-x
    .main-body
      width 100%
      height auto
      position relative
      padding .373333rem
      box-sizing border-box
      margin-bottom 1.2rem
      .task
        width 100%
        height auto
        margin-top .2rem
        position relative
        box-sizing border-box
        background $color-text-a
        padding .4rem
        color #fff
        font-size $font-size-medium
        border-radius .133333rem
        text-align left
      .add-btn
        position relative
        width 100%
        height 1.2rem
        line-height 1.2rem
        margin-top 1.146667rem
        background $color-btn
        color #fff
        font-size $font-size-medium-x
        border-radius .133333rem
</style>