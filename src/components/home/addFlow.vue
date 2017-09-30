<template>
  <div class="add-flow" v-if="page === 0">
    <transition name="fade">
      <m-dialog msg="生成成功" btn="" v-show="success === 1"></m-dialog>
    </transition>
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
      <div class="material-content border-top">
        <p class="">选你材料显示内容</p>
        <ul class="m-c-ul">
          <li class="m-c-li"><i class="iconfont icon-yuanquan" @click="addtabs('cId', $event)">  编号</i></li>
          <li class="m-c-li"><i class="iconfont icon-yuanquan" @click="addtabs('cName', $event)">  名称</i></li>
          <li class="m-c-li"><i class="iconfont icon-yuanquan" @click="addtabs('cSize', $event)">  规格尺寸</i></li>
          <li class="m-c-li"><i class="iconfont icon-yuanquan" @click="addtabs('cSupplier', $event)">  供应商</i></li>
          <li class="m-c-li"><i class="iconfont icon-yuanquan" @click="addtabs('cUnit', $event)">  单位</i></li>
          <li class="m-c-li"><i class="iconfont icon-yuanquan" @click="addtabs('cNum', $event)">  数量</i></li>
          <li class="m-c-li"><i class="iconfont icon-yuanquan" @click="addtabs('cPrice', $event)">  单价</i></li>
          <li class="m-c-li"><i class="iconfont icon-yuanquan" @click="addtabs('cTotal', $event)">  总价</i></li>
          <li class="m-c-li"><i class="iconfont icon-yuanquan" @click="addtabs('cContent', $event)">  备注</i></li>
        </ul>
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
    <button class="btn" @click="sure">确定</button>
  </div>
</template>

<script>
import api from 'api/api'
import MDialog from 'components/dialog/dialog'
import MHeader from 'components/m-header/m-header'
export default {
  components: {
    MHeader,
    MDialog
  },
  data () {
    return {
      page: 0,
      success: 0,
      roleList: [],
      selectArray: [],
      ruleArray: [],
      // 添加流程数据
      name: '',
      list: '',
      start: '',
      // 添加材料的内容选项
      cId: 0,
      cName: 0,
      cSize: 0,
      cSupplier: 0,
      cUnit: 0,
      cPrice: 0,
      cNum: 0,
      cTotal: 0,
      cContent: 0
    }
  },
  computed: {
    checkValue: function () {
      if (!this.name || this.selectArray.length === 0) {
        return true
      } else {
        return false
      }
    },
    checkValueOfRule: function () {
      this.ruleArray = document.querySelectorAll('.icon-xuanzhong') || []
      if (this.ruleArray.length > 0) {
        return true
      } else {
        return true
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
        var nodes = document.querySelectorAll('.members p i')
        for (let i = 0; i < nodes.length; i++) {
          if (nodes[i].className.indexOf('xuanzhong') > 0) {
            nodes[i].className = 'iconfont icon-yuanquan'
          }
        }
        event.target.className = 'iconfont icon-xuanzhong'
      }
    },
    sure () { // 把选择的传递到前面
      this.page = 0
      var nodes = document.querySelectorAll('.members p')
      // 不清空array
      // this.selectArray = []
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].childNodes[0].className.indexOf('xuanzhong') > 0) {
          this.selectArray.push(nodes[i].childNodes[1].data.trim())
        }
      }
    },
    hide (e) {
      this.$arrayRemoveByValue(this.selectArray, e.target.innerHTML.trim())
    },
    // 添加流程
    _addApproval() {
      this.list = this.selectArray.join('-')
      this.start = this.selectArray[0]
      api.addProcess(sessionStorage.id, sessionStorage.token, this.name, this.list, this.start, this.cId, this.cName, this.cSize, this.cSupplier, this.cUnit, this.cPrice, this.cNum, this.cTotal, this.cContent)
        .then(res => {
          if (res.code === 200) {
            console.log(res)
            this.success = 1
            var that = this
            setTimeout(function() {
              that.$router.push('/home')
            }, 1000)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 添加材料内容项
    addtabs(value, e) {
      if (e.target.className.indexOf('yuanquan') > 0) {
        this.$set(this.$data, value, 1)
        e.target.className = 'iconfont icon-xuanzhong'
      } else {
        this.$set(this.$data, value, 0)
        e.target.className = 'iconfont icon-yuanquan'
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable'
  .icon-yuanquan, .icon-xuanzhong
    color $color-text-a
  .add-member
    padding-bottom 1.6rem  
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
      .material-content
        box-sizing border-box
        padding .4rem
        p
          padding-bottom .4rem
        .m-c-ul
          display flex
          flex-flow row wrap
          align-content flex-start
          .m-c-li
            display flexbox
            flex 0 0 33.3%
            line-height 1.6
            i
              color $color-text-gray
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
      margin-bottom .4rem  
</style>
