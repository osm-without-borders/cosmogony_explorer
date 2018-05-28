<template>
  <transition name="modal__fade">
    <div class="modal" v-if="this.isOpen">
      <div class="modal__overlay"></div>
      <div class="modal__content" >
        <div class="icon-cancel modal__close" v-on:click="close"></div>
        <h4 class="modal__title">Select zone</h4>
        <ul class="modal__hierarchies">
          <li class="modal__hierarchy" v-for="feature in this.features" v-on:click="showHierarchy(feature)">
            {{ feature.properties.name }}
            <span class="modal__admin_level"> (type : {{ feature.properties.zone_type }} )</span>
          </li>
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
