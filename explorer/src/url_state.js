/* Thank's to Antoine now i'm a state-full app */

/* init default parameters */
State = {
  center : [0,0],
  zoom : 6,
  hierarchyId : null
}
const urlHash = window.location.hash

if(urlHash && urlHash.split('/').length > 2) { /* parse uri */
  let centerParams = urlHash.replace('#','').split('/') /* remove the # */
  State.center = [parseFloat(centerParams[1]), parseFloat(centerParams[2])]
  State.zoom = parseInt(centerParams[0])
  initMap(State.center, State.zoom)
} else { /* no center given : check user location */
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      State.center = [position.coords.longitude, position.coords.latitude]
      initMap(State.center, State.zoom)
    })
  }
}

if(window.location.hash.split('/').length > 3) {
  State.hierarchyId = parseInt(window.location.hash.split('/')[3])
}

function update(o) {
  Object.keys(o).forEach((k) => {
    State[k] = o[k]
  })
  window.location.hash = `${State.zoom}/${State.center[0]}/${State.center[1]}${State.hierarchyId ? `/${State.hierarchyId}` : ''}`
}

window.onpopstate = function () {
  /* update only for hierarchy navigation */
  if(window.location.hash.split('/').length > 3) {
    let tempHierarchyId = parseInt(window.location.hash.split('/')[3])
    if(tempHierarchyId !== State.hierarchyId) {
      fire('update_hierarchy', tempHierarchyId)
    }
  }
}