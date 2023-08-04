<template>
  <Page>
    <PageHeader
      title="RD-Components"
      subtitle="Pie Chart"
      :imageSrc="headerImage"
      height="large"
    />
    <PageSection :verticalPadding="0">
      <Breadcrumbs>
        <li><router-link :to="{name: 'pie-chart'}">Pie Chart</router-link></li>
      </Breadcrumbs>
    </PageSection>
    <PageSection class="viz-section">
      <h2>PieChart Component</h2>
      <p>The <strong>PieChart</strong> component is used to descriptives for categorical data. Input data must be an object with one or more key-value pairs. It is recommended to supply no more than 7 categories and to combine smaller groups into an "other" category. If you need to display more groups, it is strongly recommended to use the <strong>BarChart</strong> or <strong>ColumnChart</strong> components. Alternatively, the <strong>DataTable</strong> component is much better.</p>
      <p>It is also possible to enable click events to enhance interactivity with other visualisation components. See the example below.</p>
    </PageSection>
    <PageSection class="bkg-light" :verticalPadding="2">
      <MessageBox v-if="loading & !hasError">
        <p>Fetching data</p>
      </MessageBox>
      <MessageBox v-else-if="!loading && hasError" type="error">
        <p>{{ error }}</p>
      </MessageBox>
      <PieChart
        v-else
        chartId="sexByPenguin"
        title="Summary of species"
        :description="`In total, ${total} penguins were observed across all stations. The following chart shows the breakdown of observed penguins by species.`"
        :chartData="data"
        :enableClicks="true"
        :chartHeight="200"
        @slice-clicked="updateSelection"

      />
      <h3>Selected Item</h3>
      <p>Click a slice in the chart of above to display the row-level data</p>
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
import PieChart from '@/components/VizPieChart.vue'
import Breadcrumbs from '@/app-components/breadcrumbs.vue'

import { fetchData } from '$shared/js/utils.js' 
import { rollups, sum, format } from 'd3'
const d3 = { rollups, sum, format }

import headerImage from '@/assets/pie-chart-header.jpg'

let loading = ref(true);
let hasError = ref(false);
let error = ref(null);
let data = ref([]);
let clicked = ref({});
let total = ref(0);

function updateSelection(value) {
  clicked.value = value
}
  
onMounted(() => {
  Promise.resolve(
    fetchData('/api/v2/rdcomponents_penguins?num=500')
  ).then(response => {
    const rawdata = response.items
    const format = d3.format('.2f')
    const grouped = d3.rollups(rawdata, row => row.length, row => row.species)
    const summarised = {} 
    grouped.map(array => {
      if (typeof array[0] === 'undefined') {
        summarised['unknown'] = array[1]
      } else {
        summarised[array[0]] = format((array[1] / rawdata.length) * 100)
      }
    })
    data.value = summarised
    total.value = d3.sum(grouped, item => item[1])
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