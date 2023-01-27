<template>
  <Page id="cosas-dashboard">
    <PageHeader
      class="cosas-page-header"
      title="COSAS"
      subtitle="COSAS Dashboard"
      :imageSrc="pageHeaderImage"
      height="medium"
      titlePositionX="center"
      titlePositionY="center"
    />
    <MessageBox type="error" v-if="requestHasFailed">
      <p>Error! Unable to retrieve data. Please sign in or try again later.</p>
    </MessageBox>
    <MessageBox type="default" v-else-if="!requestHasFailed && loading">
      <p>Retrieving data....</p>
    </MessageBox>
    <template v-else>
      <PageSection id="cosas-dashboard-highlights" aria-labelledby="cosas-dashboard-highlights-title">
        <h2 class="visually-hidden" id="cosas-dashboard-highlights-title">
          Cosas to date
        </h2>
        <DataHighlights
          title="summary of the database based on the most recent import"
          :values="mostRecentImport.values"
          :labels="mostRecentImport.labels"
        />
        <p class="viz-note">
          <span v-if="mostRecentImport.date">
            Data was last updated on {{ mostRecentImport.date }}
          </span>
          <span v-else class="text-error">Error: unable to retrieve latest metadata.</span>
        </p>
      </PageSection>
      <PageSection
        id="cosas-dashboard-summary"
        aria-labelledby="cosas-dashboard-sumary-title"
      >
        <p>Data is imported into COSAS at regular intervals. The following table displays the change in values over the last 30 days. For more information, see the <a href="/menu/plugins/dataexplorer?entity=cosasreports_imports&hideselect=true">Daily Import</a> table to view the raw data.</p>
        <DataTable
          tableId="daily-import-summary"
          :data="dailyImportSummary"
          caption="Growth of the COSAS database over the last 30 days"
          :columnOrder="['category','starting.value','final.value', 'difference']"
        />
      </PageSection>
      <PageSection
        id="cosas-dashboard-coverage-report" 
        aria-labelledby="cosas-dashboard-coverage-report-title"
      >
        <h2 id="cosas-dashboard-coverage-report-title">COSAS Coverage Report</h2>
        <p>How much of the COSAS database is used? COSAS has 6 primary tables, 7 secondary tables, and 24 reference tables. To understand how much data is in COSAS, the following tables provide a summary of the primary tables. This includes the columns that are used and how much data is stored in those columns.</p>
        <p>The data used in the following tables was updated on {{ dateAttributeSummaryDataUpdated }}. If you would like to view the raw data, please follow the link to the <a href="/menu/plugins/dataexplorer?entity=cosasreports_attributesummary&hideselect=true">COSAS Attribute Summary Table</a>.</p>
        <DataTable
          tableId="subject-attributes"
          caption="Summary of subject table attributes"
          :data="attributeSummaryData.subjects"
          :columnOrder="attributeSummaryColumnOrder"
        />
        <DataTable
          tableId="clinical-attributes"
          caption="Summary of clinical table attributes"
          :data="attributeSummaryData.clinical"
          :columnOrder="attributeSummaryColumnOrder"
        />
        <DataTable
          tableId="samples-attributes"
          caption="Summary of sample table attributes"
          :data="attributeSummaryData.samples"
          :columnOrder="attributeSummaryColumnOrder"
        />
        <DataTable
          tableId="sampleprep-attributes"
          caption="Summary of sample preparation table attributes"
          :data="attributeSummaryData.samplePreparation"
          :columnOrder="attributeSummaryColumnOrder"
        />
        <DataTable
          tableId="sequencing-attributes"
          caption="Summary of sequencing table attributes"
          :data="attributeSummaryData.sequencing"
          :columnOrder="attributeSummaryColumnOrder"
        />
      </PageSection>
    </template>
  </Page>
  <AppFooter />  
</template>

<script>
import { Page, PageHeader, PageSection, MessageBox, VizDataHighlights, VizDataTable } from 'rd-components'
import AppFooter from '@/components/AppFooter.vue'
import pageHeaderImage from '@/assets/cosas-page-header.jpg'
import { fetchData, minDate, maxDate, stringAsNumber } from '$shared/js/utils.js'


export default {
  components: {
    Page,
    PageHeader,
    PageSection,
    MessageBox,
    AppFooter,
    DataHighlights: VizDataHighlights,
    DataTable: VizDataTable,
  },
  data () {
    return {
      pageHeaderImage: pageHeaderImage,
      loading: true,
      requestHasFailed: false,
      mostRecentImport: {
        values: [],
        labels: ['subjects', 'samples', 'sequencing']
      },
      attributeSummaryData: {},
      dateAttributeSummaryDataUpdated: null,
      attributeSummaryColumnOrder: [
        'column',
        'expected',
        'actual',
        'difference',
        'complete',
        'key.type'
      ]
    }
  },
  methods: {
    transformImportData (data) {
      const dateRange = {
        min: minDate(data.items, 'date').toISOString().split('T')[0],
        max: maxDate(data.items, 'date').toISOString().split('T')[0]
      }
      const dataFiltered = {
        min: data.items.filter(row => row.date === dateRange.min),
        max: data.items.filter(row => row.date === dateRange.max)
      }
      
      const columns = ['subjects', 'samples', 'sequencing']
      const result = columns.map(column => {
        const row = {
          category: column,
          'starting.value': stringAsNumber(dataFiltered.min[0][column]),
          'final.value': stringAsNumber(dataFiltered.max[0][column])
        }
        row.difference = row['final.value'] - row['starting.value']
        return row
      })
      return result
    },
    transformAttributeSummaryData (data) {
      this.dateAttributeSummaryDataUpdated = data.items[0].dateLastUpdated
      data.items.forEach(row => {
        if (!this.attributeSummaryData[row.databaseTable]) {
          this.attributeSummaryData[row.databaseTable] = []
        }
        this.attributeSummaryData[row.databaseTable].push({
          column: row.displayName,
          actual: row.countOfValues,
          expected: row.totalValues,
          difference: row.differenceInValues,
          complete: `${row.percentComplete * 100}%`,
          'key.type': row.databaseKey !== undefined ? row.databaseKey.value : ''
        })
      })
      
      Object.keys(this.attributeSummaryData).forEach(key => {
        this.attributeSummaryData[key].sort((a, b) => {
          return a.column.toLowerCase() > b.column.toLowerCase() ? 1 : -1
        })
      })
    }
  },
  mounted () {
    Promise.all([
      fetchData('/api/v2/cosasreports_imports?sort=date:desc&num=30&q=hasCompleted==true'),
      fetchData('/api/v2/cosasreports_attributesummary?')
    ]).then((result) => {
      const dailyImportReports = result[0]
      const attributeSummaryData = result[1]
      
      const latestImport = dailyImportReports.items[0]
      this.mostRecentImport = [
        latestImport.subjects.toLocaleString('en'),
        latestImport.samples.toLocaleString('en'),
        latestImport.sequencing.toLocaleString('en')
      ]
      
      const reportData = this.transformImportData(dailyImportReports)
      this.dailyImportSummary = reportData
      
      this.transformAttributeSummaryData(attributeSummaryData)
    }).then(() => {
      this.loading = false
    }).catch(error => {
      this.requestHasFailed = true
      this.error = error
    })
  }
}
</script>