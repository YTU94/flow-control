<template>
  <div class="footer">
    <router-link class="r-link"  to="/home" tag="div">
      <p><i class="iconfont icon-home"></i></p>
      <span class="">首页</span>
    </router-link>
    <router-link class="r-link"  to="/approval" tag="div">
      <p><i class="iconfont icon-approval"></i></p>
      <span class="">审批</span>
    </router-link>
    <router-link class="r-link bg-blue"  to="/personnel" tag="div">
      <p><i class="iconfont icon-my"></i></p>
      <span class="">我的</span>
    </router-link>        
  </div>
</template>

<script>
export default {}
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable'
  .bg-blue
    background-color $color-backgrund-blue 
  .footer
    display flex
    position fixed
    bottom 0
    left 0
    width 100%
    height auto
    border 1px solid #E6E6E6
    padding .1rem 0
    background #fff
    .r-link
      flex 1
      .iconfont
        font-size $font-size-large-x
    .router-link-active
      color $color-text-a

</style>
