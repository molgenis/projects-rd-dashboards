<template>
  <Page id="page-documents">
    <PageHeader
      id="genturis-header"
      title="ERN Genturis Registry"
      subtitle="Registry for Genetic Tumour Risk Syndromes"
      :imageSrc="GenturisHeaderPhoto"
      height="medium"
      :verticalPadding="2"
    />
    <PageSection id="genturis-section-documents" aria-labelledby="genturis-section-documents-title">
      <h2 id="genturis-section-documents-title">Documents</h2>
      <p>Useful documents about the GENTURIS registry will be added in the near future.</p>
    </PageSection>
  </Page>
  <AppFooter />
</template>

<script>
import { Page, PageHeader, PageSection } from 'rd-ui-components'
import AppFooter from '@/components/AppFooter.vue'
import GenturisHeaderPhoto from '@/assets/genturis-carousel.jpg'

export default {
  name: 'page-documents',
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
