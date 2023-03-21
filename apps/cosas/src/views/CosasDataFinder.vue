<template>
  <Page id="cosas-data-finder-page">
    <PageHeader
      id="cosasDataFinderHeader"
      title="Database Help"
      subtitle="Frequently asked questions and troubleshooting"
      :imageSrc="pageHeaderImage"
      height="medium"
      titlePositionX="center"
      titlePositionY="center"
    />
    <PageSection id="cosas-search-instructions" aria-labelledby="cosas-search-instructions-title">
      <h2 id="cosas-search-instructions-title">Instructions</h2>
      <p>Using the forms below, you can search for files or for patients with a certain phenotype. In all search fields, you may search for more than one value by separating each value with a comma. For example, if you would like to search for more than one patient by ID, format the values in the following way: "Patient-1234, Patient-5678". Click the search button to search the variant database.</p>
      <p>If there are any matching records, you will see a message below the search button that displays the total number of results along with a link to view the results. Click the link to view the data in the database.</p>
      <p>If you encounter any issues, take a look at the <router-link :to="{name: 'help'}">troubleshooting guide</router-link>.</p>
    </PageSection>
    <div id="cosas-search" class="....">
      <div class="page-form-container cosas-search-form">
        <PageForm id="cosas-files-search-form" title="Search for Files">
          <PageFormSection>
            <InputSearch
              id="subjectID"
              label="Search for MDN/UMCG Numbers"
              description="Search for patients and their relatives"
              @search="(value) => fileFilters.belongsToSubject = value"
            />
          </PageFormSection>
          <PageFormSection>
            <legend>
              Search for file types
              <span>Select one or more file types</span>
            </legend>
            <div class="checkbox__group">
              <div class="checkbox" v-for="filetype in filetypes" :key="filetype.value">
                <input
                  :id="filetype.value"
                  type="checkbox"
                  :value="filetype.value"
                  class="checkbox__input"
                  v-model="selectedFileTypes"
                  @change="updateFileFormats"
                />
                <label :for="filetype.value" class="checkbox__label">
                  {{ filetype.label }}
                </label>
              </div>
            </div>
          </PageFormSection>
          <ButtonSearch id="search-subjects" @click="searchFiles"/>
        </PageForm>
        <SearchResultsBox
          label="Unable to retrieve records"
          :isPerformingAction="fileSearch.isSearching"
          :actionWasSuccessful="fileSearch.wasSuccessful"
          :actionHasFailed="fileSearch.hasFailed"
          :actionErrorMessage="fileSearch.errorMessage"
          :totalRecordsFound="fileSearch.totalRecordsFound"
          :searchResultsUrl="fileSearch.resultsUrl"
        />
      </div>
      <div class="page-form-container cosas-search-form">
        <PageForm id="cosas-diagnostic-search-form" title="Search for Diagnostic Information">
          <PageFormSection>
            <SearchInput
              id="clinicalSubjectID"
              label="Search for MDN/UMCG Numbers"
              description="Search for patients and their relatives"
              @search="(value) => clinicalFilters.belongsToSubject = value"
            />
          </PageFormSection>
          <PageFormSection>
            <InputSearch
              id="clinicalObservedPhenotype"
              label="Clinical Phenotype (HPO)"
              description="Enter one or more HPO code, e.g., 'HP:0001270, HP:0001638'"
              @search="(value) => clinicalFilters.observedPhenotype = value"
            />
          </PageFormSection>
          <ButtonSearch id="search-clinical" @click="searchClinical"/>
        </PageForm>
        <SearchResultsBox
          label="Unable to retrieve records"
          :isPerformingAction="clinicalSearch.isSearching"
          :actionWasSuccessful="clinicalSearch.wasSuccessful"
          :actionHasFailed="clinicalSearch.hasFailed"
          :actionErrorMessage="clinicalSearch.errorMessage"
          :totalRecordsFound="clinicalSearch.totalRecordsFound"
          :searchResultsUrl="clinicalSearch.resultsUrl"
        />
      </div>
    </div>
  </Page>
</template>

<script>
import { Page, PageHeader, PageSection, PageForm, PageFormSection, ButtonSearch, InputSearch } from 'rd-components'
import SearchResultsBox from '@/components/SearchResultsBox.vue'
import pageHeaderImage from '@/assets/cosas-page-header.jpg'

import {
  fetchData,
  objectToUrlFilterArray,
  removeNullObjectKeys,
  initSearchResultsObject,
  setDataExplorerUrl,
} from '$shared/js/utils.js'

export default {
  components: {
    Page,
    PageHeader,
    PageSection,
    PageForm,
    PageFormSection,
    ButtonSearch,
    InputSearch,
    SearchResultsBox
  },
  data () {
    return {
      pageHeaderImage: pageHeaderImage,
      filetypes: [
        { value: 'bam', label: 'BAM' },
        { value: 'cram', label: 'CRAM' },
        { value: 'fastq', label: 'FastQ' },
        { value: 'vcf', label: 'VCF' }
      ],
      selectedFileTypes: [],
      clinicalFilters: {
        belongsToSubject: null,
        observedPhenotype: null
      },
      fileFilters: {
        belongsToSubject: null,
        fileFormat: null
      },
      fileSearch: initSearchResultsObject(),
      clinicalSearch: initSearchResultsObject()
    }
  },
  methods: {
    updateFileFormats () {
      this.fileFilters.fileFormat = this.selectedFileTypes.join()
    },
    resetFileSearch () {
      this.fileSearch = initSearchResultsObject()
    },
    resetClinicalSearch () {
      this.clinicalSearch = initSearchResultsObject()
    },
    searchFiles () {
      this.resetFileSearch()
      this.fileSearch.isSearching = true

      const filters = removeNullObjectKeys(this.fileFilters)
      const filtersAsUrlParams = objectToUrlFilterArray(filters).join(';')
      const url = `/api/v2/umdm_files?attributes=fileID&q=${filtersAsUrlParams}`

      Promise.all([fetchData(url)]).then(response => {
        const data = response[0]
        const totalRecordsFound = data.total
        this.fileSearch.totalRecordsFound = totalRecordsFound
        this.fileSearch.wasSuccessful = true
        
        if (totalRecordsFound > 0) {
          const idsForUrl = data.items.map(row => { return row.belongsToSubject.subjectID }) // use fileID when available
          const filtersAsUrlParams = objectToUrlFilterArray(
            { belongsToSubject: idsForUrl.join(',') },
            { fileFormat: this.fileFilters.fileFormat }
          )
          const url = setDataExplorerUrl('umdm_files', filtersAsUrlParams)
          this.fileSearch.resultsUrl = url
        }
        
        this.fileSearch.isSearching = false
      }).catch(error => {
        this.fileSearch.isSearching = false
        this.fileSearch.wasSuccesful = false
        this.fileSearch.hasFailed = true
        this.fileSearch.errorMessage = error.message
      })
    },
    searchClinical () {
      this.resetClinicalSearch()
      this.clinicalSearch.isSearching = true
      
      const filters = removeNullObjectKeys(this.clinicalFilters)
      const filtersAsUrlParams = objectToUrlFilterArray(filters).join(';')
      const url = `/api/v2/umdm_clinical?attributes=belongsToSubject&q=${filtersAsUrlParams}`

      Promise.all([fetchData(url)]).then(response => {
        const data = response[0]
        const totalRecordsFound = data.total
        this.clinicalSearch.totalRecordsFound = totalRecordsFound
        this.clinicalSearch.wasSuccessful = true
        
        if (totalRecordsFound > 0) {
          const idsForUrl = data.items.map(row => { return row.belongsToSubject.subjectID })
          const filtersAsUrlParams = objectToUrlFilterArray({ belongsToSubject: idsForUrl.join(',') })
          const url = setDataExplorerUrl('umdm_clinical', filtersAsUrlParams)
          this.clinicalSearch.resultsUrl = url
        }
        this.clinicalSearch.isSearching = false
      }).catch(error => {
        this.clinicalSearch.isSearching = false
        this.clinicalSearch.wasSuccesful = false
        this.clinicalSearch.hasFailed = true
        this.clinicalSearch.errorMessage = error.message
      })
    }
  }
}

</script>
