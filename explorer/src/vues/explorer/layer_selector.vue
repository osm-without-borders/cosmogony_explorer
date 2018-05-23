<template>
  <div class="layer_selector">

    <button v-for="(toggleableLayer, i) in toggleableLayers" v-on:click="filter(toggleableLayer, i)" v-bind:class="['layer_selector__action', currentLayer === i ? 'layer_selector__action--active' : '', layerVisible(toggleableLayer) ? 'disabled' : '']">
      <span v-if="layerVisible(toggleableLayer)" class="icon-eye-off"></span>
      {{ toggleableLayer.label }}
    </button>
  </div>
</template>

<script>

  export default {
    name: "layer_selector",
    created : function () {
      listen('update_hierarchy', () => {
        this.currentLayer = -1
      })

      listen('map_zoom', (zoom) => {
        if(zoom > 2) {
          this.isSmallLayerVisible = true
        } else {
          this.isSmallLayerVisible = false
        }
      })
    },
    methods : {
      filter : function(layer, i) {
        this.currentLayer = i
        fire('filter', layer.type)
      },
      layerVisible : function (toggleableLayer) {
        return !(this.isSmallLayerVisible || toggleableLayer.label === 'Country')
      }
    },
    data : () => ({
      isSmallLayerVisible : true,
      currentLayer : 0,
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
