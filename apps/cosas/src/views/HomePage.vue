<template>
  <Page id="page-home">
    <PageHeader
      class="cosas-page-header"
      title="Genetica Diagnostics Portal"
      subtitle="Find, explore, and access data"
      :imageSrc="pageHeaderImage"
      height="medium"
      titlePositionX="left"
      titlePositionY="center"
    />
    <PageSection id="page-home-welcome" aria-labelledby="page-home-welcome-title" :verticalPadding="2" :horizontalPadding="2">
      <h2 id="page-home-welcome-title">Welcome</h2>
      <p>Through the <strong>Genetica Diagnostics Portal</strong>! With this site, you can access a number of databases and systems available to members of the genetica department developed by the Molgenis team.</p>
    </PageSection>
    <PageSection id="page-quicklinks" aria-labelledby="quicklinks-card-title" :verticalPadding="2" :horizontalPadding="2">
      <h2 id="quicklinks-card-title">Search</h2>
      <p>Sign in to any of the following databases using your UMCG credentials. If you have been given access to a system and it isn't in the list below, contact <a href="mailto:molgenis-support@umcg.nl">molgenis-support@umcg.nl</a></p>
      <div class="quicklinks">
        <InfoCard title="COSAS" text="View the Catalog of Sequences, Arrays, and Samples.">
          <router-link :to="{name: 'cosas-data-finder'}">View</router-link>
        </InfoCard>
        <InfoCard title="VariantDB" text="Find and explore variants in the Variants database.">
          <router-link :to="{name: 'variant-db-data-finder'}">View</router-link>
        </InfoCard>
      </div>
    </PageSection>
    <PageSection id="page-home-help" aria-labelledby="page-home-help-title" :verticalPadding="2" :horizontalPadding="2">
      <h2 id="page-home-help-title">Get help</h2>
      <p>If you are experiencing any issues with the database or related systems, please get in touch with the MOLGENIS support desk. In addition, we also have a list of <router-link :to="{ name: 'help' }">Frequently Asked Questions</router-link> where you may find additional information to your questions.</p>
      <ActionLink id="contactSupport" href="mailto:molgenis-support@umcg.nl">Contact Support</ActionLink>
    </PageSection>
  </Page>
</template>

<script>
import { Page, PageHeader, PageSection, InfoCard, ActionLink } from 'rd-components'
import pageHeaderImage from '@/assets/cosas-page-header.jpg'

export default {
  components: {
    Page,
    PageHeader,
    PageSection,
    InfoCard,
    ActionLink
  },
  data () {
    return {
      pageHeaderImage: pageHeaderImage
    }
  }
}
</script>

<style lang="scss">
#page-quicklinks {
  background-color: $gray-050;
}

.quicklinks {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 2em;
  
  .info-card {
    flex-grow: 1;

    .info-card-title {
      text-align: left;
      color: $gray-700;
    }
    
    .info-card-text {
      margin: 6px 0;
    }
    
    a {
      display: block;
      width: 100%;
      text-align: center;
      color: $molgenis-blue-800;
      box-sizing: border-box;
      padding: 0.5em 1em;
      border: 1px solid $molgenis-blue-800;
      background-color: $molgenis-blue-050;
      border-radius: 6px;
      margin: auto;
   
      &:hover, &:focus {
        outline: 1px solid;
      } 
    }
  }
}

#contactSupport {
  width: 325px;
  padding: 0.75em;
  text-decoration: none;
  
  &:hover, &:focus {
    text-decoration: underline;
  }
}
</style>