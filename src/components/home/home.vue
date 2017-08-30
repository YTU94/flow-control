<template>
  <div class="home">
    <div class="header border-bottom">
      远航科技有限公司
    </div>
    <div class="main-body">
      <router-link tag="div"  class="task" :to="{name: 'approvalDetail', params: {name: item.pname, id: item.id, nodeArray: item.nodeArray, start: item.start}}" v-for="item in approvalList" :key="item.id">
        <p class="line-h">名称: {{item.pname}}</p>
        <p class="line-h">审批流程: </p>
        <p>{{item.nodeArray}}</p>  
      </router-link>
      <!-- <section class="task bg-blue">
        <p class="line-h">名称: {{}}</p>
        <p class="line-h">审批流程</p>
        <p>会计-仓管员-水电施工员-出纳-流程发起人-项目经理-材料员-公司经理</p>  
      </section>       -->
      <div class="add-btn">
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
      approvalList: []
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
  .bg-blue
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