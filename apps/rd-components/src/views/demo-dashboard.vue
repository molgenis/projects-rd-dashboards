<template>
  <Page>
    <PageHeader
      title="Molgenis Viz Demo Dashboard"
      subtitle="The Palmer Penguins Dashboard"
      :imageSrc="DashboardHeader"
      height="medium"
      :verticalPadding="4"
      titlePositionX="center"
    />
    <PageSection>
      <h2>About</h2>
      <p>The aim of this dashboard is to showcase the features of the <strong>molgenis-viz</strong> library. The Palmer Penguins dataset was used to populate the visualisations in this dashboard.</p>
    </PageSection>
    <div class="dashboard-container">
      <MessageBox v-if="loading & !hasError">
        <p>Fetching data</p>
      </MessageBox>
      <MessageBox v-else-if="!loading && hasError" type="error">
        <p>{{ error }}</p>
      </MessageBox>
      <div class="dashboard" v-else>
        <div id="species-counts" class="dashboard-box">
          <DataHighlights :data="highlightsData" />
        </div>
        <div id="island-map" class="dashboard-box">
          <GeoMercator
            chartId="islandLocations"
            title="Palmer Penguin Islands"
            :geojson="geojson"
            :chartData="islandSummary"
            rowId="island"
            latitude="lat"
            longitude="lng"
            :mapCenter="{latitude: -65, longitude: -50 }"
            :tooltipTemplate="(row) => {
              return `
              <p class='name'>${row.island}</p>
              <p class='species'>${row.count} penquins observed</p>
              <span class='coords lat'>${row.lat}</span>
              <span class='coords lng'>${row.lng}</span>
            `}"
            :mapColors="{
              land: '#709190',
              border: '#061428',
              water: '#061428'
          }"
          />
        </div>
        <div id="species-by-sex-and-island" class="dashboard-box">
          <GroupedColumnChart
            chartId="penguinsBySexAndIsland"
            title="Penguins Observed by Sex and Island"
            description="Click a bar on the chart to view more details about the penguins on a island in the following table"
            :chartData="sexByIsland"
            group="island"
            xvar="sex"
            yvar="count"
            :chartHeight="200"
            :yMax="100"
            :yTickValues="[0,25,50,75,100]"
            :enableClicks="true"
            @column-clicked="updateClickedIsland"
          />
        </div>
        <div id="species-summary" class="dashboard-box">
          <DataTable
            tableId="summaryData"
            :data="islandPenguinsBySpeciesAndSex"
            caption="Summary of Observed Penguins by Island"
            :columnOrder="[
              'species',
              'sex',
              'count',
              'avg. body mass (g)',
              'avg. flipper length (mm)',
            ]"
          />
        </div>
        <div class="dashboard-box">
        </div>
        <div class="dashboard-box">
        </div>
        <div class="dashboard-box">
        </div>
        <div class="dashboard-box">
        </div>
      </div>
    </div>
  </Page>
</template>

<script setup>
import { ref, onMounted, watch } from "vue"

import Page from '@/components/Page.vue'
import PageHeader from '@/components/PageHeader.vue'
import PageSection from "@/components/PageSection.vue"
import MessageBox from '@/components/MessageBox.vue'
import DashboardHeader from "../assets/demo-dashboard-header.jpg"

import DataHighlights from "@/components/VizDataValueHighlights.vue"
import DataTable from "@/components/VizDataTable.vue"
import GeoMercator from "@/components/VizGeoMercator.vue"
import GroupedColumnChart from "@/components/VizGroupedColumnChart.vue"

import geojson from "$shared/data/world.geo.json"

import { fetchData, sortData } from '$shared/js/utils.js'
import { mean, format, rollup, rollups, ascending } from 'd3'
const d3 = { mean, format, rollup, rollups, ascending }

let loading = ref(true);
let hasError = ref(false);
let error = ref(null);
let data = ref([]);

const floatFormat = d3.format('.2f')

let highlightsData = ref({});
let islandSummary = ref([]);
let sexByIsland = ref([]);
let islandPenguinsBySpeciesAndSex = ref([]);
let clickedIsland = ref(false);

function updateClickedIsland(value) {
  clickedIsland.value = value
} 


// find the total number of penguins by species
function summarizeTotalSpecies () {
  const speciesCounts = d3.rollup(data.value, row => row.length, row => row.species);
  return Object.fromEntries(speciesCounts)
}


// find the total number of species by island
// append counts to island summary
function summarizeSpeciesByIsland () {
  const islands = [
    {island: 'Biscoe', lat: -65.7008892, lng: -66.2453479},
    {island: 'Dream', lat: -64.3794563, lng: -66.5161662},
    {island: 'Torgersen', lat: -64.7666652, lng: -64.1039755},
  ]
  
  const summarized = d3.rollups(data.value, row => row.length, row => row.island)
  for (let i=0; i < summarized.length; i++) {
    for (let row=0; row < islands.length; row++) {
      if (islands[row].island === summarized[i][0]) {
        islands[row].count = summarized[i][1]
      }
    }
  }
  return islands;
}

// summarise the number of penguins by sex and island
function summarizeSexByIsland () {
  const summary = d3.rollups(data.value, row => row.length, row => row.island, row => row.sex)
    .map(row => {
      return row[1].map(value => {
        return new Object({
          island: row[0],
          sex: typeof value[0] === "undefined" ? "unknown" : value[0],
          count: value[1]
        })
      })
    })
    .flat();
  return summary
}

// summarise species by gender and island
function summarizePenguinsBySex () {
  let penguins = data.value;
  if (clickedIsland.value) {
    penguins = penguins.filter(row => row.island  === clickedIsland.value);
  }
  return d3.rollups(
    penguins,
    row => ({
      count: row.length,
      avg_body_mass_g: d3.mean(row, r => r.body_mass_g),
      avg_flipper_length_mm: d3.mean(row, r => r.flipper_length_mm),
    }),
    row => row.sex,
    row => row.species
  )
  .map(row => {
    return row[1].map(value => {
      return ({
        sex: typeof row[0] === "undefined" ? "unknown" : row[0],
        species: value[0],
        'avg. body mass (g)': parseFloat(floatFormat(value[1].avg_body_mass_g)),
        'avg. flipper length (mm)': parseFloat(floatFormat(value[1].avg_flipper_length_mm)),
      })
    })
  })
  .flat();
}

watch([clickedIsland], summarizePenguinsBySex);

onMounted(() => {
  Promise.resolve(
    fetchData('/api/v2/rdcomponents_penguins?num=500&sort=species,island')
  ).then(response => { 
    data.value = response.items
    
    // run summarisers
    islandSummary.value = summarizeSpeciesByIsland();
    highlightsData.value = summarizeTotalSpecies();
    sexByIsland.value = summarizeSexByIsland();
    
    islandPenguinsBySpeciesAndSex = summarizePenguinsBySex();
    
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

<style lang="scss">
.dashboard-container {
  box-sizing: border-box;
  padding: 2em;
  background-color: $gray-100;
  
  .dashboard {
    display: grid;
    justify-content: center;
    align-items: stretch;
    gap: 1.25em;
    grid-template-areas: 
      'species-count species-count species-count species-count'
      'island-map island-map island-map island-summary'
      'island-map island-map island-map species-summary'
    ;
    
    .dashboard-box {
      box-sizing: content-box;
      padding: 1em;
      background-color: $gray-000;
      border-radius: 12px;
      box-shadow: $box-shadow;
    }
    
    #island-map {
      grid-area: island-map;
    }  

    #species-counts {
      grid-area: species-count;
    }
    
    #species-summary {
      grid-area: species-summary;
    }
  }
}

#islandLocations-tooltip {
  .name {
    display: block;
    font-size: 13pt;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-weight: bold;
  }
  
  .species {
    font-size: 13pt;
  }
  
  .coords {
    display: inline;
    font-size: 11pt;
    color: $gray-700;
  }
}

</style>