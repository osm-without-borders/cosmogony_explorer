<template>
  <div class="layer_selector">
    <button v-for="(toggleableLayer, i) in toggleableLayers" v-on:click="filter(toggleableLayer, i)" v-bind:class="['layer_selector__action', currentLayer === i ? 'layer_selector__action--active' : '']">
      {{ toggleableLayer.label }}
    </button>
  </div>
</template>

<script>

  export default {
    name: "layer_selector",
    methods : {
      filter : function(layer, i) {
        this.currentLayer = i
        fire('filter', layer.level)
      }
    },
    data : () => ({
        currentLayer : 4,
        toggleableLayers : [{
          'level': 10,
          'label': 'Level 10'
        }, {
          'level': 9,
          'label': 'Level 9'
        }, {
          'level': 8,
          'label': 'Level 8'
        }, {
          'level': 6,
          'label': 'Level 6'
        }, {
          'level': 2,
          'label': 'Level 2'
        }]
    })
  }
</script>



