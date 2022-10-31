<template>
  <Page id="page-documents">
    <PageHeader
      id="genturis-documents"
      title="ERN Genturis"
      subtitle="Import Documents and relevant information"
      :imageSrc="HeaderBackgroundImage"
      height="medium"
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
import HeaderBackgroundImage from '@/assets/images-wesley-tingey-documents.jpg'

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
      HeaderBackgroundImage: HeaderBackgroundImage
    }
  }
}
</script>
