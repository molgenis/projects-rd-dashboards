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
      <PageSection id="task-highlights" class="background-gray-050" :verticalPadding="2" width="large">
        <DataValueHighlights          
          title="summary of tasks"
          :showTitle="false"
          :values="tasksummary.values"
          :labels="tasksummary.labels"
        />
      </PageSection>
      <PageSection>
        <h2>View Tasks</h2>
        <p>View current and past tasks. You can view all tasks in one table or split them into separate tables by project or status. You may also sort tables.</p>
        <PageForm title="Customise Layout">
          <div class="sort-by-form">
            <PageFormSection>
              <InputLabel
                id="arrangeTables"
                label="Arrange tables by"
              />
              <select
                id="arrangeTables"
                class="input-sortby"
                @change="(event) => updateArrangeBy(event.target.value)"
              >
                <option value="all" selected>All</option>
                <option value="project">Project</option>
                <option value="status">Status</option>
              </select>
            </PageFormSection>
            <PageFormSection>
              <InputLabel
                id="sortTables"
                label="Sort data by"
              />
              <select
                id="sortTables"
                class="input-sortby"
                @change="(event) => updateSortBy(event.target.value)"
              >
                <option value="name" selected>Name</option>
                <option value="project">Project</option>
                <option value="status">Status</option>
                <option value="tags">Tags</option>
                <option value="date.assigned">Date Assigned</option>
                <option value="date.started">Date Started</option>
                <option value="date.ended">Date Ended</option>
                <option value="duration">Duration</option>
              </select>
              <div class="checkbox">
                <label for="reverseSort">
                  <input id="reverseSort" type="checkbox" @change="(event) => reverseSortData(event.target.checked)"/>
                  Sort in descending order
                </label>
              </div>
            </PageFormSection>
            <PageFormSection class="form-buttons">
              <p>Additional actions</p>
              <ActionLink href="/menu/data/dataexplorer?entity=pm_todo&hideselect=true" class="btn-main-actions">
                View Source Data
              </ActionLink>
              <ActionLink href="/plugin/data-row-edit/pm_todo" class="btn-main-actions">
                Add New Task
              </ActionLink>
            </PageFormSection>
          </div>
        </PageForm>
      </PageSection>
      <PageSection width="large">
        <div class="page-section padding-v-2" v-for="dataset in Object.keys(datasets)" :key="dataset">
          <DataTable
            :tableId="`table-${dataset.toLowerCase().replaceAll(' ','-')}`"
            :data="datasets[dataset]"
            :columnOrder="[
              'project',
              'name',
              'status',
              'date.assigned',
              'date.started',
              'date.ended',
              'duration',
              'tags',
              'options'
            ]"
            :caption="`${dataset} Tasks`"
            :renderHtml="true"
          />
        </div>
      </PageSection>
    </div>
  </Page>
</template>

<script>
import HeaderImage from '@/assets/header.jpg'
import {
  ActionLink,
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
  reverseSortData,
  sortData,
} from '$shared/js/utils.js'

export default {
  components: {
    ActionLink,
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
      tasksummary: {},
      arrangeBy: 'all',
      sortBy: 'name',
      reverseSort: false,
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
    arrangeTables () {
      this.datasets = {}
      const groups = [...new Set(this.rawdatasets.map(row => row[this.arrangeBy]))]
      for (let index = 0; index < groups.length; index++) {
        const filteredData = subsetData(this.rawdatasets, this.arrangeBy, groups[index])
        const sortedData = this.reverseSort
          ? reverseSortData(filteredData, this.sortBy)
          : sortData(filteredData, this.sortBy)
        this.datasets[groups[index]] = sortedData
      }
    },
    updateTables () {
      if (this.arrangeBy === 'all') {
        this.datasets = {
          'all': this.reverseSort
            ? reverseSortData(this.rawdatasets, this.sortBy)
            : sortData(this.rawdatasets, this.sortBy)
        }
      } else {
       this.arrangeTables() 
      }
    },
    updateArrangeBy (value) {
      this.arrangeBy = value
      this.updateTables()
    },
    updateSortBy (value) {
      this.sortBy = value
      this.updateTables()
    },
    reverseSortData (value) {
      this.reverseSort = value
      this.updateTables()
    },
    setRowHtml (obj) {
      return `
        <div class="row-options">
          <a href="menu/data/dataexplorer?entity=pm_todo&hideselect=true&filter=id==${obj.id}">
            <span class="visually-hidden">view</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="heroicons magnifying-glass-circle"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </a> 
          <a href="/plugin/data-row-edit/pm_todo/${obj.id}">
            <span class="visually-hidden">edit</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="heroicons pencil-square"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>
          </a> 
        </div>
      `
    }
  },
  mounted () {
    Promise.resolve(
      fetchData('/api/v2/pm_todo')
    ).then(response => {
      this.rawdatasets = this.flattenData(response.items)
      this.rawdatasets = this.rawdatasets.map(row => {
        row.options = this.setRowHtml(row)
        if (row.dateTimeAssigned) {
          row.dateTimeAssigned = new Date(row.dateTimeAssigned)
          row['date.assigned'] = row.dateTimeAssigned.toLocaleDateString()
        }
        if (row.dateTimeStarted) {
          row.dateTimeStarted = new Date(row.dateTimeStarted)
          row['date.started'] = row.dateTimeStarted.toLocaleDateString()
        }
        if (row.dateTimeEnded) {
          row.dateTimeEnded = new Date(row.dateTimeEnded)
          row['date.ended'] = row.dateTimeEnded.toLocaleDateString()
        }
        if (row.dateTimeStarted && row.dateTimeEnded) {
          const diff = Math.abs(row.dateTimeEnded.getTime() - row.dateTimeStarted.getTime())
          const daysdiff = Math.floor(diff / (1000 * 60 * 60 * 24))
          row.duration = daysdiff
        }
        return {...row}
      }) 
 
      const categories = ['not yet started', 'in progress', 'in review', 'completed', 'blocked']
      const values = categories.map(category => this.rawdatasets.filter(row => row.status === category).length)
      this.tasksummary = {
        'values': values,
        'labels': [
          'assigned',
          'in progress',
          'in review',
          'completed',
          'blocked',
        ]
      }

      this.updateTables()
      
      this.loading = false
    }).catch(error => {
      this.loading = false
      this.hasError = true
      const err = JSON.parse(error.message)
      this.error = `${err.message} (${err.status}): ${err.url}`
      throw new Error(error)
    })
  }
}

</script>

<style lang="scss">

#task-highlights {
  .data-highlight {
    background-color: $green-700;
    padding: 0.8em 1em;
    .data-label {
      margin-bottom: 2px;
      font-size: 11pt;
    }
    .data-value::after {
      font-size: 21pt;
    }
  }
}

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

.row-options {
  display: flex;
  flex-direction: row;
  gap: 4px;
  a {
    text-align: center;
    text-decoration: none;
    background-color: $green-100;
    $size: 26px;
    height: $size;
    width: $size;
    border-radius: 50%;
    color: $green-900;
  }
}

.sort-by-form {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: flex-start;
  gap: 3em;
  
  & > div {
    flex-grow: 1;
  }
  
  .form-buttons {
    p {
      margin: 0;
    }

    .action-link {
      margin: 0;
      margin-bottom: 12px;
      font-size: 11pt;
      text-decoration: none;
    }
  }
}

.input-sortby {
  display: block;
  width: 100%;
  padding: 8px;
  background: none;
  background-color: $gray-000;
  border: solid 2px $green-300;
  border-radius: 6px;
  box-shadow: inset 0 0 2px 2px $gray-transparent-050;
}

.checkbox {
  margin: 0.5em 0;
  label {
    font-size: 14pt;
  }
}

</style>