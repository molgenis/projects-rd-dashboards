<template>
  <Page id="page-home">
    <PageHeader
      class="solverd-header"
      title="Solve-RD"
      subtitle="The Rare Disease Database"
      height="medium"
      :imageSrc="headerImage"
    />
    <PageSection id="section-intro-title" aria-labelledby="section-intro-title" :verticalPadding="2">
      <SolveRdIcon />
      <h2 id="section-intro-title">Welcome to RD3</h2>
      <p>The RD3 —or Rare Disease Data about Data— database provides an overview of Solve-RD "asset collections". This includes metadata and files associated with patients and samples, as well as an overview on the analyses that were performed. There are several ways to get started. If you are familiar with the structure of RD3, you can view the all the tables, sign in to the Discovery Nexus tool, or visit the "Get Started" page to learn more about RD3 and how to find data.</p>
    </PageSection>
    <PageSection id="section-navigation" aria-labelledby="section-navigation-title" width="full" :horizontalPadding="0" :verticalPadding="0">
      <h2 id="section-navigation-title" class="visually-hidden">Get started with RD3</h2>
      <div class="link-cards-container">
        <LinkCard id="linkViewTables" height="small">
          <router-link :to="{name: 'view-tables'}">View Tables</router-link>
        </LinkCard>
        <LinkCard id="linkDiscoveryNexus" height="small">
          <a href="https://rdnexus.molgeniscloud.org/discover/index">Discovery Nexus</a>
        </LinkCard>
        <LinkCard id="linkGetStarted" height="small">
          <router-link :to="{ name: 'get-started' }">Get Started</router-link>
        </LinkCard>
      </div>
    </PageSection>
    <PageSection id="section-learn-more" aria-labelledby="section-learn-more-title" :verticalPadding="3">
      <h2 id="section-learn-more-title">Learn More</h2>
      <p>If you would like to learn more about how to use Solve-RD platform, then visit the following help pages. More information about the Solve-RD project can be found on on our homepage <a href="http://solve-rd.eu/">solve-rd.eu</a>.</p>
      <div class="info-cards">
        <div class="info-card">
          <p class="card-title">RD3 and Sandbox Guide</p>
          <p class="card-description">The Solve-RD User Guide provides information on getting accessing and using the platform.</p>
          <a class="page-action-link" href="https://docs.google.com/document/d/10N6kTdbyUgjzsEO3BjwV6nSKZymIyv36-jxooqDPMOc/edit#">
            <span>Read</span>
            <ArrowTopRightOnSquareIcon class="heroicon external-link"/>
          </a>
        </div>
        <div class="info-card">
          <p class="card-title">Sandbox Manual</p>
          <p class="card-description">The Sandbox manual provides more information about accessing and using the HPC cluster.</p>
          <a class="page-action-link" href="http://docs.gcc.rug.nl/fender/index.html">
            <span>Read</span>
            <ArrowTopRightOnSquareIcon class="heroicon external-link"/>
          </a>
        </div>
        <div class="info-card">
          <p class="card-title">Solve-RD Data Model</p>
          <p class="card-description">View the structure and attributes of the RD3 database. (An account is required to access this page.)</p>
          <a class="page-action-link" href="https://solve-rd-acc.gcc.rug.nl/menu/main/dataexplorer?entity=sys_md_Attribute&amp;mod=entitiesreport">
            <span>Read</span>
            <ArrowTopRightOnSquareIcon class="heroicon external-link"/>
          </a>
        </div>
      </div> 
    </PageSection>
  </Page>
</template>

<script>
import { Page, PageHeader, PageSection, LinkCard } from 'rd-components'
import { ArrowTopRightOnSquareIcon } from '@heroicons/vue/24/outline'
import SolveRdIcon from '@/components/icons/solve-rd-icon.vue'
import headerImage from '@/assets/solverd-bkg-header.jpg'

export default {
  components: {
    Page,
    PageHeader,
    PageSection,
    LinkCard,
    ArrowTopRightOnSquareIcon,
    SolveRdIcon
  },
  data () {
    return {
      headerImage: headerImage
    }
  }
}
</script>

<style lang="scss">
.page-header {
  background-color: $gray-800;
  color: $gray-050;
}

.link-cards-container {
  .link-card {
    &:nth-child(1) {
      background-color: $blue-600;
    }
    
    &:nth-child(2) {
      background-color: $blue-400;
    }
    
    &:nth-child(3) {
      background-color: $blue-200;
      
      a {
        color: $gray-800;
      }
    }
  }
}

</style>