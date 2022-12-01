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
      <div id="table-enrollment-subregistries" class="dashboard-box">
        <DataTable
          tableId="enrollmentBySubregistry"
          caption="Enrollment to date by Subregistry"
          class="ern-table"
          :data="enrollmentBySubregistry"
          :columnOrder="['Group', 'Number of Participants']"
        />
      </div>
      <div id="table-gene-counts" class="dashboard-box">
        <DataTable
          tableId="casesByGene"
          caption="Number of Cases by Gene"
          class="ern-table"
          :data="casesByGene"
          :columnOrder="['Gene', 'Number of Cases']"
        />
      </div>
      <div id="viz-map" class="dashboard-box dashboard-viz">
        <GeoMercator
          chartId="expert-centers-map"
          :chartData="expertCenters"
          rowId="code"
          latitude="latitude"
          longitude="longitude"
          :geojson="geojson"
          :mapCenter="{latitude: -32, longitude: 51}"
          groupingVariable="centerType"
          :groupColorMappings="{
            'Full member': '#E9724C',
            'Affiliated partner': '#f0f0f0',
            'Hub': '#2dd777'
          }"
          :legendLabels="['Full member', 'Affiliated partner', 'Hub']"
          :legendColors="['#E9724C', '#f0f0f0', '#2dd777']"
          :tooltipTemplate="(row) => {
            return `
            <p class='title'>
              <a href='${row.centerProjectUrl}'>
                ${row.projectName}
              </a>
            </p>
            <p class='center-representative'>${row.centerRepresentative}</p>
            <p class='center-location'>
              <span class='location-city'>${row.city}</span>
              <span class='location-country'>${row.country}</span>
            </p>
            <p class='center-type'>${row.centerType}</p>
            `
          }"
        />
      </div>
    </div>
  </Page>
  <AppFooter />
</template>

<script>
import AppFooter from '@/components/AppFooter.vue'
import geojson from '$shared/data/world.geo.json'
import { Page, LoadingScreen, MessageBox, DataTable, GeoMercator } from 'rd-components'
import { fetchData, sortData, subsetData, renameKey } from '$shared/js/utils.js'

export default {
  name: 'ithaca-dashboard',
  components: {
    Page,
    LoadingScreen,
    MessageBox,
    DataTable,
    GeoMercator,
    AppFooter
  },
  data () {
    return {
      loading: true,
      loadingError: null,
      expertCenters: [],
      enrollmentBySubregistry: [],
      casesByGene: [],
      geojson: geojson
    }
  },
  mounted () {
    Promise.all([
      fetchData('/api/v2/ernstats_stats'),
      fetchData('/api/v2/ernstats_dataproviders'),
    ]).then(response => {
      const data = response[0].items
      const expertCenters = response[1].items 
      this.expertCenters = expertCenters
      
      const enrollmentBySubregistry = subsetData(data, 'component', 'table-enrollment-subregistry')
      this.enrollmentBySubregistry = sortData(enrollmentBySubregistry, 'valueOrder')
      renameKey(this.enrollmentBySubregistry, 'label', 'Group')
      renameKey(this.enrollmentBySubregistry, 'value', 'Number of Participants')
      
      const casesByGene = subsetData(data.slice(0, 7), 'component', 'table-counts-genes')
      this.casesByGene = sortData(casesByGene,'valueOrder')
      renameKey(this.casesByGene, 'label', 'Gene')
      renameKey(this.casesByGene, 'value', 'Number of Cases')

    }).then(() => {
      this.loading = false
    }).catch(error => {
      this.loading=false
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
  gap: 1.5em;
  margin: 0 auto;
  grid-template-columns: 1fr;
  grid-template-areas:
    "enrollmentTable"
    "geneTable"
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
      "enrollmentTable geneTable"
      "map map";
  }
  
  @media screen and (min-width: 1524px) {
    max-width: 60vw;
  }
  
  #table-enrollment-subregistries {
    grid-area: enrollmentTable
  }
  
  #table-gene-counts {
    grid-area: geneTable;
  }
  
  #viz-map {
    grid-area: map;
  }
}

.dashboard-main-message {
  padding: 1em;
  padding-bottom: 0;
  
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

#expert-centers-map-tooltip {
  font-family: $font-family;
}


</style>