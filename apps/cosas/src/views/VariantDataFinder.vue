<template>
  <Page>
    <PageHeader
      id="cosasDataFinderHeader"
      title="Database Help"
      subtitle="Frequently asked questions and troubleshooting"
      :imageSrc="pageHeaderImage"
    />
    <PageSection id="variantdb-search-instructions" aria-labelledby="variantdb-search-instructions-title">
      <h2 id="variantdb-search-instructions-title">Instructions</h2>
      <p>Using the forms below, you can search for classifed variants using patient or variant information. In all search fields, you may search for more than one value by separating each value with a comma. For example, if you would like to search for more than one patient by ID, format the values in the following way: "Patient-1234, Patient-5678". Click the search button to search the variant database.</p>
      <p>If there are any matching records, you will see a message below the search button that displays the total number of results along with a link to view the results. Click the link to view the data in the database.</p>
      <p>If you encounter any issues, take a look at the <router-link :to="{name: 'help'}">troubleshooting guide</router-link>.</p>
    </PageSection>
    <Section id="variantdb-search-forms" aria-labelledby="variantdb-search-patients-title">
      <div class="search-form-container">
        <FormContainer>
          <Form id="variantdb-search-patients-form" title="Search by Patient Information">
            <FormSection>
              <SearchInput
                id="UMCGnr"
                label="Search by MDN/UMCG number"
                description="e.g., 012345"
                @search="(value) => patientFilters.umcg = value"
              />
            </FormSection>
            <FormSection>
              <SearchInput
                id="DNAnumr"
                label="Search by DNA number"
                description="e.g., DNA-012345"
                @search="(value) => patientFilters.belongsToSample = value"
              />
            </FormSection>
            <FormSection>
              <SearchInput
                id=""
                label="Search by test code"
                description="e.g., NX229"
                @search="(value) => patientFilters[`belongsToSamplePreparation.belongsToLabProcedure`] = value"
              />
            </FormSection>
            <SearchButton id="variantdb-search-patients" @click="searchPatients" />
          </Form>
          <SearchResultsBox
            label="Unable to retrieve records"
            :isPerformingAction="patientSearchResults.isSearching"
            :actionWasSuccessful="patientSearchResults.wasSuccessful"
            :actionHasFailed="patientSearchResults.hasFailed"
            :actionErrorMessage="patientSearchResults.errorMessage"
            :totalRecordsFound="patientSearchResults.totalRecordsFound"
            :searchResultsUrl="patientSearchResults.resultsUrl"
          />
        </FormContainer>
        <FormContainer>
          <Form id="variantdb-search-variants-form" title="Search by Variant Information">
            <FormSection>
              <SearchInput
                id="gene-name"
                label="Search for Genes"
                description="e.g., BRCA1, TTN, etc."
                @search="(value) => variantFilters.ADLASgeneNames = value"
              />
            </FormSection>
            <FormSection>
              <SearchInput
                id="gene-location"
                label="Search by Location"
                description="Enter chromosome:position; e.g., 9:117684"
                @search="(value) => parseVariantLocation(value)"
              />
            </FormSection>
            <FormSection>
              <FormLegend
                title="Search by Classification Status"
                description="Select one or more option or leave blank"
              />
              <CheckboxGroup>
                <div class="checkbox" v-for="row in classificationTypes" :key="row.value">
                  <input
                    :id="row.value"
                    type="checkbox"
                    :value="row.value"
                    class="checkbox__input"
                    v-model="selectedClassificationTypes"
                    @change="updateClassificationTypes"
                  />
                  <label :for="row.value" class="checkbox__label">
                    {{ row.label }}
                  </label>
                </div>
              </CheckboxGroup>
            </FormSection>
            <FormSection>
              <FormLegend title="Additional Search Options" />
              <CheckboxInput
                id="showVusPlus"
                label="Would you also like to limit results by VUS+?"
                :value="false"
                @change="updateVusPlus"
              />
            </FormSection>
            <SearchButton id="variantdb-search-variants" @click="searchVariants" />
          </Form>
          <SearchResultsBox
            label="Unable to retrieve records"
            :isPerformingAction="variantSearchResults.isSearching"
            :actionWasSuccessful="variantSearchResults.wasSuccessful"
            :actionHasFailed="variantSearchResults.hasFailed"
            :actionErrorMessage="variantSearchResults.errorMessage"
            :totalRecordsFound="variantSearchResults.totalRecordsFound"
            :searchResultsUrl="variantSearchResults.resultsUrl"
          />
        </FormContainer>
      </div>
    </Section>
    <PageSection id="variant-search-all" aria-labelledby="variant-search-all-title">
      <h2 id="variant-search-all-title">Search the Variant Database</h2>
      <p>If you aren't able to find what you are looking for using the above search options, use the form below to search everything in the database.</p>
      <PageForm id="variantdb-search-all-form">
        <PageFormSection>
          <InputSearch
            id="searchAll"
            label="Search all"
            description="Search the entire variant database by MSN/UMCG number, DNA number, chromosome, start or stop position, genes, etc."
            @search="(value) => searchAllFilters.query = value"
          />
        </PageFormSection>
        <ButtonSearch id="variantdb-search-all" @click="searchAll"/>
        <SearchResultsBox
          label="Unable to retrieve records"
          :isPerformingAction="searchAllResults.isSearching"
          :actionWasSuccessful="searchAllResults.wasSuccessful"
          :actionHasFailed="searchAllResults.hasFailed"
          :actionErrorMessage="searchAllResults.errorMessage"
          :totalRecordsFound="searchAllResults.totalRecordsFound"
          :searchResultsUrl="searchAllResults.resultsUrl"
        />
      </PageForm>
    </PageSection>
  </Page>
  <AppFooter />
</template>

<script>
import { Page, PageHeader, PageSection, PageForm, PageFormSection, ButtonSearch, InputSearch } from 'rd-components'
import SearchResultsBox from '@/components/SearchResultsBox.vue'
import AppFooter from '@/components/AppFooter.vue'
import pageHeaderImage from '@/assets/cosas-page-header.jpg'
import {
  fetchData,
  objectToUrlFilterArray,
  removeNullObjectKeys,
  initSearchResultsObject,
  setDataExplorerUrl,
  setSearchAllUrl
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
    SearchResultsBox,
    AppFooter,
  },
  data () {
    return {
      pageHeaderImage: pageHeaderImage,
      includeVusPlus: false,
      searchAllResults: initSearchResultsObject(),
      patientSearchResults: initSearchResultsObject(),
      variantSearchResults: initSearchResultsObject(),
      searchAllFilters: {
        query: null
      },
      patientFilters: {
        umcg: null,
        belongsToSample: null,
        'belongsToSamplePreparation.belongsToLabProcedure': null
      },
      variantFilters: {
        '%23CHROM': null,
        ADLASgeneNames: null,
        classificationStaf: null
      },
      locationFilter: null,
      selectedClassificationTypes: [],
      classificationTypes: [
        { value: '1', label: 'Benign' },
        { value: '2', label: 'Likely Benign' },
        { value: '3', label: 'Variant of Uncertain Significance (VUS)' },
        { value: '4', label: 'Likely Pathogenic' },
        { value: '5', label: 'Pathogenic' },
        { value: '6', label: 'Other' }
      ]
    }
  },
  methods: {
    parseVariantLocation (value) {
      if (value !== null && value !== '') {
        const locationValue = value.split(',')[0]
        const location = locationValue.split(':')
        if (location.length > 0) {
          const chromosome = location[0]
          const position = location[1]
          const dataExplorerParam = `(start=le=${position};start=ge=${position})`
          this.locationFilter = dataExplorerParam
          this.variantFilters['%23CHROM'] = chromosome
        }
      } else {
        this.locationFilter = null
        this.variantFilters['%23CHROM'] = null
        this.variantFilters.start = null
      }
    },
    updateVusPlus () {
      this.includeVusPlus = !this.includeVusPlus
      if (this.includeVusPlus) {
        this.variantFilters.vusplus = this.includeVusPlus.toString()
      } else {
        this.variantFilters.vusplus = null
      }
    },
    updateClassificationTypes () {
      this.variantFilters.classificationStaf = this.selectedClassificationTypes.join()
    },
    resetSearchResultsObject (object) {
      this[object] = initSearchResultsObject()
    },
    throwSearchResultsError (object, errorMessage) {
      this[object].isSearching = false
      this[object].wasSuccessful = false
      this[object].hasFailed = true
      this[object].errorMessage = errorMessage
    },
    searchAll () {
      this.resetSearchResultsObject('searchAllResults')
      this.searchAllResults.isSearching = true
      const apiParams = `*=q="${this.searchAllFilters.query}"`
      const apiUrl = `/api/v2/variantdb_variant?q=${apiParams}`

      Promise.all([
        fetchData(apiUrl)
      ]).then(response => {
        const data = response[0]
        const totalRecordsFound = data.total
        this.searchAllResults.totalRecordsFound = totalRecordsFound
        this.searchAllResults.wasSuccessful = true
        
        if (totalRecordsFound > 0) {
          const url = setSearchAllUrl('variantdb_variant', this.searchAllFilters.query)
          this.searchAllResults.resultsUrl = url
        }
        this.searchAllResults.isSearching = false
      }).catch(error => {
        this.throwSearchResultsError('searchAllResults', error.message)
      })
    },
    searchPatients () {
      this.resetSearchResultsObject('patientSearchResults')
      this.patientSearchResults.isSearching = true

      const filters = removeNullObjectKeys(this.patientFilters)
      const apiParams = objectToUrlFilterArray(filters)
      const apiUrl = `/api/v2/variantdb_variant?q=${apiParams.join(';')}`
      
      Promise.all([
        fetchData(apiUrl)
      ]).then(response => {
        const data = response[0]
        const totalRecordsFound = data.total
        this.patientSearchResults.totalRecordsFound = totalRecordsFound
        this.patientSearchResults.wasSuccessful = true
        
        if (totalRecordsFound > 0) {
          this.patientSearchResults.resultsUrl = setDataExplorerUrl('variantdb_variant', apiParams)
        }
        this.patientSearchResults.isSearching = false
      }).catch(error => {
        this.throwSearchResultsError('patientSearchResults', error.message)
      })
    },
    searchVariants () {
      this.resetSearchResultsObject('variantSearchResults')
      this.variantSearchResults.isSearching = true
      
      const filters = removeNullObjectKeys(this.variantFilters)
      const apiParams = objectToUrlFilterArray(filters)
      if (this.locationFilter !== null) {
        apiParams.push(this.locationFilter)
      }
      const apiUrl = `/api/v2/variantdb_variant?q=${apiParams.join(';')}`
      
      Promise.all([
        fetchData(apiUrl)
      ]).then(response => {
        const data = response[0]
        const totalRecordsFound = data.total
        this.variantSearchResults.totalRecordsFound = totalRecordsFound
        this.variantSearchResults.wasSuccessful = true
        
        if (totalRecordsFound > 0) {
          const url = setDataExplorerUrl('variantdb_variant', apiParams)
          this.variantSearchResults.resultsUrl = url.replace('%2523CHROM', '%23CHROM')
        }
        this.variantSearchResults.isSearching = false
      }).catch(error => {
        this.throwSearchResultsError('variantSearchResults', error.message)
      })
    }
  }
}

</script>