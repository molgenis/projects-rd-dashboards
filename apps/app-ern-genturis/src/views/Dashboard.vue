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
        <DataValueHighlights
          :values="enrollmentHighlights.values"
          :labels="enrollmentHighlights.labels"
        />
      </div>
      <div id="viz-geo-mercator" class="dashboard-box dashboard-viz" aria-labelledBy="viz-map-title">
        <h2 id="viz-map-title" class="chart-title">Status of data by Healthcare Provider</h2>
        <GeoMercator
          chartId="ern-institutions"
          :chartData="institutionGeoData"
          rowId="code"
          longitude="longitude"
          latitude="latitude"
          :geojson="geojson"
          groupingVariable="hasSubmittedData"
          :groupColorMappings="{'true': '#E9724C', 'false': '#F0F0F0'}"
          :chartWidth="350"
          :chartHeight="250"
          :chartSize="114"
          :mapCenter="{latitude: 6, longitude: 52.5}"
          :legendLabels="['Data Submitted', 'No Data']"
          :legendColors="['#E9724C', '#f0f0f0']"
          />
      </div>
      <div id="viz-pie-chart" class="dashboard-viz" aria-labelledby="sex-at-birth-title">
        <h2 id="sex-at-birth-title" class="chart-title centered">Sex at Birth</h2>
        <PieChart
          chartId="sex-at-birth-chart"
          :chartData="sexAtBirth.data"
          :chartHeight="200"
          :chartWidth="400"
          :chartMargins="5"
        />
      </div>
      <div id="viz-column-chart" class="dashboard-viz">
        <h2 id="age-at-inclusion-title" class="chart-title">Age of Patients at Time of Inclusion</h2>
        <ColumnChart
          chartId="age-at-inclusion-chart"
          :chartData="ageAtInclusion.data"
          xvar="label"
          yvar="value"
          xAxisLabel="Age Groups"
          yAxisLabel="Number of Patients"
          :chartHeight="200"
          :chartWidth="650"
          :chartMargins="{top: 10, right: 0, bottom: 60, left: 60}"
        />
      </div>
      <div id="viz-data-table" class="dashboard-viz">
        <h2 id="patient-enrollment-summary-title" class="chart-title">
          Summary of Patients Enrolled by Thematic Disease Group
        </h2>
        <DataTable
          tableId="disease-group-enrollment-table"
          class="ern-table-dataset"
          :data="diseaseGroupEnrollment.data"
          :columnOrder='["Thematic Disease Groups", "Number of Patients"]'
        />
      </div>
    </div>
  </Page>
  <AppFooter />
</template>

<script>
import {
  Page,
  LoadingScreen,
  MessageBox,
  ColumnChart,
  DataTable,
  DataValueHighlights,
  GeoMercator,
  PieChart
} from 'rd-ui-components'
import AppFooter from '../components/AppFooter.vue'
import geojson from '../assets/world.geo.json'

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
    PieChart,
    AppFooter
  },
  data () {
    return {
      loading: true,
      loadingError: null,
      institutionGeoData: [],
      patientEnrollment: null,
      countryEnrollment: null,
      providersEnrollment: null,
      enrollmentHighlights: {},
      sexAtBirth: {
        title: null,
        data: {}
      },
      ageAtInclusion: {
        title: null,
        data: []
      },
      patientsRegistry: {
        title: null,
        data: []
      },
      geojson: geojson
    }
  },
  methods: {
    async fetchData (url) {
      const response = await fetch(url)
      return response.json()
    },
    asDataObject (data, key, value) {
      const newDataObject = {}
      data.forEach(row => { newDataObject[row[key]] = row[value] })
      return newDataObject
    },
    extractData (data) {
      const datasetName = data[0].title
      return {
        title: datasetName,
        data: data
      }
    },
    renameKey (data, oldKey, newKey) {
      data.forEach(row => delete Object.assign(row, { [newKey]: row[oldKey] })[oldKey])
    },
    subsetData (data, value) {
      return data.filter(row => row.component === value)
    },
    sortData (data, column) {
      return data.sort((current, next) => {
        return current[column] < next[column] ? -1 : 1
      })
    }
  },
  mounted () {
    Promise.all([
      this.fetchData('/api/v2/ernstats_stats'),
      this.fetchData('/api/v2/ernstats_dataproviders')
    ]).then(response => {
      const data = response[0].items
      const mapData = response[1].items
      this.institutionGeoData = mapData.map(row => ({
        ...row, hasSubmittedData: row.hasSubmittedData ? row.hasSubmittedData : 'false'
      }))

      const patientEnrollment = this.subsetData(data, 'table-enrollment-patients')[0]
      const countryEnrollment = this.subsetData(data, 'table-enrollment-country')[0]
      const providersEnrollment = this.subsetData(data, 'table-enrollment-providers')[0]
      const diseaseGroupEnrollmentData = this.subsetData(data, 'table-enrollment-disease-group')
      const sexAtBirthData = this.subsetData(data, 'pie-sex-at-birth')
      const ageAtInclusionData = this.subsetData(data, 'barchart-age')
      
      this.enrollmentHighlights = {
        values: [patientEnrollment.value, countryEnrollment.value, providersEnrollment.value],
        labels: ['Patients', 'Countries', 'Providers']
      }

      this.diseaseGroupEnrollment = this.extractData(diseaseGroupEnrollmentData)
      this.diseaseGroupEnrollment.data = this.sortData(this.diseaseGroupEnrollment.data, 'valueOrder')
      this.renameKey(this.diseaseGroupEnrollment.data, 'label', 'Thematic Disease Groups')
      this.renameKey(this.diseaseGroupEnrollment.data, 'value', 'Number of Patients')

      this.sexAtBirth.title = sexAtBirthData[0].title
      this.sexAtBirth.data = this.asDataObject(sexAtBirthData, 'label', 'value')

      this.ageAtInclusion = this.extractData(ageAtInclusionData)
      this.ageAtInclusion.data = this.sortData(this.ageAtInclusion.data, 'valueOrder')
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
  font-size: 10pt;
}

.dashboard-container {
  display: grid;
  box-sizing: border-box;
  padding: 0.8em;
  gap: 1em;
  margin: 0 auto;
  grid-template-columns: 0.8fr 1.2fr;
  grid-template-areas:
    "highlights highlights"
    "map table"
    "pieChart columnChart";
    // "map pieChart"
    // "map columnChart"
    // "table table";
    
  @media screen and (min-width: 1524px) {
    max-width: 60vw;
  }
  
  .dashboard-viz {
    background-color: $gray-000;
    box-sizing: content-box;
    padding: 0.7em 1em;
    border-radius: 6px;
    box-shadow: $box-shadow;
    
    h2 {
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
  }
  
  #viz-pie-chart {
    grid-area: pieChart;
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
          }
        }
      }
    }
  }
}

// .chart-title {
//   font-size: 14pt;
//   font-weight: bold;
//   line-height: 1.4;
//   letter-spacing: 0.03em;
//   color: $gray-900;
//   margin: 12px 0;
  
//   &.centered {
//     text-align: center;
//   }
// }

// .ern-table-summary {
//   table {
//     caption {
//       box-sizing: border-box;
//       padding: 6px 12px;
//       color: #355cb8;
//       background-color: hsl(222, 55%, 94%);
//       font-size: 11pt;
//       border-radius: 2px;
//       margin: 0;
//     }
//     tbody {
//       background-color: #f6f6f6;
//     }
//   }
// }

// .ern-table-dataset {
//   table {
//     tbody {
//       tr:last-child {
//         td {
//           border-top: 1px solid #252525;
//           font-weight: bold;
//         }
//       }
//     }
//   }
// }

// #ern-dashboard {
//   background-color: #f6f6f6;
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   grid-template-areas:
//     "highlights highlights"
//     "map piechart"
//     "map barchart"
//     "table table";

//   $gap: 1.6em;
//   column-gap: $gap;
//   row-gap: $gap;
  
//   @media screen and (max-width: 824px) {
//     grid-template-columns: 1fr;
//     grid-template-areas:
//       "highlights"
//       "map"
//       "piechart"
//       "barchart"
//       "table";
//   }
// }

// #ern-data-highlights {
//   grid-area: highlights;
// }

// #viz-map {
//   grid-area: map;
// }

// #viz-pie-chart {
//   grid-area: piechart;
// }

// #viz-age-bar-chart {
//   grid-area: barchart;
// }

// #viz-table-disease-enrollment {
//   grid-area: table;
// }

// #disease-group-enrollment-table {
//   thead {
//     tr {
//       th[data-column-index="1"] {
//         text-align: right;
//       }
//     }
//   }
// }
</style>
