import map from './map'
import url_state  from './url_state'

import Vue from 'vue'
import App from 'vue-loader!./vues/app.vue'
import listen from "./listen";

export const ROOT_URL = location.protocol+'//'+location.host;

new Vue({
  el: '#root',
  template: '<App/>',
  components: { App }
})

