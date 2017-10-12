<template>
  <!-- 已选材料 -->
<div>
  <transition name="fade">
      <m-dialog  :msg="message" btn="" v-show="dialog === 1"></m-dialog>
    </transition>
  <div class="material-m" v-show="page===0">
    <div class="header border-bottom header-bg">
      <span  class="h-back" @click="backToDe()" >
        <i class="iconfont icon-xiangzuo"></i>返回
      </span>
      已选（{{this.materialC.length}}）
      <span class="right" @click="backToDe()">确定</span>
    </div>
    <div class="m-m-content">
      <ul class="m-m-ul">
        <li class="m-item-li" v-for="(item, index) in materialC" :key="index">
          <p>材料1</p>
          <div class="m-item-s">
            <div class="m-item">
              <ul class="item-tabs">
                <li class="tabs-li" v-show="cId === 1">编号:{{item.stuff_id}}</li>
                <li class="tabs-li" v-show="cName === 1">名称:{{item.stuff_name}}</li>
                <li class="tabs-li" v-show="cSize === 1">型号:{{item.stuff_size}}</li>
                <li class="tabs-li" v-show="cSupplier === 1">供应商:{{item.stuff_supplier}}</li>
                <li class="tabs-li" v-show="cUnit === 1">单位:{{item.stuff_unit}}</li>
                <li class="tabs-li" v-show="cPrice === 1">单价:{{item.stuff_price}}</li>
                <li class="tabs-li" v-show="cContent === 1">备注:{{item.content}}</li>
              </ul>
              <div class="m-item-footer border-top">
                <div class="m-item-f-num" v-show="cNum === 1">
                  <span class="f-num-label">数量:</span>
                  <!-- <input type="text" class="f-num-input" v-on:input="addNum(index, item.stuff_price, $event)"> -->
                  <input type="text" class="f-num-input" v-model="mNumber[index]">
                </div>
                <div class="m-item-f-total" v-show="cTotal === 1">总价：<span class="f-total-num">{{mNumber[index] * item.stuff_price}}</span></div>
              </div>
            </div>
            <div class="m-item-del" @click="delMaterialC(index)">删除{{index}}</div>
          </div>
        </li>
      </ul>
    </div>
    <div class="btn" @click="page = 1"><i class="iconfont icon-jia">  继续添加</i></div>
  </div>
  <!-- 选择材料 -->
  <div class="material-choose" v-if="page === 1">
    <div class="header" style="background:#9eb1a; color:#fff!important; z-index:1002;">
      <i class="iconfont icon-xiangzuo h-back" style="color:#fff!important;" @click="page = 0">放回</i>
      选择材料
      <span class="right">已选（{{this.materialC.length}}）</span>
    </div>
    <div class="search" v-show="materialSelect === 0">
      <i class="iconfont icon-sousuo s-icon" ></i>
      <input type="text" class="s-input" placeholder="搜索"  ref='search' v-on:input='searchV()'>
    </div>
    <div class="top-tab">
      <div class="tab">
        <ul class="tab-ul">
          <li class="tab-item" @click="getScience()">{{materialOneV}}<i class="iconfont icon-xiangxia1"></i></li>
          <li class="tab-item" @click="getTwoScience(materialOneId)">{{materialTwoV}}<i class="iconfont icon-xiangxia1"></i></li>
          <li class="tab-item" @click="getThreeScience()">{{materialThreeV}}<i class="iconfont icon-xiangxia1"></i></li>
        </ul>
      </div>
      <div class="tab-content border-top" v-show="materialSelect===1">
        <ul class="">
          <li class="li" @click="materialChoose(item.level_id, item.name)" v-for="item in materialOne" :key="item.index">{{item.name}}</li>
        </ul>
      </div>
    </div>
    <div class="m-c-content">
      <div class="content-item" v-for="item in materialFour" :key="item.index">
        <ul class="item-tabs">
          <li class="tabs-li">编号:{{item.stuff_id}}</li>
          <li class="tabs-li">名称:{{item.stuff_name}}</li>
          <li class="tabs-li">型号:{{item.stuff_size}}</li>
          <li class="tabs-li">供应商:{{item.stuff_supplier}}</li>
          <li class="tabs-li">单位:{{item.stuff_unit}}</li>
          <li class="tabs-li">单价:{{item.stuff_price}}</li>
        </ul>
        <p class="item-text">备注：{{item.content}}</p>
        <i class="iconfont icon-jia item-add" @click="mChoose(item, $event)"></i>
      </div>
    </div>
    <div class="model" v-show="materialSelect === 1"></div>
  </div>
</div>  
</template>

<script>
import api from 'api/api'
import store from 'store/store'
import MDialog from 'components/dialog/dialog'
export default {
  components: {
    MDialog
  },
  data () {
    return {
      dialog: 0,
      message: '',
      // page 参数
      page: 0,
      materialSelect: 0,
      materialOneV: '' || '主料',
      materialOneId: '',
      materialTwoV: '' || '辅料',
      materialTwoId: '',
      materialThreeV: '' || '三级',
      materialThreeVId: '',
      materialCB: [],
      materialC: [], // 选好的材料
      pid: '', // 流程id
      // 材料
      mNumber: [],
      level: 0,
      materialOne: [],
      materialFour: [],
      // 添加材料的内容选项
      cId: 1,
      cName: 1,
      cSize: 1,
      cSupplier: 1,
      cUnit: 1,
      cPrice: 1,
      cNum: 1,
      cTotal: 1,
      cContent: 1
    }
  },
  watch: {
    materialC: {
      handler() { // 选返回的材料
        var arr = []
        var that = this
        if (this.materialC) {
          for (let i = 0; i < this.materialC.length; i++) {
            arr.splice(i, 0, [this.materialC[i].id, this.materialC[i].materialNum])
          }
        }
        this.materialCB = arr
        setTimeout(function() {
          if (!this.page) {
            that.touch()
          }
        }, 1000)
      },
      deep: false
    }
  },
  computed: {
    materialCName () { // 选好的材料的id && num
      var a = []
      for (let i = 0; i < this.materialC.length; i++) {
        if (this.materialC[i].name) {
          a[i] = [this.materialC[i].name, parseInt(this.materialC[i].id), parseInt(this.mNumber[i])]
        }
      }
      console.log(a)
      return a
    }
  },
  created () {
    // 初始化，渲染第一个值
  },
  mounted() {
    // if (this.$store.state.materialC.length > 0) {
    //   this.materialC = this.$store.state.materialC
    // } else {
    //   console.log('初次添加')
    // }
    this.pid = this.$route.params.id
    this._getStuffAtt(this.pid)
  },
  methods: {
    // 选择主料
    getScience() {
      this.materialSelect = this.materialSelect === 1 ? 0 : 1
      this._getScience()
    },
    getTwoScience(id) {
      this.materialSelect = this.materialSelect === 1 ? 0 : 1
      this._getTwoScience(id)
    },
    getThreeScience(id) {
      this.materialSelect = this.materialSelect === 1 ? 0 : 1
      this._getThreeScience(id)
    },
    // paicker 选择
    materialChoose(id, name) {
      console.log(id)
      // 收起picker
      if (this.level === 1) {
        this.materialOneV = name
        this.materialOneId = id
        this._getTwoScience(id)
        this.materialSelect = 0
      } else if (this.level === 2) {
        this.materialTwoV = name
        this.materialTwoId = id
        this.materialSelect = 0
        this._getThreeScience(id)
      } else if (this.level === 3) {
        this.materialThreeV = name
        this._getFourScience(id)
        this.materialSelect = 0
      } else {
        console.log('报错')
      }
    },
    // material choose to edit
    mChoose(item, e) {
      if (e.target.className.indexOf('icon-jia') > 0) {
        // 添加数量字段
        item.materialNum = 0
        item.materialTotal = 0
        e.target.className = 'iconfont icon-yuanquan item-add'
        this.materialC.push(item)
        console.log('materialC+++', this.materialC)
      } else {
        e.target.className = 'iconfont icon-yuanquan item-add'
        console.log('materialC', '添加过了')
      }
    },
    // 搜罗
    searchV () {
      this._stuffSearch(this.$refs.search.value)
    },
    // del
    delMaterialC(i) {
      this.materialC.splice(i, 1)
    },
    // 放回
    backToDe() {
      let s = false
      let that = this
      let forNum = /^\d{1,}$/
      // debugger
      if (this.materialC.length === this.mNumber.length) {
        if (this.materialC.length === 0) {
          this.$router.push({name: 'approvalDetail', params: {materialCName: this.materialCName}})
        } else { // 有数量的情况
          for (let i = 0; i < this.mNumber.length; i++) {
            if (!forNum.test(this.mNumber[i])) {
              s = true
            }
          }
          if (s === true) {
            this.dialog = 1
            this.message = '请填写数量'
            setTimeout(function() {
              that.dialog = 0
            }, 1000)
          } else {
            this.$router.push({name: 'approvalDetail', params: {materialCName: this.materialCName}})
          }
        }
      } else if (parseInt(this.cNum) === 0) { // 没有数量的情况
        this.$router.push({name: 'approvalDetail', params: {materialCName: this.materialCName}})
      } else {
        this.dialog = 1
        this.message = '请填写数量'
        setTimeout(function() {
          that.dialog = 0
        }, 1000)
      }
      console.log(store)
    },
    showMsg (data) {
      console.log(data)
      this.dialog = parseInt(data)
    },
    _getScience() {
      api.getScience(sessionStorage.id, sessionStorage.token)
        .then(res => {
          if (res.code === 200) {
            this.materialOne = res.message
            this.level = 1
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    _getTwoScience(id) {
      api.getTwoScience(sessionStorage.id, sessionStorage.token, id)
        .then(res => {
          if (res.code === 200) {
            this.materialOne = res.message
            this.level = 2
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    _getThreeScience(id) {
      api.getThreeScience(sessionStorage.id, sessionStorage.token, id)
        .then(res => {
          if (res.code === 200) {
            this.materialOne = res.message
            this.level = 3
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    _getFourScience(id) {
      api.getFourScience(sessionStorage.id, sessionStorage.token, id)
        .then(res => {
          if (res.code === 200) {
            this.materialFour = res.message
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    _stuffSearch(keyword) {
      api.stuffSearch(sessionStorage.id, sessionStorage.token, keyword)
        .then(res => {
          if (res.code === 200) {
            this.materialFour = res.message
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    _getStuffAtt(pid) {
      api.getStuffAtt(sessionStorage.id, sessionStorage.token, pid)
        .then(res => {
          if (res.code === 200) {
            this.cId = res.message[0].is_id
            this.cName = res.message[0].is_name
            this.cSize = res.message[0].is_size
            this.cSupplier = res.message[0].is_supplier
            this.cUnit = res.message[0].is_unit
            this.cPrice = res.message[0].is_price
            this.cNum = res.message[0].is_num
            this.cTotal = res.message[0].is_total
            this.cContent = res.message[0].is_content
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    touch() {
      var expansion = null
      var e = document.querySelectorAll('.m-m-ul .m-item-li .m-item-s')
      for (var i = 0; i < e.length; i++) {
        var x, y, X, Y, swipeX, swipeY
        e[i].addEventListener('touchstart', function (event) {
          x = event.changedTouches[0].pageX
          y = event.changedTouches[0].pageY
          swipeX = true
          swipeY = true
          if (expansion) {
            expansion.className = 'm-item-s'
          }
        })
        e[i].addEventListener('touchmove', function (event) {
          X = event.changedTouches[0].pageX
          Y = event.changedTouches[0].pageY
          // 左右滑动
          if (swipeX && Math.abs(X - x) - Math.abs(Y - y) > 0) {
            // 阻止事件冒泡
            event.stopPropagation()
            if (X - x > 10) { // 右滑
              event.preventDefault()
              this.className = 'm-item-s' // 右滑收起
            }
            if (x - X > 10) { // 左滑
              event.preventDefault()
              this.className = 'swipeleft m-item-s' // 左滑展开
              expansion = this
            }
            swipeY = false
          }
          // 上下滑动
          if (swipeY && Math.abs(X - x) - Math.abs(Y - y) < 0) {
            swipeX = false
          }
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
.swipeleft 
    transform:translateX(-1.5rem)
.material-choose, .material-m
  background $color-background
  .header-bg
    background #fff!important
  .header
    position relative
    top 0
    left 0
    width 100%
    box-sizing border-box
    font-size 16px
    text-align center
    padding .373333rem
    background #82a28e
    .h-back
      color #555
      position absolute
      left .37rem
      display inline
        position absolute
        top 0
        left 0-block
      font-size 14px
    .right
      position absolute
      right .37333rem 
      font-size 14px
  .search
    position relative
    box-sizing border-box
    padding .2rem 0
    .s-icon
      position absolute
      left .7rem
      top .385rem
    .s-input
      width 9.2rem
      height .85rem
      line-height 1.0rem
      box-sizing border-box
      border none
      outline none
      background #fff
      padding-left .95rem
      border-radius .12rem
  .top-tab
    position relative
    background #ffffff
    z-index 1002    
    .tab
      position relative
      .tab-ul
        display flex
        flex-flow row nowrap
        padding .275rem 0
        .tab-item
          font-size $font-size-medium
          flex 0 0 33.3%
          border-right 1px solid #EFEFF0
    .tab-content
      position absolute
      top auto
      left 0
      width 100%
      height auto
      background #ffffff
      z-index 1002
      line-height 1.6
      padding .4rem 0
      font-size $font-size-medium
      ul>li
        line-height 2.4
  .m-c-content, .m-m-content
    position relative
    top 0.1rem
    padding-bottom .15rem
    .content-item, .m-item
      position relative
      background #ffffff
      margin-bottom .15rem
      text-align left 
      padding .2rem .4rem .4rem
      box-sizing border-box
      line-height 1.6
      color $color-text-gray  
      .item-tabs
        display flex
        flex-flow row wrap
        .tabs-li
          overflow-x auto
          flex 0 0 33.3%
      .item-text
        word-wrap break-word
        width 8rem
      .item-add
        position absolute
        right .4rem
        bottom .4rem
        background $color-btn
        color #ffffff
        padding .1rem
        border-radius .4rem
        font-size $font-size-medium
        line-height 1
  .model
    position fixed
    width 100%
    height 100%
    top 0
    left 0
    background rgba(1, 1, 1, 0.4)
    z-index 1001  
.material-m
  .m-m-content
    top 0
    margin-bottom 1.5rem
    .m-m-ul
      overflow hidden
      .m-item-li
        text-align left
        width 10rem
        p
          padding .05rem 0 .05rem .4rem
        .m-item-s
          width 11.5rem
          background #fff
          display flex
          transition all .4s linear
          .m-item
            flex 20
            display inline-block
            position relative
            left 0
            background #fff
            padding-bottom .05rem
            .m-item-footer
              position relative
              width 9.2rem
              padding .1rem 0
              .m-item-f-num
                width 3rem
                border 1px solid $color-background
                padding 0 .1rem
                box-size border-box
                .f-num-label
                .f-num-input
                  text-align right
                  width 2rem
                  border none 
                  outline none 
              .m-item-f-total
                position absolute
                right 0
                top .16rem
                .f-total-num
                  color $color-btn   
          .m-item-del
            flex 3
            display flex
            align-items center
            justify-content center
            height auto
            position relative
            background   $color-sub-theme
            color #fff
            
  .btn
    position fixed
    bottom 0
    left 0
    background $color-btn
    color #fff
    font-size $font-size-medium-x
    width 10rem
    height 1.2rem
    line-height 1.2rem
    text-align center         
</style>
