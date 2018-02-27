<template>
  <div class="hierarchy" v-if="hierarchy">
    <h3 class="hierarchy__name">{{ hierarchy.name }} </h3>
    <div class="hierarchy__type">{{ hierarchy.zoneType }} | <span class="hierarchy__name__level">{{ hierarchy.level }}</span></div>
    <h3 class="hierarchy__category_title">Parent hierarchy</h3>
    <div class="hierarchy__secondary">
      <SubHierarchy v-for="parent in hierarchy.parents" v-bind:key="parent.id" v-bind:hierarchy="parent"></SubHierarchy>
    </div>
    <h3 class="hierarchy__category_title">Child hierarchy</h3>
    <div class="hierarchy__secondary">
      <Child v-for="child in hierarchy.children" v-bind:key="child.id" v-bind:hierarchy="child"></Child>
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