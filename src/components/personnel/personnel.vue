<template>
  <div class="personnel">
    <!-- header -->
    <div class="header">
      <p class="header-t">我的</p>
      <div class="header-logo"></div>
      <p class="header-name">远航科技有限公司</p>
    </div>
    <!-- main body -->
    <div class="content">
      <ul class="">
        <router-link tag="li" to="/roleManage" class="content-item border-bottom">
          <div class="icon-role"></div>
          <div class="items">角色管理</div>
          <i class="iconfont icon-xiangzuo"></i>
        </router-link>
        <router-link tag="li" to="/memberManage" class="content-item border-bottom">
          <div class="icon-member"></div>
          <div class="items">人员管理</div>
          <i class="iconfont icon-xiangzuo"></i>
        </router-link>
        <router-link tag="li" to="/materialManage" class="content-item border-bottom">
          <div class="icon-material"></div>
          <div class="items">材料管理</div>
          <i class="iconfont icon-xiangzuo"></i>
        </router-link>
        <li @click="model = 1" class="content-item border-bottom" style="margin-top: .4rem">
          <div class="icon-layout"></div>
          <div class="items">退出登录</div>
          <i class="iconfont icon-xiangzuo"></i>
        </li>
      </ul>
    </div>
    <m-footer></m-footer>
    <!-- model -->
    <div class="model" v-show="model === 1"></div>
    <transition name="dialog">
      <div class="model-c" v-show="model === 1">
        <p class="model-t border-bottom">确定退出等吗？</p>
        <p class="model-p">
          <span class="model-span" @click="model = 0">取消</span>
          <span class="model-span color-a" @click="layout()">推出</span>
        </p>
      </div>
    </transition>
  </div>
</template>

<script>
import MFooter from 'components/m-footer/m-footer'
export default {
  components: {
    MFooter
  },
  data () {
    return {
      model: 0
    }
  },
  methods: {
    layout () {
      this.model = 0
      this.$router.push('/')
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable'
  .dialog-enter-active,.dialog-leave-active
    opacity 1
    transition-duration .4s
    transform translate(-50%,-50%) scale(1)!important
  .dialog-leave-active 
    transition-duration .3s
  .dialog-enter 
    opacity 0
    transform translate(-50%,-50%) scale(1.185)!important
  .dialog-leave-active 
    opacity 0
    transform translate(-50%,-50%) scale(.85)!important
  .personnel
    position absolute
    width 100%
    height 100%
    background $color-background
    .header
      float left
      width 100%
      height 5.973333rem
      bg-image('head_bg')
      background-size 100% 100%
      background-repeat no-repeat
      background-position center
      .header-t
        font-size .5rem
        color $color-text-d
        position relative
        top .5rem
      .header-logo
        position relative
        top 1.833333rem
        width 1.84rem
        height 1.84rem
        margin 0 auto
        border-radius .92rem
        border 1.5px solid #fff
        bg-image('head_logo')
        background-size 100% 100%
      .header-name
        font-size $font-size-medium-x
        position relative 
        top 2.0rem
    .content
      float left
      width 100%
      ul
       .content-item
        height 1.2rem
        line-height 1.2rem
        background #fff
        text-align left
        box-sizing border-box
        padding 0 .4rem
        font-size $font-size-medium
        color $color-text-d
        .icon-role, .icon-member, .icon-material, .icon-layout
          display inline-block
          width .6rem
          height .6rem
          background-size 100% 100%
          vertical-align middle 
        .icon-role
          bg-image('role')
        .icon-member
          bg-image('member')
        .icon-material
          bg-image('material') 
        .icon-layout
          bg-image('layout')  
        .items
          display inline-block
          vertical-align middle
        .iconfont
          float right
          height 1.2rem
          line-height 1.2rem
          transform rotate(180deg)
          color $color-text-gray
    .model
      position absolute
      width 100%
      height 100%
      background rgba(25, 25, 25, .4)
    .model-c
      position absolute
      top 50%
      left 50%
      transform translate(-50%, -50%)
      background #ffffff
      width 6.64rem
      border-radius .233333rem
      .model-t
        height 1.466667rem
        line-height 1.466667rem
        font-size $font-size-medium-x
      .model-p
        display flex
        align-items center
        .model-span
          flex 1
          color $color-text-d
          height 1.04rem
          display flex
          border-right 1px solid #ededed
          align-items center
          justify-content center
          font-size $font-size-medium
        .color-a
          color $color-text-a  
</style>