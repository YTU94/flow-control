<template>
  <div class="approval-detail">
    <m-header links='/' msg="资金审批"></m-header> 
    <div class="main-body">
      <section class="content">
        <p class="c-title">编号: 231312</p>
        <p class="c-title">名称: 资金审批</p>
        <p class="c-title">审批流程: </p>
        <p class="c-title-s">
          会记-仓管员-水电工-出纳-酱油-经理-大佬
        </p>
      </section>
      <section class="select">
        <div class="form-group border-bottom">
          <label for="" class="f-label">材料：</label>
          <i class="iconfont icon-xiangxia float-right" ref="icon" @click="showSelect()"></i>
        </div>
        <div class="select-content" v-show="select === 1">
          <p class="border-bottom select-item">0000001    水泥</p>
          <p class="border-bottom select-item">0000001    水泥</p>
        </div>
        <div class="form-group">
          <label for="" class="f-label">数量：</label>
          <input type="text" placeholder="请输入" class="f-input">
        </div>
      </section>
      <section class="msg">
        <div class="msg-content border-bottom">
          <p class="msg-c-t">审批内容:</p>
          <p class="msg-c-c">撒大家撒快点哈手机客户登记卡山东科技数据的哈萨克对话框</p>
        </div>
        <div class="form-group">
          <label for="" class="f-label">添加审批人：</label>
          <i class="iconfont icon-xiangxia float-right"></i>
        </div>
      </section>
      <div class="btn">执行</div>
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
      select: 0
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
  .approval-detail
    position absolute
    width 100%
    height 100%
    background-color $color-background
    text-align left
    .main-body
      margin-top 1.2rem
      .content
        float left
        width 100%
        box-sizing border-box
        background #fff
        font-size $font-size-medium
        padding .373333rem
        color $color-text-d
        margin-top .4rem
        .c-title-s
          color #797979
      .select
        float left
        background #fff
        box-sizing border-box
        font-size $font-size-medium
        margin-top .4rem
        width 100%
        .form-group
          height 1.2rem
          line-height 1.2rem
          padding 0 .4rem
          .f-input
            float right
            text-align right
            outline none
            border none
            height 1.2rem
            line-height 1.2rem
        .select-content
          background #E9F0EF
          padding .2rem .4rem
          .select-item
            color $color-text-a
            padding .2rem 0 
      .msg
        float left
        background #fff
        font-size $font-size-medium
        box-sizing border-box
        margin-top .4rem
        .msg-content
          padding .4rem
          .msg-c-t
            line-height 2.6
          .msg-c-c
            color #797979
        .form-group  
          height 1.2rem
          line-height 1.2rem
          padding 0 .4rem
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
