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
    <PageSection :verticalPadding="0">
      <Breadcrumbs>
        <li><router-link :to="{name: 'demo'}">Demo</router-link></li>
      </Breadcrumbs>
    </PageSection>
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
            :geojson="geojson"
            :chartData="islandSummary"
            rowId="island"
            latitude="lat"
            longitude="lng"
            :mapCenter="{latitude: -60, longitude: -55 }"
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
            :zoomLimits="[0.5, 12]"
            :chartScale="2"
            :chartHeight="675"
            :enableMarkerClicks="true"
            @marker-clicked="updateClickedIsland"
          />
        </div>
        <div id="species-summary" class="dashboard-box">
          <h2>Summary of Observed Penguins {{clickedIsland ? ' at ' + clickedIsland + ' island': 'across all islands'}}</h2>
          <DataTable
            tableId="summaryData"
            :data="islandPenguins"
            :columnOrder="[
              'species',
              'avg. body mass (g)',
              'avg. flipper length (mm)',
              'avg. bill length (mm)',
              'avg. bill depth (mm)',
            ]"
          />
        </div>
        <div id="species-by-sex-and-island" class="dashboard-box">
          <h2>Sex of Observed Penguins {{clickedIsland ? ' at ' + clickedIsland + ' island': 'across all islands'}}</h2>
          <div class="dashboard-box-flex">
            <PieChart
              :chartId="`sex-by-${row.species}`"
              :title="`${row.species} (n=${row.count})`"
              :chartData="row.data"
              :chartHeight="250"
              :chartScale="0.3"
              :chartMargins="75"
              :asDonutChart="true"
              v-for="row in islandPenguinsBySex"
            />
          </div>
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
import Breadcrumbs from '@/app-components/breadcrumbs.vue'

import DataHighlights from "@/components/VizDataValueHighlights.vue"
import DataTable from "@/components/VizDataTable.vue"
import GeoMercator from "@/components/VizGeoMercator.vue"
import PieChart from "@/components/VizPieChart.vue"

import geojson from "$shared/data/world.geo.json"

import { fetchData } from '$shared/js/utils.js'
import { mean, format, rollup, rollups, ascending } from 'd3'
const d3 = { mean, format, rollup, rollups, ascending }

let loading = ref(true);
let hasError = ref(false);
let error = ref(null);
let data = ref([]);

const floatFormat = d3.format('.2f')

let highlightsData = ref({});
let islandSummary = ref([]);
let islandPenguins = ref([]);
let islandPenguinsBySex = ref([]);

let clickedIsland = ref(false);

function updateClickedIsland(value) {
  clickedIsland.value = value.island
} 


// find the total number of penguins by species
function summarizeTotalSpecies () {
  const speciesCounts = d3.rollup(data.value, row => row.length, row => row.species);
  highlightsData.value = Object.fromEntries(speciesCounts)
}


// find the total number of species by island
// append counts to island summary
function penguinsByIsland () {
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
  islandSummary.value = islands;
}

// summarise species and island
function penguinSpeciesByIsland () {
  let penguins = data.value
  if (clickedIsland.value) {
    penguins = penguins.filter(row => row.island === clickedIsland.value)
  } 

  islandPenguins.value = d3.rollups(
    penguins,
    row => ({
      count: row.length,
      avg_body_mass_g: d3.mean(row, r => r.body_mass_g),
      avg_flipper_length_mm: d3.mean(row, r => r.flipper_length_mm),
      avg_bill_length_mm: d3.mean(row, r => r.bill_length_mm),
      avg_bill_depth_mm: d3.mean(row, r => r.bill_depth_mm),
      male: row.filter(d => d.sex === 'male').length,
      female: row.filter(d => d.sex === 'female').length,
      unknown: row.filter(d => typeof d.sex === 'undefined').length
    }),
    row => row.species
  )
  .map(row => {
    return new Object({
      species: row[0],
      count: row[1].count,
      'avg. body mass (g)': parseFloat(floatFormat(row[1].avg_body_mass_g)),
      'avg. flipper length (mm)': parseFloat(floatFormat(row[1].avg_flipper_length_mm)),
      'avg. bill length (mm)': parseFloat(floatFormat(row[1].avg_bill_length_mm)),
      'avg. bill depth (mm)': parseFloat(floatFormat(row[1].avg_bill_depth_mm)),
      male: parseFloat(floatFormat((row[1].male / row[1].count) * 100)),
      female: parseFloat(floatFormat((row[1].female / row[1].count) * 100)),
      unknown: parseFloat(floatFormat((row[1].unknown / row[1].count) * 100))
    })
  })
  .flat();
}

// summarise penguins by sex and species at a selected island
function penguinSpeciesBySex () {
  islandPenguinsBySex.value = islandPenguins.value.map(row => {
    return new Object({
      species: row.species,
      count: row.count,
      data: {female: row.female, male: row.male, unknown: row.unknown} 
    })
  })
}

// watch([clickedIsland], penguinSpeciesByIsland)
// watch([clickedIsland], penguinSpeciesBySex)

onMounted(() => {
  Promise.resolve(
    fetchData('/api/v2/rdcomponents_penguins?num=500&sort=species,island')
  ).then(response => { 
    data.value = response.items
    
    // run summarisers
    summarizeTotalSpecies();
    penguinsByIsland();
    penguinSpeciesByIsland();
    penguinSpeciesBySex();
    
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
      'island-map island-map island-map species-summary'
      'island-map island-map island-map island-summary';
    
    .dashboard-box {      
      box-sizing: content-box;
      padding: 1em;
      background-color: $gray-000;
      border-radius: 12px;
      box-shadow: $box-shadow;
      
      .dashboard-box-flex {
        display: flex;
        justify-content: center;
        align-items: center;
        
        .d3-viz {
          flex-grow: 1;
        }
      }
      
      h2 {
        font-size: 15pt;
      }
      
      h2, h3 {
        margin: 0;
        margin-top: 0.4em;
      }
      p {
        margin: 0;
        margin-top: 0.3em;
        margin-bottom: 1em;
        font-size: 13pt;
        line-height: 1.4;
      }
    }
    
    #island-map {
      grid-area: island-map;
      min-width: 400px;
    }  

    #species-counts {
      grid-area: species-count;
    }
    
    #species-summary {
      grid-area: species-summary;
    }
    
    #species-by-sex-and-island {
      
      .d3-pie-chart {
        max-width: 300px;
        max-height: 300px;
        
        h3.chart-title {
          text-align: center;
          font-size: 13pt;
        }
      }
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