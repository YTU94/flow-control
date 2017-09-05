
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
  if (val) {
    if (parseInt(val) === 1) {
      return '一级'
    }
    if (parseInt(val) === 2) {
      return '二级'
    }
    if (parseInt(val) === 3) {
      return '三级'
    }
    if (parseInt(val) === 4) {
      return '四级'
    }
    if (parseInt(val) === 5) {
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
