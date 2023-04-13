<template>
  <Page>
    <PageSection class="viz-section">
      <h2>Data Highlights Component</h2>
      <p>The <strong>DataHighlights</strong> component is used to showcase interesting or important values. Ideally, this component should be rendered at the top of a page (e.g., dashboard) or can be restyled using CSS to fit your needs.</p>
      <p>The input data is an object containing one or more key-value pairs. It is recommended to limit the number of values to five or less as it defeats the purpose of highlighting key findings. If you need more, consider using the DataTable component.</p>
      <p>In this example, I used the Palmer Penguins data to display the mean- body mass, flipper length, and bill length.</p>
      <MessageBox v-if="loading & !hasError">
        <p>Fetching data</p>
      </MessageBox>
      <MessageBox v-else-if="hasError" type="error">
        <p>{{ error }}</p>
      </MessageBox>
      <DataHighlights :data="summarised" v-else />
    </PageSection>
  </Page>
</template>

<script>
import Page from '@/components/Page.vue'
import PageSection from '@/components/PageSection.vue'
import MessageBox from '@/components/MessageBox.vue'
import DataHighlights from '@/components/VizDataValueHighlights.vue'

import { fetchData } from '$shared/js/utils.js'
import { mean, format } from 'd3'
const d3 = { mean, format }

export default {
  components: {
    Page,
    PageSection,
    MessageBox,
    DataHighlights
  },
  data () {
    return {
      loading: true,
      hasError: false,
      error: null,
      data: {},
      summarised: {}
    }
  },
  mounted () {
    Promise.resolve(
      fetchData('/api/v2/rdcomponents_penguins')
    ).then(response => {
      const data = response.items
      const format = d3.format('.1f')
      const summarised = {
        'Avg. Body Mass (g)': format(d3.mean(data, row => row.body_mass_g)),
        'Avg. Flipper Length (mm)': format(d3.mean(data, row => row.flipper_length_mm)),
        'Avg Bill Length (mm)': format(d3.mean(data, row => row.bill_length_mm))
      }
      
      this.summarised = summarised
      this.loading = false
    }).catch(error => {
      this.loading = false
      this.hasError = true
      this.error = error
      throw new Error(error)
    })
  }
}
</script>

<style lang="scss">
.data-highlights {
  .data-highlight {
    background-color: $blue-900;
  }
}
</style>