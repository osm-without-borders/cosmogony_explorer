<template>
  <li class="child">
    <button v-if="hierarchy.childrenCount > 0" class="child__toggle icon-stack" v-on:click="toggle(hierarchy.id)"></button>
    <button v-else="" class="child__toggle child__toggle--disabled icon-stack"></button>
    <span class="child__name" v-on:click="showHierarchy()">{{ hierarchy.name }}</span>
    <ul class="child__items">
      <img v-if="wait" class="hierarchy__loader" src="/src/images/loader.gif"/>
      <Child v-for="child in children" v-bind:hierarchy="child" v-bind:key="child.id"/>
    </ul>
  </li>
</template>

<script>
  import Hierarchy from '../hierarchy'
  export default {
    name: "Child",
    props: [
      'hierarchy'
    ],
    data : () => ({
        open : false,
        children : [],
        wait : false

    }),
    methods : {
      toggle : async function (id) {
        if(!this.open)  {
          this.wait = true
          this.children = await Hierarchy.getChildren(id)
          this.wait = false
        } else {
          this.children = []
        }
        this.open = !this.open
      },
      showHierarchy : function (){
        fire('update_hierarchy', this.hierarchy.id)
      }
    }
  }
</script>