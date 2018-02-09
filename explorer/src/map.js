const mp = new mapboxgl.Map({
  container: 'map-container',
  style: 'https://openmaptiles.github.io/positron-gl-style/style-cdn.json',
  zoom: 4,
  center: [0.5, 45],
  hash: true
})

const popup = new mapboxgl.Popup({
  closeButton: false
})

mp.on("load", () => {
  mp.addLayer({
    'id': "all",
    'type': 'fill',
    'source-layer': 'vector-zones',
    'source': {
      'type': 'vector',
      "tiles": ["http://localhost:8585/api/vector-zones/{z}/{x}/{y}.pbf"]
    },
    'layout': {
      'visibility': 'visible'
    },
    "filter": ["==", "admin_level", 2],
    'paint': {
      'fill-color': '#088',
      'fill-outline-color': "blue",
      'fill-opacity': 0.8
    }
  })

  mp.on('mousemove', "all", function (e) {
    mp.getCanvas().style.cursor = 'pointer'
    let feature = e.features[0]
    popup.setLngLat(e.lngLat)
      .setText(feature.properties.name)
      .addTo(mp);
  })

  mp.on('mouseleave', "all", function () {
    mp.getCanvas().style.cursor = ''
    popup.remove()
  })

  mp.on('click', 'all', (e) => {
    if(e.features && e.features.length > 0) {
      fire('show_hierarchy', e.features[0])
    }
  })

  listen('filter', (level) => {
    mp.setFilter('all', ['==', 'admin_level', level])
  })

})