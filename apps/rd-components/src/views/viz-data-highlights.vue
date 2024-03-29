<template>
  <Page>
    <PageHeader
      title="RD-Components"
      subtitle="Data Highlights Example"
      :imageSrc="headerImage"
      height="large"
    />
    <PageSection :verticalPadding="0">
      <Breadcrumbs>
        <li><router-link :to="{name: 'data-highlights'}">Data Highlights</router-link></li>
      </Breadcrumbs>
    </PageSection>
    <PageSection :verticalPadding="2">
      <h2>Data Highlights Component</h2>
      <p>The <strong>DataHighlights</strong> component is used to showcase interesting or important values. Ideally, this component should be rendered at the top of a page (e.g., dashboard) or can be restyled using CSS to fit your needs.</p>
      <p>The input data is an object containing one or more key-value pairs. It is recommended to limit the number of values to five or less as it defeats the purpose of highlighting key findings. If you need more, consider using the DataTable component.</p>
      <p>In this example, I used the Palmer Penguins data to display the mean- body mass, flipper length, and bill length.</p>
    </PageSection>
    <PageSection class="bkg-light" :verticalPadding="2">
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

<script setup>
import { ref, onMounted } from "vue";

import Page from '@/components/Page.vue';
import PageHeader from '@/components/PageHeader.vue';
import PageSection from '@/components/PageSection.vue';
import MessageBox from '@/components/MessageBox.vue';
import DataHighlights from '@/components/VizDataValueHighlights.vue';
import Breadcrumbs from '@/app-components/breadcrumbs.vue';
import headerImage from '@/assets/highlights-header.jpg';

import { fetchData } from '$shared/js/utils.js';
import { mean, format } from 'd3';
const d3 = { mean, format };

let loading = ref(true);
let hasError = ref(false);
let error = ref(null);
let summarised = ref({});

onMounted(() => {
  Promise.resolve(
    fetchData('/api/v2/rdcomponents_penguins?num=500')
  ).then(response => {
    const data = response.items
    const format = d3.format('.1f')
    summarised.value = {
      'Avg. Body Mass (g)': format(d3.mean(data, row => row.body_mass_g)),
      'Avg. Flipper Length (mm)': format(d3.mean(data, row => row.flipper_length_mm)),
      'Avg Bill Length (mm)': format(d3.mean(data, row => row.bill_length_mm))
    }
    
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
.data-highlights {
  .data-highlight {
    background-color: $blue-900;
  }
}
</style>