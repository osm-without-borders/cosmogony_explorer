import { initMap } from './map'

/* init default parameters */
export const State = {
  center : [0,0],
  zoom : 6,
  hierarchyId : null
}
const urlHash = window.location.hash

export function iniUrl() {
  if (urlHash && urlHash.split('/').length > 2) { /* parse uri */
    let centerParams = urlHash.replace('#', '').split('/')
    /* remove the # */
    State.center = [parseFloat(centerParams[1]), parseFloat(centerParams[2])]
    State.zoom = parseFloat(centerParams[0])
    initMap(State.center, State.zoom)
  } else { /* no center given : check user location */
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        State.center = [position.coords.longitude, position.coords.latitude]
        initMap(State.center, State.zoom)
      }, () => {
        initMap(State.center, State.zoom)
      })
    }
    else {
      initMap(State.center, State.zoom)
    }
  }

  if (window.location.hash.split('/').length > 3) {
    State.hierarchyId = parseInt(window.location.hash.split('/')[3])
  }
}

export function update(o) {
  Object.assign(State, o)
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