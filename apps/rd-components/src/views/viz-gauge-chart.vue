<template>
  <Page>
    <PageHeader
      title="RD-Components"
      subtitle="Gauge Chart Example"
      :imageSrc="headerImage"
      height="large"
    />
    <PageSection :verticalPadding="0">
      <Breadcrumbs>
        <li><router-link :to="{name: 'gauge-chart'}">Gauge Chart</router-link></li>
      </Breadcrumbs>
    </PageSection>
    <PageSection class="viz-section">
      <h2>Gauge Chart</h2>
      <p>The <strong>Gauge</strong> component is useful for displaying the progress of one numeric value in relation to the whole group. This may be useful for showing progress towards reaching patient recruiment targets, for example. The input value must be a decimal between 0 and 1, and the percentage should be calculated passing into the component. The percentage is displayed in the center of the chart.</p>
      <p>The chart respresents a scale between 0 and 100. The input value is always drawn clockwise starting from the 12:00 position, and it is always the darker colored arc. The lighter arc shows the entire amount (i.e., 100%). The colors can be modified, but the value arc should always be darker than the background arc.</p>
    </PageSection>
    <PageSection class="bkg-light" :verticalPadding="2">
      <MessageBox v-if="loading & !hasError">
        <p>Fetching data</p>
      </MessageBox>
      <MessageBox v-else-if="!loading && hasError" type="error">
        <p>{{ error }}</p>
      </MessageBox>
      <div class="d3-viz-flex" v-for="row in data">
          <GaugeChart
            :chartId="`gauge-${row.species}`"
            :title="row.species"
            :value="row.value"
            :chartWidth="100"
          /> 
      </div>
    </PageSection>
  </Page>
</template>

<script setup>
import { ref, onMounted } from "vue";

import Page from '@/components/Page.vue'
import PageHeader from '@/components/PageHeader.vue'
import PageSection from '@/components/PageSection.vue'
import MessageBox from '@/components/MessageBox.vue'
import Breadcrumbs from '@/app-components/breadcrumbs.vue'
import GaugeChart from '@/components/VizGaugeChart.vue'

import headerImage from '@/assets/gauge-chart-header.jpg'

import { fetchData } from '$shared/js/utils.js' 
import { rollups } from 'd3'
const d3 = { rollups }

let loading = ref(false);
let hasError = ref(false);
let error = ref(null);
let data = ref([]);

onMounted(() => {
  Promise.resolve(
    fetchData('/api/v2/rdcomponents_penguins?num=500')
  ).then(response => {
    const rawdata = response.items
    const total = response.total
    data.value = d3.rollups(rawdata, row => row.length, row => row.species)
      .map(row => new Object({ species: row[0], value: row[1] / total }))
    console.log(data.value)
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
.d3-viz-flex {
  display: grid;
  grid-template-columns: repeat(1fr, 3);
  
  .d3-gauge {
    flex-grow: 1;
    border: 1px solid red;
  }
}
</style>