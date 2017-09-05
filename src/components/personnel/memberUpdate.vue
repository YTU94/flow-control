<template>
  <div class="member-add">
    <m-header links="memberManage" msg="修改人员"></m-header>
    <div class="content">
      <section class="select">
        <div class="form-group border-bottom">
          <label for="" class="f-label">角色名：</label>
          <input type="text" v-model="rname" placeholder="请输入" class="f-input">
        </div>
        <div class="form-group border-bottom">
          <label for="" class="f-label">姓名：</label>
          <input type="text" v-model="name" placeholder="请输入" class="f-input">
        </div>
        <!-- 性别 -->
        <div class="form-group border-bottom">
          性别：
          <span class="state-item">
            <i @click="isActive0 = 1, isActive1 = 0" class="iconfont icon-yuanquan" v-bind:class="{ 'icon-xuanzhong': isActive0 }"></i>    女
          </span>
          <span class="state-item">
            <i @click="isActive0 = 0, isActive1 = 1" class="iconfont icon-yuanquan" v-bind:class="{ 'icon-xuanzhong': isActive1 }"></i>    男
          </span>
        </div>
        <div class="form-group border-bottom">
          <label for="" class="f-label">账号：</label>
          <input type="text" v-model="user" placeholder="请输入" class="f-input">
        </div>
        <div class="form-group border-bottom">
          <label for="" class="f-label">密码：</label>
          <input type="text" v-model="pwd" placeholder="请输入" class="f-input">
        </div>        
      </section>
    </div>
    <!-- btn -->
    <button class="btn" @click="_editMember()" :class="{disabledStyle: checkValue}" :disabled="checkValue">确定修改</button>
  </div>
</template>

<script>
  import api from 'api/api'
  import MHeader from 'components/m-header/m-header'
  export default {
    components: {
      MHeader
    },
    data () {
      return {
        select: 0,
        isActive0: true,
        isActive1: false,
        rname: '',
        name: '',
        sex: '',
        user: '',
        pwd: ''
      }
    },
    computed: {
      checkValue: function () {
        if (!this.rname || !this.name || !this.user || !this.pwd) {
          return true
        } else {
          return false
        }
      }
    },
    created () {
      console.log(this.$route.params)
      this.rname = this.$route.params.rname
      this.name = this.$route.params.name
      this.user = this.$route.params.user
      this.pwd = this.$route.params.pwd
    },
    methods: {
      showSelect () {
        this.select = this.select === 0 ? 1 : 0
        this.$refs.icon.className = this.select === 0 ? 'iconfont icon-xiangxia float-right' : 'iconfont icon-xiangshang float-right'
      },
      _editMember() {
        this.sex = this.isActive0 === 1 ? '男' : '女'
        api.editPerson(sessionStorage.id, sessionStorage.token, this.$route.params.id, this.rname, this.name, this.sex, this.user, this.pwd)
          .then(res => {
            if (res.code === 200) {
              this.$router.push('/memberManage')
            }
          })
          .catch(error => {
            console.log(error)
          })
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
      border none                   
</style>
