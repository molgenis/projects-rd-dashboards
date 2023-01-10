<template>
  <Page id="page-home">
    <PageHeader
       id="go-nl-header"
       title="Genome of the Netherlands"
       subtitle="An ultra-sharp genetic group portrait of the Dutch"
       height="medium"
    />
    <PageSection id="section-intro">
      <h2>Publications</h2>
      <p>In the list below, you can view all of the publications that are affiliated with the GoNL consortium. Publications are sorted by most recent publication. If you would like to add your publication to this list, make sure you have given suitable acknowledgement. Please see the <a href="https://nlgenome.nl/api/files/aaaac5z7aijfr6qwh32jd7yaae?alt=media">GoNL Publication Acknowledgment Guide (PDF, 139KB)</a> for more information.</p>
      <ol v-if="publications" class="publication-list" reversed>
        <PublicationRecord
          v-for="pub in publications"
          :key="pub.uid"
          :title="pub.title"
          :authors="pub.authors"
          :journalName="pub.fulljournalname"
          :publicationDate="pub.sortpubdate"
          :doiUrl="pub.doi_url"
          :doiLabel="pub.doi_label"
        />
      </ol>
    </PageSection>
  </Page>
  <AppFooter />
</template>

<script>
import { Page, PageHeader, PageSection } from 'rd-components'
import AppFooter from '@/components/AppFooter.vue'
import PublicationRecord from '@/components/PublicationCard.vue'

import { fetchData } from '$shared/js/utils.js'

export default {
  components: {
    Page,
    PageHeader,
    PageSection,
    PublicationRecord,
    AppFooter
  },
  data () {
    return {
      publications: []
    }
  },
  methods: {
    getPublications () {
      Promise.resolve(
        fetchData('/api/v2/publications_records?sort=sortpubdate:desc')
      ).then(response => {
        this.publications = response.items
      }).catch(error => {
        this.error = error
      })
    }
  },
  mounted () {
    this.getPublicationData()
  }
}
</script>

<style lang="scss">
</style>