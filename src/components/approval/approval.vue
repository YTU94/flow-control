<template>
  <div class="approval">
    <div class="header border-bottom" v-if="search === 0">
      审批流程<i @click="showSearch()" class="iconfont icon-sousuo" style="position:absolute;right:.4rem;font-size:18px;"></i>
    </div>
    <div class="header h-background" v-else>
      <i class="iconfont icon-sousuo s-icon"></i>
      <input type="text" class="s-input" placeholder="请输入" ref='search' @input="searchV()">
      <span class="s-cancel" @click="search = 0">取消</span>
    </div>
    <tab :hasUn="hasUn" v-show="search === 0"></tab>
    <router-view style="margin-bottom: 1.2rem"></router-view>
    <m-footer></m-footer>
  </div>
</template>

<script>
import MFooter from 'components/m-footer/m-footer'
import Tab from 'components/tab/tab'
import api from 'api/api'
export default {
  components: {
    MFooter,
    Tab
  },
  data () {
    return {
      search: 0,
      hasUn: 0
    }
  },
  mounted () {
    this._getApprovalListUn()
  },
  methods: {
    showSelect () {
    },
    showSearch() {
      this.search = 1
      this.$router.push('/approval/approvalAll')
    },
    // 获取未审批的流程
    _getApprovalListUn() {
      api.getApprovalList(sessionStorage.id, sessionStorage.token, 1)
        .then(res => {
          if (res.message.length > 0) {
            this.hasUn = 1
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 搜索工作
    searchV() {
      var v = this.$refs.search.value
      console.log('item 组件', this.$children[1])
      for (let i = 0; i < this.$children.length; i++) {
        var list = this.$children[1].$children[i]._data.approvalList || ''
        console.log(i, list)
        for (let a = 0; a < list.length; i++) {
          if (list[a].pname && list[a].rid) {
            if (list[a].pname.indexOf(v) > 0 || list[a].rid.indexOf(v) > 0) {
              console.log('get')
              this.$children[1].$children[i]._data.approvalList = []
              this.$children[1].$children[i]._data.approvalList.splice(i, 0, list[a])
            } else {
              console.log('not get')
            }
          } else {
            console.log('error panme undefined')
          }
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable'
  .approval
    .h-background
      background $color-background
      text-align left
      padding 0 .4rem
      box-sizing border-box
    .header
      float left
      width 100%
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
        border-radius .1.2rem
      .s-cancel
        float right  
</style>
