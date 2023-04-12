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
      <PieChart
        v-else
        chartId="sexByPenguin"
        :title="`Summary of sex of ${total} penguins`"
        :chartData="data"
        :enableClicks="true"
        :chartWidth="600"
        :chartHeight="175"
        @sliceClicked="value => updateSelection(value)"
      />
      <h3>Selected Item</h3>
      <p>Click a slice in the chart of above to display the row-level data</p>
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
import PieChart from '@/components/VizPieChart.vue'

import { fetchData } from '$shared/js/utils.js' 
import { rollups, sum } from 'd3'
const d3 = { rollups, sum }

export default {
  components: {
    Page, 
    PageSection,
    MessageBox,
    PieChart
  },
  data () {
    return {
      loading: true,
      hasError: false,
      error: null,
      data: [],
      total: 0,
      clicked: {},
    }
  },
  methods: {
    updateSelection (value) {
      this.clicked = value
    }
  },
  mounted () {
    Promise.resolve(
      fetchData('/api/v2/rdcomponents_penguins')
    ).then(response => {
      const data = response.items
      const grouped = d3.rollups(data, row => row.length, row => row.sex)
      const summarised = {} 
      grouped.map(array => {
        if (typeof array[0] === 'undefined') {
          summarised['unknown'] = array[1]
        } else {
          summarised[array[0]] = array[1]
        }
      })
      this.data = summarised
      this.total = d3.sum(grouped, item => item[1])
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