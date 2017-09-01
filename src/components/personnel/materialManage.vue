<template>
  <div class="member-manage">
    <!-- header -->
    <div class="header" v-if="search === 0">
      <m-header links="/personnel" msg="材料管理"></m-header>
      <i @click="search = 1" class="iconfont icon-sousuo" style="position: absolute;right: 0.4rem; font-size: 18px;"></i>
    </div>
    <div class="header h-background" v-else>
      <i class="iconfont icon-sousuo s-icon"></i>
      <input type="text" class="s-input" placeholder="请输入"  ref='search' v-on:input='searchV()'>
      <span class="s-cancel" @click="search = 0" >取消</span>
    </div>
    <!-- main body -->
    <h3 class="title">会计</h3>
    <div class="content">
      <ul class="list">
        <li class="" v-on:touchstart="touchS($event)" v-for="item in materialList" :key="item.id">
          <div class="item-msg">
            <p class="msg-one">{{item.stuff_id}} | {{item.id}}<span class="msg-sex">{{item.stuff_name}}</span></p>
            <p class="msg-two">备注：{{item.content}}</p>
          </div>
          <span class="item-delete" @click="_deleteMaterial(item.id, $event)">删除</span>          
          <router-link tag="span" :to="{name: 'materialUpdate', params: {id: item.id}}" class="item-update"></router-link>
        </li>       
      </ul>
    </div>
    <!-- foot btn -->
    <router-link tag="div" to="/materialAdd" class="btn">
      <i class="iconfont icon-jia"></i> 添加材料
    </router-link>
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
      search: 0, // 顶部搜索栏
      materialList: [],
      materialListNew: []
    }
  },
  created () {
    api.getMaterialList(sessionStorage.id, sessionStorage.token)
      .then(res => {
        if (res.code === 200) {
          console.log(res)
          this.materialList = res.message
          this.materialListNew = this.materialList
        }
      })
      .catch(error => {
        console.log(error)
      })
  },
  mounted () {
    var expansion = null
    var container = document.querySelectorAll('.list li')
    for (var i = 0; i < container.length; i++) {
      var x, y, X, Y, swipeX, swipeY
      container[i].addEventListener('touchstart', function (event) {
        x = event.changedTouches[0].pageX
        y = event.changedTouches[0].pageY
        swipeX = true
        swipeY = true
        if (expansion) { // 判断是否展开，如果展开则收起
          expansion.className = ''
        }
      })
      container[i].addEventListener('touchmove', function (event) {
        X = event.changedTouches[0].pageX
        Y = event.changedTouches[0].pageY
        // 左右滑动
        if (swipeX && Math.abs(X - x) - Math.abs(Y - y) > 0) {
          // 阻止事件冒泡
          event.stopPropagation()
          if (X - x > 10) { // 右滑
            event.preventDefault()
            this.className = '' // 右滑收起
          }
          if (x - X > 10) { // 左滑
            event.preventDefault()
            this.className = 'swipeleft' // 左滑展开
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
  },
  methods: {
    _deleteMaterial(id, e) {
      api.deleteMaterial(sessionStorage.id, sessionStorage.token, id)
        .then(res => {
          if (res.code === 200) {
            console.log(res)
            e.target.parentNode.style.display = 'none'
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 搜索
    searchV() {
      var v = this.$refs.search.value
      var list = this.materialListNew
      this.materialList = []
      for (let i = 0; i < list.length; i++) {
        if (list[i].content.indexOf(v) >= 0 || list[i].stuff_name.indexOf(v) >= 0) {
          this.materialList.splice(i, 0, list[i])
        } else {
          return false
        }
      }
    },
    touchS (e) {
      var expansion = null
      var x, y, X, Y, swipeX, swipeY
      e.target.addEventListener('touchstart', function (event) {
        x = event.changedTouches[0].pageX
        y = event.changedTouches[0].pageY
        swipeX = true
        swipeY = true
        if (expansion) { // 判断是否展开，如果展开则收起
          expansion.className = ''
        }
      })
      e.target.addEventListener('touchmove', function (event) {
        X = event.changedTouches[0].pageX
        Y = event.changedTouches[0].pageY
        // 左右滑动
        if (swipeX && Math.abs(X - x) - Math.abs(Y - y) > 0) {
          // 阻止事件冒泡
          event.stopPropagation()
          if (X - x > 10) { // 右滑
            event.preventDefault()
            this.className = '' // 右滑收起
          }
          if (x - X > 10) { // 左滑
            event.preventDefault()
            this.className = 'swipeleft' // 左滑展开
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
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable'
  .swipeleft 
    transform:translateX(-1.5rem) 
  .member-manage
    text-align left
    background $color-background
    position absolute
    width 100%
    height 100%
    .header
      float left
      width 100%
      padding 0 .4rem
      box-sizing border-box
      height 1.2rem
      line-height 1.2rem
      font-size $font-size-medium-x
      .s-icon
        position absolute
        left .5rem
      .s-input
        width 7.5rem
        height .85rem
        line-height 1.0rem
        border none
        outline none
        background #F7F7F7
        padding-left .65rem
        border-radius .12rem
      .s-cancel
        float right
    .title
      float left
      height 1rem
      line-height 1rem
      padding-left .4rem
      box-sizing border-box
      color $color-text-gray
    .content
      float left
      width 100%
      margin-bottom 1.2rem
      .list
        background #fff
        overflow hidden
      li
        width 11.5rem
        height 2.106667rem
        font-size $font-size-medium
        transition all .4s linear
        position relative
        border-bottom 1px solid #E6E6E6
        .item-msg
          text-align left
          display inline-block
          width 3.44rem
          position absolute
          transform translate(0%,50%)      
          padding 0 0 0 .4rem
          box-sizing content-box
          line-height 1.6
          .msg-one, .msg-two
            display block
            .msg-sex
              float right
              position absolute
              right 0
        .item-update, .item-delete
          float right
        .item-update
          bg-image('update')
          background-size 100% 100%
          width .6rem 
          height .6rem
          margin-top .7533rem
        .item-delete
          background red
          color #FFF
          width 1.5rem
          height 2.106667rem
          line-height 2.106667rem
          text-align center
          margin-left .4rem          
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
