<template>
  <div class="approval-detail">
    div.>ul.>(li.*3)
    <transition name="fade">
      <m-dialog :msg="toastMsg" btn="" v-show="success === 1"></m-dialog>
    </transition>
    <m-header links='/home' msg="资金审批"></m-header> 
    <div class="main-body">
      <section class="content">
        <p class="c-title">编号: {{pid}}</p>
        <p class="c-title">名称: {{name}}</p>
        <p class="c-title">审批流程: </p>
        <p class="c-title-s">
          {{nodeArray}}
        </p>
      </section>
      <section class="select">
        <div class="form-group border-bottom">
          <label for="" class="f-label">材料：</label>
          <i class="iconfont icon-xiangxia float-right" style="transform: rotate(-90deg)" ref="icon0" @click="showSelect(0)"></i>
          <input class="f-input" v-model="materialValue" type="text" readonly>          
        </div>
      </section>
      <section class="msg">
        <div class="msg-content border-bottom">
          <p class="msg-c-t">审批内容:</p>
          <p class="msg-c-c">
            <textarea class="f-input" v-model="addFlow.content" name="" id="" cols="30" rows="3"></textarea>
          </p>
        </div>
        <div class="form-group border-bottom">
          <label for="" class="f-label">添加审批人：</label>
          <i class="iconfont icon-xiangxia float-right" ref="icon1" @click="showSelect(1)"></i>
          <input class="f-input" v-model="contentValue" type="text" readonly>
        </div>
        <div class="select-content" v-show="select1 === 1">
          <p class="border-bottom select-item" v-for="item in approvalPeople" @click="addFlow.rname = contentValue = item.name, select1 = 0" :key="item.id">{{item.name}}   {{item.rname}}</p>
        </div>
      </section>
      <button class="btn" @click="_addApprovalFlow" :class="{disabledStyle: checkValue}" :disabled="checkValue">执行</button>
    </div>
  </div>
</template>

<script>
import api from 'api/api'
import MHeader from 'components/m-header/m-header'
import MDialog from 'components/dialog/dialog'
export default {
  components: {
    MHeader,
    MDialog
  },
  data () {
    return {
      toastMsg: '',
      select0: 0,
      select1: 0,
      success: 0,
      material: [],
      approvalPeople: [], // 下级审批人员
      materialValue: '',
      contentValue: '',
      addFlow: {
        proId: '', // 流程ID int
        dataId: '', // 材料ID int
        num: '', // 数量 int
        content: '', // 审批内容 string
        rname: '' // 审批人 string
      }
    }
  },
  computed: {
    checkValue: function () {
      if (!this.materialValue || !this.addFlow.num || !this.addFlow.content || !this.contentValue) {
        return true
      } else {
        return false
      }
    }
  },
  created () {
    console.log(this.$route.params)
    // 首页路由传过来 流程的参数
    this.pid = this.$route.params.pid
    this.name = this.$route.params.nodeArray.split('-')[1] || ''
    this.nodeArray = this.$route.params.nodeArray
    // this.start = this.$route.params.start
    // 初始化获取材料和审批人
    this._getMaterialList(sessionStorage.id, sessionStorage.token)
    this._getApprovalPeople(sessionStorage.id, sessionStorage.token, this.name)
    this.materialObj = {}
  },
  mounted () {
  },
  methods: {
    showSelect(a) {
      this.$router.push('/material')
    },
    // 获取材料
    _getMaterialList(uid, token) {
      api.getMaterialList(uid, token)
        .then(res => {
          if (res.code === 200) {
            this.material = res.message
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 获取审批人
    _getApprovalPeople(uid, token, name) {
      api.getApprovalPeople(uid, token, name)
        .then(res => {
          this.approvalPeople = res.message
        })
        .catch(error => {
          console.log(error)
        })
      .catch(error => {
        console.log(error)
      })
    },
    // 添加一个审批流程——执行
    _addApprovalFlow() {
      api.addApprovalFlow(sessionStorage.id, sessionStorage.token, this.$route.params.id, this.addFlow.dataId, this.addFlow.num, this.addFlow.content, this.addFlow.rname)
        .then(res => {
          var that = this
          if (res.code === 200) {
            console.log(res)
            this.toastMsg = '执行成功'
            this.success = 1
            setTimeout(function() {
              that.$router.push('/approval/approvalAlready')
            }, 1000)
          } else {
            this.toastMsg = res.message
            this.success = 1
            setTimeout(function() {
              that.success = 0
            }, 1000)
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
  .rotate
    transform-origin 50% 50%
    transition all .3s linear 
    transform rotateZ(180deg)
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
      .select, .msg
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
            .f-input
              border none 
              outline none 
              width 100%
              color $color-text-gray
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
