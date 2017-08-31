<template>
  <div class="dialog" v-if="show === 1">
    <div class="model-bg"></div>
    <div class="model">
      <p class="border-bottom msg">{{msg}}</p>
      <p class="btn" @click="show = 0">{{btn}}</p>
    </div>    
  </div>
</template>

<script>
export default {
  props: [
    'msg',
    'btn'
  ],
  data () {
    return {
      show: 1
    }
  }
}
</script>

<style lang="stylus" scoped>
.dialog
  position fixed
  width 100%
  height 100%
  z-index 10001
  .model-bg
    position fixed
    width 100%
    height 100%
    z-index 10001
    background rgba(0, 0, 0, .4)
  .model
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
    width 8rem
    height auto
    background #ffffff
    z-index 10002
    border-radius 5px
    .msg
      font-size 16px
      padding .8rem 0 .6rem
    .btn
      font-size 16px
      padding .4rem 0
      color rgb(11, 178, 12)
</style>
