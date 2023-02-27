<template>
  <Page id="page-dashboard">
    <div class="dashboard-main-message">
      <MessageBox type="warning">
        <p>The data displayed in the charts below was created for demonstration and testing purposes only. Actual data will be displayed at a later date.</p>
      </MessageBox>
    </div>
    <LoadingScreen v-if="loading"/>
    <div class="page-section padding-h-2" v-else-if="!loading && loadingError">
      <MessageBox type="error">
        <p>Unable to retrieve data {{ loadingError }}</p>
      </MessageBox>
    </div>
    <div class="dashboard-container" v-else>
      <div id="viz-map" class="dashboard-box dashboard-viz">
        <GeoMercator
          chartId="expert-centers-map"
          :chartData="expertCenters"
          rowId="code"
          latitude="latitude"
          longitude="longitude"
          :geojson="geojson"
          :mapCenter="{latitude: -16, longitude: 51}"
          groupingVariable="hasSubmittedData"
          :groupColorMappings="{
            'false': '#F1FAEE',
            'true': '#FFA69E',
          }"
          :legendLabels="['Not submitted', 'Submitted']"
          :legendColors="['#F1FAEE', '#FFA69E']"
          :chartScale="1.8"
          :mapColors="{
            land: '#709190',
            border: '#061428',
            water: '#061428'
          }"
          :tooltipTemplate="(row) => {
            return `
            <p class='title'>
              ${row.projectName}
            </p>
            <p class='center-location'>
              <span class='location-city'>${row.city}</span>
              <span class='location-country'>${row.country}</span>
            </p>
            `
          }"
        />
      </div>
    </div>
  </Page>
</template>

<script>
import { Page, MessageBox, LoadingScreen, GeoMercator } from 'rd-components'
import { fetchData } from '$shared/js/utils.js'
import HeaderImage from '@/assets/app-header-background.png'
import geojson from '$shared/data/world.geo.json'

export default {
  components: {
    Page,
    MessageBox,
    LoadingScreen,
    GeoMercator
  },
  data () {
    return {
      headerImage: HeaderImage,
      loading: true,
      loadingError: null,
      expertCenters: [],
      geojson: geojson,
    }
  },
  mounted () {
    Promise.all([
      fetchData('/api/v2/ernstats_dataproviders')
    ]).then(response => {
      const expertCenters = response[0].items
      this.expertCenters = expertCenters
    }).then(() => {
      this.loading = false
    }).catch(error => {
      this.loading = false
      this.loadingError = error
    })
  }
}
</script>

<style lang="scss">
#page-dashboard {
  background-color: $gray-050;
}

.dashboard-container {
  display: grid;
  padding: 2em;
  padding-top: 1em;
  gap: 1.5em;
  margin: 0 auto;
  grid-template-columns: 1fr;
  grid-template-areas:
    "map";
    
    .dashboard-box {
      background-color: $gray-000;
      box-sizing: content-box;
      padding: 0.7em 1em;
      border-radius: 6px;
      box-shadow: $box-shadow;
    }
    
  @media screen and (min-width: 962px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas: 
      "map map";
  }
  
  @media screen and (min-width: 1524px) {
    max-width: 60vw;
  }
  
  #viz-map {
    grid-area: map;
    padding: 6px;
  }
}

.dashboard-main-message {
  padding: 0.4em 1em;
  
  .message-box {
    .message-text {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      p {
        margin: 0;
      }
    }
  }
}

.d3-table {
  caption {
    margin-top: 16px;
    font-weight: bold;
  }

  thead {
    tr {
      th {
        color: $gray-800;
        font-weight: normal;
      }
    }
  }
}

#expert-centers-map-tooltip {
  font-family: $font-family;
  p {
    font-size: 11pt;
    line-height: 1.4;
  }

  .title {
    font-size: 11pt;
    a {
      color: $gray-800;
    }
  }
}

</style>