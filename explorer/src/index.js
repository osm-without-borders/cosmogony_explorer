import map from './map'
import url_state  from './url_state'

import Vue from 'vue'
import App from 'vue-loader!./vues/app.vue'
import listen from "./listen";

export const ROOT_URL = "http://163.172.175.114";

new Vue({
  el: '#root',
  template: '<App/>',
  components: { App }
})

