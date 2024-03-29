<template>
  <Page>
    <PageHeader
      title="RD-Components"
      subtitle="Bar Chart Example"
      :imageSrc="headerImage"
      height="large"
    />
    <PageSection :verticalPadding="0">
      <Breadcrumbs>
        <li><router-link :to="{name: 'bar-chart'}">Bar Chart</router-link></li>
      </Breadcrumbs>
    </PageSection>
    <PageSection class="viz-section">
      <h2>Bar Chart</h2>
      <p>The <strong>BarChart</strong> component is used to display values for categorical data. Groups are plotted along the y-axis and values along the x-axis. If you would like to display values vertically, use the <router-link :to="{name: 'column-chart'}">Column Chart</router-link> component.</p>
    </PageSection>
    <PageSection class="bkg-light" :verticalPadding="2">
      <MessageBox v-if="loading & !hasError">
        <p>Fetching data</p>
      </MessageBox>
      <MessageBox v-else-if="!loading && hasError" type="error">
        <p>{{ error }}</p>
      </MessageBox>
      <BarChart
        v-else
        chartId="penguinsBarChart"
        title="Palmer Penguins by Island"
        description="The following chart displays the number of penguins observed by location (island)."
        :chartData="data"
        xvar="count"
        yvar="island"
        :chartMargins="{left: 110, top: 10, right: 40, bottom: 60}"
        :barPaddingInner="0.25"
        :barPaddingOuter="0.25"
        xAxisLabel="Number of Penguins"
        :enableClicks="true"
        @bar-clicked="updateClicked"
      />
      <p>Click a bar in the chart of above to display the row-level data</p>
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
import Breadcrumbs from '@/app-components/breadcrumbs.vue'
import BarChart from '@/components/VizBarChart.vue'

import headerImage from '@/assets/bar-chart-header.jpg'

import { fetchData, sortData } from '$shared/js/utils.js' 
import { rollups } from 'd3'
const d3 = { rollups }

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

    const summarised = d3.rollups(rawdata, row => row.length, row => row.island)
      .map(item => new Object({'island': item[0], 'count': item[1]}))
      
    data.value = sortData(summarised, 'value')
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
