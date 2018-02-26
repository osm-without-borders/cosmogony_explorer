<template>
  <div class="sub">
    <h4 v-on:click="go(hierarchy)" class="sub__name">{{ hierarchy.name }} | {{ hierarchy.id }}</h4>
  </div>
</template>

<script>
  export default {
    name: "subHierarchy",
    props : [
      'hierarchy'
    ],
    methods : {
      go : function () {
        fire('update_hierarchy', this.hierarchy.id)
      }
    }
  }
</script>