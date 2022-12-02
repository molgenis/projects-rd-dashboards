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
    <PageSection id="genturis-section-documents" aria-labelledby="genturis-section-documents-title" width="large">
      <h2 id="genturis-section-documents-title">Documents</h2>
      <p>Useful documents about the GENTURIS registry will be added in the near future.</p>
      <p>Download a copy of the <a href="/api/files/aaaac7lmguzil6qwh34c5xyaae?alt=media">GENTURIS Registry Leaflet (PDF, 375KB)</a>.</p>
    </PageSection>
  </Page>
  <AppFooter />
</template>

<script>
import { Page, PageHeader, PageSection } from 'rd-components'
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
