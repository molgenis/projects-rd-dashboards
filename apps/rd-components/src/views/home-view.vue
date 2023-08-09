<template>
  <Page>
    <PageHeader
      title="RD-Components"
      subtitle="Layout and Data Visualisation components"
      :imageSrc="headerImage"
      height="large"
    />
    <PageSection :verticalPadding="2">
      <h2>Welcome to the <strong>rd-components</strong> library!</h2>
      <p>We have developed and designed many components for use in MOLGENIS applications. This allows us to create applications in a systematic way while allowing for project-specific customisations (i.e., branding). This app is built using the library itself to showcase the visualisation components. Have a look around!</p>
      <router-link :to="{name: 'demo'}">View the demo</router-link>
    </PageSection>
    <PageSection class="bkg-light" :verticalPadding="2">
      <h2>Visualisation Components</h2>
      <p style="text-align: center;">We have several D3 visualisation components available and more on the way.</p>
      <div class="link-container">
        <LinkCard :imageSrc="BarChartImage">
          <router-link :to="{name: 'bar-chart'}">Bar Chart</router-link>
        </LinkCard>
        <LinkCard :imageSrc="ColumnChartImage">
          <router-link :to="{name: 'column-chart'}">Column Chart</router-link>
        </LinkCard>
        <LinkCard :imageSrc="GaugeChartHeader">
          <router-link :to="{name: 'gauge-chart'}">Gauge Chart</router-link>
        </LinkCard>
        <LinkCard :imageSrc="GroupedColumnChartImage">
          <router-link :to="{name: 'grouped-column-chart'}">Grouped Column Chart</router-link>
        </LinkCard>
        <LinkCard :imageSrc="HighlightsImage">
          <router-link :to="{name: 'data-highlights'}">Data Highlights</router-link>
        </LinkCard>
        <LinkCard :imageSrc="DatatableImage">
          <router-link :to="{name: 'datatable'}">Data Table</router-link>
        </LinkCard>
        <LinkCard :imageSrc="MapImage">
          <router-link :to="{name: 'geo-mercator'}">GeoMercator</router-link>
        </LinkCard>
        <LinkCard :imageSrc="PieChartImage">
          <router-link :to="{name: 'pie-chart'}">Pie Chart</router-link>
        </LinkCard>
        <LinkCard :imageSrc="LegendImage">
          <router-link :to="{name: 'chart-legend'}">Legends</router-link>
        </LinkCard>
      </div>
    </PageSection>
    <PageSection>
      <h2>About</h2>
      <p>Data used in the visualisations comes from the <a href="https://github.com/allisonhorst/palmerpenguins/">Palmer Penguins dataset</a>. Data used in the maps was built using the <a href="https://ror.org">ROR.org</a> data repository.</p>
    </PageSection>
  </Page>
</template>

<script setup>
import Page from '@/components/Page.vue'
import PageHeader from '@/components/PageHeader.vue'
import PageSection from '@/components/PageSection.vue'
import LinkCard from '@/components/LinkCard.vue'

import headerImage from '@/assets/header-image.jpg'
import BarChartImage from '@/assets/bar-chart-header.jpg'
import ColumnChartImage from '@/assets/column-chart-header.jpg'
import GaugeChartHeader from "@/assets/gauge-chart-header.jpg"
import GroupedColumnChartImage from '@/assets/grouped-column-chart-header.jpg'
import PieChartImage from '@/assets/pie-chart-header.jpg'
import MapImage from '@/assets/map-header.jpg'
import LegendImage from '@/assets/legend-header.jpg'
import HighlightsImage from '@/assets/highlights-header.jpg'
import DatatableImage from '@/assets/table-header.jpg'

</script>

<style lang="scss">
.link-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 2em;
  
  .link-card {
    height: 6em;
    border-radius: 12px;
    background-color: transparent;
    flex-grow: 1;
    
    a {
      color: $green-050;
    }
    .card-background-filter {
      border-radius: 12px;
      background-color: $blue-700;
      opacity: 0.5;
    }
  }
}
</style>