<template>
  <Page id="pm-dashboard">
    <PageHeader
      title="Project Managment"
      subtitle="My Dashboard"
      height="medium"
      :imageSrc="HeaderImage"
    />
    <LoadingScreen v-if="loading" />
    <div class="page-section padding-h-2 padding-v-1" v-else-if="!loading && hasError">
      <MessageBox type="error">
        <p>Unable to retrieve data {{ error }}</p>
      </MessageBox>
    </div>
    <div v-else-if="!hasError && !loading">
      <PageSection class="background-gray-050" :verticalPadding="2" width="large">
        <DataValueHighlights
          title="summary of tasks"
          :showTitle="false"
          :values="tasksummary.values"
          :labels="tasksummary.labels"
        />
      </PageSection>
      <PageSection>
        <form>
          <InputLabel
            id="sortby"
            label="Select a category"
            description="Select a column to arrange the order of the tables"
          />
          <select id="sortby" @change="(event) => updateTables(event.target.value)">
            <option value="project">Project</option>
            <option value="status" selected>Status</option>
          </select>
        </form>
        <div class="page-section padding-v-2" v-for="dataset in Object.keys(datasets)" :key="dataset">
          <DataTable
            :tableId="`table-${dataset.toLowerCase().replaceAll(' ','-')}`"
            :data="datasets[dataset]"
            :columnOrder="['project','name','status','dateTimeStarted','dateTimeEnded','tags']"
            :caption="`${dataset} Tasks`"
          />
        </div>
      </PageSection>
    </div>
  </Page>
</template>

<script>
import HeaderImage from '@/assets/header.jpg'
import {
  DataTable,
  DataValueHighlights,
  InputLabel,
  LoadingScreen,
  MessageBox,
  Page,
  PageHeader,
  PageSection,
  PageForm,
  PageFormSection,
} from 'rd-components'

import {
  fetchData,
  subsetData,
  sortData,
} from '$shared/js/utils.js'

export default {
  components: {
    DataTable,
    DataValueHighlights,
    InputLabel,
    LoadingScreen,
    MessageBox,
    Page,
    PageHeader,
    PageSection,
    PageForm,
    PageFormSection
},
  data () {
    return {
      HeaderImage: HeaderImage,
      loading: true,
      hasError: false,
      error: null,
      rawdatasets: null,
      datasets: {},
      tasksummary: {}
    }
  },
  methods: {
    flattenData(data) {
      return data.map(row => {
        const rowKeys = Object.keys(row)
        const newrow = {}
        rowKeys.map(key => {
          if (row[key] instanceof Object) {
            if (row[key] instanceof Array) {
              const val = row[key].map(subrow => subrow.value || subrow.name)
              newrow[key] = val.join(',')
            } else {
              newrow[key] = row[key].value
            }
          } else {
            newrow[key] = row[key]
          }
        })
        return newrow
      })
    },
    updateTables(by) {
      this.datasets = {}
      const groups = [...new Set(this.rawdatasets.map(row => row[by]))]
      for (let index = 0; index < groups.length; index++) {
        const filteredData = subsetData(this.rawdatasets, by, groups[index])
        const sortedData = sortData(filteredData, by)
        this.datasets[groups[index]] = sortedData
      }
    }
  },
  mounted () {
    Promise.resolve(
      fetchData('/api/v2/pm_todo')
    ).then(response => {
      this.rawdatasets = this.flattenData(response.items)
      this.updateTables('status')
      
      this.tasksummary = {
        'values': [
          this.rawdatasets.filter(row => row.status === 'completed').length,
          this.rawdatasets.filter(row => row.status === 'in review').length,
          this.rawdatasets.filter(row => row.status === 'blocked').length,
          this.rawdatasets.filter(row => row.status === 'not yet started').length
        ],
        'labels': [
          'completed',
          'reviewing',
          'blocked',
          'assigned'
        ]
      }
      
      this.loading = false
    }).catch(error => {
      // this.loading = false
      // this.hasError = true
      // const err = JSON.parse(error.message)
      // this.error = `${err.message} (${err.status}): ${err.url}`
      throw new Error(error)
    })
  }
}

</script>

<style lang="scss">
.d3-table {
  caption {
    text-transform: capitalize;
  }
  tbody {
    tr {
      td {
        line-height: 1.4;
      }
    }
  }
}

</style>