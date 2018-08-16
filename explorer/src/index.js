import Vue from 'vue'
import VueRouter from 'vue-router'
import Explorer from 'vue-loader!./vues/routes/explorer.vue'
import About from 'vue-loader!./vues/routes/about.vue'
import DataDashBoard from 'vue-loader!./vues/routes/data_dashboard.vue'

import topBar from 'vue-loader!./vues/common/top_bar.vue'
export const ROOT_URL = location.protocol+'//'+location.host.replace('8080', '8585')
console.log(ROOT_URL)

require('../src/listen')


const routes = [
  { path: '/about', component: About },
  { path: '/data_dashboard', component: DataDashBoard },
  { path: '/*', component: Explorer }
]

const router = new VueRouter({
  routes
})

Vue.use(VueRouter)

new Vue({
  el: '#root',
  template: '<div><topBar/><router-view></router-view></div>',
  components: { topBar },
  router
})
