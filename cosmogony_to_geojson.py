import json

geojson = {
        'type': 'FeatureCollection',
        'features': []
      }
zones = []

with open('cosmogony.json', 'r') as file_i:
    tt = json.load(file_i)
    zones = tt['zones']

geojson['features'] = [{
'type': 'Feature',
'geometry': a_zone['geometry'],
'properties': a_zone
} for a_zone in zones]

with open('cosmogony.geojson', 'w') as file_o:
    json.dump(geojson, file_o)
