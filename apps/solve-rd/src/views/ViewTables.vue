<template>
  <Page>
    <PageHeader
      title="Solve-RD"
      subtitle="Navigating RD3"
      height="medium"
    />
    <PageSection id="getstarted-releases" aria-labelledby="getstarted-releases-title" :verticalPadding="2">
      <h2 id="getstarted-releases-title">The RD3 database</h2>
      <MessageBox type="error" v-if="hasError">
        <p v-html="errorMessage"></p>
      </MessageBox>
      <div v-else-if="!hasError && !isLoading && releaseData">
        <p>As described in the <router-link :to="{ name: 'get-started'}">Get Started</router-link> page, RD3 has five core tables. Click any of the links below, to view a them. If you are looking for data in a specific Solve-RD release, have a look at the next section.</p>
        <ul>
          <li><a href="/menu/subjects/dataexplorer?entity=solverd_subjects&hideselect=true">Subjects</a>: information about the subjects and their families. This includes diagnoses, phenotypic information, sex, associated organisations (ERNs, institutions), etc.</li>
          <li><a href="/menu/subjects/dataexplorer?entity=solverd_subjectinfo&hideselect=true">Subject Information</a>: secondary information about the subjects. This table is linked with subjects tables.</li>
          <li><a href="/menu/subjects/dataexplorer?entity=solverd_samples&hideselect=true">Samples</a>: information on samples including tissue type, pathological state, etc.. This table is linked with the subjects table.</li>
          <li><a href="/menu/subjects/dataexplorer?entity=solverd_labinfo&hideselect=true">Lab Info</a>: information on how the samples were processed. This includes information about the sequencer and sequencing method. This table is linked with the samples table.</li>
          <li><a href="/menu/subjects/dataexplorer?entity=solverd_files&hideselect=true">Files</a>: location of the files in the sandbox. This table is linked to the subjects, samples, and lab info tables.</li>
        </ul>
        <p>Alternatively, check out the <a href="/menu/main/dataexplorer?entity=solverd_overview&hideselect=true">RD3 Data Overview table</a>. This custom view combines all subjects and the samples, experiments, and files across all releases.</p>
        <h3>Tables by RD3 release</h3>
        <p>Since the begining of RD3, there have been <strong>{{ releaseData.length }}</strong> data releases. Click the name of the release below to view all tables available in RD3. Follow the links to view the data.</p>
        <Accordion v-for="release in releaseData" :key="release.id" :title="release.name" :id="release.id">
          <ul>
            <li>
              <a :href="buildDataExplorerUrl('subjects', release.id)">
                {{ release.name }} Subjects
              </a>
            </li>
            <li>
              <a :href="buildDataExplorerUrl('subjectinfo', release.id)">
                {{ release.name }} Subject Information
              </a>
            </li>
            <li>
              <a :href="buildDataExplorerUrl('samples', release.id)">
                {{ release.name }} Samples
              </a>
            </li>
            <li>
              <a :href="buildDataExplorerUrl('labinfo', release.id)">
                {{ release.name }} Lab Information
              </a>
            </li>
            <li>
              <a :href="buildDataExplorerUrl('files', release.id)">
                {{ release.name }} Files
              </a>
            </li>
          </ul>
        </Accordion>
      </div>
    </PageSection>
  </Page>
  <SolveRdFooter />  
</template>

<script>
import { Page, PageSection, PageHeader, Accordion, MessageBox } from 'rd-components'
import SolveRdFooter from '../components/SolveRdFooter.vue'
import { fetchData as fetchData } from '../utils/utils.js'

export default {
  name: 'view-tables',
  data () {
    return {
      isLoading: false,
      hasError: false,
      errorMessage: null,
      releaseData: null
    }
  },
  components: {
    Page,
    PageHeader,
    PageSection,
    Accordion,
    MessageBox,
    SolveRdFooter
  },
  methods: {
    buildDataExplorerUrl(table, q) {
      return `/menu/subjects/dataexplorer?entity=solverd_${table}&hideselect=true&mod=data&filter=partOfRelease==${q}`
    },
    getReleases () {
      this.isLoading = true
      this.hasError = false
      this.errorMessage = null

      Promise.resolve(
        fetchData('/api/v2/solverd_info_datareleases')
      ).then(response => {
        const data = response.items
        this.releaseData = data.filter(release => !release.id.includes('patch'))
        this.isLoading = false
      }).catch(error => {
        this.hasError = true
        const err = JSON.parse(error.message)
        if (Math.round(err.status / 100) === 4 ) {
          this.errorMessage = 'Unable to retrieve data. Please <a href="/login">Sign in</a> to continue'
        } else {
          this.errorMessage = `${err.message} (${err.status})`
        }
      })
    }
  },
  mounted () {
    this.getReleases()
  }
}
</script>

<style lang="scss">
.image {
  display: block;
  margin: 1em auto;
  max-width: 90%;

  @media screen and (min-width: 517px) {
    max-width: 525px;
  }
}

#getstarted-about, #getstarted-finding-data {
  ul {
    li {
      line-height: 1.5;
    }
  }
}

#getstarted-finding-data {
  background-color: $gray-050;
}

</style>
