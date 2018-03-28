<template>
  <div>
    <hierarchy></hierarchy>
    <layerSelector></layerSelector>
    <modal></modal>
  </div>
</template>

<script>
  import hierarchy from "vue-loader!./hierarchy.vue";
  import modal from "vue-loader!./modal.vue";
  import layerSelector from "vue-loader!./layer_selector.vue";
  export default {
    name: "app",
    components : {
      hierarchy,
      layerSelector,
      modal
    }
  }
</script>
