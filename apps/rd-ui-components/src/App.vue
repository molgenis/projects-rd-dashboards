<template>
  <Page>
    <LoadingScreen v-if="loading"/>
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
    <PageSection>
      <h2>Recruiment Overview</h2>
      <DataTable
        tableId="recruiment"
        :data="[
          {institution: 'Center 001', total: 517},
          {institution: 'Center 002', total: 219},
          {institution: 'Center 003', total: 415},
          {institution: 'Center 004', total: 365},
          {institution: 'Center 005', total: 428},
        ]"
        :columnOrder="['institution','total']"
        caption="Total Recruitment by Centre"
      />
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
import UnorderedList from './components/UnorderedList.vue'
import LoadingScreen from './components/LoadingScreen.vue'

import VizDataHighlights from './components/VizDataValueHighlights.vue'
import DataTable from './components/VizDataTable.vue'

import LinkCard from './components/LinkCard.vue'

import image from './assets/chris-fuller-unsplash.jpg'

export default {
  components: {
    Page,
    PageHeader,
    PageSection,
    PageFooter,
    PageFooterMeta,
    UnorderedList,
    LoadingScreen,
    LinkCard,
    VizDataHighlights,
    DataTable
  },
  data () {
    return {
      loading: true,
      headerImage: image
    }
  },
  mounted () {
    setTimeout(() => this.loading = false, 500)
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

</style>