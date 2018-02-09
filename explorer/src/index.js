import Vue from 'vue'
import App from 'vue-loader!./vues/app.vue'
import listen from "./listen";

new Vue({
  el: '#root',
  template: '<App/>',
  components: { App }
})

