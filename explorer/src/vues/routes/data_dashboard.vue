<template>
  <div>
    <div class="article__container ">
      <article class="article article--first">
        <h2>Cosmogony metrics</h2>
        <p>You can check below the number of zones by country for each type of zone, and compare this number with
          <a href="https://github.com/osm-without-borders/cosmogony-data-dashboard#reference-values">the actual number of zones in the real world</a>.
        </p>
        <br>
        <h3>Legend</h3>
        <div class="legend__container">
          <table class="legend__table">
            <tr class="ok_column">
              <td><i class="icon-check"></i><i class="icon-check"></i></td>
              <td class="legend__description">ok</td>
            </tr>
            <tr class="ko_column">
              <td><i class="icon-x"></i><i class="icon-x"></i></td>
              <td class="legend__description">ko, too few or too many zones</td>
            </tr>
            <tr>
              <td><i class="icon-x"></i> known failure</td>
              <td class="legend__description">we know that somes zones are still missing in OpenStreetMap</td>
            </tr>
            <tr>
              <td><i class="icon-check"></i><i class="icon-umbrella"></i></td>
              <td class="legend__description">we did think that some zones were missing in OpenStreetMap, but it's actually ok</td>
            </tr>
            <tr>
              <td><i class="icon-cloud-off"></i> skipped</td>
              <td class="legend__description">the country was not found in the Cosmogony file</td>
            </tr>
          </table>
        </div>
      </article>

      <article class="article">
        <h3>Wanna help ?</h3>
        Cosmogony, just like OpenStreetMap, emphasizes local knowledge.
        <ul>
          <li>
            <a href="https://github.com/osm-without-borders/cosmogony-data-dashboard/blob/master/reference_stats_values.csv">tell us</a>
            the actual number of zones for the countries you know about
          </li>
          <li>patch or add the missing zones in
            <a href="https://wiki.openstreetmap.org/wiki/Relation:boundary">OpenStreetMap</a>
        </li>
        </ul>
      </article>
    </div>

    <table id="volumetric-dashboard" class="sort">
      <thead>
        <tr class="volumetric_dashboard__table__head">
          <th>Name</th>
          <th>Zone type</th>
          <th>Result</th>
          <th>Status</th>
        </tr>
      </thead>
      <tr v-for="col in testResults" v-bind:class="[col.test_status === 'ko' && col.test_status !== 'skip'? 'ko_column' : 'ok_column']">

        <td>{{ col.name }}</td>
        <td>{{ col.zone_type }}</td>
        <td>
          <span v-if="col.total !== -1">{{ col.total }}</span>
          <span v-else> - </span>
          <p class="result__expected">expected : {{ col.expected_min }} ~ {{ col.expected_max }}</p>
        </td>
        <td>

          <span v-if="col.test_status === 'ok'">
            <span class="icon-check"></span>
            <span v-if="col.is_known_failure === 'yes'" class="icon-umbrella"></span>
            <span v-else class="icon-check"></span>
          </span>

          <span v-if="col.test_status === 'ko'">
            <span v-if="col.is_known_failure === 'yes'">
              <span class="icon-x"></span>
              <br><span class="status_detail">known failure</span>
            </span>
            <span v-else class="icon-x"></span>
          </span>

          <span v-if="col.test_status === 'skip'">
            <span class="icon-cloud-off">
              <br><span class="status_detail">skipped</span>
            </span>
          </span>

        </td>
      </tr>
    </table>
  </div>
</template>

<script>

  import axios from "axios";
  export default {
    name: "data_dashboard",
    data () {
      return {
        testResults: null
      }
    },
    mounted() {
        axios({ method: "GET", "url": "/data/test_results.json" }).then(result => {
            this.testResults = result.data;
        }, error => {
            console.error(error);
        });
    },
  }
</script>
