import { ROOT_URL } from './index';

function Hierarchy(id, name, level, zoneType, childrenCount, osmID, osmLink, wikidata, bbox) {
  this.id = id
  this.name = name
  this.level = level
  this.zoneType = zoneType
  this.childrenCount = childrenCount
  this.osmID = osmID
  this.osmLink = osmLink
  this.wikidata = wikidata
  this.bbox = bbox
}

Hierarchy.fromJson = function(json) {
  const id = json.zone.id
  const name = json.zone.name
  const level = json.zone.admin_level
  const type = json.zone.zone_type
  const childrenCount = json.zone.nb_children
  const osmID = json.zone.osm_id
  const osmLink = json.zone.osm_link
  const wikidata = json.zone.wikidata
  const bbox = json.zone.bbox.coordinates[0]

  const hierarchy = new Hierarchy(id, name, level, type, childrenCount, osmID, osmLink, wikidata, bbox)
  hierarchy.parent = json.parent
  hierarchy.children = json.children.map((child) =>
    new Hierarchy(child.id, child.name, child.admin_level, child.zone_type, child.nb_children)
  )
  return hierarchy
}


Hierarchy.load = async function (id) {
  let url = ROOT_URL.replace('8080', '8585')
  const rawHierarchy = await fetch(`${url}/api/zones/${id}`)
  const hierarchyData = await rawHierarchy.json()

  const hierarchy = Hierarchy.fromJson(hierarchyData)
  hierarchy.parents = await Hierarchy.getParents(id)

  return hierarchy
}

Hierarchy.getParents = async (id) => {
  let url = ROOT_URL.replace('8080', '8585')
  const rawHierarchy = await fetch(`${url}/api/zones/${id}/parents`)
  const hierarchyData = await rawHierarchy.json()

  return hierarchyData.parents.map((parent) => {
    return new Hierarchy(parent.id, parent.name, parent.admin_level, parent.zone_type)
  })

}

Hierarchy.getChildren = async (id) => {
  const hierarchy = await Hierarchy.load(id)
  return hierarchy.children
}


export default Hierarchy
