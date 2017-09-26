<template>
  <!-- 已选材料 -->
  <div class="material-m" v-if="page===0">
    <div class="header border-bottom header-bg">
      <router-link  class="h-back" to='/approvalDetail'>
        <i class="iconfont icon-xiangzuo"></i>返回
      </router-link>
      已选（5）
      <span class="right">确定</span>
    </div>
    <div class="m-m-content">
      <ul class="m-m-ul">
        <li class="m-item-li">
          <p>材料1</p>
          <div class="m-item-s">
            <div class="m-item">
              <ul class="item-tabs">
                <li class="tabs-li">编号：111111111111111111111111111111111</li>
                <li class="tabs-li">编号：1</li>
                <li class="tabs-li">编号：1</li>
                <li class="tabs-li">编号：1</li>
                <li class="tabs-li">编号：1</li>
                <li class="tabs-li">编号：1</li>
                <li class="tabs-li">编号：1</li>
              </ul>
              <div class="m-item-footer border-top">
                <div class="m-item-f-num">
                  <span class="f-num-label">数量:</span>
                  <input type="text" class="f-num-input">
                </div>
                <div class="m-item-f-total">总价：<span class="f-total-num">21312</span></div>
              </div>
            </div>
            <div class="m-item-del">删除</div>
          </div>
        </li>
        <li class="m-item-li">
          <p>材料1</p>
          <div class="m-item-s">
            <div class="m-item">
              <ul class="item-tabs">
                <li class="tabs-li">编号：1</li>
                <li class="tabs-li">编号：1</li>
                <li class="tabs-li">编号：1</li>
                <li class="tabs-li">编号：1</li>
                <li class="tabs-li">编号：1</li>
              </ul>
              <div class="m-item-footer border-top">
                <div class="m-item-f-num">
                  <span class="f-num-label">数量:</span>
                  <input type="text" class="f-num-input">
                </div>
                <div class="m-item-f-total">总价：21312</div>
              </div>
            </div>
            <div class="m-item-del">删除</div>
          </div>
        </li>
      </ul>
    </div>
    <div class="btn" @click="page = 1"><i class="iconfont icon-jia">  继续添加</i></div>
  </div>
  <!-- 选择材料 -->
  <div class="material-choose" v-else>
    <div class="header" style="background:#9eb1a; color:#fff!important; z-index:1002;">
      <i class="iconfont icon-xiangzuo h-back" style="color:#fff!important;" @click="page = 0">放回</i>
      选择材料
      <span class="right">已选（5）</span>
    </div>
    <div class="search" v-show="materialSelect === 0">
      <i class="iconfont icon-sousuo s-icon" ></i>
      <input type="text" class="s-input" placeholder="搜索"  ref='search' v-on:input='searchV()'>
    </div>
    <div class="top-tab">
      <div class="tab">
        <ul class="tab-ul">
          <li class="tab-item" @click="materialSelect = 1">主料<i class="iconfont icon-xiangxia1"></i></li>
          <li class="tab-item">辅料<i class="iconfont icon-xiangxia1"></i></li>
          <li class="tab-item">三级<i class="iconfont icon-xiangxia1"></i></li>
        </ul>
      </div>
      <div class="tab-content border-top" v-show="materialSelect===1">
        <ul class="">
          <li class="li">主料</li>
          <li class="li">辅料</li>
          <li class="li">次料</li>
        </ul>
      </div>
    </div>
    <div class="m-c-content">
      <div class="content-item">
        <ul class="item-tabs">
          <li class="tabs-li">编号:1</li>
          <li class="tabs-li">编号:1</li>
          <li class="tabs-li">编号:1</li>
          <li class="tabs-li">编号:1</li>
          <li class="tabs-li">编号:1</li>
          <li class="tabs-li">编号:1</li>
          <li class="tabs-li">编号:1</li>
        </ul>
        <p class="item-text">备注：1111111111111111111111111</p>
        <p class="item-text">11111111111111111111</p>
        <i class="iconfont icon-jia item-add"></i>
      </div>
      <div class="content-item">
        <ul class="item-tabs">
          <li class="tabs-li">编号:1</li>
          <li class="tabs-li">编号:1</li>
          <li class="tabs-li">编号:1</li>
          <li class="tabs-li">编号:1</li>
          <li class="tabs-li">编号:1</li>
          <li class="tabs-li">编号:1</li>
          <li class="tabs-li">编号:1</li>
        </ul>
        <p class="item-text">备注：1111111111111111111111111</p>
        <p class="item-text">11111111111111111111</p>
        <i class="iconfont icon-jia item-add"></i>
      </div>
    </div>
    <div class="model" v-show="materialSelect === 1"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // page 参数
      page: 0,
      materialSelect: 0
    }
  },
  mounted() {
    var that = this
    setTimeout(function() {
      if (!this.page) {
        that.touch()
      }
    }, 1000)
  },
  methods: {
    touch() {
      var expansion = null
      var e = document.querySelectorAll('.m-m-ul .m-item-li .m-item-s')
      for (var i = 0; i < e.length; i++) {
        var x, y, X, Y, swipeX, swipeY
        e[i].addEventListener('touchstart', function (event) {
          x = event.changedTouches[0].pageX
          y = event.changedTouches[0].pageY
          swipeX = true
          swipeY = true
          if (expansion) {
            expansion.className = 'm-item-s'
          }
        })
        e[i].addEventListener('touchmove', function (event) {
          X = event.changedTouches[0].pageX
          Y = event.changedTouches[0].pageY
          // 左右滑动
          if (swipeX && Math.abs(X - x) - Math.abs(Y - y) > 0) {
            // 阻止事件冒泡
            event.stopPropagation()
            if (X - x > 10) { // 右滑
              event.preventDefault()
              this.className = 'm-item-s' // 右滑收起
            }
            if (x - X > 10) { // 左滑
              event.preventDefault()
              this.className = 'swipeleft m-item-s' // 左滑展开
              expansion = this
            }
            swipeY = false
          }
          // 上下滑动
          if (swipeY && Math.abs(X - x) - Math.abs(Y - y) < 0) {
            swipeX = false
          }
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
.swipeleft 
    transform:translateX(-1.5rem)
.material-choose, .material-m
  background $color-background
  // padding-bottom .15rem
  .header-bg
    background #fff!important
  .header
    position relative
    top 0
    left 0
    width 100%
    box-sizing border-box
    font-size 16px
    text-align center
    padding .373333rem
    background #82a28e
    .h-back
      color #555
      position absolute
      left .37rem
      display inline
        position absolute
        top 0
        left 0-block
      font-size 14px
    .right
      position absolute
      right .37333rem 
      font-size 14px
  .search
    position relative
    box-sizing border-box
    padding .2rem 0
    .s-icon
      position absolute
      left .7rem
      top .385rem
    .s-input
      width 9.2rem
      height .85rem
      line-height 1.0rem
      box-sizing border-box
      border none
      outline none
      background #fff
      padding-left .95rem
      border-radius .12rem
  .top-tab
    position relative
    background #ffffff
    z-index 1002    
    .tab
      position relative
      .tab-ul
        display flex
        flex-flow row nowrap
        padding .275rem 0
        .tab-item
          font-size $font-size-medium
          flex 0 0 33.3%
          border-right 1px solid #EFEFF0
    .tab-content
      position absolute
      top auto
      left 0
      width 100%
      height auto
      background #ffffff
      z-index 1002
      line-height 1.6
      padding .4rem 0
      font-size $font-size-medium
      ul>li
        line-height 2.4
  .m-c-content, .m-m-content
    position relative
    top 0.1rem
    padding-bottom .15rem
    .content-item, .m-item
      position relative
      background #ffffff
      margin-bottom .15rem
      text-align left 
      padding .2rem .4rem .4rem
      box-sizing border-box
      line-height 1.6
      color $color-text-gray  
      .item-tabs
        display flex
        flex-flow row wrap
        .tabs-li
          overflow-x auto
          flex 0 0 33.3%
      .item-text
        word-wrap break-word
        width 8rem
      .item-add
        position absolute
        right .4rem
        bottom .4rem
        background $color-btn
        color #ffffff
        padding .1rem
        border-radius .4rem
        font-size $font-size-medium
        line-height 1
  .model
    position fixed
    width 100%
    height 100%
    top 0
    left 0
    background rgba(1, 1, 1, 0.4)
    z-index 1001  
.material-m
  .m-m-content
    top 0
    margin-bottom 1.5rem
    .m-m-ul
      overflow hidden
      .m-item-li
        text-align left
        width 10rem
        p
          padding .05rem 0 .05rem .4rem
        .m-item-s
          width 11.5rem
          background #fff
          display flex
          transition all .4s linear
          .m-item
            flex 20
            display inline-block
            position relative
            left 0
            background #fff
            padding-bottom .05rem
            .m-item-footer
              position relative
              width 9.2rem
              padding .1rem 0
              .m-item-f-num
                width 3rem
                border 1px solid $color-background
                padding 0 .1rem
                box-size border-box
                .f-num-label
                .f-num-input
                  text-align right
                  width 2rem
                  border none 
                  outline none 
              .m-item-f-total
                position absolute
                right 0
                top .16rem
                .f-total-num
                  color $color-btn   
          .m-item-del
            flex 3
            display flex
            align-items center
            justify-content center
            height auto
            position relative
            background   $color-sub-theme
            color #fff
            
  .btn
    position fixed
    bottom 0
    left 0
    background $color-btn
    color #fff
    font-size $font-size-medium-x
    width 10rem
    height 1.2rem
    line-height 1.2rem
    text-align center         
</style>
