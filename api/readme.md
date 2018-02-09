# Cosmogony Zones API

## This API exposes 2 routes to fetch details about zones

### GET /zones/{id}

Returns details about a zone and its direct children : 

```json
{
  "zone": {
    "id": 17716,
    "name": "Lyon",
    "parent": 195672,
    "zone_type": "city",
    "admin_level": 8
  },
  "nb_children": 9,
  "children": [
    {
      "id": 116,
      "name": "Lyon 6e Arrondissement",
      "parent": 17716,
      "zone_type": "city_district",
      "admin_level": 9
    },
    {
      "id": 117,
      "name": "Lyon 2e Arrondissement",
      "parent": 17716,
      "zone_type": "city_district",
      "admin_level": 9
    },
    {
      "id": 118,
      "name": "Lyon 7e Arrondissement",
      "parent": 17716,
      "zone_type": "city_district",
      "admin_level": 9
    },
    {
      "id": 119,
      "name": "Lyon 8e Arrondissement",
      "parent": 17716,
      "zone_type": "city_district",
      "admin_level": 9
    },
    {
      "id": 120,
      "name": "Lyon 5e Arrondissement",
      "parent": 17716,
      "zone_type": "city_district",
      "admin_level": 9
    },
    {
      "id": 121,
      "name": "Lyon 1er Arrondissement",
      "parent": 17716,
      "zone_type": "city_district",
      "admin_level": 9
    },
    {
      "id": 179,
      "name": "Lyon 4e Arrondissement",
      "parent": 17716,
      "zone_type": "city_district",
      "admin_level": 9
    },
    {
      "id": 17717,
      "name": "Lyon 9e Arrondissement",
      "parent": 17716,
      "zone_type": "city_district",
      "admin_level": 9
    },
    {
      "id": 17718,
      "name": "Lyon 3e Arrondissement",
      "parent": 17716,
      "zone_type": "city_district",
      "admin_level": 9
    }
  ]
}
```


### GET /zones/{id}/parents

Returns details about a zone and its recursive parents :

```json
{
  "zone": {
    "id": 17718,
    "name": "Lyon 3e Arrondissement",
    "parent": 17716,
    "zone_type": "city_district",
    "admin_level": 9
  },
  "parents": [
    {
      "id": 17716,
      "name": "Lyon",
      "parent": 195672,
      "zone_type": "city",
      "admin_level": 8
    },
    {
      "id": 195672,
      "name": "Métropole de Lyon",
      "parent": 164067,
      "zone_type": "state_district",
      "admin_level": 6
    },
    {
      "id": 164067,
      "name": "Auvergne-Rhône-Alpes",
      "parent": 113472,
      "zone_type": "state",
      "admin_level": 4
    },
    {
      "id": 113472,
      "name": "France",
      "parent": null,
      "zone_type": "country",
      "admin_level": 2
    }
  ]
}
```
