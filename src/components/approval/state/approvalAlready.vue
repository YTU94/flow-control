<template>
  <div class="approvalItem" >
    <div class="group" v-for="item in approvalList" :key="item.id">
      <p class="title">
        编号：{{item.rid}}
        <span class="state">等待审批</span>
      </p>
      <div class="content">
        <p class="name">资金审批</p>
        <p class="flow">会计-会计-会计-会计-会计-会计-会计-会计-会计会计-会计-会计-会计-会计-</p>
      </div>
      <div class="tabs">
        <router-link tag="span" to="/lookApproval">
          <span class="tabs-item">查&nbsp;&nbsp;&nbsp;&nbsp;看</span>          
        </router-link>
        <span class="tabs-item tabs-item-d">删&nbsp;&nbsp;&nbsp;&nbsp;除</span>
      </div>
      <div class="line"></div>      
    </div>  
  </div>
</template>

<script>
import api from 'api/api'
export default {
  data () {
    return {
      approvalList: []
    }
  },
  created() {
    api.getApprovalList(sessionStorage.id, sessionStorage.token, 2)
      .then(res => {
        if (res.code === 200) {
          console.log(res)
          this.approvalList = res.message
        }
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/approval'
</style>
