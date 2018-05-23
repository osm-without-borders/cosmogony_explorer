<template>
  <div class="top_bar">
    <h1 class="top_bar__title">Cosmogony</h1>
    <div class="top_bar__menu">
      <h2 v-bind:class="['top_bar__menu_item', path === '/' ? 'top_bar__menu_item--active' : '']"><router-link to="/">Explorer</router-link></h2>
      <h2 v-bind:class="['top_bar__menu_item', path === '/about' ? 'top_bar__menu_item--active' : '']"><router-link to="/about">About</router-link></h2>
      <h2 v-bind:class="['top_bar__menu_item', path === '/data_dashboard' ? 'top_bar__menu_item--active' : '']"><router-link to="/data_dashboard">Data dashboard</router-link></h2>
      <h2 class="top_bar__menu_item"><a target="_blank" href="https://github.com/osm-without-borders/cosmogony_explorer">Github</a></h2>
    </div>
  </div>
</template>

<script>
  export default {
    name: "top_bar",
    data : function () {
      return {
        path : this.$route.path
      }
    },
    watch:{
      $route (to){
        this.path = to.path
      }
    }
  }
</script>
