<template>
  <div class="hierarchy" v-if="hierarchy">
    <h3 class="hierarchy__name">{{ hierarchy.name }} </h3>
    <div class="hierarchy__type">{{ hierarchy.zoneType }} | <span class="hierarchy__name__level">{{ hierarchy.level }}</span></div>
    <h3 class="hierarchy__category_title">Parent hierarchy</h3>
      <div class="hierarchy__secondary">
        <Sub v-for="parent in hierarchy.parents" v-bind:key="parent.id" v-bind:hierarchy="parent"></Sub>
      </div>
    <h3 class="hierarchy__category_title">Child hierarchy</h3>
      <div class="hierarchy__secondary">
        <Child v-for="child in hierarchy.children" v-bind:key="child.id" v-bind:hierarchy="child"></Child>
      </div>
    <h3 class="hierarchy__category_title">Other linked zone</h3>
      <div class="hierarchy__secondary">
        <Sub v-for="similar in hierarchy.similars" v-bind:key="similar.id" v-bind:hierarchy="similar"></Sub>
      </div>
  </div>
</template>

<script>
  import Hierarchy from '../hierarchy'
  import Child from 'vue-loader!./child.vue'
  import Sub from 'vue-loader!./sub.vue'
  export default {
    name: "hierarchy",
    components : {
      Child,
      Sub
    },
    data : () => {
      return {
        hierarchy : null
      }
    },
    created : function () {
      listen('show_hierarchy', async (feature) => {
        this.hierarchy = await Hierarchy.load(feature)
      }),
      listen('update_hierarchy', async (hierarchy) => {
        this.hierarchy = hierarchy
        this.hierarchy.parent = await Hierarchy.getParents(hierarchy.id)
        this.hierarchy.children = await Hierarchy.getChilden(hierarchy.id)
        this.hierarchy.similars = []
      })

    }
  }
</script>