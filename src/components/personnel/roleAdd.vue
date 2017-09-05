<template>
  <div class="role-add">
    <m-header links="/roleManage" msg="添加角色"></m-header>
    <section class="select">
      <div class="form-group border-bottom">
        <label for="" class="f-label">角色名：</label>
        <input type="text" v-model="rname" placeholder="请输入" class="f-input">
      </div>      
      <div class="form-group border-bottom">
        <label for="" class="f-label">权限等级：</label>
        <i class="iconfont icon-xiangxia float-right" ref="icon" @click="showSelect()"></i>
        <span class="float-right">{{rule|ruleT}}</span>     
        <!-- <input type="text" v-model="{{rule | ruleT}}" class="f-input" name="" id="" placeholder="等级" readonly> -->
      </div>
      <div class="select-content" v-show="select === 1">
        <p class="border-bottom select-item" @click="rule = 1, select = 0">一级</p>
        <p class="border-bottom select-item" @click="rule = 2, select = 0">二级</p>
        <p class="border-bottom select-item" @click="rule = 3, select = 0">三级</p>
        <p class="border-bottom select-item" @click="rule = 4, select = 0">四级</p>
        <p class="border-bottom select-item" @click="rule = 5, select = 0">五级</p>
      </div>
    </section>
    <!-- btn -->
    <button class="btn" @click="add()" :class="{disabledStyle: checkValue}" :disabled="checkValue">确定添加</button>
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
      rname: '',
      rule: 1
    }
  },
  computed: {
    checkValue: function () {
      if (!this.rname || !this.rule) {
        return true
      } else {
        return false
      }
    }
  },
  created () {
    console.log(this.$route.params)
  },
  methods: {
    showSelect () {
      this.select = this.select === 0 ? 1 : 0
      this.$refs.icon.className = this.select === 0 ? 'iconfont icon-xiangxia float-right' : 'iconfont icon-xiangshang float-right'
    },
    add() {
      api.addRole(sessionStorage.id, sessionStorage.token, this.rname, this.rule)
        .then(res => {
          if (res.code === 200) {
            console.log(res)
            this.$router.push('/roleManage')
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
  .role-add
    position absolute
    width 100%
    height 100%
    background $color-background
    .select
      float left
      text-align left 
      background #fff
      box-sizing border-box
      font-size $font-size-medium
      margin-top 1.4rem
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
  .btn
    float left
    margin-top .7rem
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
