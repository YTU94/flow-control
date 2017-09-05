<template>
  <div class="dialog">
    <div class="model-bg" v-show="btn != ''"></div>
    <transition name="dialog">    
      <div class="model">
        <p class="border-bottom msg" :class="{toast: btn === ''}">{{msg}}</p>
        <p class="btn" v-on:click="sendMsg" v-show="btn != ''">{{btn}}</p>
      </div> 
    </transition>   
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
  },
  mounted () {
    console.log('dialog')
  },
  methods: {
    sendMsg () {
      this.$emit('getMsg', '0')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
.toast
  background rgba(18, 18, 18, 0.7)
  color #fff
  padding  .4rem!important
  border-radius .2rem
.dialog
  position fixed
  width 100%
  height 100%
  z-index 10001
  text-align center
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
