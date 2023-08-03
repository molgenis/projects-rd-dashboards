<template>
  <Page>
    <PageHeader
      title="RD-Components"
      subtitle="Grouped Column Chart Example"
      :imageSrc="headerImage"
      height="large"
    />
    <PageSection :verticalPadding="0">
      <Breadcrumbs>
        <li><router-link :to="{name: 'grouped-column-chart'}">Grouped Column Chart</router-link></li>
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
      <GroupedColumnChart
        v-else
        chartId="penguinsColumnChart"
        title="Palmer Penguins by Island"
        description="The following chart displays the number of penguins observed by location (island)."
        :chartData="data"
        group="island"
        :columnFillPalette="{
          Adelie: '#FEE0D2',
          Chinstrap: '#FC9272',
          Gentoo: '#DE2d26'
        }"
        xvar="species"
        yvar="count"
        :chartMargins="{left: 110, top: 10, right: 40, bottom: 80}"
        :barPaddingInner="0.25"
        :barPaddingOuter="0.25"
        xAxisLabel="Number of Penguins"
        :enableClicks="true"
        @column-clicked="updateClicked"
      />
      <h3>Selected Item</h3>
      <p>Click a column in the chart of above to display the row-level data</p>
      <output class="output">
        {{ clicked }}
      </output>
    </PageSection>
  </Page>
</template>

<script setup>
import { ref, onMounted } from "vue";

import Page from '@/components/Page.vue';
import PageHeader from '@/components/PageHeader.vue';
import PageSection from '@/components/PageSection.vue';
import Breadcrumbs from '@/app-components/breadcrumbs.vue';
import MessageBox from '@/components/MessageBox.vue';
import GroupedColumnChart from '@/components/VizGroupedColumnChart.vue';

import headerImage from '@/assets/adrien-delforge-unsplash.jpg';

import { fetchData, sortData } from '$shared/js/utils.js';
import { rollups, rollup } from 'd3';
const d3 = { rollups, rollup };

let loading = ref(true);
let hasError = ref(false);
let error = ref(null);
let data = ref([]);
let clicked = ref({});

function updateClicked(data) {
  clicked.value = data;
}

function unroll(rollup, keys, label = "value", p = {}) {
  return Array.from(rollup, ([key, value]) => 
    value instanceof Map 
      ? unroll(value, keys.slice(1), label, Object.assign({}, { ...p, [keys[0]]: key } ))
      : Object.assign({}, { ...p, [keys[0]]: key, [label] : value })
  ).flat();
}


onMounted(() => {
  Promise.resolve(
    fetchData('/api/v2/rdcomponents_penguins?num=500')
  ).then(response => {
    const data = response.items;
    const summarized = d3.rollup(data, row => row.length, row => row.island, row => row.species);
    const speciesByIsland = unroll(summarized, ['island', 'species'], 'count')
    return speciesByIsland;
  })
  .then((result) => {
    data.value = result
    loading.value = false
  })
  .catch(error => {
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