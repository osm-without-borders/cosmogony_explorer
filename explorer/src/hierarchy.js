

const API_URL = 'http://localhost:8585'

function Hierarchy(id, name, level, zoneType) {
  this.id = id
  this.name = name
  this.level = level
  this.zoneType = zoneType
}

Hierarchy.load = async function (feature) {
  let hierarchy = new Hierarchy(feature.id, feature.properties.name, feature.properties.admin_level, feature.properties.zone_type)
  let [parents, children, similars] = await Promise.all([Hierarchy.getParents(hierarchy.id), Hierarchy.getChilden(hierarchy.id),Hierarchy.getSimilar(hierarchy.id)])
  hierarchy.parents = parents
  hierarchy.children = children
  hierarchy.similars = similars
  return new Promise((resolve) => {
    resolve(hierarchy)
  })
}

Hierarchy.getParents = async (id) => {
  //let response = await fetch(`${API_URL}/parents/${id}`)
  //let parents = response.json()
  return new Promise((resolve) => {
    resolve([new Hierarchy(0, 'Hollywood', 99, 'sea')])
  })
}

Hierarchy.getChilden = async (id) => {
  //let response = await fetch(`${API_URL}/children/${id}`)
  //let children = response.json()
  return new Promise((resolve) => {
    if(id === 9999)
      setTimeout(() => {
        resolve([new Hierarchy(1, 'Geo Panda Studio', 66, 'animal'), new Hierarchy(2, 'Geo Camel', 67, 'animal')])
      }, 1500)
    else
      resolve([new Hierarchy(1, 'Disney Studio', 44, 'studio')])
  })
}

Hierarchy.getSimilar = async (id) => {
  //let response = await fetch(`${API_URL}/similar/${id}`)
  //let similar = response.json()
  return new Promise((resolve) => {
    resolve([new Hierarchy(2, 'Bollywood', 99, 'sea')])
  })
}

export default Hierarchy