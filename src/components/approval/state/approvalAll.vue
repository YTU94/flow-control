<template>
  <div class="approvalItem">
    <approval-ok></approval-ok>
    <approval-already></approval-already>
    <approval-un></approval-un>
  </div>
</template>

<script>
import approvalOk from 'components/approval/state/approvalOk'
import approvalAlready from 'components/approval/state/approvalAlready'
import approvalUn from 'components/approval/state/approvalUn'
export default {
  components: {
    approvalOk,
    approvalAlready,
    approvalUn
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/approval'
</style>
