<template>
  <Page>
    <PageSection class="viz-section">
      <h2>rd-components: Bar Chart example</h2>
      <p>The <strong>BarChart</strong> component is used to display values for categorical data. Groups are plotted along the y-axis and values along the x-axis.</p>
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
        @barClicked="(value) => updateClicked(value)"
      />
      <h3>Selected Item</h3>
      <p>Click a bar in the chart of above to display the row-level data</p>
      <output class="output">
        {{ clicked }}
      </output>
    </PageSection>
  </Page>
</template>

<script>
import Page from '@/components/Page.vue'
import PageSection from '@/components/PageSection.vue'
import MessageBox from '@/components/MessageBox.vue'
import BarChart from '@/components/VizBarChart.vue'

import { fetchData, reverseSortData } from '$shared/js/utils.js' 
import { rollups } from 'd3'
const d3 = { rollups }


export default {
  components: {
    Page,
    PageSection,
    MessageBox,
    BarChart,
  },
  data () {
    return {
      loading: true,
      hasError: false,
      error: null,
      data: [],
      clicked: {},
    }
  },
  methods: {
    updateClicked (data) {
      this.clicked = data
    }
  },
  mounted () {
    Promise.resolve(
      fetchData('/api/v2/rdcomponents_penguins')
    ).then(response => {
      const data = response.items
      const summarised = d3.rollups(data, row => row.length, row => row.island)
        .map(item => new Object({'island': item[0], 'count': item[1]}))
      this.data = reverseSortData(summarised, 'value')
      this.loading = false
    }).catch(error => {
      const err = error.message
      this.loading = false
      this.hasError = true
      this.error = err
      throw new Error(error)
    })
  }
}
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