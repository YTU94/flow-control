
function checkNull (val, target) {
  if (target === null || target === undefined) {
    target = ''
  }
  if (val === null || val === undefined || val === '') {
    return target
  } else {
    return val
  }
}
function ruleT (val) {
  if (!val) {
    debugger
    if (val === 1) {
      return '一级'
    }
    if (val === 2) {
      return '二级'
    }
    if (val === 3) {
      return '三级'
    }
    if (val === 4) {
      return '四级'
    }
    if (val === 5) {
      return '五级'
    }
  } else {
    return ''
  }
}
var filter = {}
filter.install = function (Vue) {
  Vue.filter('checkNull', checkNull)
  Vue.filter('ruleT', ruleT)
}
export default filter
