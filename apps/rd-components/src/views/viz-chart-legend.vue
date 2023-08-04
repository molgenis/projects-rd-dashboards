<template>
  <Page>
    <PageHeader
      title="RD-Components"
      subtitle="Chart Legends"
      :imageSrc="headerImage"
      height="large"
    />
    <PageSection :verticalPadding="0">
      <Breadcrumbs>
        <li><router-link :to="{name: 'chart-legend'}">Chart Legend</router-link></li>
      </Breadcrumbs>
    </PageSection>
    <PageSection class="viz-section">
      <h2>rd-components: Chart legend example</h2>
      <p>The <strong>ChartLegend</strong> component is used to create legends for other visualisation components. The legend is rendered using an object containing one or more key-value pair. For example, in the box below, I assigned unique colors to the examples dataset using D3 scaleOrdinal and d3 color schemes.</p>
      <p>Here's the example input data.</p>
      <output class="output">
        {{ data }}
      </output>
      <p>This generates the following legend.</p>
      <MessageBox v-if="loading & !hasError">
        <p>Fetching data</p>
      </MessageBox>
      <MessageBox v-else-if="!loading && hasError" type="error">
        <p>{{ error }}</p>
      </MessageBox>
      <div id="legendContainer" v-else>
        <ChartLegend
          :data="data"
          :stackLegend="true"
          :enableClicks="true"
          @legend-item-clicked="updateClicked"
        />
      </div>
      <p>Click events are also enabled. This allows users to interact with the visualisation components by filtering the data. Click an item to view the "filtered" state.</p>
      <output class="output">
        {{ clicked }}
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
import ChartLegend from '@/components/VizLegend.vue'
import Breadcrumbs from '@/app-components/breadcrumbs.vue'

import { fetchData } from '$shared/js/utils.js'
import { schemeGnBu } from 'd3-scale-chromatic'
import { scaleOrdinal } from 'd3'
const d3 = {schemeGnBu, scaleOrdinal}

import headerImage from '@/assets/legend-header.jpg'

let loading = ref(true);
let hasError = ref(false);
let error = ref(null);
let data = ref([]);
let clicked = ref({});

function updateClicked(data) {
  clicked.value = data;
}

onMounted(() => {
  Promise.resolve(
    fetchData('/api/v2/rdcomponents_penguins?num=500')
  ).then(response => {
    const rawdata = response.items
    const groups = [...new Set(rawdata.map(row => row.island))]
    const palette = d3.scaleOrdinal(d3.schemeGnBu[groups.length])
    const colors = {}
    groups.forEach((key,index) => colors[key] = palette(index))
    data.value = colors
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
#legendContainer {
  padding: 1em;
  background-color: $gray-700;
  color: $gray-050;
}
</style>