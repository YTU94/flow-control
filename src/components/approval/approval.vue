<template>
  <div class="approval">
    <div class="header border-bottom" v-if="search === 0">
      审批流程<i @click="search = 1" class="iconfont icon-sousuo" style="position:absolute;right:.4rem;font-size:18px;"></i>
    </div>
    <div class="header h-background" v-else>
      <i class="iconfont icon-sousuo s-icon"></i>
      <input type="text" class="s-input" placeholder="请输入">
      <span class="s-cancel" @click="search = 0">取消</span>
    </div>
    <tab v-show="search === 0"></tab>
    <router-view></router-view>
    <m-footer></m-footer>
  </div>
</template>

<script>
import MFooter from 'components/m-footer/m-footer'
import Tab from 'components/tab/tab'
export default {
  components: {
    MFooter,
    Tab
  },
  data () {
    return {
      search: 0
    }
  },
  methos: {
    showSelect () {

    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable'
  .approval
    .h-background
      background $color-background
      text-align left
      padding 0 .4rem
      box-sizing border-box
    .header
      float left
      width 100%
      height 1.2rem
      line-height 1.2rem
      font-size $font-size-medium-x
      .s-icon
        position absolute
        left .5rem
      .s-input
        width 7.5rem
        height .85rem
        line-height 1.0rem
        border none
        outline none
        background #F7F7F7
        padding-left .65rem
        border-radius .1.2rem
      .s-cancel
        float right  
</style>
