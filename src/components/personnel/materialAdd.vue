<template>
  <div class="material-add">
    <m-header links="/materialManage" msg="添加材料"></m-header>
    <!-- main -->
    <div class="content">
      <div class="form-group border-bottom">
        <label for="" class="f-label">材料编号：</label>
        <input type="text" v-model="stuff" placeholder="请输入" class="f-input">
      </div>
      <div class="form-group border-bottom">
        <label for="" class="f-label">材料名称：</label>
        <input type="text" v-model="name" placeholder="请输入" class="f-input">
      </div>
      <div class="form-group border-bottom">
        <label for="" class="f-label">备注：</label>
        <input type="text" v-model="content" placeholder="请输入" class="f-input">
      </div>
    </div>
    <!-- btn -->
    <div class="btn" @click="_addMaterial()">确定添加</div>
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
      stuff: '',
      name: '',
      content: ''
    }
  },
  methods: {
    _addMaterial() {
      api.addMaterial(sessionStorage.id, sessionStorage.token, this.stuff, this.name, this.content)
        .then(res => {
          if (res.code === 200) {
            this.$router.push('/materialManage')
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
.material-add
  position absolute
  width 100%
  height 100%
  background $color-background
  .content
    width 100%
    float left
    background #fff
    margin-top 1.4rem
    box-sizing border-box    
    .form-group
      height 1.2rem
      line-height 1.2rem
      padding 0 .4rem
      text-align left
      .f-input
        float right
        text-align right 
        height 1.2rem
        line-height 1.2rem
        border none
        outline none
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
</style>
