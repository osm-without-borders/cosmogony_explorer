<template>
  <div class="hierarchy" v-if="hierarchy">
    <div class="hierarchy__current">
      <h3 class="hierarchy__current__name">{{ hierarchy.name }} </h3>
      <div class="hierarchy__current__type">{{ hierarchy.zoneType }}</div>
      <div class="hierarchy__current__data">
        <p class="hierarchy__current__data__container">
          wikidata : <a class="hierarchy__current__data__wikidata" v-if="hierarchy.wikidata" v-bind:href="`https://www.wikidata.org/wiki/${hierarchy.wikidata}`">
            {{ hierarchy.wikidata }}
          </a>
        </p>
        <p class="hierarchy__current__data__container">
          osm id : <a class="hierarchy__current__data__osm_id" v-if="hierarchy.osmID" v-bind:href="hierarchy.osmLink">
           {{ hierarchy.osmID }}
          </a>
        </p>
        <p class="hierarchy__current__data__container">
            admin level : <span class="hierarchy__current__data__level">{{ hierarchy.level }}</span>
        </p>
        <p class="hierarchy__current__data__container">
          cosmogony id : <span class="hierarchy__current__data__level">{{ hierarchy.id }}</span>
        </p>
      </div>
    </div>
    <h3 class="hierarchy__category_title">Parents</h3>
    <div class="hierarchy__secondary">
      <SubHierarchy v-for="parent in hierarchy.parents" v-bind:key="parent.id" v-bind:hierarchy="parent"/>
      <span class="hierarchy__secondary__empty" v-if="hierarchy.parents.length === 0">- Empty -</span>
    </div>
    <h3 class="hierarchy__category_title">Children</h3>
    <div class="hierarchy__secondary">
      <Child v-for="child in hierarchy.children" v-bind:key="child.id" v-bind:hierarchy="child"/>
      <span class="hierarchy__secondary__empty" v-if="hierarchy.children.length === 0">- Empty -</span>
    </div>
  </div>
</template>

<script>
  import Hierarchy from '../hierarchy'
  import Child from 'vue-loader!./child.vue'
  import SubHierarchy from 'vue-loader!./sub_hierarchy.vue'
  export default {
    name: "hierarchy",
    components : {
      Child,
      SubHierarchy
    },
    data : () => ({
      hierarchy : null
    }),
    created : async function () {
      listen('update_hierarchy', async (hierarchyId) => {
        this.hierarchy = await  Hierarchy.load(hierarchyId)
        update({hierarchyId : hierarchyId})
        fire('select_hierarchy', hierarchyId)

      })
      if(State.hierarchyId) {
        this.hierarchy = await Hierarchy.load(State.hierarchyId)
      }
    }
  }
</script>