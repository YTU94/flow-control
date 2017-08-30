<template>
  <div class="roleManage">
    <m-header links="/personnel" msg="角色管理"></m-header>
    <!-- main body -->
    <div class="content">
      <ul class="list">
        <li class="c-item border-bottom" v-for="item in roleList" :key="item.id">
          <p class="item-name">
            {{item.rname}}
            <span class="item-level">{{item.check_rule}}</span>
          </p>
          <span class="item-delete"  @click="_deleteRole(item.id, $event)" >删除</span>          
          <router-link tag="span" :to="{name: 'roleUpdate', params: {id: item.id}}" class="item-update"></router-link>
        </li>
      </ul>
    </div>
    <!-- add role -->
    <router-link tag="div" to="/roleAdd" class="btn">
      <i class="iconfont icon-jia"></i> 添加角色
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
      roleList: []
    }
  },
  created () {
    api.getAllRole(sessionStorage.id, sessionStorage.token)
      .then(res => {
        if (res.code === 200) {
          this.roleList = res.message
        }
      })
      .catch(error => {
        console.log(error)
      })
  },
  mounted () {
    var that = this
    setTimeout(function() {
      console.log('a')
      that.addDelete()
    }, 1000)
  },
  methods: {
    addDelete() {
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
            expansion.className = 'border-bottom'
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
              this.className = 'border-bottom' // 右滑收起
            }
            if (x - X > 10) { // 左滑
              event.preventDefault()
              this.className = 'swipeleft border-bottom' // 左滑展开
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
    // 删除角色
    _deleteRole(rid, e) {
      api.deleteRole(sessionStorage.id, sessionStorage.token, rid)
        .then(res => {
          if (res.code === 200) {
            console.log(res)
            e.target.parentNode.style.display = 'none'
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
  .swipeleft 
    transform:translateX(-1.5rem)
  .roleManage
    position absolute
    width 100%
    height 100%
    background  $color-background
    .content
      background #fff
      float left
      margin-top 1.4rem
      width 100%
      height auto
      text-align left
      margin-bottom 1.2rem
      .list
        overflow hidden
      li
        width 11.5rem
        height 1.386667rem
        line-height 1.386667rem
        font-size $font-size-medium
        transition all .4s linear
        .item-name
          text-align left
          display inline-block
          width 3.44rem
          padding 0 0 0 .4rem
          box-sizing content-box
          .item-level
            float right
        .item-update, .item-delete
          float right
        .item-update
          bg-image('update')
          background-size 100% 100%
          width .6rem 
          height .6rem
          margin-top .3933rem
        .item-delete
          background red
          color #FFF
          width 1.5rem
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
