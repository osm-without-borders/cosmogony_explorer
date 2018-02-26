

const API_URL = 'http://localhost:8585'

function Hierarchy(id, name, level, zoneType) {
  this.id = id
  this.name = name
  this.level = level
  this.zoneType = zoneType
}

Hierarchy.fromJson = function(json) {
  const id = json.id
  const name = json.name
  const level = json.admin_level
  const type = json.zone_type
  const hierarchy = new Hierarchy(id, name, level, type)
  hierarchy.parent = json.parent
  hierarchy.children = json.children.map((child) => {
    return new Hierarchy(child.id, child.name, child.admin_level, child.admin_type)
  })
  return hierarchy
}


Hierarchy.load = async function (id) {
  const rawHierarchy = await fetch(`${API_URL}/api/zones/${id}`)
  const hierarchyData = await rawHierarchy.json()

  const hierarchy = Hierarchy.fromJson(hierarchyData)
  hierarchy.parents = await Hierarchy.getParents(id)

  return hierarchy
}

Hierarchy.getParents = async (id) => {
  const rawHierarchy = await fetch(`${API_URL}/api/zones/${id}/parents`)
  const hierarchyData = await rawHierarchy.json()

  return hierarchyData.parents.map((parent) => {
    return new Hierarchy(parent.id, parent.name, parent.admin_level, parent.admin_type)
  })

}

Hierarchy.getChildren = async (id) => {
  const hierarchy = await Hierarchy.load(id)
  return hierarchy.children
}


export default Hierarchy