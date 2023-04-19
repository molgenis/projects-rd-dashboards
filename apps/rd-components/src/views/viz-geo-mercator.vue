<template>
  <Page>
    <PageSection class="viz-section">
      <h2>GeoMercator Component</h2>
      <p>The <strong>GeoMercator</strong> component can be used to create a point location visualisation using a geomercator map from the D3 library where each point represents a unique location in the dataset. The map can be customised by adjusting the properties or using CSS.</p>
      <MessageBox v-if="loading & !hasError">
        <p>Fetching data</p>
      </MessageBox>
      <MessageBox v-else-if="hasError" type="error">
        <p>{{ error }}</p>
      </MessageBox>
      <GeoMercator 
        v-else
        chartId="map"
        rowId="name"
        :geojson="geojson"
        :chartData="data"
        latitude="lat"
        longitude="lng"
        groupingVariable="type" 
        :groupColorMappings="mapColorGroups"
        :legendData="mapColorGroups"
        :chartScale="2"
        :mapCenter="{latitude: 4.515, longitude: 49.205}"
        :zoomLimits="[0.2, 25]"
        :tooltipTemplate="(row) => {
          return `
            <p class='title'>${row.name}</p>
            <p class='location'>
              <span class='location-city'>${row.city}</span>
              <span class='location-city'>${row.type}</span>
            </p>
          `
        }"
      />
    </PageSection>
  </Page>
</template>

<script>
import Page from '@/components/Page.vue'
import PageSection from '@/components/PageSection.vue'
import MessageBox from '@/components/MessageBox.vue'
import GeoMercator from '@/components/VizGeoMercator.vue'

import { fetchData } from '$shared/js/utils.js'
import geojson from '$shared/data/world.geo.json'
// import geojson from '$shared/data/world.50.geo.json'

export default {
  components: {
    Page,
    PageSection,
    MessageBox,
    GeoMercator
  },
  data () {
    return {
      loading: true,
      hasError: false,
      error: null,
      data: {},
      geojson: geojson,
      mapColorGroups: {
        'Education': '#F4D58D',
        'Facility': '#FC7573',
        'Healthcare': '#B6C2D9',
      }
    }
  },
  mounted () {
    Promise.resolve(
      fetchData('/api/v2/rdcomponents_institutions?num=5000&q=lat!=""')
    ).then(response => {
      this.data = response.items
      this.loading = false
    }).catch(error => {
      this.loading = false
      this.hasError = true
      this.error = error
      throw new Error(error)
    })
  }
}
</script>
