<template>
  <div class="lookApproval">
    <m-header links='/' msg="资金审批"></m-header>
    <div class="main-body">
      <!-- main body -->
      <div class="flow">
        <p class="f-content">编号：454455</p>
        <p class="f-content">名称：资金审批</p>
        <p class="f-content-s">会计-会计-会计-会计-会计-会计-会计-会计-会计-会计-会计-会计-会计-</p>        
        <p class="f-content">材料：</p>
        <p class="f-content-s">004-水泥 （带） -5000</p>
      </div>
      <div class="flow">
        <p class="f-content">编号：454455</p>
        <p class="f-content">名称：资金审批</p>
        <p class="f-content">材料：</p>
        <p class="f-content-s">004-水泥 （带） -5000</p>
      </div>
      <div class="flow">
        <p class="f-content">编号：454455</p>
        <p class="f-content">名称：资金审批</p>
        <p class="f-content">材料：</p>
        <p class="f-content-s">004-水泥 （带） -5000</p>
      </div>
      <!-- 审核状态 -->
      <div class="state">
        审批状态：
        <span class="state-item">
          <i @click="isActive0 = 1, isActive1 = 0, isActive2 = 0" class="iconfont icon-yuanquan" v-bind:class="{ 'icon-xuanzhong': isActive0 }"></i>    通过
        </span>
        <span class="state-item">
          <i @click="isActive0 = 0, isActive1 = 1, isActive2 = 0" class="iconfont icon-yuanquan" v-bind:class="{ 'icon-xuanzhong': isActive1 }"></i>    不通过
        </span>
        <span class="state-item">
          <i @click="isActive0 = 0, isActive1 = 0, isActive2 = 1" class="iconfont icon-yuanquan" v-bind:class="{ 'icon-xuanzhong': isActive2 }"></i>    回滚
        </span>
      </div>
      <!-- 添加审批人 -->
      <div class="select">
        <div class="form-group border-bottom">
          <label for="" class="f-label">材料：</label>
          <i class="iconfont icon-xiangxia float-right" ref="icon" @click="showSelect()"></i>
        </div>
        <div class="select-content" v-show="select === 1">
          <p class="border-bottom select-item">0000001    水泥</p>
          <p class="border-bottom select-item">0000001    水泥</p>
        </div>
      </div>
    </div>
    <div class="btn">
      <router-link tag="div" to="/approval">审批</router-link>  
    </div> 
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
      select: 0,
      isActive0: false,
      isActive1: false,
      isActive2: false
    }
  },
  computed: {
    unActive () {
      return this.isActive === true ? 0 : 1
    }
  },
  methods: {
    showSelect () {
      this.select = this.select === 0 ? 1 : 0
      this.$refs.icon.className = this.select === 0 ? 'iconfont icon-xiangxia float-right' : 'iconfont icon-xiangshang float-right'
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable'
  .lookApproval
    float left
    width 100%
    height auto
    background $color-background
    .main-body
      float left
      width 100%
      margin-top 1.6rem
      .flow
        float left
        width 100%
        margin-bottom .2rem
        box-sizing border-box
        padding .4rem
        background #fff
        font-size $font-size-medium
        text-align left
        color $color-text-d
        .f-content
          line-height 1.6
        .f-content-s
          line-height 1.6
          color $color-text-gray
          font-size $font-size-small
      .state
        width 100%
        float left
        background #fff
        padding 0 .4rem 
        box-sizing border-box
        text-align left
        height 1.4rem
        line-height 1.4rem
        font-size $font-size-medium
        .state-item
          float right
          margin-left .35rem
          color $color-text-gray
          .iconfont
            font-size $font-size-large-x
            vertical-align middle
            color $color-btn
      .select
        float left
        background #fff
        box-sizing border-box
        font-size $font-size-medium
        margin-top .2rem
        width 100%
        text-align left
        .form-group
          height 1.2rem
          line-height 1.2rem
          padding 0 .4rem
        .select-content
          background #E9F0EF
          padding .2rem .4rem
          .select-item
            color $color-text-a
            padding .2rem 0
    .btn
      float left
      margin-top .6rem
      margin-left .4rem
      margin-bottom 1rem
      background $color-btn
      color #fff
      font-size $font-size-medium-x
      width 9.2rem
      height 1.2rem
      line-height 1.2rem
      text-align center
      border-radius .133333rem                     
</style>
