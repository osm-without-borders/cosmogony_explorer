<template>
  <div class="about__content">
    <p class="about__description">
      This is home to Cosmogony, a project that aims at providing an efficient tool to quickly use and update worldwide geographical regions.
      It returns geographical zones with a structured hierarchy to easily know that :<br>
      <a href="https://www.openstreetmap.org/relation/7444">Paris</a> is a <span class="about__emphasis">city</span> in the
      <span class="about__emphasis">state</span> <a href="https://www.openstreetmap.org/relation/8649">Île-de-France</a> in the <span class="about__emphasis">country</span>
      <a href="https://www.openstreetmap.org/relation/2202162">France</a>.
    </p>
    <p class="about__description">The architecture of Cosmogony is based on <a href="https://www.openstreetmap.org">OpenStreetMap data</a>
      and on the exploitation of <a href="https://github.com/openvenues/libpostal/tree/master/resources/boundaries/osm">well defined libpostal rules</a>
      to type each zone according to its country. Then the resulting hierarchy is built thanks to geographical inclusion.
      An example of a full data extract can be browsed at <a href="http://cosmogony.world">http://cosmogony.world</a>.
    </p>
    <p class="about__description">
      For more detail about Cosmogony check the
      <a href="https://github.com/osm-without-borders/cosmogony#cosmogony">Github Readme</a>.
    </p>

    <p class="about__description">To explore and navigate fluently in the built hierarchy, Cosmogony comes along with two other tools</p>
    <ul>
      <li>
        <a href="https://github.com/osm-without-borders/cosmogony_explorer">Cosmogony Explorer</a>
      </li>
      <li>
        <a href="https://github.com/osm-without-borders/cosmogony-data-dashboard">Cosmogony Dashboard</a>
      </li>
    </ul>

    <p class="about__gif__alt">Below is a brief visualisation of a basic use case of the Cosmogony Explorer:</p>

    <img class="about__gif" src="https://github.com/osm-without-borders/cosmogony_explorer/raw/master/demo.gif" alt="Explore the Cosmogony in our explorer">
  </div>
</template>

<script>
  export default {
    name: "about",
  }
</script>
