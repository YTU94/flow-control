
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

var filter = {}
filter.install = function (Vue) {
  Vue.filter('checkNull', checkNull)
}
export default filter
