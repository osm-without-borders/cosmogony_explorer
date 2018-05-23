<template>
  <div class="top_bar">
    <h1 class="top_bar__title">Cosmogony</h1>
    <div class="top_bar__menu">
      <h2 class="top_bar__menu_item top_bar__menu_item--active"><router-link to="/">Explorer</router-link></h2>
      <h2 class="top_bar__menu_item"><router-link to="/about">About</router-link></h2>
      <h2 class="top_bar__menu_item"><router-link to="/data_dashboard">Data dashboard</router-link></h2>
      <h2 class="top_bar__menu_item">Download</h2>
      <h2 class="top_bar__menu_item">Github</h2>
    </div>
  </div>
</template>

<script>
  export default {
    name: "top_bar",
    computed: {
      current : function () {
        console.log( this.$route.params.username)
        return this.$route.params.username
      }
    }
  }
</script>
