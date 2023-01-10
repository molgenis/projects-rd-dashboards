<template>
  <Page id="page-home">
    <PageHeader
       id="go-nl-header"
       title="Genome of the Netherlands"
       subtitle="Request data"
       height="medium"
    />
    <PageSection id="section-intro">
      <h2>Request Data</h2>
      <p>Individual level sequence data and/or variant calls can be requested.</p>
      <h3>The Request Process</h3>
      <ol>
        <li>To apply for access, fill in the <a href="https://www.nlgenome.nl/api/files/aaaac6qvcnk336qwh32jd7yaay?alt=media">GoNL Data Access Request Application v1.1 (PDF, 132KB)</a> and send to <a href="mailto:gonl@bbmri.nl">gonl@bbmri.nl</a></li>
        <li>Your research request will be evaluated by the GoNL steering committee.</li>
        <li>If your request has been successful, you will be sent the <a href="https://nlgenome.nl/api/files/aaaac6lzvpcop6qwh32jd7yaae?alt=media">Data Access Agreement (PDF, 507KB)</a>. This agreement requires signatures from the applicant and a legal representative of the applicant's institution.</li>
        <li>You will be granted access to the data using a suitable method. At the time of publication, add the suitable acknowledgement. More information can be found in the <a href="https://nlgenome.nl/api/files/aaaac5z7aijfr6qwh32jd7yaae?alt=media">GoNL Publication Acknowledgment document (PDF, 139KB)</a>.</li>
      </ol>
    </PageSection>
  </Page>
  <AppFooter />
</template>

<script>
import { Page, PageHeader, PageSection } from 'rd-components'
import AppFooter from '@/components/AppFooter.vue'

export default {
  components: {
    Page,
    PageHeader,
    PageSection,
    AppFooter
  }
}
</script>

<style lang="scss">
</style>