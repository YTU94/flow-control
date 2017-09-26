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
        <span class="f-state">审批中|失败</span>
        <p class="f-content">编号：{{approval.rid}}</p>
        <p class="f-content">名称：{{approval.pname}}</p>
        <p class="f-content">审批流程：</p>
        <p class="f-content-s">{{approval.nodeArray}}</p>        
        <!-- <p class="f-content">材料：</p>
        <p class="f-content-s">{{approval.datasaveName}} X {{approval.datasaveNum}}</p> -->
      </div>
      <div class="select margin-top-2" v-show="lastApproval === 1">
        <div class="form-group border-bottom">
          <label for="" class="f-label">材料：</label>
          <i class="iconfont icon-xiangxia float-right"  @click="showSelect('selectM', $event)"></i>
          <input type="text" class="f-input" v-model="nextReApproval" readonly>
        </div>
        <!-- 材料内容 -->
        <div class="material-content" v-show="selectM === 1">
          <ul class="m-m-ul">
            <li class="m-item-li">
              <p>材料1</p>
              <div class="m-item">
                <ul class="item-tabs">
                  <li class="tabs-li">编号：1</li>
                  <li class="tabs-li">编号：1</li>
                  <li class="tabs-li">编号：1</li>
                  <li class="tabs-li">编号：1</li>
                  <li class="tabs-li">编号：1</li>
                  <li class="tabs-li">编号：1</li>
                  <li class="tabs-li">编号：1</li>
                </ul>
                <div class="m-item-footer border-top">
                  <div class="m-item-f-num">
                    <span class="f-num-label">数量:</span>
                    <input type="text" class="f-num-input">
                  </div>
                  <div class="m-item-f-total">总价：<span class="f-total-num">21312</span></div>
                </div>
              </div>
            </li>
            <li class="m-item-li">
              <p>材料1</p>
              <div class="m-item">
                <ul class="item-tabs">
                  <li class="tabs-li">编号：1</li>
                  <li class="tabs-li">编号：1</li>
                  <li class="tabs-li">编号：1</li>
                  <li class="tabs-li">编号：1</li>
                  <li class="tabs-li">编号：1</li>
                  <li class="tabs-li">编号：1</li>
                  <li class="tabs-li">编号：1</li>
                </ul>
                <div class="m-item-footer border-top">
                  <div class="m-item-f-num">
                    <span class="f-num-label">数量:</span>
                    <input type="text" class="f-num-input">
                  </div>
                  <div class="m-item-f-total">总价：<span class="f-total-num">21312</span></div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="flow">
        <p class="f-content">流程进度：{{approval.startName}}</p>
        <div class="for-border">
          <div class="f-dot"><i class="iconfont icon-yuanshixin"></i></div>
          <div class="f-border"></div>
          <p class="f-content f-c-padding-l">会计小王 <span class="l-state">发起申请</span></p>
          <p class="f-content-s f-c-padding-l">asdasdasdasdsadasdasdasddddddddddddddddddddddddddddddddddddddddddd</p>
        </div>
        <!--  审批人 -->
        <p class="f-content">
          <i class="iconfont icon-yuanshixin icon-c-end"></i> 水电施工员 <span class="l-state color-yellow">审批中</span>
        </p>
      </div>
      <div class="flow margin-top-2" v-show="lastApproval === 1">
        <!-- <p class="f-content">审批人：{{approval.rname}}</p> -->
        <p class="f-content">审批意见：</p>
        <p class="f-content-s">
          <textarea class="f-content-i" name="" id="" cols="30" rows="3" placeholder="请输入审批意见"></textarea>
          <!-- <input type="text" class="f-content-i" v-model="content" placeholder="请输入审批内容"> -->
        </p>
      </div>

      <!-- 审核状态 -->
      <div class="state border-top" v-show="lastApproval === 1">
        审批状态：
        <span class="state-item">
          <i @click="isActive(1)" ref="iconState0" class="iconfont icon-yuanquan" v-bind:class="{ 'icon-xuanzhong': isActive0 === 1 }"></i>    通过
        </span>
        <span class="state-item">
          <i @click="isActive(2)" ref="iconState1" class="iconfont icon-yuanquan" v-bind:class="{ 'icon-xuanzhong': isActive0 === 2 }"></i>    不通过
        </span>
        <!-- <span class="state-item">
          <i @click="isActive(3)" ref="iconState2" class="iconfont icon-yuanquan" v-bind:class="{ 'icon-xuanzhong': isActive0 === 3 }"></i>    回滚
        </span> -->
      </div>
      <!-- 添加审批人 -->
      <div class="select border-top" v-show="lastApproval === 1">
        <div class="form-group border-bottom">
          <label for="" class="f-label">审批人：</label>
          <i class="iconfont icon-xiangxia float-right" ref="iconSelect" @click="showSelect('select', $event)"></i>
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
      selectM: 0,
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
        rule: '' // 当前审批人角色
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
    this._getApprovalInfo(this.$route.params.fid)
  },
  mounted () {
    console.log(this)
    if (sessionStorage.approvalTextMsg) {
      this.content = sessionStorage.approvalTextMsg
    }
  },
  methods: {
    isActive(v) {
      this.isActive0 = parseInt(v)
    },
    showSelect(a, e) {
      let c = 0
      if (a === 'select') {
        c = this.select = this.select === 0 ? 1 : 0
      } else {
        c = this.selectM = this.selectM === 0 ? 1 : 0
      }
      e.target.className = c === 0 ? 'iconfont icon-xiangxia float-right' : 'iconfont icon-xiangshang float-right'
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
            this.approval.rule = res.message.process[0].nodeArray.split('-')[parseInt(res.message.position)]
            this.fId = res.message.id || '' // finail id
            this.state = res.message.state // state0
            // 状态检测
            if (parseInt(this.state) === 1) {
              // state 1 通过  不能操作
              console.log('1 => 不可以操作')
              // 选择审批人 不可操作
              this.isActive0 = parseInt(this.state)
              this.showSelect = null
              this.isActive = null
              this.btnValue = '已审批，通过'
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
              return false
            } else if (parseInt(this.state) === 2) {
              // 2 不通过 不能操作
              console.log('1 => 不可以操作')
              // 选择审批人 不可操作
              this.isActive0 = parseInt(this.state)
              this.showSelect = null
              this.isActive = null
              this.btnValue = '已审批，不通过'
              return false
            } else if (parseInt(this.state) === 3) {
              // 3 回滚 可以操作
              this.isActive0 = parseInt(this.state)
              // 检测发起人
            }
            // 以下可以操作的状态 0 3
            // 最后一个审批人,没有选择审批
            if (parseInt(res.message.process[0].nodeArray.split('-').indexOf(sessionStorage.rname)) + 1 === res.message.process[0].nodeArray.split('-').length) {
              // this.lastApproval = 0
              this.nextReApproval = '没有下级审批人'
              if (this.content) {
                this.$refs.btn.disabled = true
              }
              return false
            } else {
              // 发起人检测
              var index = 0
              var name = ''
              if (res.message.process[0]) {
                index = res.message.process[0].nodeArray.split('-').indexOf(sessionStorage.rname)
                name = res.message.process[0].nodeArray.split('-')[parseInt(index) + 1]
              }
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
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable'
  .margin-top-2
    margin-top .2rem
  .color-yellow
    color rgb(250, 180, 88)
  .icon-yuanshixin
    font-size 10px  
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
        position relative
        float left
        width 100%
        box-sizing border-box
        padding .4rem
        background #fff
        font-size $font-size-medium
        text-align left
        color $color-text-d
        overflow hidden
        .f-state
          position absolute
          right -.9rem
          top .35
          //  审批中
          // background rgb(250, 180, 88)
          // 审批失败
          background rgb(200, 86, 86)
          color #fff
          transform rotate(45deg)
          padding .1rem 0
          width 3rem
          text-align center
          font-size $font-size-small
        .f-content
          line-height 1.6
          .icon-c-end
            color rgb(111, 151, 144)
            padding: 1px
            background: rgb(197,213,211)
            border-radius: 8px
        .f-content-s
          line-height 1.6
          color $color-text-gray
          font-size $font-size-small
          word-break break-word
          .f-content-i
            width 100%
            border none
        // add 流程的进度样式 
        .for-border
          position relative
          box-sizing border-box
          padding-bottom .2rem
          .f-dot
            position absolute
            top 2px
            left 0
            color rgb(173, 185, 186)
            z-index 2
          .f-border
            border-left 1px dotted #eee
            position absolute
            top 4px
            left 5.75px
            height 100%
            box-sizing border-box
            font-size 10px
            color $color-text-a
            z-index 1
          .l-state
            color $color-btn
          .f-c-padding-l
            padding-left .4rem       
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
        // add later
        .material-content
          position relative
          background $color-background
          padding-bottom .3rem
          .m-m-ul
            .m-item-li
              text-align left
              color $color-text-gray
              width 100%
              box-sizing border-box
              p
                color $color-text-d
                padding-left .4rem
              .m-item
                box-sizing border-box
                padding .2rem .4rem
                position relative
                background rgb(245, 245, 245)
                .item-tabs
                  display flex
                  flex-flow row wrap
                  .tabs-li
                    flex 0 0 33.3%  
                .m-item-footer
                  box-sizing border-box
                  border-top 1px dotted #EFEFE0
                  padding .1rem .0rem
                  .m-item-f-num
                    position relative
                    display inline
                    .f-num-label
                      padding-left .0rem
                    .f-num-input
                      width 2rem
                      border none
                      outline none
                      text-align right
                      background rgb(245, 245, 245)
                      color $color-text-a
                  .m-item-f-total
                    display inline
                    float right 
                    .f-total-num
                      color  $color-text-a
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
