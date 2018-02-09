<template>
  <li class="child">
    <button class="child__toggle icon-popin" v-on:click="toggle"></button>
    <span class="child__name">{{ hierarchy.name }}</span>
    <ul class="child__items">
      <img v-if="wait" class="hierarchy__loader" src="/src/images/loader.gif"/>
      <Child v-for="child in children" v-bind:hierarchy="child"></Child>
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
    data : function () {
      return {
        open : false,
        children : [],
        wait : false
      }
    },
    methods : {
      toggle : async function () {
        this.wait = true
        this.children = await Hierarchy.getChilden(9999)
        this.wait = false
      }
    }
  }
</script>