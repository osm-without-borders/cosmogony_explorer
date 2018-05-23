import { ROOT_URL } from './index';
import { State, update } from './url_state'

export function initMap(center, zoom) {
  const mp = new mapboxgl.Map({
    container: 'map-container',
    style: 'https://openmaptiles.github.io/positron-gl-style/style-cdn.json',
    zoom: zoom,
    center: center,
    hash: false
  })

  function updateUrl() {
    const zoom = mp.getZoom()
    const center = mp.getCenter() // #4/43.49/7.93
    update({zoom:zoom.toFixed(2), center:[center.lng.toFixed(2), center.lat.toFixed(2)]})
  }

  const popup = new mapboxgl.Popup({
    closeButton: false
  })

  mp.on("load", () => {
    fire('map_zoom', mp.getZoom())

    mp.addSource('zones', {
      'type': 'vector',
      'tiles': [`${ROOT_URL}/cosmogony/{z}/{x}/{y}.pbf`]
    })

    mp.addLayer({
      'id': "all",
      'type': 'fill',
      'source': 'zones',
      'source-layer': 'vector-zones',
      'layout': {
        'visibility': 'visible'
      },
      "filter": ["==", "admin_level", 2],
      'paint': {
        'fill-color': '#5fc7ff',
        'fill-outline-color': "#206dab",
        'fill-opacity': 0.44
      }
    })

    mp.addLayer({
      'id': "hover_only",
      'type': 'fill',
      'source': 'zones',
      'source-layer': 'vector-zones',
      "filter": ['==', 'id', -1],
      'paint': {
        'fill-color': '#5fc7ff',
        'fill-outline-color': "red",
        'fill-opacity': 0.44
      }
    })

    if(State.hierarchyId) { /* load filter state-full */
      mp.setFilter('all', ['==', 'id', State.hierarchyId])
    }

    mp.on('zoom', () => {
      fire('map_zoom', mp.getZoom())
      updateUrl()
    })

    mp.on('moveend', () => {
      updateUrl()
    })

    mp.on('mousemove', "all", function (e) {
      mp.getCanvas().style.cursor = 'pointer'
      let feature = e.features[0]
      fire('hover_hierarchy', feature.properties.id)
      let featureInfo = `<ul>${e.features.map((feature) => {
        return `<li class="map__popup__item">${feature.properties.name}</li>`
      }).join('')}</ul>`
      popup.setLngLat(e.lngLat)
        .setHTML(featureInfo)
        .addTo(mp);
    })

    mp.on('mouseleave', "all", function () {
      mp.getCanvas().style.cursor = ''
      popup.remove()
    })

    mp.on('click', 'all', (e) => {
      if(e.features && e.features.length === 1) {
        fire('update_hierarchy', e.features[0].id)
        fire('select_hierarchy', e.features[0].id)
      } else if(e.features && e.features.length > 1) {
        fire('show_multiple_hierarchy', e.features)
      }
    })

    listen('filter', (type) => {
      mp.setFilter('all', ['==', 'zone_type', type])
      mp.setFilter('hover_only', ['==', 'id', -1]) /* clean hover selection */
    })

    listen('select_hierarchy', (id) => {
      mp.setFilter('all', ['==', 'id', id])
    })

    let hoverTimeout = null;

    listen('hover_hierarchy', (id) => {
      if(hoverTimeout){
        clearTimeout(hoverTimeout);
      }
      hoverTimeout = setTimeout(function(){
        hoverTimeout = null;
        mp.setFilter('hover_only', ['==', 'id', id])
      }, 40)
    })

    listen('zoom_to', (hierarchy) => {
      let bounds = hierarchy.bbox.reduce(function(bounds, coord) {
        return bounds.extend(coord);
      }, new mapboxgl.LngLatBounds(hierarchy.bbox[0], hierarchy.bbox[0]))

      mp.fitBounds(bounds, {padding : {left: 310, right : 10, top : 10, bottom: 10}});
    })
  })
}
