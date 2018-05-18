<template>
  <div>
    <hierarchy></hierarchy>
    <layerSelector></layerSelector>
    <topBar></topBar>
    <modal></modal>
  </div>
</template>

<script>
  import hierarchy from "vue-loader!./hierarchy.vue";
  import modal from "vue-loader!./modal.vue";
  import topBar from "vue-loader!./top_bar.vue"
  import layerSelector from "vue-loader!./layer_selector.vue";
  export default {
    name: "app",
    components : {
      topBar,
      hierarchy,
      layerSelector,
      modal
    }
  }
</script>
