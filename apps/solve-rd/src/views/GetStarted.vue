<template>
  <Page>
    <PageHeader
      title="Solve-RD"
      subtitle="Getting Started with RD3"
      height="medium"
    />
    <PageSection id="section-navigation" aria-labelledby="section-navigation-title" width="full" :horizontalPadding="0" :verticalPadding="0">
      <h2 id="section-navigation-title" class="visually-hidden">Get started with RD3</h2>
      <div class="link-cards-container">
        <LinkCard id="linkViewTables" height="small">
          <a href="#">View Tables</a>
        </LinkCard>
        <LinkCard id="linkDiscoveryNexus" height="small">
          <a href="#">Discovery Nexus</a>
        </LinkCard>
        <LinkCard id="linkPatientTree" height="small">
          <router-link :to="{ name: 'patient-tree' }">Patient Tree</router-link>
        </LinkCard>
      </div>
    </PageSection>
    <PageSection id="getstarted-about" aria-labelledby="getstarted-about-title" :verticalPadding="2">
      <h2 id="getstarted-about-title">About RD3</h2>
      <p>Since the start of RD3, data has been added to the database periodically from a <abbr title="The National Center for Genomic Analysis">CNAG</abbr> and the <abbr title="The European Genome-phenome Archive">EGA</abbr>. Initial metadata on subjects, samples, and experiments is provided by CNAG. The EGA provides datasets containing files (BAM, BAI, VCFs, PED, Phenopackets, etc.) which are transfered files to the sandbox. Raw data is imported into RD3 and stored in the portal &mdash; i.e., one of the staging tables &mdash; before data processing.</p>
      <img :src="rd3ImageDataFlow" alt="RD3 data comes from CNAG and the EGA" class="image"/>
      <p>From the RD3 portal, data is processed and imported into the <a href="/menu/main/navigator/solverd">RD3 core structure</a>. RD3 specific lookup tables are stored in the <a href="/menu/main/navigator/solverd_info">Information folder</a> while other reference datasetes are stored in the <a href="/menu/main/navigator/solverd_lookups">Lookups folder</a>. The core structure is a series of five tables linked by common identifiers.</p>
      <ul>
        <li><strong>Subjects</strong>: information about the subjects and their families. This includes diagnoses, phenotypic information, sex, associated organisations (ERNs, institutions), etc.</li>
        <li><strong>Subject Information</strong>: secondary information about the subjects. This table is linked with subjects tables.</li>
        <li><strong>Samples</strong>: information on samples including tissue type, pathological state, etc.. This table is linked with the subjects table.</li>
        <li><strong>Lab Info</strong>: information on how the samples were processed. This includes information about the sequencer and sequencing method. This table is linked with the samples table.</li>
        <li><strong>Files</strong>: location of the files in the sandbox. This table is linked to the subjects, samples, and lab info tables.</li>
      </ul>
      <img :src="rd3ImageCoreStructure" alt="the rd3 core structure contains five linked tables" class="image"/>
    </PageSection>
    <PageSection id="getstarted-finding-data" aria-labelledby="getstarted-finding-data-title" :verticalPadding="2">
      <h2 id="getstarted-finding-data-title">Finding Data</h2>
      <p>There are several options available for finding data in RD3 from using a query interface to interacting with RD3 via the API. Depending on your choice, you may need to additional permissions. If you are experiencing difficulties or have any questions, please contact the Molgenis support desk: <a href="mailto:molgenis-support@umcg.nl">molgenis-support@umcg.nl</a>.</p>
      <ul>
        <li><a href="https://rdnexus.molgeniscloud.org/Discover/Index">Discovery Nexus platform</a>: this tool allows you to build cohorts based on ERN, phenotypic information, diseases, genes and pathways, and more.</li>
        <li><a href="/menu/main/dataexplorer?entity=rd3_overview&hideselect=true">RD3 Data Overview table</a>: this table combines all subjects and the samples, experiments, and files across all releases.</li>
        <li><strong>Work in a specific release</strong>: If you know which RD3 release you would like to work with (e.g., Data Freeze 2, Novel Omics Deep-WES, etc.), you can access the tables using the links provided in the next section.</li>
        <li><strong>Molgenis API</strong>: If you would rather retrieve data as part of a workflow or from a script, you can do so using the Molgenis API. You can use one of the existing clients (R, Python, JavaScript) or send requests using curl. Additional permissions are required. Please contact the Molgenis support desk to get started: <a href="mailto:molgenis-support@umcg.nl">molgenis-support@umcg.nl</a>.</li>
      </ul>
    </PageSection>
    <PageSection id="getstarted-releases" aria-labelledby="getstarted-releases-title" :verticalPadding="2">
      <h2 id="getstarted-releases-title">Current RD3 Releases</h2>
      <MessageBox type="error" v-if="hasError">
        <p v-html="errorMessage"></p>
      </MessageBox>
      <div v-else-if="!hasError && !isLoading && releaseData">
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
import { Page, PageSection, PageHeader, Accordion, MessageBox, LinkCard } from 'rd-ui-components'
import SolveRdFooter from '../components/SolveRdFooter.vue'

import rd3ImageDataFlow from '../assets/rd3-data-flow.png'
import rd3ImageCoreStructure from '../assets/rd3-core-data-structure.png'

import { fetchData as fetchData } from '../utils/utils.js'

export default {
  name: 'get-started',
  data () {
    return {
      rd3ImageDataFlow: rd3ImageDataFlow,
      rd3ImageCoreStructure: rd3ImageCoreStructure,
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
    LinkCard,
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
