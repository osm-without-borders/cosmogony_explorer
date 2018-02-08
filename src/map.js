
const mp = new mapboxgl.Map({
  container: 'map-container',
  style: '/built-style.json',
  zoom: 4,
  center: [0.5, 45],
  hash: true
})

listen('go_to' , (latLng) => {
  mp.panTo(latLng)
})