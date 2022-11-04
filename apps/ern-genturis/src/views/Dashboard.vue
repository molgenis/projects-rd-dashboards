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
        <h2 id="viz-map-title" class="chart-title">Status of data by healthcare provider</h2>
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
          :chartHeight="210"
          :chartSize="114"
          :mapCenter="{latitude: 0, longitude: 51}"
          :legendLabels="['Data Submitted', 'No Data']"
          :legendColors="['#E9724C', '#f0f0f0']"
          :tooltipTemplate="(row) => {
            return `
              <p class='title'>${row.projectName}</p>
              <p class='location'>${row.city}, ${row.country}</p>
            `
          }"
          />
      </div>
      <div id="viz-pie-chart" class="dashboard-viz" aria-labelledby="sex-at-birth-title">
        <h2 id="sex-at-birth-title" class="chart-title centered">Sex at birth</h2>
        <PieChart
          chartId="sex-at-birth-chart"
          :chartData="sexAtBirth"
          :chartHeight="190"
          :chartWidth="400"
          :chartMargins="5"
        />
      </div>
      <div id="viz-column-chart" class="dashboard-viz">
        <h2 id="age-at-inclusion-title" class="chart-title">Age of patients at time of inclusion</h2>
        <ColumnChart
          chartId="age-at-inclusion-chart"
          :chartData="ageAtInclusion"
          xvar="label"
          yvar="value"
          :yMax="50"
          :yTickValues="[0, 10, 20, 30, 40, 50]"
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
          Summary of patients enrolled by thematic disease group (n={{ diseaseGroupEnrollmentTotal }})
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
} from 'rd-components'
import AppFooter from '@/components/AppFooter.vue'
import geojson from '@/assets/world.geo.json'

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
      enrollmentHighlights: {},
      diseaseGroupEnrollment: [],
      diseaseGroupEnrollmentTotal: null,
      sexAtBirth: [],
      ageAtInclusion: [],
      patientsRegistry: [],
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
    renameKey (data, oldKey, newKey) {
      data.forEach(row => delete Object.assign(row, { [newKey]: row[oldKey] })[oldKey])
    },
    subsetData (data, column, value) {
      return data.filter(row => row[column] === value)
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

      const patientEnrollment = this.subsetData(data, 'component', 'table-enrollment-patients')[0]
      const countryEnrollment = this.subsetData(data, 'component', 'table-enrollment-country')[0]
      const providersEnrollment = this.subsetData(data, 'component', 'table-enrollment-providers')[0]
      const diseaseGroupEnrollmentData = this.subsetData(data, 'component', 'table-enrollment-disease-group')
      const sexAtBirthData = this.subsetData(data, 'component', 'pie-sex-at-birth')
      const ageAtInclusionData = this.subsetData(data, 'component', 'barchart-age')
      
      this.enrollmentHighlights = {
        values: [patientEnrollment.value, countryEnrollment.value, providersEnrollment.value],
        labels: ['Patients', 'Countries', 'Providers']
      }

      this.diseaseGroupEnrollmentTotal = this.subsetData(data, 'component', 'table-enrollment-disease-group-total')[0].value
      this.diseaseGroupEnrollment = this.sortData(diseaseGroupEnrollmentData, 'valueOrder')
      this.renameKey(this.diseaseGroupEnrollment, 'label', 'Thematic Disease Group')
      this.renameKey(this.diseaseGroupEnrollment, 'value', 'Number of Patients')

      this.sexAtBirth = this.asDataObject(sexAtBirthData, 'label', 'value')
      this.ageAtInclusion = this.sortData(ageAtInclusionData, 'valueOrder')

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

#viz-geo-mercator {
  .d3-viz-legend {
    padding: 6px 8px;
  }
}

#ern-institutions-tooltip {
  font-family: $font-family;
}

</style>
