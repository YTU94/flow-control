<template>
  <div class="header border-bottom">
    <router-link tag="span" class="h-back" :to='links'>
      <i class="iconfont icon-xiangzuo"></i>返回
    </router-link>
    {{msg}}
  </div>
</template>

<script>
export default {
  props: [
    'links',
    'msg'
  ]
}
</script>

<style lang="stylus" scoped>
  .header
    position absolute
    top 0
    left 0
    width 100%
    box-sizing border-box
    font-size 14px
    text-align center
    padding .373333rem
    background #fff
    .h-back
      position absolute
      left .37rem
      display inline
        position absolute
        top 0
        left 0-block
      font-size 14px
</style>

