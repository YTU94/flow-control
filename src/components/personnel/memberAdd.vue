<template>
  <div class="member-add">
    <m-header links="memberManage" msg="添加人员"></m-header>
    <div class="content">
      <section class="select">
        <div class="form-group border-bottom">
          <label for="" class="f-label">角色名：</label>
          <i class="iconfont icon-xiangxia float-right" ref="icon" @click="showSelect()"></i>
        </div>
        <div class="select-content border-bottom" v-show="select === 1">
          <p class="border-bottom select-item">0000001    水泥</p>
          <p class="border-bottom select-item">0000001    水泥</p>
        </div>
        <div class="form-group border-bottom">
          <label for="" class="f-label">姓名：</label>
          <input type="text" placeholder="请输入" class="f-input">
        </div>
        <!-- 性别 -->
        <div class="form-group border-bottom">
          性别：
          <span class="state-item">
            <i @click="isActive0 = 1, isActive1 = 0" class="iconfont icon-yuanquan" v-bind:class="{ 'icon-xuanzhong': isActive0 }"></i>    男
          </span>
          <span class="state-item">
            <i @click="isActive0 = 0, isActive1 = 1" class="iconfont icon-yuanquan" v-bind:class="{ 'icon-xuanzhong': isActive1 }"></i>    女
          </span>
        </div>
        <div class="form-group border-bottom">
          <label for="" class="f-label">账号：</label>
          <input type="text" placeholder="请输入" class="f-input">
        </div>
        <div class="form-group border-bottom">
          <label for="" class="f-label">密码：</label>
          <input type="text" placeholder="请输入" class="f-input">
        </div>        
      </section>
    </div>
    <!-- btn -->
    <div class="btn">确定添加</div>
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
        isActive0: true,
        isActive1: false
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
  .member-add
    position absolute
    width 100%
    height 100%
    background $color-background
    .content
      float left 
      margin-top 1.4rem
      width 100%
      text-align left 
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
          .state-item
            float right
            margin-left .35rem
            color $color-text-gray
            .iconfont
              font-size $font-size-large-x
              vertical-align middle
              color $color-btn   
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
