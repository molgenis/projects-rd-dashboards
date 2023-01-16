<template>
  <Page id="page-browse">
    <PageHeader
      class="gonl-page-header"
      title="Genome of the Netherlands"
      subtitle="Browse Data"
      titlePositionX="center"
      titlePositionY="center"
      height="large"
      :imageSrc="pageHeader"
    />
    <PageSection id="browse-search" :verticalPadding="2" aria-labelledby="browse-search-title">
      <h2 id="browse-search-title">Browse Data</h2>
      <p>Using the form below, you may search for counts of alternative alleles and genotypes. If you would like to request access to the data, please view the <router-link :to="{name: 'request'}">Request Access</router-link> page for more information.</p>
      <PageForm id="search-form" title="Browse Data">
      <span class="input-error-message" v-if="form.error">{{ form.error }}</span>
        <div class="form-input">
          <InputLabel id="chromosome" label="Select a chromosome" />
          <select id="chromosome" @change="(e) => updateChromosome(e.target.value)">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
            <option value="21">21</option>
            <option value="22">22</option>
          </select>
        </div>
        <div class="form-input">
          <InputLabel
            id="start"
            label="Start position"
            description="Enter a number; e.g.,117684"
          />
          <span class="input-error-message" v-if="start.error">{{ start.error }}</span>
          <input
            id="start"
            type="number"
            class="form-control"
            @change="(e) => updateStart(e.target.value)"
          />
        </div>
        <div class="form-input">
          <InputLabel
            id="stop"
            label="Stop position"
            description="Enter a number; e.g., 117684"
          />
          <span class="input-error-message" v-if="stop.error">{{ stop.error }}</span>
          <input
            id="stop"
            type="number"
            class="form-control"
            @change="(e) => updateStop(e.target.value)"
          />
        </div>
        <ButtonSearch id="search" @click="search" />
      </PageForm>
    </PageSection>
  </Page>
  <AppFooter />
</template>

<script>
import { Page, PageHeader, PageSection, PageForm, InputLabel, ButtonSearch } from 'rd-components'
import AppFooter from '@/components/AppFooter.vue'
import pageHeader from '@/assets/gonl-pg-header-2.jpg'

export default {
  components: {
    Page,
    PageHeader,
    PageSection,
    PageForm,
    InputLabel,
    ButtonSearch,
    AppFooter
  },
  data () {
    return {   
      pageHeader: pageHeader,   
      chromosome: null,
      start: {
        value: null,
        error: null
      },
      stop: {
        value: null,
        error: null
      },
      form: {
        error: null
      }
    }
  },
  methods: {
    updateChromosome (value) {
      this.chromosome = parseInt(value)
    },
    updateStart (value) {
      this.start.error = null
      const start = parseInt(value)
      if (start < 0) {
        this.start.error = 'Start position must be greater than 0'
      }
      
      if (this.stop.value && (start > this.stop.value)) {
        this.start.error = 'Start position cannot be larger than stop position'
      }
      if (start > -1) {
        this.start.value = start
      }
    },
    updateStop (value) {
      this.stop.error = null
      const stop = parseInt(value)
      
      if (this.start.value && (this.start.value > stop)) {
        this.stop.error = 'Stop position cannot be less than start position'
      }
      
      if (stop < 0) {
        this.stop.error = 'Stop position must be greater than 0'
      }

      if (stop > 250000000) {
        this.stop.error = 'Stop position exceeds max chromosome position of ~249,000,000'
      }
      
      this.stop.value = stop
    },
    search () {
      this.form.error = null
      console.log(this.start.value, this.stop.value)
      if (this.start.error || this.stop.error) {
        this.form.error = 'There is an issue with one or more fields. Please fix and try again.'
      } else if (this.start.value === null || this.stop.value === null) {
        this.form.error = 'One or more fields are blank'
      } else {
        const baseUrl = '/menu/main/dataexplorer?'
        const entityParam = `entity=gonl_chr${this.chromosome}`
        const filterParam = `&filter=(POS=ge=${this.start.value};POS=le=${this.stop.value})`
        const options = '&hideselect=true&mod=data'
        const searchUrl = [baseUrl, entityParam, filterParam, options].join('')
        window.location.replace(searchUrl)
      }
    }
  }
}
</script>

<style lang="scss">
#browse-search {
  background-color: $blue-050;
}

#search-form {
  max-width: 500px;
  margin: 0 auto;
  background-color: $gray-000;
  box-shadow: none;
  border-radius: 0;
  
  .form-input {
    margin: 12px 0;
    
    input {
      display: block;
      width: calc(100% - 19px);
      background: none;
      border: none;
      border: 1px solid $gray-200;
      padding: 6px;
      padding-left: 12px;
      border-radius: 4px;
      box-shadow: $box-shadow-inset;
      margin: 12px 0;
    }
    
  }
  .input-error-message {
    color: $red-800;
    font-size: 11pt;
    font-weight: bold;
  }
}
</style>
