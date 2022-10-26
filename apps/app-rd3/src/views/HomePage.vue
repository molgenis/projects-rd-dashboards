<script setup>
import { Page, PageHeader, PageSection, UnorderedList } from 'rd-ui-components'
import SolveRdFooter from '../components/SolveRdFooter.vue';
</script>

<template>
  <Page>
    <PageHeader
      title="Solve-RD"
      subtitle="The Rare Disease Database"
    />
    <PageSection id="section-intro-title" aria-labelledby="section-intro-title" :verticalPadding="2">
      <h2 id="section-intro-title">Welcome to RD3</h2>
      <p>The RD3 —or Rare Disease Data about Data— database provides an overview of Solve-RD "asset collections". This includes metadata and files associated with patients and samples, as well as an overview on the analyses that were performed.</p>
      <p>There are several ways to get started. If you are familiar with the structure of RD3, you can view the all the tables, sign in to the Discovery Nexus tool, or visit the "Get Started" page to learn more about RD3 and how to find data.</p>
      <UnorderedList class="link-navigation" listLayout="horizontal" listType="none">
        <li><a href="#" class="page-action-link page-action-secondary">View Tables</a></li>
        <li><a href="#" class="page-action-link page-action-secondary">Discovery Nexus</a></li>
        <li><a href="#" class="page-action-link page-action-primary">Get Started</a></li>
      </UnorderedList>
    </PageSection>
    <PageSection id="section-learn-more" aria-labelledby="section-learn-more-title" :verticalPadding="2">
      <h2 id="section-learn-more-title">Learn More</h2>
      <p>If you would like to learn more about how to use Solve-RD platform, then visit the following help pages. More information about the Solve-RD project can be found on on our homepage <a href="http://solve-rd.eu/">solve-rd.eu</a>.</p>
      <div class="info-cards">
        <div class="info-card">
          <p class="card-title">RD3 and Sandbox User Guide</p>
          <p class="card-description">The Solve-RD User Guide provides information on getting accessing and using the platform.</p>
          <a class="page-action-link" href="https://docs.google.com/document/d/10N6kTdbyUgjzsEO3BjwV6nSKZymIyv36-jxooqDPMOc/edit#">test</a>
        </div>
        <div class="info-card">
          <p class="card-title">Sandbox Manual</p>
          <p class="card-description">The Sandbox manual provides more information about accessing and using the HPC cluster.</p>
          <a class="page-action-link" href="http://docs.gcc.rug.nl/fender/index.html">Read</a>
        </div>
        <div class="info-card">
          <p class="card-title">Solve-RD Data Model</p>
          <p class="card-description">iew the structure and attributes of the RD3 database. (An account is required to access this page.)</p>
          <a class="page-action-link" href="https://solve-rd-acc.gcc.rug.nl/menu/main/dataexplorer?entity=sys_md_Attribute&amp;mod=entitiesreport">Read</a>
        </div>
      </div>
    </PageSection>
  </Page>
  <SolveRdFooter />
</template>

<style lang="scss">
.page-header {
  background-color: $gray-800;
  color: $gray-050;
}

#section-learn-more {
  background-color: $gray-050;
}
</style>