<template>
  <Page id="page-home">
    <PageHeader
      class="cosas-page-header"
      title="Genetica Diagnostiek Portal"
      subtitle="Find, explore, and access data"
      :imageSrc="pageHeaderImage"
      height="medium"
      titlePositionX="center"
      titlePositionY="center"
    />
    <PageSection id="page-home-welcome" aria-labelledby="page-home-welcome-title">
      <h2 id="page-home-welcome-title">Welcome</h2>
      <p>Through the <strong>Genetica Diagnostics Portal</strong>! With this site, you can access a number of databases and systems available to members of the genetica department developed by the Molgenis team.</p>
    </PageSection>
    <PageSection id="page-quicklinks" aria-labelledby="page-quicklinks-title">
      <div class="quicklinks">
        <LinkCard>
          <router-link>Cosas</router-link>
        </LinkCard>
        <LinkCard>
          <router-link>Variant Database</router-link>
        </LinkCard>
      </div>
    </PageSection>
    <PageSection id="page-home-help" aria-labelledby="page-home-help-title">
      <h2 id="page-home-help-title">Get help</h2>
      <p>If you are experiencing any issues with the database or related systems, please get in touch with the MOLGENIS support desk at <a href="mailto:molgenis-support@umcg.nl">molgenis-support@umcg.nl</a>. In addition, we also have a list of <router-link :to="{ name: 'help' }">Frequently Asked Questions</router-link> where you may find additional information to your questions.</p>
    </PageSection>
  </Page>
  <AppFooter />
</template>

<script>
import { Page, PageHeader, PageSection, LinkCard } from 'rd-components'
import AppFooter from '@/components/AppFooter.vue'
import pageHeaderImage from '@/assets/cosas-page-header.jpg'

export default {
  components: {
    Page,
    PageHeader,
    PageSection,
    LinkCard,
    AppFooter
  },
  data () {
    return {
      pageHeaderImage: pageHeaderImage
    }
  }
}