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
        fire('filter', layer.type)
      }
    },
    data : () => ({
        currentLayer : 4,
        toggleableLayers : [{
          'type': 'country',
          'label': 'Country'
        }, {
          'type': 'country_region',
          'label': 'Country region'
        }, {
          'type': 'state',
          'label': 'State'
        }, {
          'type': 'state_district',
          'label': 'State district'
        }, {
          'type': 'city',
          'label': 'City'
        }, {
          'type': 'city_district',
          'label': 'City district'
        }, {
          'type': 'suburb',
          'label': 'Suburb'
        }, {
          'type': 'non_administrative',
          'label': 'Other'
        }]
    })
  }
</script>
