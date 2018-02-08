<template>
  <div class="hierarchy" v-if="hierarchy">
    <h3>{{ hierarchy.name }}</h3>
    <table>
      <tr v-for="property in hierarchy.properties">
        <td>{{ property.name }}</td>
        <td>{{ property.value }}</td>
      </tr>
    </table>

    <h3>Parent hierarchy</h3>
    <h3>Child hierarchy</h3>
    <h3>Other linked zone</h3>
  </div>
</template>

<script>
  export default {
    name: "hierarchy",
    data : () => {
      return {
        hierarchy : null
      }
    },
    created : () => {
      listen('show_hierarchy', (id) => {

      })
    }
  }
</script>