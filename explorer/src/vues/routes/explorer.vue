<template>
  <div class="map_component">
    <div id="map-container"></div>
    <hierarchy/>
    <layerSelector/>
    <modal/>
  </div>
</template>

<script>
  import hierarchy from "vue-loader!../explorer/hierarchy.vue";
  import modal from "vue-loader!../explorer/modal.vue";
  import layerSelector from "vue-loader!../explorer/layer_selector.vue";
  import {iniUrl} from '../../url_state'
  export default {
    name: "explorer",
    components : {
      hierarchy,
      layerSelector,
      modal
    },
    mounted : function () {
      iniUrl()
    }
  }
</script>
