<template>
  <Page>
    <PageSection class="viz-section">
      <h2>rd-components: Column Chart example</h2>
      <p>The <strong>ColumnChart</strong> component is used to display values for categorical data. Groups are plotted along the x-axis and values along the y-axis.</p>
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
        xvar="island"
        yvar="count"
        :chartMargins="{left: 110, top: 10, right: 40, bottom: 60}"
        :barPaddingInner="0.25"
        :barPaddingOuter="0.25"
        xAxisLabel="Number of Penguins"
        :enableClicks="true"
        @columnClicked="(value) => updateClicked(value)"
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
import ColumnChart from '@/components/VizColumnChart.vue'

import { fetchData } from '$shared/js/utils.js' 
import * as d3 from 'd3'

export default {
  components: {
    Page,
    PageSection,
    MessageBox,
    ColumnChart,
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
      this.data = summarised
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