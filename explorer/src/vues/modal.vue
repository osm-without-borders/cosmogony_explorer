<template>
  <transition name="modal__fade">
    <div class="modal" v-if="this.isOpen">
      <div class="modal__overlay"></div>
      <div class="modal__content" >
        <div class="icon-cancel modal__close" v-on:click="close"></div>

        <ul class="modal__hierarchies" v-for="feature in this.features">
          <li class="modal__hierarchy" v-on:click="showHierarchy(feature)">( {{ feature.properties.id }} ) {{ feature.properties.name }}</li>
        </ul>

      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: "modal",
    data : function () {
      return {
        isOpen : false,
        features : []
      }
    },
    methods : {
      close : function () {
        this.isOpen = false
      },
      showHierarchy : function (hierarchy) {
        this.isOpen = false
        fire('update_hierarchy', hierarchy.id)
      }
    },
    created : async function () {
      listen('show_multiple_hierarchy', (features) => {
        this.isOpen = true
        this.features = features
      })
    }
  }
</script>
