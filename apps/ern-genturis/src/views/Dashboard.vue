<template>
  <Page id="page-dashboard">
    <LoadingScreen v-if="loading"/>    
    <div class="page-section padding-h-2" v-else-if="!loading && loadingError">
      <MessageBox type="error">
        <p>Unable to retrieve data {{ loadingError }}</p>
      </MessageBox>
    </div>
    <div class="dashboard-container" v-else>
      <div id="viz-data-highlights" aria-labelledby="highlights-title" class="dashboard-box width-full" >
        <DataValueHighlights :data="enrollmentHighlights" />
      </div>
      <div id="viz-geo-mercator" class="dashboard-box dashboard-viz" aria-labelledBy="viz-map-title">
        <h2 id="viz-map-title" class="chart-title">Status of data by healthcare provider</h2>
        <GeoMercator
          chartId="ern-institutions"
          :chartData="institutionGeoData"
          rowId="code"
          longitude="longitude"
          latitude="latitude"
          :geojson="geojson"
          groupingVariable="hasSubmittedData"
          :groupColorMappings="{
            'Data Submitted': '#E9724C',
            'No Data': '#F0F0F0'
          }"
          :chartHeight="mapHeight"
          :chartSize="114"
          :mapCenter="{latitude: 0, longitude: 51}"
          :pointRadius="4"
          :legendData="{'Data Submitted': '#E9724C', 'No Data': '#f0f0f0'}"
          :tooltipTemplate="(row) => {
            return `
              <p class='title'>${row.projectName}</p>
              <p class='location'>${row.city}, ${row.country}</p>
            `}"
          :zoomLimits="[0.3, 10]"
          :enableLegendClicks="true"
          />
      </div>
      <div id="viz-pie-chart" class="dashboard-viz" aria-labelledby="sex-at-birth-title">
        <!-- <h2 id="sex-at-birth-title" class="chart-title centered">Sex at birth</h2> -->
        <PieChart2
          chartId="sex-at-birth-chart"
          title="Sex at birth"
          :chartData="sexAtBirth"
          :chartScale="0.9"
          :asDonutChart="true"
          :enableLegendHovering="true"
          :chartHeight="180"
          :chartMargins="20"
          legendPosition="bottom"
        />
      </div>
      <div id="viz-column-chart" class="dashboard-viz">
        <h2 id="age-at-inclusion-title" class="chart-title">Age at last follow-up</h2>
        <ColumnChart
          chartId="age-at-inclusion-chart"
          :chartData="ageAtInclusion"
          xvar="label"
          yvar="value"
          :yMax="500"
          :yTickValues="[0, 100, 200, 300, 400, 500]"
          xAxisLabel="Age Groups"
          yAxisLabel="Number of Patients"
          :chartHeight="190"
          :chartWidth="650"
          :chartMargins="{top: 10, right: 0, bottom: 60, left: 60}"
          :columnPaddingInner="0.1"
        />
      </div>
      <div id="viz-data-table" class="dashboard-viz">
        <h2 id="patient-enrollment-summary-title" class="chart-title">
          Summary of patients enrolled by thematic disease group
        </h2>
        <DataTable
          tableId="disease-group-enrollment-table"
          class="ern-table-dataset"
          :data="diseaseGroupEnrollment"
          :columnOrder='["Thematic Disease Group", "Number of Patients"]'
        />
      </div>
    </div>
  </Page>
</template>

<script>
import { fetchData, sortData, subsetData, renameKey, asDataObject } from '$shared/js/utils.js'
import {
  Page,
  LoadingScreen,
  MessageBox,
  ColumnChart,
  DataTable,
  DataValueHighlights,
  GeoMercator,
  PieChart2,
} from 'rd-components'

import geojson from '$shared/data/world.geo.json'

export default {
  name: 'page-dashboard',
  components: {
    Page,
    LoadingScreen,
    MessageBox,
    ColumnChart,
    DataTable,
    DataValueHighlights,
    GeoMercator, 
    PieChart2,
  },
  data () {
    return {
      loading: true,
      loadingError: null,
      institutionGeoData: [],
      enrollmentHighlights: {},
      diseaseGroupEnrollment: [],
      totalPatients: null,
      sexAtBirth: [],
      ageAtInclusion: [],
      geojson: geojson,
      mapHeight: 215,
    }
  },
  mounted () {
    Promise.all([
      fetchData('/api/v2/ernstats_stats'),
      fetchData('/api/v2/ernstats_dataproviders')
    ]).then(response => {
      const data = response[0].items
      const mapData = response[1].items

      this.institutionGeoData = mapData.map(row => ({
        ...row, hasSubmittedData: row.hasSubmittedData ? 'Data Submitted' : 'No Data'
      }))

      this.totalPatients = subsetData(data,'id', 'data-highlight-0')[0]['value']
      const dataHighlights = subsetData(data, 'component', 'data-highlights')
      dataHighlights.forEach(row => this.enrollmentHighlights[row.title] = row.value)
      
      const sexAtBirthData = subsetData(data, 'component', 'pie-sex-at-birth')
      this.sexAtBirth = asDataObject(sexAtBirthData, 'label', 'value')
      
      const ageAtInclusionData = subsetData(data, 'component', 'barchart-age')
      this.ageAtInclusion = sortData(ageAtInclusionData, 'valueOrder')

      const diseaseGroupEnrollmentData = data.filter(row => {
        return (row.component == 'table-enrollment-disease-group' && (row.label != 'Undeterminded' && row.value != 0))
      })
      this.diseaseGroupEnrollment = sortData(diseaseGroupEnrollmentData, 'valueOrder')
      renameKey(this.diseaseGroupEnrollment, 'label', 'Thematic Disease Group')
      renameKey(this.diseaseGroupEnrollment, 'value', 'Number of Patients')
      
      const groups = this.diseaseGroupEnrollment.map(row => row['Thematic Disease Group'])
      if (groups.includes('Undetermined')) {
        this.mapHeight = 300
      }

    }).then(() => {
      this.loading = false
    }).catch(error => {
      this.loading = false
      this.loadingError = error
    })
  }
}
</script>

<style lang="scss">
#page-dashboard {
  background-color: $gray-050;
}

.dashboard-container {
  font-size: 10pt;
  display: grid;
  box-sizing: border-box;
  padding: 1em;
  gap: 1em;
  margin: 0 auto;
  grid-template-columns: 1fr;
  grid-template-areas: 
    "highlights"
    "map"
    "table"
    "pieChart"
    "columnChart";
    
  @media screen and (min-width: 962px) {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "highlights highlights"
      "map map"
      "table table"
      "pieChart columnChart";
  }
    
  @media screen and (min-width: 1182px) {
    grid-template-columns: 0.8fr 1.2fr;
    grid-template-areas:
      "highlights highlights"
      "map table"
      "pieChart columnChart";
  }
    
  @media screen and (min-width: 1524px) {
    max-width: 60vw;
  }
  
  .dashboard-viz {
    background-color: $gray-000;
    box-sizing: content-box;
    padding: 0.7em 1em;
    border-radius: 6px;
    box-shadow: $box-shadow;
    
    h2, .chart-context h3.chart-title {
      font-size: 12pt;
      margin-bottom: 9px;
      text-align: center;
    }
  }
  
  #viz-data-highlights {
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
  
  #viz-geo-mercator {
    grid-area: map;
    
    .chart-container {
      .d3-viz-legend {
        .legend {
          .legend-item:first-child {
            margin-bottom: 6px;
          }
        }
      }
    }
  }
  
  #viz-pie-chart {
    grid-area: pieChart;
    .chart {
      .chart-area {
        .pie-labels {
          .pie-label-text {
            .data-label, .data-value {
              font-size: 9pt;
            }
          }
        }
      }
    }
  }
  
  #viz-column-chart {
    grid-area: columnChart;
  }
  
  #viz-data-table {
    grid-area: table;
    
    table {
      thead {
        tr {
          th {
            font-size: 9pt,
          }
        }
      }
      tbody {
        tr {
          td {
            font-size: 11pt;
            
            &[data-value="Undetermined"],
            &[data-value="Undetermined"] + td {
              background-color: $gray-000;
              span {
                color: $gray-400;
              }
            }
          }
        }
      }
    }
  }
}

#viz-geo-mercator {
  .d3-viz-legend {
    padding: 6px 8px;
  }
}

#ern-institutions-tooltip {
  font-family: $font-family;
}
</style>
