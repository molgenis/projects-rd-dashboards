<template>
  <Page>
    <PageHeader
      title="RD-Components"
      subtitle="Column Chart Example"
      :imageSrc="headerImage"
      height="large"
    />
    <PageSection :verticalPadding="0">
      <Breadcrumbs>
        <li><router-link :to="{name: 'column-chart'}">Column Chart</router-link></li>
      </Breadcrumbs>
    </PageSection>
    <PageSection :verticalPadding="2">
      <h2>Column Chart example</h2>
      <p>The <strong>ColumnChart</strong> component is used to display values for categorical data. Groups are plotted along the x-axis and values along the y-axis. If you would like to display values horizontally, use the <router-link :to="{name: 'bar-chart'}">Bar Chart</router-link> component.</p>
    </PageSection>
    <PageSection class="bkg-light" :verticalPadding="2">
      <MessageBox v-if="loading & !hasError">
        <p>Fetching data</p>
      </MessageBox>
      <MessageBox v-else-if="!loading && hasError" type="error">
        <p>{{ error }}</p>
      </MessageBox>
      <ColumnChart
        v-else
        chartId="penguinsColumnChart"
        title="Palmer Penguins by Island"
        description="The following chart displays the number of penguins observed by location (island)."
        :chartData="data"
        xvar="label"
        yvar="count"
        :chartMargins="{left: 110, top: 10, right: 40, bottom: 80}"
        :barPaddingInner="0.25"
        :barPaddingOuter="0.25"
        xAxisLabel="Number of Penguins"
        xAxisLineBreaker=" "
        :enableClicks="true"
        @column-clicked="updateClicked"
      />
      <h3>Selected Item</h3>
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
import Breadcrumbs from '@/app-components/breadcrumbs.vue'
import MessageBox from '@/components/MessageBox.vue'
import ColumnChart from '@/components/VizColumnChart.vue'

import headerImage from '@/assets/column-chart-header.jpg'

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

onMounted (() => {
  Promise.resolve(
    fetchData('/api/v2/rdcomponents_penguins?num=500')
  ).then(response => {
    const rawdata = response.items
    const summarised = d3.rollups(rawdata, row => row.length, row => row.island)
      .map(item => new Object({'island': item[0], 'count': item[1], 'label': `${item[0]} Species`}))
    data.value = sortData(summarised, 'island')
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
.output {
  display: block;
  width: 100%;
  box-sizing: content-box;
  padding: 1em;
  background-color: $gray-050;
}

</style>