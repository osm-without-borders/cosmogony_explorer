import { ROOT_URL } from './index';
import { State, updateState } from './url_state'

export function initMap(center, zoom) {

  let available = true
  let currentHoverAdminId = null

  const mp = new mapboxgl.Map({
    container: 'map-container',
    style: 'https://maps.tilehosting.com/styles/positron/style.json?key=dcCQFarAif6ie2xrgCEF',
    zoom: zoom,
    center: center,
    hash: false
  })

  function updateUrl() {
    const zoom = mp.getZoom()
    const center = mp.getCenter() // #4/43.49/7.93
    updateState({zoom:zoom.toFixed(2), center:[center.lng.toFixed(2), center.lat.toFixed(2)]})
  }

  const popup = new mapboxgl.Popup({
    closeButton: false
  })

  mp.on("load", () => {
    fire('map_zoom', mp.getZoom())

    mp.addSource('zones', {
      'type': 'vector',
      'tiles': [`${ROOT_URL}/tiles/cosmogony/{z}/{x}/{y}.pbf`]
    })
    mp.addSource('zones-hover', {
      // That's a trick to improve hover performance.
      // For some reason using this duplicated source will
      // perform better when using 'setFilter' repeatingly.
      'type': 'vector',
      'tiles': [`${ROOT_URL}/tiles/cosmogony/{z}/{x}/{y}.pbf`]
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
      'source': 'zones-hover',
      'source-layer': 'vector-zones',
      'paint': {
        'fill-color': '#5fc7ff',
        'fill-outline-color': 'red',
        'fill-opacity': ["case",
          ["boolean", ["feature-state", "hover"], false],
          .4,
          0
        ],
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
      setTimeout(() => {
        mp.setFeatureState({source: 'zones-hover', sourceLayer : 'vector-zones', id: currentHoverAdminId}, {hover: false})
        currentHoverAdminId = null
      }, 30)
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
    })

    listen('select_hierarchy', (id) => {
      mp.setFilter('all', ['==', 'id', id])
    })

    listen('fit_map', (zoom, lngLat) => {
      mp.jumpTo({zoom: zoom, center : lngLat})
    })

    let hoverTimeout = null;

    listen('hover_hierarchy', (id) => {

      if(available && id !== currentHoverAdminId) {
        available = false
        /* throttling */
        hoverTimeout = setTimeout(function(){
          available = true
          if(currentHoverAdminId) {
            mp.setFeatureState({source: 'zones-hover', sourceLayer : 'vector-zones', id: currentHoverAdminId}, { hover: false})
          }
          currentHoverAdminId = id
          mp.setFeatureState({source: 'zones-hover', sourceLayer : 'vector-zones', id: currentHoverAdminId}, { hover: true})
        }, 30)
      }
    })

    listen('zoom_to', (hierarchy) => {
      let bounds = hierarchy.bbox.reduce(function(bounds, coord) {
        return bounds.extend(coord);
      }, new mapboxgl.LngLatBounds(hierarchy.bbox[0], hierarchy.bbox[0]))
      mp.fitBounds(bounds, {padding : {left: 320, right : 20, top : 100, bottom: 20}});
    })
  })
}
