<template>
  <Page>
    <PageSection class="viz-section">
      <h2>rd-components: Chart legend example</h2>
      <p>The <strong>ChartLegend</strong> component is used to create legends for other visualisation components. The legend is rendered using an object containing one or more key-value pair. For example, in the box below, I assigned unique colors to the examples dataset using D3 scaleOrdinal and d3 color schemes.</p>
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
          @itemClicked="(value) => updateSelection(value)"
        />
      </div>
      <p>Click events are also enabled. This allows users to interact with the visualisation components. Click a legend item to view the seletion.</p>
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
import ChartLegend from '@/components/VizLegend.vue'

import { fetchData } from '$shared/js/utils.js'
import { schemeGnBu } from 'd3-scale-chromatic'
import { scaleOrdinal } from 'd3'
const d3 = {schemeGnBu, scaleOrdinal}

export default {
  components: {
    Page,
    PageSection,
    MessageBox,
    ChartLegend
  },
  data () {
    return {
      loading: true,
      hasError: false,
      error: null,
      data: [],
      clicked: 'Null',
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
      const groups = [...new Set(data.map(row => row.island))]
      const palette = d3.scaleOrdinal(d3.schemeGnBu[groups.length])
      const colors = {}
      groups.forEach((key,index) => colors[key] = palette(index))
      this.data = colors
      this.loading = false
    }).catch(error => {
      throw new Error(error)
    })
  }
}

</script>

<style lang="scss">
#legendContainer {
  padding: 1em;
  background-color: $gray-700;
  color: $gray-050;
}
</style>