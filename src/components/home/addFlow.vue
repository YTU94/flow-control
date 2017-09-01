<template>
  <div class="add-flow" v-if="page === 0">
    <m-header links='/home' msg="添加流程"></m-header>
    <div class="main-body">
      <p class="flow-name border-bottom">流程名：<input type="text" v-model="name" class="flow-name-i" placeholder="请输入流程名"></p>
      <div class="flow-member">
        <p class="member-title">添加成员<span> (点击人员删除)</span></p>
        <div class="member-c">
          <div @click="hide($event)" class="member-item" v-show="selectArray.length > 0" v-for="item in selectArray" :key="item.index">{{item}}</div>
          <div class="member-item" style="background: #6F9790" @click="page = 1"><i class="iconfont icon-jia"></i></div>
        </div>
      </div>
    </div>
    <button class="btn" @click="_addApproval" :class="{disabledStyle: checkValue}" :disabled="checkValue">
      生成流程
    </button>
  </div>
  <div class="add-member" v-else>
    <div class="header border-bottom">
      <span class="h-back" @click="back">
        <i class="iconfont icon-xiangzuo"></i>返回
      </span>
      添加角色
    </div>
    <div class="members">
      <p class="members-item border-bottom" v-for="item in roleList" :key="item.index">
        <i @click="select($event)" class="iconfont icon-yuanquan"></i>  {{item.rname}}
      </p>
    </div>
    <div class="btn" @click="sure" >确定</div>
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
      page: 0,
      roleList: [],
      selectArray: [],
      // 添加流程数据
      name: '',
      list: '',
      start: ''
    }
  },
  computed: {
    checkValue: function () {
      if (!this.name || this.selectArray.length === 0) {
        return true
      } else {
        return false
      }
    }
  },
  created () {
    api.getAllRole(sessionStorage.id, sessionStorage.token)
      .then(res => {
        if (res.code === 200) {
          this.roleList = res.message
        }
      })
  },
  methods: {
    back () {
      this.page = 0
    },
    select (event) {
      if (event.target.className.indexOf('xuanzhong') > 0) {
        event.target.className = 'iconfont icon-yuanquan'
      } else {
        event.target.className = 'iconfont icon-xuanzhong'
      }
    },
    sure () { // 把选择的传递到前面
      this.page = 0
      var nodes = document.querySelectorAll('.members p')
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].childNodes[0].className.indexOf('xuanzhong') > 0) {
          this.selectArray.splice(i, 0, nodes[i].childNodes[1].data.trim())
        }
      }
    },
    hide (e) {
      e.target.style.display = 'none'
      this.$arrayRemoveByValue(this.selectArray, e.target.innerHTML.trim())
      console.log(this.selectArray)
    },
    // 添加流程
    _addApproval() {
      this.list = this.selectArray.join('-')
      this.start = this.selectArray[0]
      api.addProcess(sessionStorage.id, sessionStorage.token, this.name, this.list, this.start)
        .then(res => {
          if (res.code === 200) {
            console.log(res)
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
  .icon-yuanquan, .icon-xuanzhong
    color $color-text-a
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
        font-size .32rem
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
          padding-left .2rem 
          outline none
          border none
      .flow-member
        .member-title
          span
            color $color-text-gray
        .member-c
          display flex
          flex-wrap wrap
          padding-bottom .1rem
          padding-top .1rem
          .member-item
            display flex
            flex 0 1 1.2rem
            height 1.2rem
            border-radius .6rem
            text-align center
            padding .1rem
            box-sizing border-box
            margin-right .11rem
            margin-bottom .31rem
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
      border none 
      outline none     
</style>
