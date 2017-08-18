<template>
  <div class="add-flow" v-if="page === 0">
    <m-header links='/' msg="添加流程11"></m-header>
    <div class="main-body">
      <p class="flow-name border-bottom">流程名: <input type="text" class="flow-name-i" placeholder="请输入流程名"></p>
      <div class="flow-member">
        <p class="member-title">添加成员<span>(点击人员删除)</span></p>
        <div class="member-c">
          <div class="member-item">项目经理</div>
          <div class="member-item">经理</div>
          <div class="member-item">项目经理</div>
          <div class="member-item">项目经理</div>
          <div class="member-item">项目经理</div>
          <div class="member-item">项目经理</div>
          <div class="member-item">项目经理</div>
          <div class="member-item">项目经理</div>
          <div class="member-item">项目经理</div>
          <div class="member-item">项目经理</div>
          <div class="member-item">项目经理</div>
          <div class="member-item" style="background: #6F9790" @click="page = 1"><i class="iconfont icon-jia"></i></div>
        </div>
      </div>
    </div>
    <div class="btn">
      生成流程
    </div>
  </div>
  <div class="add-member" v-else>
    <div class="header border-bottom">
      <span class="h-back" @click="back">
        <i class="iconfont icon-xiangzuo"></i>返回
      </span>
      添加人员
    </div>
    <div class="members">
      <p class="members-item border-bottom">
        <i @click="select($event)" class="iconfont icon-yuanquan"></i>  会计
      </p>
      <p class="members-item border-bottom">
        <i class="iconfont"></i>  会计
      </p>
      <p class="members-item border-bottom">
        <i class="iconfont"></i>  会计
      </p>
      <p class="members-item border-bottom">
        <i class="iconfont"></i>  会计
      </p>
      <p class="members-item border-bottom">
        <i class="iconfont"></i>  会计
      </p>
    </div>
    <div class="btn" @click="sure">确定</div>
  </div>
</template>

<script>
import MHeader from 'components/m-header/m-header'
export default {
  components: {
    MHeader
  },
  data () {
    return {
      page: 0
    }
  },
  methods: {
    back () {
      this.page = 0
    },
    select (event) {
      event.target.className = 'iconfont icon-xuanzhong'
    },
    sure () {
      this.page = 0
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable'
  .add-flow, .add-member
    background $color-background
    position absolute
    width 100%
    height 100%
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
    .members
      margin-top 1.5rem
      .members-item
        float left
        width 100%
        height 1.2rem
        line-height 1.2rem
        background #fff
        text-align left
        padding 0 .4rem
        box-sizing border-box
        .iconfont
          vertical-align middle
    .main-body
      float left
      margin-top 1.5rem
      background #fff
      width 100%
      text-align left
      font-size $font-size-medium
      .flow-name, .member-title, .member-c
        box-sizing border-box
        padding .4rem
        .flow-name-i
          outline none
          border none
      .flow-member
        .member-title
          span
            color $color-text-gray
        .member-c
          display flex
          flex-wrap wrap
          .member-item
            display flex
            flex 0 1 1.2rem
            height 1.2rem
            border-radius .6rem
            text-align center
            padding .1rem
            box-sizing border-box
            margin-right .11rem
            margin-bottom .11rem 
            background-color #ADB9BA
            color #fff
            font-size .34rem
            align-items center
            justify-content center
    .btn
      float left
      margin-top .6rem
      margin-left .4rem
      background $color-btn
      color #fff
      font-size $font-size-medium-x
      width 9.2rem
      height 1.2rem
      line-height 1.2rem
      text-align center
      border-radius .133333rem     
</style>
