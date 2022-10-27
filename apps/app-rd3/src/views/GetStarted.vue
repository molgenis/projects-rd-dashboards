<template>
  <Page>
    <PageHeader
      title="Solve-RD"
      subtitle="Getting Started with RD3"
      height="medium"
    />
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
    <PageSection id="getstarted-releases" aria-labelledby="getstarted-releases-title">
      <h2 id="getstarted-releases-title">Current RD3 Releases</h2>
      <p>There have been <strong>3 releases</strong> to date. All RD3 data freezes have an identical table structure. This table structure provides a standard format for structuring and storing data, as well as makes it easier to switch between the different data freezes. Tables are linked by one or more identifiers so you can view referenced data in the browser.</p>
      <p>Click the name of the release below to view all tables available in RD3. Follow the links to view the data. If you would like to view a certain patch, click one of links below and select the "patch" filter.</p>
      <Accordion id="test" title="Test Accordion">
        <p>Eu irure esse enim labore dolore ex aute laboris voluptate eiusmod enim aliqua esse non.</p>
      </Accordion>
    </PageSection>
  </Page>
  <SolveRdFooter />  
</template>

<script>
import { Page, PageSection, PageHeader, Accordion } from 'rd-ui-components'
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
      errorDetails: null,
      releaseData: null
    }
  },
  components: {
    Page,
    PageHeader,
    PageSection,
    Accordion,
    SolveRdFooter
  },
  methods: {
    getReleases () {
      this.isLoading = true
      Promise.resolve(
        fetchData('/api/v2/solverd_info_datareleases')
      ).then(response => {
        console.log(response)
        this.isLoading = false
      }).catch(error => {
        this.hasError = true
        const err = JSON.parse(error.message)
        console.log(err)
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

#getstarted-about {
  background-color: $gray-000;
  
  ul {
    li {
      line-height: 1.5;
    }
  }
}
</style>
