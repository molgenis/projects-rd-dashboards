<template>
  <Page>
    <PageHeader
      title="RD-Components"
      subtitle="Bar Chart Example"
      :imageSrc="headerImage"
      height="large"
    />
    <PageSection :verticalPadding="0">
      <Breadcrumbs>
        <li><router-link :to="{name: 'bar-chart'}">Bar Chart</router-link></li>
      </Breadcrumbs>
    </PageSection>
    <PageSection class="viz-section">
      <h2>Gauge Chart</h2>
      <p>The <strong>Gauge</strong> component...</p>
    </PageSection>
    <PageSection class="bkg-light" :verticalPadding="2">
      <MessageBox v-if="loading & !hasError">
        <p>Fetching data</p>
      </MessageBox>
      <MessageBox v-else-if="!loading && hasError" type="error">
        <p>{{ error }}</p>
      </MessageBox>
      <GaugeChart
        chartId="myGauge"
        :value="72"
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
import Breadcrumbs from '@/app-components/breadcrumbs.vue'
import GaugeChart from '@/components/VizGaugeChart.vue'

import headerImage from '@/assets/bar-chart-header.jpg'

import { fetchData, sortData } from '$shared/js/utils.js' 
import { rollups } from 'd3'
const d3 = { rollups }

let loading = ref(false);
let hasError = ref(false);
let error = ref(null);
let data = ref(12);

</script>