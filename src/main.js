// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import filter from './filter/filter'
Vue.config.productionTip = false
Vue.prototype.$arrayRemoveByValue = function (arr, val) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === val) {
      arr.splice(i, i)
      break
    }
  }
}
Vue.use(filter)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  filter,
  template: '<App/>',
  components: { App }
})
