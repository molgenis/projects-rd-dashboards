<template>
  <Page>
    <PageHeader
      title="RD-Components"
      subtitle="Map Component"
      :imageSrc="headerImage"
      height="large"
    />
    <PageSection :verticalPadding="0">
      <Breadcrumbs>
        <li><router-link :to="{name: 'geo-mercator'}">Map</router-link></li>
      </Breadcrumbs>
    </PageSection>
    <PageSection>
      <h2>Map Example</h2>
      <p>The map component can be used to create a point location visualisation using a geomercator map from the D3 library where each point represents a unique location in the dataset. The map can be customised by adjusting the properties or using CSS.</p>
    </PageSection>
    <PageSection class="bkg-light" :verticalPadding="2">
      <MessageBox v-if="loading & !hasError">
        <p>Fetching data</p>
      </MessageBox>
      <MessageBox v-else-if="hasError" type="error">
        <p>{{ error }}</p>
      </MessageBox>
      <GeoMercator 
        v-else
        chartId="map"
        title="ROR Organisations"
        description="The following map shows organisations in Belgium, France, Germany, and the Netherlands by type (as defined in ROR: education, facility, and healthcare). Zoom in to explore the map and hover over a location to view more information. Click a location to view the row level data below. Click an item in the legend to hide or show the data on the map."
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
              <span class='location-type'>${row.type}</span>
            </p>
          `
        }"
        :enableLegendClicks="true"
        :enableMarkerClicks="true"
        @marker-clicked="updateSelection"
        />
    </PageSection>
    <PageSection>
    <output class="output">
      {{  location }}
    </output>
    </PageSection>
  </Page>
</template>

<script setup>
import { ref, onMounted } from "vue";

import Page from '@/components/Page.vue'
import PageHeader from '@/components/PageHeader.vue'
import PageSection from '@/components/PageSection.vue'
import MessageBox from '@/components/MessageBox.vue'
import GeoMercator from '@/components/VizGeoMercator.vue'
import Breadcrumbs from '@/app-components/breadcrumbs.vue'

import { fetchData } from '$shared/js/utils.js'
import geojson from '$shared/data/world.geo.json'

import headerImage from '@/assets/map-header.jpg'

let loading = ref(true);
let hasError = ref(false);
let error = ref(null);
let data = ref({});
let location = ref(null);

const mapColorGroups = {
  Education: '#F4D58D',
  Facility: '#FC7573',
  Healthcare: '#B6C2D9',
}

  
function updateSelection (data) {
  location.value = data
}

onMounted(() => {
  Promise.resolve(
    fetchData('/api/v2/rdcomponents_institutions?num=5000&q=lat!=""')
  ).then(response => {
    data.value = response.items
    loading.value = false
  }).catch(error => {
    const err = error.message
    loading.value = false
    hasError.value = true
    error.value = err
    throw new Error(error)
  })
})
</script>
