<template>
  <div class="approvalItem" >
    <transition name="fade">
      <m-dialog  :msg="message" btn="" v-show="dialog === 1"></m-dialog>
    </transition>
    <div class="group" v-for="item in approvalList" :key="item.id">
      <p class="title">
        编号：{{item.rid}}
        <span class="state" v-if="item.process[0]">
          {{parseInt(item.istate) === 1 ? '通过' : (parseInt(item.istate) === 2 ? '不通过' : '审核中')}}
        </span>
        <span class="state" v-else>item.process[0]为空</span>
      </p>
      <div class="content">
        <p class="name">{{item.pname}}</p>
        <p class="flow" v-if="item.process[0]">{{item.process[0].nodeArray}}</p>
      </div>
      <div class="tabs">
        <router-link tag="span" :to="{name: 'lookApproval', params: {fid: item.id, lid: item.lid}}">
          <span class="tabs-item">查&nbsp;&nbsp;&nbsp;&nbsp;看</span>          
        </router-link>
        <span class="tabs-item tabs-item-d" @click="_deleteApproval(item.rid, item.id)">删&nbsp;&nbsp;&nbsp;&nbsp;除</span>
      </div>
      <div class="line"></div>      
    </div>  
  </div>
</template>

<script>
import api from 'api/api'
import MDialog from 'components/dialog/dialog'
export default {
  components: {
    MDialog
  },
  data () {
    return {
      dialog: 0,
      message: '',
      approvalList: [],
      rId: '', // 审批编号
      fId: '' // 审批id
    }
  },
  created() {
    api.getApprovalList(sessionStorage.id, sessionStorage.token, 2)
      .then(res => {
        if (res.code === 200) {
          if (res.message) {
            this.rId = res.message.rid
            this.fId = res.message.id
            this.approvalList = res.message
          }
        }
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    _deleteApproval(rid, fid) {
      api.deleteApproval(sessionStorage.id, sessionStorage.token, rid, fid)
        .then(res => {
          var that = this
          if (res.code === 200) {
            this.message = res.message
            this.dialog = 1
            setTimeout(function() {
              that.dialog = 0
            }, 1000)
          } else {
            this.message = res.message
            this.dialog = 1
            setTimeout(function() {
              that.dialog = 0
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
@import '~common/stylus/approval'
</style>
