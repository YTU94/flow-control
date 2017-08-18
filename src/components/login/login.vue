<template>
  <div class="login">
    <section class="title">
      远航审批管理系统
    </section>
    <section class="form">
      <div class="form-group">
        <label for="" class="form-label">用户名:</label>
        <input type="text" class="form-input">
        <i class="iconfont icon-cha"></i>
      </div>
      <div class="form-group">
        <label for="" class="form-label">密&nbsp;&nbsp;&nbsp;&nbsp;码:</label>
        <input type="text" class="form-input">
      </div>
      <div class="form-group">
        <label for="" class="form-label">公司名:</label>
        <input type="text" class="form-input">
      </div>
    </section>
    <section class="login-btn">
      <div @click="login()" class="btn">登&nbsp;&nbsp;&nbsp;&nbsp;录</div>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    login () {
      this.$router.push('/home')
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/stylus/variable'
  .login
    background: url('./login_bg.png') no-repeat center
    background-size: 100% 100%  
    color: $color-text-d
    width: 100%
    height 100%
    position absolute
    .title
      position absolute
      top 3.333333rem
      font-size .8rem
      width 100%
    .form
      position absolute
      top 5.6rem
      width 100%
      .form-group
        display block
        margin 0 auto
        width 7.413333rem
        border-bottom 1px solid #BBBBBB
        text-align left
        padding .5rem .346667rem .2rem
        font-size $font-size-medium
        .form-input
          outline none
          border none
          background none
          padding-left .2rem
        .iconfont
          float right  
    .login-btn
      position absolute
      top 10.08rem
      width 100%
      .btn
        display inline-block
        position relative
        width 7.413333rem
        height 1.2rem
        line-height 1.2rem
        background #81A49D
        color $color-text
        border-radius .6rem
        font-size .45rem
</style>
