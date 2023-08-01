<template>
  <Page class="page-dashboard">
    <PageHeader
      class="ern-header"
      title="ERN CRANIO"
      subtitle="Dashboard"
      height="medium"
    />
    <PageSection
      id="section-intro-title"
      aria-labelledby="section-intro-title"
      :verticalPadding="2"
      v-if="error"
    >
      <MessageBox type="error">
        <p>Unable to retrieve data: {{ error }}</p>
      </MessageBox>
    </PageSection>
    <div class="dashboard" v-else>
      <div class="dashboard-box viz-table">
        <div class="dashboard-viz">
          <DataTable
            tableId="workstreamSummary"
            caption="Percentage of patients by workstream"
            :data="workstreamSummary"
            :columnOrder="['workstream', 'percent']"
          />
        </div>
      </div>
      <div class="dashboard-box viz-pie-chart">
        <div class="dashboard-viz">
          <PieChart
            chartId="sexAtBirth"
            :chartData="sexAtBirth"
            :chartHeight="225"
            title="Sex at birth"
          />
        </div>
      </div>
      <div class="dashboard-box viz-map">
        <div class="dashboard-viz">
          <GeoMercator
            chartId="dataProvidersMap"
            title="Data Providers"
            :geojson="geojson"
            :chartData="providers"
            rowId="code"
            latitude="latitude"
            longitude="longitude"
            groupingVariable="hasSubmittedData"
            :groupColorMappings="{
              'Data Submitted': '#f1681d',
              'No Data': '#f0f0f0'
            }"
            :tooltipTemplate="
              row => {
                return `
                <p class='title'>${row.projectName}</p>
                <p class='location'>${row.city}, ${row.country}</p>
              `;
              }
            "
            :enableLegendClicks="true"
            :legendData="{
              'Data Submitted': '#f1681d',
              'No Data': '#f0f0f0'
            }"
            :pointRadius="7"
            :mapColors="{
              water: '#43abcc',
              land: '#93dbab',
              border: '#1f171a'
            }"
            :mapCenter="{ latitude: 13, longitude: 50 }"
            :zoomLimits="[0.3, 10]"
          />
        </div>
      </div>
    </div>
  </Page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  Page,
  PageHeader,
  PageSection,
  MessageBox,
  GeoMercator,
  DataTable,
  PieChart
} from "rd-components";
import {
  fetchData,
  subsetData,
  renameKey,
  asDataObject
} from "$shared/js/utils.js";
import geojson from "$shared/data/world.geo.json";

let loading = ref(true);
let error = ref(false);
let providers = ref([]);
let workstreamSummary = ref([]);
let sexAtBirth = ref([]);

function getDashboardData() {
  loading.value = true;
  Promise.all([
    fetchData("/api/v2/ernstats_dataproviders"),
    fetchData("/api/v2/ernstats_stats")
  ])
    .then(response => {
      const organisations = response[0].items;
      providers.value = organisations.map(row => {
        return {
          ...row,
          hasSubmittedData: row.hasSubmittedData ? "Data Submitted" : "No Data"
        };
      });

      const stats = response[1].items;

      const workstream = subsetData(
        stats,
        "component",
        "patients-by-workstream"
      ).map(row => {
        return { ...row, value: `${Math.round(parseFloat(row.value) * 100)}%` };
      });

      renameKey(workstream, "label", "workstream");
      renameKey(workstream, "value", "percent");
      workstreamSummary.value = workstream;

      const patientsSex = subsetData(
        stats,
        "component",
        "patients-sex-at-birth"
      );
      sexAtBirth.value = asDataObject(patientsSex, "label", "value");
    })
    .then(() => {
      loading.value = false;
    })
    .catch(response => {
      const err = JSON.parse(response.message);
      error.value = `${err.message} (${err.status})`;
    });
}

onMounted(() => getDashboardData());
</script>
