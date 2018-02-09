<template>
  <div class="sub">
    <h4 class="sub__name">{{ hierarchy.name }} | {{ hierarchy.id }}</h4>
  </div>
</template>

<script>
  export default {
    name: "sub",
    props : [
      'hierarchy'
    ]
  }
</script>