<template>
  <LoadingScreen v-if="loading" />
  <Page id="page-documents" v-else>
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
      <p>Download additional information about the GENTURIS Registry.</p>
      <div class="document-container">
        <MessageBox type="error" v-if="!loading && apiError">
          <p>Unable to retrieve file information. Please sign in or try again later.</p>
        </MessageBox>
        <ul class="document-list" v-else>
          <li>
            <a :href="GenturisRegistryLeaflet.url">
              {{ GenturisRegistryLeaflet.filename }}
              (PDF, {{ Math.round(GenturisRegistryLeaflet.size / 1000) }} KB)
            </a>
          </li>
        </ul>
      </div>
    </PageSection>
  </Page>
  <AppFooter />
</template>

<script>
import { Page, PageHeader, PageSection, MessageBox, LoadingScreen } from 'rd-components'
import AppFooter from '@/components/AppFooter.vue'
import GenturisHeaderPhoto from '@/assets/genturis-carousel.jpg'
import { fetchData, subsetData } from '$shared/js/utils.js'

export default {
  name: 'page-documents',
  components: {
    Page,
    PageHeader,
    PageSection,
    AppFooter,
    MessageBox,
    LoadingScreen
  },
  data () {
    return {
      loading: true,
      apiError: null,
      GenturisHeaderPhoto: GenturisHeaderPhoto,
      GenturisRegistryLeaflet: null
    }
  },
  mounted () {
    Promise.resolve(
      fetchData('/api/v2/sys_FileMeta')
    ).then(response => { 
      const files = response.items
      this.GenturisRegistryLeaflet=subsetData(files, 'filename', 'GENTURIS_Registry_Leaflet.pdf')[0]
      this.loading = false
    }).catch(error => {
      this.apiError = error
    })
  }
}
</script>

<style lang="scss">
.document-list {
  li {
    a {
      text-decoration: none;
    }
  }
}
</style>