<template>
  <LoadingScreen v-if="loading"/>
  <Page v-else>
    <PageHeader
      title="My Cool Database"
      subtitle="Database for the storage of cool data"
      height="medium"
      :imageSrc="headerImage"
      :verticalPadding="2"
      titlePositionX="center"
      titlePositionY="center"
    />
    <PageSection width="medium">
      <h2>Welcome!</h2>
      <p>This is <strong>my cool database</strong>. Everything on this page shows off many of the components in the RD Databases and many of the cool features.</p>
    </PageSection>
    <PageSection id="linksection" width="full" :horizontalPadding="0" :verticalPadding="0">
      <LinkCard :imageSrc="headerImage" height="small">
        <a href="#">Documents</a>
      </LinkCard>
      <LinkCard height="small">
        <a href="#">Dashboard</a>
      </LinkCard>
      <LinkCard :imageSrc="headerImage" height="small">
        <a href="#">Help</a>
      </LinkCard>
    </PageSection>
    <PageSection>
      <h2>What's included?</h2>
      <p>Well, there are many layout components and visualization components.</p>
      <UnorderedList listType="circle">
        <li>Page layouts: container, sections, footer, headers, etc.</li>
        <li>Loading screen component</li>
        <li>D3 Visualisations</li>
        <li>This list is a component!</li>
      </UnorderedList>
    </PageSection>
    <PageSection id="datahighlights" width="full" :horizontalPadding="1">
      <VizDataHighlights
        title="Recruitment to date"
        :values = "[12, 56, 2322]"
        :labels = "['Countries Active', 'Sites Active', 'Total Recruited']"
      />
    </PageSection>
    <PageSection id="viz-section" :verticalPadding="2">
      <h2>Interactive D3 Charts Example</h2>
      <Accordion id="exampleText" title="Recruitment Overview">
        <p>Recuitment began in August 2022. Three centers are actively recruiting while the others are expected to start recruiting in late 2022. The first few months of recruitment were exceptional for all centers. The table below shows the total recruitment to date by center. Click a row to view recruitment numbers by research group.</p>
      </Accordion>
      <div class="flex">  
        <DataTable
          tableId="recruiment"
          :data="siteSummary"
          :columnOrder="['name','total']"
          caption="Total Recruitment by Centre"
          @row-selection="rowSelection"
        />
        <ColumnChart
          chartId="centerRecruitment"
          title="Center-level Recruitment by Group"
          :chartData="selectedCenter"
          xvar="group"
          yvar="total"
          :yMax="300"
          :yTickValues="[0, 50, 100,150, 200, 250, 300]"
          :chartWidth="575"
          :chartHeight="350"
          :columnPaddingInner="0.5"
          :columnPaddingOuter="0.5"
          :xAxisLabel="`${selectedCenter[0].name} by Group`"
          yAxisLabel="Total Subjects Recruited"
        />
      </div>
      <PieChart
        chartId="recruitmentBreakdown"
        :chartData="{'Group A': 0.5, 'Group B': 0.2, 'Group C': 0.3}"
      />
      <div>
        <p>Where are the centers? The previous table and chart give us an understanding of recruitment, but where are the centers located? In the following map you can explore where the sites are located and see which sites are atively recruiting.</p>
      </div>
      <GeoMercator
        chartId="recruitmentMap"
        :chartData="siteSummary"
        :geojson="geojson"
        rowId="name"
        longitude="lng"
        latitude="lat"
        groupingVariable="status"
        :legendLabels="['Active', 'Inactive']"
        :legendColors="['limegreen', 'pink']"
        :groupColorMappings="{'active': 'limegreen', 'inactive': 'pink'}"
        :chartWidth="700"
        :chartHeight="350"
        :tooltipTemplate='(row) => {
          return `
          <h3>${row.name}<span class="bubble bubble-${row.status}">${row.status}</span></h3> 
          <p><strong>Participants Recruited (YTD):</strong> ${row.total}</p>
          <p><small>${row.lng}, ${row.lat}</small></p>
        `}'
      />
    </PageSection>
    <PageSection>
      <h2>Status Messages</h2>
      <MessageBox type="warning">
        <p>Results also include partial matches. Adjusted filters to remove these records.</p>
      </MessageBox>
      <MessageBox type="error">
        <p>Unable to retrieve data. Please <a href="#">Sign in</a> to view results.</p>
      </MessageBox>
      <MessageBox type="success">
        <p>Found <strong>6</strong> records.</p>
      </MessageBox>
      <MessageBox>
        <p>Data current as of 28 October 2022.</p>
      </MessageBox>
    </PageSection>
    <PageSection>
      <h2>Forms</h2>
      <PageForm title="Search for Records" description="Find records based on x, y, and z.">
        <PageFormSection>
          <InputSearch
            id="search-test"
            label="Search for X"
            description="enter x,y, or z"
          />
        </PageFormSection>
        <PageFormSection>
          <InputSearch
            id="search-test-2"
            label="Search for Y"
            description="enter x,y, or z"
          />
        </PageFormSection>
      </PageForm>
    </PageSection>
    <PageFooter>
      <PageFooterMeta>
        <UnorderedList listLayout="horizontal" listType="circle">
          <li>Privacy Policy</li>
          <li>Disclaimer</li>
          <li>Statement</li>
        </UnorderedList>
      </PageFooterMeta>
    </PageFooter>
  </Page>
</template>

<script>
import Page from './components/Page.vue'
import PageHeader from './components/PageHeader.vue'
import PageSection from './components/PageSection.vue'
import PageFooter from './components/PageFooter.vue'
import PageFooterMeta from './components/PageFooterMeta.vue'
import PageForm from './components/PageForm.vue'
import PageFormSection from './components/PageFormSection.vue'
import UnorderedList from './components/UnorderedList.vue'
import LoadingScreen from './components/LoadingScreen.vue'
import LinkCard from './components/LinkCard.vue'
import Accordion from './components/Accordion.vue'
import MessageBox from './components/MessageBox.vue'
import InputSearch from './components/InputSearch.vue'

import VizDataHighlights from './components/VizDataValueHighlights.vue'
import ColumnChart from './components/VizColumnChart.vue'
import DataTable from './components/VizDataTable.vue'
import GeoMercator from './components/VizGeoMercator.vue'
import PieChart from './components/VizPieChart.vue'

import image from './assets/chris-fuller-unsplash.jpg'
import worldgeojson from './assets/world.geo.json'

export default {
  components: {
    Page,
    PageHeader,
    PageSection,
    PageFooter,
    PageFooterMeta,
    PageForm,
    PageFormSection,
    UnorderedList,
    InputSearch,
    LoadingScreen,
    LinkCard,
    VizDataHighlights,
    DataTable,
    ColumnChart,
    GeoMercator,
    PieChart,
    Accordion,
    MessageBox
  },
  data () {
    return {
      loading: true,
      headerImage: image,
      rowData: null,
      siteSummary: null,
      recruitmentByCenter: null,
      selectedCenter: null,
      geojson: worldgeojson
    }
  },
  methods: {
    rowSelection (value) {
      const selection = value.data
      this.selectedCenter = this.recruitmentByCenter.filter(row => row.name === selection.name)
    },
    loadData () {
      return {
        summary: [
          {name: 'Groningen', total: 517, lat: '53.219167', lng: '6.562778', status: 'active'},
          {name: 'London', total: 219, lat: '51.524722', lng: '-0.133611', status: 'active'},
          {name: 'Barcelona', total: 415, lat: '41.386667', lng: '2.163889', status: 'active'},
          {name: 'Rome', total: 0, lat: '41.8625', lng: '12.478889', status: 'inactive'},
          {name: 'Paris', total: 0, lat: '48.7006', lng: '2.17058', status: 'inactive'},
        ],
        centers: [
          {name: 'Groningen', group: 'Group A', total: 172},
          {name: 'Groningen', group: 'Group B', total: 86},
          {name: 'Groningen', group: 'Group C', total: 259},
          {name: 'London', group: 'Group A', total: 18},
          {name: 'London', group: 'Group B', total: 100},
          {name: 'London', group: 'Group C', total: 101},
          {name: 'Barcelona', group: 'Group A', total: 146},
          {name: 'Barcelona', group: 'Group B', total: 186},
          {name: 'Barcelona', group: 'Group C', total: 83},
          {name: 'Rome', group: 'Group A', total: 0},
          {name: 'Rome', group: 'Group B', total: 0},
          {name: 'Rome', group: 'Group C', total: 0},
          {name: 'Paris', group: 'Group A', total: 0},
          {name: 'Paris', group: 'Group B', total: 0},
          {name: 'Paris', group: 'Group C', total: 0}
        ]
      }
    }
  },
  mounted () {
    Promise.resolve(
      this.loadData()
    ).then((result) => {
      this.siteSummary = result.summary
      this.recruitmentByCenter = result.centers
      this.selectedCenter = result.centers.filter(row => row.name === 'Groningen')
    }).then(() => {
      new Promise(resolve => setTimeout(resolve, 750))
    }).then(() => {
      this.loading = false
    }).catch((error) => {
      console.error(error)
    })
  }
}
</script>

<style lang="scss">
body {
  font-family: Helvetica, sans-serif;
}

#datahighlights {
  background-color: $gray-200;
}

#linksection {
  .page-section-content {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: row;
    flex-wrap: wrap;
    
    .link-card {
      flex-grow: 1;
    }
  }
}

.geo-mercator-tooltip {

  h3 {
    position: relative;
    margin: 0;
    margin-bottom: 4px;
    display: flex;
    flex-direction: flex-start;
    align-items: center;
    column-gap: 12px;
    
    .bubble {
      display: block;
      background-color: $blue-800;
      font-size: 11pt;
      font-weight: bold;
      box-sizing: border-box;
      padding: 4px 12px;
      border-radius: 24px;
      color: $blue-050;
      
      &.bubble-active {
        background-color: hsl(120, 61%, 80%);
        color: hsl(120, 61%, 20%);
      }
      
      &.bubble-inactive {
        background-color: hsl(350, 100%, 88%);
        color: hsl(350, 100%, 28%);
      }
    }
  }
}

.flex {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 2em;
  div {
    flex-grow: 1;
  }
}

</style>