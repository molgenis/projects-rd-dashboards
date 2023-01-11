<template>
  <Page id="page-members-area">
    <PageHeader
      class="genturis-header"
      title="ERN Genturis Registry"
      subtitle="Information for providers"
      :imageSrc="GenturisHeaderPhoto"
      titlePositionX="center"
      titlePositionY="center"
    />
    <PageSection id="genturis-section-members" aria-labelledby="genturis-section-members-title" :verticalPadding="2" width="large">
      <h2 id="genturis-section-members-title">Health Care Providers</h2>
      <p style="text-align: center;">This page is under construction. Information will be available soon.</p>
    </PageSection>
  </Page>
  <AppFooter />
</template>

<script>
import { Page, PageHeader, PageSection } from 'rd-components'
import AppFooter from '@/components/AppFooter.vue'
import GenturisHeaderPhoto from '@/assets/genturis-carousel.jpg'

export default {
  components: {
    Page,
    PageHeader,
    PageSection,
    AppFooter
  },
  data () {
    return {
      GenturisHeaderPhoto: GenturisHeaderPhoto
    }
  }
}
</script>
