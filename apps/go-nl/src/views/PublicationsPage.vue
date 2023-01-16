<template>
  <Page id="page-publications">
    <PageHeader
      class="gonl-page-header"
      title="Genome of the Netherlands"
      subtitle="Recent Publications"
      titlePositionX="center"
      titlePositionY="center"
      height="large"
      :imageSrc="pageHeader"
    />
    <PageSection id="section-intro" :verticalPadding="2" aria-labelledby="publications-title">
      <h2 id="publications-title">Publications</h2>
      <p>In the list below, you can view all of the publications that are affiliated with the GoNL consortium. Publications are sorted by most recent publication. If you would like to add your publication to this list, make sure you have given suitable acknowledgement. Please see the <a href="https://nlgenome.nl/api/files/aaaac5z7aijfr6qwh32jd7yaae?alt=media">GoNL Publication Acknowledgment Guide (PDF, 139KB)</a> for more information.</p>
      <MessageBox type="error" v-if="error">
        <p>{{ error }}</p>
      </MessageBox>
      <ol v-else class="publication-list" reversed>
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
import { Page, PageHeader, PageSection, MessageBox } from 'rd-components'
import AppFooter from '@/components/AppFooter.vue'
import PublicationRecord from '@/components/PublicationCard.vue'
import { fetchData } from '$shared/js/utils.js'
import pageHeader from '@/assets/gonl-pg-header-2.jpg'

export default {
  components: {
    Page,
    PageHeader,
    PageSection,
    PublicationRecord,
    MessageBox,
    AppFooter
  },
  data () {
    return {
      publications: [],
      pageHeader: pageHeader,
      error: null
    }
  },
  methods: {
    getPublications () {
      this.error = null
      Promise.resolve(
        fetchData('/api/v2/publications_records?sort=sortpubdate:desc')
      ).then(response => {
        console.log(response)
        this.publications = response.items
      }).catch(error => {
        const e = JSON.parse(error.message)
        console.log(e)
        const msg = `Unable to retrieve publications. "${e.url}" ${e.message} (${e.status}).`
        this.error = msg
      })
    }
  },
  mounted () {
    this.getPublications()
  }
}
</script>
