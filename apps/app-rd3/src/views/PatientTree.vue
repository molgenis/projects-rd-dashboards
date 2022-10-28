<template>
  <Page>
    <PageHeader
      title="Solve-RD"
      subtitle="Patient Tree"
    />
    <PageSection id="patient-tree" aria-labelledby="patient-tree-title" :verticalPadding="2">
      <h2 id="patient-tree-title">Patient Tree</h2>
      <p>The <strong>Patient Tree</strong> visualizes the connection between patients, samples, and experiments. Search for records using one or more subject- or family identifiers. To search for more than one identifier, separate values by a comma like so "firstID, secondID,...". At the top level, are patients. Click a patient ID to view all linked samples. Click a sample ID to view all linked experiments.</p>
      <div class="tree-container">
        <PageForm id="patient-tree-search" title="Search for patients or families" class="aside">
          <PageFormSection>
            <MessageBox type="error" v-if="validation.hasError" :showIcon="false" style="margin-top:0;">
              <p v-html="validation.message"></p>
            </MessageBox>
            <InputSearch
              id="search-patient-id"
              label="Search by Subject ID" 
              ref="formInputSubjectID"
              description="Enter one or more identifier"
              @search="(value) => updateSubjectID(value)"
            />
          </PageFormSection>
          <PageFormSection>
            <InputSearch
              id="search-family-id"
              ref="formInputFamilyID"
              label="Search by Family ID"
              description="Enter one or more identifier"
              @search="(value) => updateFamilyID(value)"
            />
          </PageFormSection>
          <ButtonSearch id="search" @click="getData" />
        </PageForm>
        <div class="main">
          <MessageBox v-if="request.hasError" type="error">
            <p v-html="request.message"></p>
          </MessageBox>
          <MessageBox v-else-if="!request.hasError && !request.isLoading && !treedata.length">
            <p>Search for subjects or families to display the patient tree.</p>
          </MessageBox>
          <TreeView id="tree" :data="treedata" v-else/>
        </div>
      </div>
    </PageSection>
  </Page>
  <SolveRdFooter />
</template>

<script>
import {
  Page,
  PageHeader,
  PageSection,
  PageForm,
  PageFormSection,
  InputSearch,
  MessageBox,
  ButtonSearch
} from 'rd-ui-components'
import SolveRdFooter from '../components/SolveRdFooter.vue'
import TreeView from '../components/TreeView.vue'

import {
  fetchData,
  removeNullObjectKeys,
  objectToUrlFilterArray
} from '../utils/utils.js'

export default {
  name: 'patient-tree',
  components: {
    Page,
    PageHeader,
    PageSection,
    PageForm,
    PageFormSection,
    InputSearch,
    MessageBox,
    ButtonSearch,
    TreeView,
    SolveRdFooter
  },
  data () {
    return {
      endpoint: '/api/v2/rd3stats_treedata',
      filters: {
        subjectID: null,
        familyID: null
      },
      validation: {
        hasError: false,
        message: null
      },
      request: {
        isLoading: false,
        hasError: false,
        message: null
      },
      treedata: []
    }
  },
  methods: {
    resetError (value) {
      if (value.length) {
        this.validation.hasError = false
        this.request.hasError = false
        this.request.message = null
      }
    },
    updateSubjectID (value) {
      this.filters.subjectID = value
      this.resetError(value)
    },
    updateFamilyID (value) {
      this.filters.familyID = value
      this.resetError(value)
    },
    getData () {
      const userinput = removeNullObjectKeys(this.filters)
      if (Object.keys(userinput).length === 0) {
        this.validation.hasError = true
        this.validation.message = 'All fields are blank. Enter one or more identifier to view the patient tree.'
      } else {
        this.request.isLoading = true
        const filters = objectToUrlFilterArray(userinput)
        const url = this.endpoint + '?q=' + filters
        
        Promise.resolve(fetchData(url)).then(response => {
          const treedata = response.items
          
          if (treedata.length === 0) {
            const msg = `No results returned with the search parameters ${filters}`
            throw new Error(msg)
          }
          this.treedata = treedata
          this.request.isLoading = false
        }).catch(error => {
          console.log(error)
          this.request.isLoading = false
          this.request.hasError = true
          
          const err = JSON.parse(error.message)
          if (Math.round(err.status / 100) === 4 ) {
            this.request.message = 'Unable to retrieve data. Please <a href="/login">Sign in</a> to continue'
          } else {
            this.request.message = `${err.message} (${err.status})`
          }
          
          this.$refs.formInputSubjectID.value = ''
          this.$refs.formInputFamilyID.value = ''
        })
      }
    }
  }
}
</script>

<style lang="scss">
#patient-tree {
  background-color: $gray-050;
}

.tree-container {
  display: grid;
  grid-template-columns: 1.5fr 2fr;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 2em;
  
  .message-error {
    font-size: 12pt;
  }
  
  .aside, .main {
    background-color: $gray-000;
  }
  
  .main {
    box-sizing: content-box;
    padding: 1.5em;
    border-radius: 6px;
  }
}
</style>
