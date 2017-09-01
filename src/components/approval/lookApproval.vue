<template>
  <div class="lookApproval">
    <m-header links='/approval' msg="资金审批"></m-header>
    <m-dialog v-if="dialog === 1" msg="输入信息不完整" btn="确定"></m-dialog>
    <div class="main-body">
      <!-- main body -->
      <div class="flow">
        <p class="f-content">编号：{{approval.num}}</p>
        <p class="f-content">名称：{{approval.name}}</p>
        <p class="f-content">审批流程：</p>
        <p class="f-content-s">{{approval.content}}</p>        
        <p class="f-content">材料：</p>
        <p class="f-content-s">004-水泥 （带） -5000</p>
      </div>
      <div class="flow">
        <p class="f-content">发起人：{{approval.suber}}</p>
        <p class="f-content">审批内容：</p>
        <p class="f-content-s">改消费属于垃圾消费，渣渣的是多少卡的空间撒谎的课件撒是的辉煌科技时代监控和撒的结合</p>        
        <p class="f-content">提出人：出纳丽丽</p>
        <p class="f-content">提交意见：</p>
        <p class="f-content-s">没问题</p>
      </div>
      <div class="flow">
        <p class="f-content">审批人：{{approval.reApproval}}</p>
        <p class="f-content">审批意见：</p>
        <p class="f-content-s">
          <input type="text" class="f-content-i" v-model="content" placeholder="请输入审批内容">
        </p>
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
          <label for="" class="f-label">审批人：</label>
          <i class="iconfont icon-xiangxia float-right" ref="icon" @click="showSelect()"></i>
          <input type="text" class="f-input" v-model="nextReApproval">
        </div>
        <div class="select-content" v-show="select === 1">
          <p class="border-bottom select-item" @click="nextReApproval = item.name" v-for="item in memberList" :key="item.index">{{item.rname | checkNull('职位名称')}} | {{item.name | checkNull('姓名')}}</p>
        </div>
      </div>
    </div>
    <button class="btn" @click="_moneyApproval" :class="{disabledStyle: checkValue}" :disabled="checkValue">审批</button>  
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
      dialog: 0,
      select: 0,
      isActive0: 1,
      isActive1: 0,
      isActive2: 0,
      memberList: [],
      fId: '', // 审批id
      nextReApproval: '', // 下级审批人
      content: '', // 当前审批内容,
      state: '', // 审批状态
      approval: {
        num: '', // 流程编号
        name: '', // 流程名称
        content: '', // 流程内容
        suber: '', // 发起人
        reApproval: '' // 审批人
      }
    }
  },
  computed: {
    checkValue: function () {
      if (!this.nextReApproval || !this.content) {
        return true
      } else {
        return false
      }
    }
  },
  created () {
    console.log(this.$route.params)
    this._getApprovalInfo(this.$route.params.fid)
    // this._getProcessInfo(this.$route.params.lid)
    this._getAllPerson()
  },
  methods: {
    showSelect() {
      this.select = this.select === 0 ? 1 : 0
      this.$refs.icon.className = this.select === 0 ? 'iconfont icon-xiangxia float-right' : 'iconfont icon-xiangshang float-right'
    },
    // 获取审批详情
    _getApprovalInfo(fid) {
      api.getApprovalInfo(sessionStorage.id, sessionStorage.token, fid)
        .then(res => {
          if (res.code === 200) {
            this.approval.reApproval = res.message.rname
            this.approval.num = res.message.process[0].pid
            this.approval.name = res.message.process[0].pname
            this.approval.content = res.message.process[0].nodeArray
            this.approval.suber = res.message.process[0].start
            this.fId = res.message.id
            console.log(this.approval)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 获取所有人员
    _getAllPerson() {
      api.getAllPerson(sessionStorage.id, sessionStorage.token)
        .then(res => {
          if (res.code === 200) {
            var user = []
            for (let i = 0; i < res.message.length; i++) {
              user.splice(i, 0, res.message[i].user)
            }
            for (let i = 0; i < user.length; i++) {
              if (user[i].length > 0) {
                for (let a = 0; a < user[i].length; a++) {
                  this.memberList.splice(a, 0, user[i][a])
                }
              }
            }
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 审批 （资金审批审批）
    _moneyApproval() {
      // 审批状态
      this.state = Math.max(this.isActive0, this.isActive1, this.isActive2)
      api.moneyApproval(sessionStorage.id, sessionStorage.token, this.content, this.nextReApproval, this.fId, this.state)
        .then(res => {
          if (res.code === 200) {
            console.log(res)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    _getProcessInfo(lid) {
      api.getProcessInfo(sessionStorage.id, sessionStorage.token, lid)
        .then(res => {
          if (res.code === 200) {
            this.approval.num = res.message.pid
            this.approval.name = res.message.pname
            this.approval.content = res.message.nodeArray
            this.approval.suber = res.message.start
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
          .f-content-i
            width 100%
            border none
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
          .f-input
            float right 
            border none
            outline none 
            text-align right
            height 1.2rem 
            line-height 1.2rem
            padding-right .2rem
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
