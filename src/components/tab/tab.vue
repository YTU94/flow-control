<template>
  <div class="tab">
    <router-link class="tab-item" tag="div" to="/approval/approvalUn">
      <span class="item" style="position:relative">未审批<i v-show="hasUn" class="iconfont icon-yuanshixin" style="font-size:10px;
      color:red;position:absolute;top:-5px; right:-5px;"></i></span>
    </router-link>
    <router-link class="tab-item" tag="div" to="/approval/approvalAlready">
      <span class="item">已发起</span>
    </router-link>
    <router-link class="tab-item" tag="div" to="/approval/approvalOk">
      <span class="item">已审批</span>
    </router-link>
    <router-link class="tab-item" tag="div" to="/approval/approvalAll">
      <span class="item">全部</span>
    </router-link>
  </div>
</template>

<script>
export default {
  props: [
    'hasUn'
  ]
}
</script>

<style lang="stylus" scoped>
  .tab
    display flex
    width 100%
    height 1.2rem
    background #fff
    line-height 1.2rem
    font-size .373333rem
    .tab-item
      flex 1
      .item
        display inline-block
        padding 0 .15rem
        height 1.2rem
        line-height 1.2rem
    .router-link-active
      .item
        color #9BBEB7
        border-bottom 1px solid #3B3A3A 
    
</style>
