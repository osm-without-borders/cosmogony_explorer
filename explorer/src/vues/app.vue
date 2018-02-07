<template>
  <div>
    <hierarchy></hierarchy>
    <layerSelector></layerSelector>
  </div>
</template>

<script>
  import hierarchy from "vue-loader!./hierarchy.vue";
  import layerSelector from "vue-loader!./layer_selector.vue";
  export default {
    name: "app",
    components : {
      hierarchy,
      layerSelector
    }
  }
</script>
