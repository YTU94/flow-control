<template>
  <div class="login">
    <transition name="fade">
      <m-dialog  msg="登陆失败" btn="确定" v-show="dialog === 1" v-on:getMsg="showMsg"></m-dialog>
    </transition>
    <section class="title">
      远航审批管理系统
    </section>
    <section class="form">
      <div class="form-group">
        <label for="" class="form-label">用户名:</label>
        <input type="text" v-model="userName" class="form-input">
        <i @click="userName = '', password = '', company = ''" class="iconfont icon-cha"></i>
      </div>
      <div class="form-group">
        <label for="" class="form-label" >密&nbsp;&nbsp;&nbsp;&nbsp;码:</label>
        <input type="password" v-model="password" class="form-input">
      </div>
      <div class="form-group">
        <label for="" class="form-label">公司名:</label>
        <input type="text" v-model="company" class="form-input">
      </div>
    </section>
    <section class="login-btn">
      <button @click="login()" class="btn" :class="{disabledStyle: checkValue}" :disabled="checkValue">登&nbsp;&nbsp;&nbsp;&nbsp;录</button>
    </section>
  </div>
</template>

<script>
import api from './../../api/api'
import MDialog from 'components/dialog/dialog'
export default {
  components: {
    MDialog
  },
  data () {
    return {
      dialog: 0,
      // user
      userName: '丹 ',
      password: '123456',
      company: '美的'
    }
  },
  computed: {
    checkValue: function () {
      if (!this.userName || !this.password || !this.company) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    showMsg (data) {
      console.log(data)
      this.dialog = parseInt(data)
    },
    login() {
      api.login(this.userName, this.password, this.company)
        .then(res => {
          if (res.code === 200) {
            console.log('登陆成功')
            // id token 存入 sessionStorage
            sessionStorage.id = res.message.id
            sessionStorage.token = res.message.token
            // 用户的的角色user.rname 存入 sessionStorage
            sessionStorage.rname = res.message.rname
            api.getCheckRule(sessionStorage.id, sessionStorage.token)
              .then(res => {
                // debugger
                sessionStorage.auth_1 = res.message[0] === undefined ? '0' : res.message[0].id // 角色管理
                sessionStorage.auth_2 = res.message[1] === undefined ? '0' : res.message[1].id // 人员管理
                sessionStorage.auth_4 = res.message[2] === undefined ? '0' : res.message[2].id // 权限管理
                sessionStorage.auth_5 = res.message[3] === undefined ? '0' : res.message[3].id // 添加管理
                sessionStorage.auth_6 = res.message[4] === undefined ? '0' : res.message[4].id // 删除模板管理
                this.$router.push('/home')
              })
              .catch(error => {
                console.log(error)
              })
          } else {
            console.log('登录失败')
            this.dialog = 1
          }
        })
        .catch(error => {
          console.log(error)
        })
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
    z-index 10
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
          // padding-left .2rem
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
        border none 
        outline none 
</style>
