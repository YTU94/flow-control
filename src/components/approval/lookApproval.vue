<template>
  <div class="lookApproval">
    <transition name="fade">
      <m-dialog msg="生成成功" btn="" v-show="success === 1"></m-dialog>
    </transition>
    <m-header links='/approval' msg="资金审批"></m-header>
    <m-dialog v-if="dialog === 1" msg="输入信息不完整" btn="确定"></m-dialog>
    <div class="main-body">
      <!-- main body -->
      <div class="flow">
        <p class="f-content">编号：{{approval.rid}}</p>
        <p class="f-content">名称：{{approval.pname}}</p>
        <p class="f-content">审批流程：</p>
        <p class="f-content-s">{{approval.nodeArray}}</p>        
        <p class="f-content">材料：</p>
        <p class="f-content-s">{{approval.datasaveName}} X {{approval.datasaveNum}}</p>
      </div>
      <div class="flow">
        <p class="f-content">发起人：{{approval.startName}}</p>
        <p class="f-content">审批内容：</p>
        <p class="f-content-s">{{approval.oneContent}}</p>
        <div class="" v-show="ifSubname === 1">
          <p class="f-content">提出人：{{approval.subname}}</p>
          <p class="f-content">提交意见：</p>
          <p class="f-content-s">{{approval.content}}</p>
        </div>     
      </div>
      <div class="flow" v-show="lastApproval === 1">
        <p class="f-content">审批人：{{approval.rname}}</p>
        <p class="f-content">审批意见：</p>
        <p class="f-content-s">
          <input type="text" class="f-content-i" v-model="content" placeholder="请输入审批内容">
        </p>
      </div>
      <!-- 审核状态 -->
      <div class="state" v-show="lastApproval === 1">
        审批状态：
        <span class="state-item">
          <i @click="isActive(1)" ref="iconState0" class="iconfont icon-yuanquan" v-bind:class="{ 'icon-xuanzhong': isActive0 === 1 }"></i>    通过
        </span>
        <span class="state-item">
          <i @click="isActive(2)" ref="iconState1" class="iconfont icon-yuanquan" v-bind:class="{ 'icon-xuanzhong': isActive0 === 2 }"></i>    不通过
        </span>
        <span class="state-item">
          <i @click="isActive(3)" ref="iconState2" class="iconfont icon-yuanquan" v-bind:class="{ 'icon-xuanzhong': isActive0 === 3 }"></i>    回滚
        </span>
      </div>
      <!-- 添加审批人 -->
      <div class="select" v-show="lastApproval === 1">
        <div class="form-group border-bottom">
          <label for="" class="f-label">审批人：</label>
          <i class="iconfont icon-xiangxia float-right" ref="iconSelect" @click="showSelect()"></i>
          <input type="text" class="f-input" v-model="nextReApproval" readonly>
        </div>
        <div class="select-content" v-show="select === 1">
          <p class="border-bottom select-item" @click="nextReApproval = item.name, select = 0" v-for="item in memberList" :key="item.index">{{item.name | checkNull('姓名')}} | {{item.rname | checkNull('职位名称')}}</p>
        </div>
      </div>
      <!-- 审批状态——发起人可见 -->
      <div class="select" v-show="lastApproval === 2">
        <div class="form-group border-bottom">
          <label for="" class="f-label">审批状态：</label>
          <span class="f-span-msg">{{approval.rule}}--{{approval.rname}}  正在审批</span>
        </div>
      </div>
    </div>
    <button class="btn" ref="btn" @click="_moneyApproval" :class="{disabledStyle: checkValue}" :disabled="checkValue">{{btnValue}}</button>  
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
      success: 0,
      dialog: 0,
      select: 0,
      ifSubname: 1,
      lastApproval: 1,
      isActive0: 1,
      isActive1: 0,
      isActive2: 0,
      memberList: [],
      btnValue: '审批',
      fId: '', // 审批id
      nextReApproval: '', // 下级审批人
      content: '', // 当前审批内容,
      state: '', // 审批状态
      approval: {
        state: '', // 状态
        rid: '', // 编号
        pname: '', // 名称
        nodeArray: '', // 流程
        datasaveName: '', // 材料
        datasaveNum: '', // 材料数量
        startName: '', // 发起人
        oneContent: '', // 审批内容
        subname: '', // 提交人
        content: '', // 提交内容
        rname: '', // 单前审批人
        rule: '' // 次级审批人角色
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
  },
  mounted () {
    if (sessionStorage.approvalTextMsg) {
      this.content = sessionStorage.approvalTextMsg
    }
  },
  methods: {
    isActive(v) {
      this.isActive0 = parseInt(v)
    },
    showSelect() {
      this.select = this.select === 0 ? 1 : 0
      this.$refs.iconSelect.className = this.select === 0 ? 'iconfont icon-xiangxia float-right' : 'iconfont icon-xiangshang float-right'
    },
    // 获取审批详情
    _getApprovalInfo(fid) {
      api.getApprovalInfo(sessionStorage.id, sessionStorage.token, fid)
        .then(res => {
          if (res.code === 200) {
            this.approval = res.message || ''
            this.approval.rid = res.message.rid || ''
            this.approval.pname = res.message.process[0].pname || ''
            this.approval.nodeArray = res.message.process[0].nodeArray || ''
            this.approval.datasaveName = res.message.datasave.data_name || ''
            this.approval.datasaveNum = res.message.datasave.data_number || ''
            this.approval.startName = res.message.one.subname || '' // 发起人
            this.approval.subname = res.message.subname || '' // 提交人
            this.approval.oneContent = res.message.one.content || '' // 当前生僻内容
            this.approval.rname = res.message.rname || '' // 单前审批人
            this.approval.content = res.message.content || '' // 提交内容
            this.approval.rule = res.message.process[0].nodeArray.split('-')[1]
            // get fid
            this.fId = res.message.id || '' // finail id
            this.state = res.message.state
            if (sessionStorage.rname && res.message.process[0]) {
              // debugger
              if (sessionStorage.rname === res.message.process[0].start) {
                this.btnValue = '审核中···'
                this.showSelect = null
                this.lastApproval = 2
                console.log('检测到是发起人')
              }
            }
            if (res.message.position) {
              if (parseInt(res.message.position) === 1) {
                // 影藏提交人
                this.ifSubname = 0
              }
            }
            if (parseInt(this.state) === 1 || parseInt(this.state) === 2) {
              // debugger
              // state 1 2  不能操作
              console.log('不可以操作')
              // 选择审批人 不可操作
              this.isActive0 = parseInt(this.state)
              this.showSelect = null
              this.isActive = null
              this.btnValue = '已审批，已操作'
              return false
            }
            // get people
            // 最后一个审批人,没有选择审批
            // debugger
            console.log(parseInt(res.message.position) + 1)
            console.log(res.message.process[0].nodeArray.split('-').length)
            if (parseInt(res.message.position) + 1 === res.message.process[0].nodeArray.split('-').length) {
              // this.lastApproval = 0
              this.nextReApproval = '没有下级审批人'
              if (this.content) {
                this.$refs.btn.disabled = true
              }
              return false
            } else {
              var name = res.message.process[0].nodeArray.split('-')[parseInt(res.message.position) + 1]
              // 获取当前审批人
              api.getApprovalPeople(sessionStorage.id, sessionStorage.token, name)
                .then(res => {
                  this.memberList = res.message || ''
                })
                .catch(error => {
                  console.log(error)
                })
            }
            console.log(this.approval)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 审批 （资金审批审批）
    _moneyApproval() {
      // 存入审批内容
      sessionStorage.approvalTextMsg = this.content
      // 审批状态
      this.state = Math.max(this.isActive0, this.isActive1, this.isActive2)
      api.moneyApproval(sessionStorage.id, sessionStorage.token, this.content, this.nextReApproval, this.fId, this.state)
        .then(res => {
          if (res.code === 200) {
            console.log(res)
            this.success = 1
            var that = this
            setTimeout(function() {
              that.$router.push('/approval')
            }, 1000)
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
          .f-span-msg
            float right  
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
