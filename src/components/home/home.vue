<template>
  <div class="home">
    <div class="header border-bottom">
      远航科技有限公司
    </div>
    <div class="main-body">
      <router-link tag="div" class="task" to="/approvalDetail">
        <p>名称: {{}}</p>
        <p>审批流程: {{}}</p>  
      </router-link>
      <section class="task">
        <p>名称: {{}}</p>
        <p>审批流程: {{}}</p>  
      </section>      
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
export default {
  components: {
    MFooter
  },
  data () {
    return {}
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/stylus/variable'
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