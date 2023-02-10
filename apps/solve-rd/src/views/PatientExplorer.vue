<template>
  <Page id="page-patient-explorer" class="page-bkg-light-gray">
    <PageHeader
      class="solverd-header"
      title="Solve-RD"
      subtitle="Patient Explorer"
      height="medium"
      :imageSrc="headerImage"
    />
    <PageSection id="patient-explorer" aria-labelledby="patient-explorer-title" :verticalPadding="2">
      <h2 id="patient-explorer-title">Patient Explorer</h2>
      <p>The <strong>Patient Explorer</strong> visualizes the connection between patients, samples, and experiments. Search for records using one or more subject- or family identifiers. To search for more than one identifier, separate values by a comma like so "firstID, secondID,...". At the top level, are patients. Click a patient ID to view all linked samples. Click a sample ID to view all linked experiments.</p>
      <div class="flex-container">
        <PageForm id="patient-explorer-search" title="Search RD3" class="aside" @submit.prevent>
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
          <button id="clear" class="button button-secondary" @click="clearForm">
            <span>Clear</span>
          </button>
        </PageForm>
        <div class="main">
          <MessageBox v-if="request.hasError" type="error" style="font-size: 14pt;">
            <p v-html="request.message"></p>
          </MessageBox>
          <MessageBox v-else-if="!request.hasError && !request.isLoading && !treedata.length" style="background-color: #ffffff; font-size: 14pt;margin: 0;">
            <p>To start the patient explorer, search for subjects and families using one or more identifier.</p>
          </MessageBox>
          <div v-else>
            <div class="tree-controls">
              <button id="expand-all" class="button button-text-only" @click="onclick" aria-controls="tree" :aria-expanded="expandAll">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="button-icon">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M18 12H6" v-if="expandAll" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" v-else />
                </svg>
                <span>{{ expandAll ? 'Close all' : 'Expand all' }}</span>
              </button>
            </div>
            <TreeView id="tree" :data="treedata" ref="tree"/>
          </div>
        </div>
      </div>
    </PageSection>
  </Page>
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
} from 'rd-components'
import TreeView from '../components/TreeView.vue'
import { fetchData, removeNullObjectKeys, objectToUrlFilterArray } from '$shared/js/utils.js'
import headerImage from '@/assets/solverd-bkg-header.jpg'

export default {
  components: {
    Page,
    PageHeader,
    PageSection,
    PageForm,
    PageFormSection,
    InputSearch,
    MessageBox,
    ButtonSearch,
    TreeView
  },
  data () {
    return {
      headerImage: headerImage,
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
      treedata: [],
      expandAll: false      
    }
  },
  methods: {
    clearForm () {
      this.$refs.formInputSubjectID.value = ''
      this.$refs.formInputFamilyID.value = ''
      this.filters = {subjectID: null, familyID: null}
    },
    collapseAll () {
      const tree = this.$refs.tree
      const treeItems = tree.$refs.treeItem
      treeItems.map(treeitem => {
        treeitem.isOpen = this.expandAll
        const subitems = treeitem.$refs.treeItem
        subitems.map(subtreeitem => {
          subtreeitem.isOpen = this.expandAll
        })
      })
    },
    onclick () {
      this.expandAll = !this.expandAll
      this.collapseAll()
    },
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
      if (typeof this.$refs.tree != 'undefined') {
        this.expandAll = false
        this.collapseAll()
      }

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
          
          this.clearForm()
        })
      }
    }
  }
}
</script>

<style lang="scss">

#patient-explorer {
  background-color: $gray-050;
}

.tree-controls {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.flex-container {
  display: grid;
  grid-template-columns: 1.3fr 2fr;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 2em;
  
  .message-error {
    font-size: 12pt;
  }
  
  .aside {
    background-color: $gray-000;
    padding: 1.5em;
    
    @media screen and (min-width: 972px) {
      position: sticky;
      top: 1.5em;
    }
    
  }
  .page-form {
    .form-sections {
      .form-section {
        padding-bottom: 0.4em;
      }
    }
    .button-search {
      margin-bottom: 0.7em;
    }
  }
  

  .main {
    box-sizing: content-box;
    
    .tree__container {
      border-radius: 6px;
      padding: 1.5em;
      background-color: $gray-000;
    }
  }
}
</style>
