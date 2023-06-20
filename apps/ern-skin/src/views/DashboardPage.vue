<template>
  <Page id="page-dashboard">
    <LoadingScreen v-if="loading" />
    <div class="dashboard-container" v-else>
      <div id="viz-highlights">
        <DataValueHighlights :data="highlightsData" />
      </div>
      <div id="viz-map" class="dashboard-box dashboard-viz">
        <GeoMercator
          chartId="expert-centers-map"
          title="Status of data by healthcare provider"
          :geojson="geojson"
          :chartData="expertCenters"
          :chartHeight="600"
          rowId="code"
          latitude="latitude"
          longitude="longitude"
          groupingVariable="hasSubmittedData"
          :mapCenter="{
            latitude: 3,
            longitude: 51
          }"
          :pointRadius="6"
          :groupColorMappings="{
            'Not Submitted': '#F1FAEE',
            Submitted: '#FFA69E'
          }"
          :legendData="{
            'Not Submitted': '#F1FAEE',
            'Submitted': '#FFA69E'
          }"
          :mapColors="{
            land: '#709190',
            border: '#061428',
            water: '#061428'
          }"
          :tooltipTemplate="
            row => {
              return `
            <p class='title'>
              ${row.projectName}
            </p>
            <p class='center-info'>
              ${row.alternativeIdentifier}
            </p>
            <p class='center-location'>
              <span class='location-city'>${row.city}</span>
              <span class='location-country'>${row.country}</span>
            </p>
            `;
            }
          "
          :zoomLimits="[0.3, 10]"
          :enableLegendClicks="true"
        />
      </div>
      <div id="viz-enrolment" class="dashboard-box dashboard-viz">
        <DataTable
          tableId="enrolmentByGroup"
          caption=" Summary of patients enrolled by thematic disease group"
          :data="enrolmentByGroup"
          :columnOrder="['thematic disease group', 'patients']"
        />
      </div>
      <div id="viz-age" class="dashboard-box dashboard-viz">
        <ColumnChart
          chartId="ageByGroup"
          title="Number of patients by age category"
          xvar="category"
          yvar="value"
          xAxisLineBreaker=";"
          :yMax="ageMaxY"
          :yTickValues="ageTicks"
          :chartData="ageByGroup"
          :chartHeight="225"
          :chartMargins="{ top: 20, right: 0, bottom: 40, left: 40 }"
          :columnPaddingInner="0.1"
          :columnPaddingOuter="0.1"
        />
      </div>
      <div id="viz-pie" class="dashboard-box dashboard-viz">
        <PieChart
          chartId="sexAtGroup"
          :chartData="sexByGroup"
          title="Sex at birth"
          :chartHeight="150"
          :chartMargins="5"
        />
      </div>
    </div>
  </Page>
</template>

<script>
import {
  Page,
  LoadingScreen,
  GeoMercator,
  ColumnChart,
  DataTable,
  PieChart,
  DataValueHighlights
} from "rd-components";

import {
  fetchData,
  asDataObject,
  renameKey,
  sortData
} from "$shared/js/utils.js";

import HeaderImage from "@/assets/app-header-background.png";
import geojson from "$shared/data/world.geo.json";

const range = (start, stop, step) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

export default {
  components: {
    Page,
    LoadingScreen,
    GeoMercator,
    ColumnChart,
    DataTable,
    PieChart,
    DataValueHighlights
  },
  data() {
    return {
      headerImage: HeaderImage,
      loading: true,
      loadingError: null,
      highlightsData: [],
      expertCenters: [],
      ageByGroup: [],
      enrolmentByGroup: [],
      sexByGroup: [],
      geojson: geojson
    };
  },
  mounted() {
    Promise.all([
      fetchData("/api/v2/stats_dataproviders"),
      fetchData("/api/v2/stats_stats")
    ])
      .then(response => {
        const expertCenters = response[0].items;
        this.expertCenters = expertCenters.map(row => {
          return {...row, 'hasSubmittedData': row.hasSubmittedData ? "Submitted" : "Not Submitted"}
        });

        const data = response[1].items;

        const highlights = data.filter(
          row => row.component.name == "highlights"
        );
        this.highlightsData = asDataObject(highlights, "label", "value");

        const ageData = data
          .filter(row => row.component.name == "age")
          .map(row => {
            return {...row, category: `${row.label};${row.description}`}
          });

        this.ageByGroup = ageData;

        const values = this.ageByGroup.map(row => row.value);
        const ymax = Math.round(Math.max(...values) / 10) * 10;
        this.ageMaxY = ymax;
        this.ageTicks = range(0, ymax, 2);

        const enrolmentData = data.filter(
          row => row.component.name == "enrolment"
        );
        this.enrolmentByGroup = sortData(enrolmentData, "valueOrder");
        renameKey(this.enrolmentByGroup, "label", "thematic disease group");
        renameKey(this.enrolmentByGroup, "value", "patients");

        const sex = data.filter(row => row.component.name == "sex");
        this.sexByGroup = asDataObject(sex, "label", "value");
      })
      .then(() => {
        this.loading = false;
      })
      .catch(error => {
        this.loading = false;
        this.loadingError = error;
      });
  }
};
</script>

<style lang="scss">
#page-dashboard {
  background-color: $gray-050;
}

.dashboard-container {
  font-size: 10pt;
  box-sizing: border-box;
  padding: 1em 4em;
  gap: 2em;
  display: grid;
  margin: 0 auto;
  grid-template-columns: 1fr;
  grid-template-areas:
    "highlights"
    "map"
    "table"
    "pieChart"
    "columnChart";

  .dashboard-box {
    background-color: $gray-000;
    box-sizing: content-box;
    padding: 1em;
    border-radius: 6px;
    box-shadow: $box-shadow;
  }

  @media screen and (min-width: 1182px) {
    grid-template-columns: 0.6fr 0.4fr;
    grid-template-areas:
      "highlights highlights"
      "map table"
      "columnChart pieChart";
  }

  @media screen and (min-width: 1524px) {
    max-width: 85vw;
  }

  #viz-highlights {
    grid-area: highlights;
    .data-highlights {
      .data-highlight {
        padding: 0.8em 1em;
        .data-label {
          margin-bottom: 2px;
          font-size: 9pt;
        }
        .data-value::after {
          font-size: 21pt;
        }
      }
    }
  }

  #viz-map {
    grid-area: map;
    padding: 6px;
  }

  #viz-pie {
    grid-area: pieChart;
    .chart {
      .chart-area {
        .pie-labels {
          .pie-label-text {
            .data-label,
            .data-value {
              font-size: 9pt;
            }
          }
        }
      }
    }
  }

  #viz-table {
    grid-area: table;
  }

  #viz-column {
    grid-area: columnChart;
  }
}

.d3-viz {
  &.d3-table caption,
  .chart-title {
    font-size: 13pt;
    font-weight: bold;
    line-height: 1.4;
    padding: 8px 0;
  }

  &.d3-geo-mercator .chart-context {
    margin-bottom: 0;
  }
}

#ageByGroup {
  .chart-area {
    .chart-axes {
      .tick {
        text {
          font-size: 10pt;
        }
      } 
    }
  }
}

#viz-enrolment {
  thead {
    tr {
      th {
        color: $gray-800;
        font-weight: normal;
        font-size: 10pt;
      }
    }
  }
  tbody {
    tr {
      td {
        font-size: 10pt;
      }
    }
  }
}

#expert-centers-map-tooltip {
  font-family: $font-family;
  p {
    font-size: 11pt;
    line-height: 1.4;
  }

  .title {
    font-size: 11pt;
    a {
      color: $gray-800;
    }
  }
}
</style>
