

const API_URL = 'http://localhost:8585'

function Hierarchy(id, name, level, zoneType, childrenCount) {
  this.id = id
  this.name = name
  this.level = level
  this.zoneType = zoneType
  this.childrenCount = childrenCount
}

Hierarchy.fromJson = function(json) {
  const id = json.zone.id
  const name = json.zone.name
  const level = json.zone.admin_level
  const type = json.zone.zone_type
  const childrenCount = json.zone.nb_children
  const hierarchy = new Hierarchy(id, name, level, type, childrenCount)
  hierarchy.parent = json.parent
  hierarchy.children = json.children.map((child) =>
    new Hierarchy(child.id, child.name, child.admin_level, child.admin_type, child.nb_children)
  )
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