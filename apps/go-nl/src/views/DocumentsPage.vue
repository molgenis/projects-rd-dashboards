<template>
  <Page id="page-documents">
    <PageHeader
      class="gonl-page-header"
      title="Genome of the Netherlands"
      subtitle="Documents"
      titlePositionX="center"
      titlePositionY="center"
      height="large"
      :imageSrc="pageHeader"
    />
    <PageSection id="section-documents" :verticalPadding="2" aria-labelledby="section-documents-title">
      <h2 id="section-documents-title">Documents</h2>
      <p>The following documents are available for download. If you have any questions please see the <router-link :to="{name: 'request'}">request access page</router-link> or contact us at <a href="mailto:gonl@bbmri.nl">gonl@bbmri.nl</a>.</p>
      <FileDownloadCard 
        fileType="pdf"
        url="https://raw.githubusercontent.com/molgenis/molgenis-go-nl/main/docs/GoNLDATA_ACCESS_REQUEST_APPLICATION_v1.1.pdf"
        name="GoNL Data Access Request Application (v1.1)"
        size="132KB"
      >
        <p>To apply for access to the GoNL data, download and complete this form.</p>
      </FileDownloadCard>
      <FileDownloadCard 
        fileType="pdf"
        url="/files/GoNLDATA_ACCESS_POLICY_CONDITIONS_FINAL-2016.pdf"
        name="GoNL Data Access Agreement"
        size="507KB"
      >
        <p>Before access can be granted, the access agreement must be signed by the applicant and a legal representative of the applicant's institution.</p>
      </FileDownloadCard>
      <FileDownloadCard
        fileType="pdf"
        url="/files/GoNL_Publication_Acknowledgements.pdf"
        name="GoNL Publication Acknowledgements"
        size="68KB"
      >
        <p>At the time of publication, add the suitable acknowledgement to the GoNL paper and consortium.</p>
      </FileDownloadCard>
    </PageSection>
  </Page>
  <AppFooter />
</template>

<script>
import { Page, PageHeader, PageSection } from 'rd-components'
import AppFooter from '@/components/AppFooter.vue'
import pageHeader from '@/assets/gonl-pg-header-2.jpg'
import FileDownloadCard from '@/components/FileDownloadCard.vue'

export default {
  components: {
    Page,
    PageHeader,
    PageSection,
    FileDownloadCard,
    AppFooter
  },
  data () {
    return {
      pageHeader: pageHeader
    }
  }
}
</script>

<style lang="scss">

.ordered-list {
  li {
    line-height: 1.5;
    margin-top: 6px;
  }
}
</style>