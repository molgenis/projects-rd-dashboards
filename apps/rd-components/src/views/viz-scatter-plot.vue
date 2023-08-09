<template>
  <Page>
    <PageHeader
      title="RD-Components"
      subtitle="Scatter Plot"
      :imageSrc="headerImage"
      height="large"
    />
    <PageSection :verticalPadding="0">
      <Breadcrumbs>
        <li><router-link :to="{name: 'scatter-plot'}">Scatter Plot</router-link></li>
      </Breadcrumbs>
    </PageSection>
    <PageSection class="viz-section-dark" :verticalPadding="2">
      <MessageBox v-if="loading & !hasError">
        <p>Fetching data</p>
      </MessageBox>
      <MessageBox v-else-if="!loading && hasError" type="error">
        <p>{{ error }}</p>
      </MessageBox>
      <ScatterPlot 
        chartId="penguinSizeChart"
        title="Body mass and flipper length"
        :description="`The body mass (g) and flipper length (mm) are reported for ${data.length} observed penguins`"
        :chartData="data"
        group="species"
        xvar="body_mass_g"
        yvar="flipper_length_mm"
        xAxisLabel="Body Mass (g)"
        yAxisLabel="Flipper Length (mm)"
        :chartMargins="{
          top: 15,
          right: 25,
          bottom: 60,
          left: 60
        }"
        v-else
      />
    </PageSection>
  </Page>
</template>

<script setup>
import { ref, onMounted } from "vue";

import Page from '@/components/Page.vue'
import PageHeader from '@/components/PageHeader.vue'
import PageSection from '@/components/PageSection.vue'
import MessageBox from '@/components/MessageBox.vue'
import ScatterPlot from '@/components/VizScatterPlot.vue'
import Breadcrumbs from '@/app-components/breadcrumbs.vue'
import headerImage from "@/assets/scatter-plot-header.jpg"

import { fetchData } from '$shared/js/utils.js' 

let loading = ref(true);
let hasError = ref(false);
let error = ref(null);
let data = ref([]);
let clicked = ref({});

onMounted(() => {
  Promise.resolve(
    fetchData('/api/v2/rdcomponents_penguins?num=500')
  ).then(response => {
    data.value = response.items
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
.viz-section-dark {
  background-color: $gray-700;
  color: $gray-000;
}
</style>