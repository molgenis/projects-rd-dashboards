<template>
  <Page id="orgmanager">
    <PageHeader
      title="FDHub"
      subtitle="Find and add new organisations"
      :imageSrc="headerImage"
      height="large"
    />
    <PageSection aria-labelledby="welcome-title" :verticalPadding="2">
      <h2 id="welcome-title">Find Organisations</h2>
      <p>
        On this page, you can search for organisations in the
        <a href="https://ror.org/">ROR</a> registry and them to the
        <strong>Organistations</strong> table. This allows you to
        standardise institution names and save project specific affiliations.
      </p>
      <PageForm 
        id="organisationSearch"
        title="Find an organisation"
      >
        <label for="orgsearch" class="input-label">
          <span>Search for an institution by name</span>
          <span class="input-description">
            E.g., Amsterdam, VUMC, etc.
          </span>
        </label>
        <div id="orgsearch-container"></div>
        <MessageBox v-if="resultError">
          <p>Error retrieving records:</p>
          <span>{{ error }}</span>
        </MessageBox>
      </PageForm>
      <PageForm
        id="orgreview"
        title="Review Organisation"
        description="Review the information about the selected organisation and click confirm to add the record to the database."
        v-if="!resultError && Object.hasOwn(selection, 'name')"
      >
        <fieldset class="ror-meta">
          <legend>ROR Metadata</legend>
          <div>
            <label for="ror-id">Identifier</label>
            <input id="ror-id" v-model="selection.uri" readonly />
          </div>
          <div>
            <label for="ror-code">Code</label>
            <input id="ror-code" v-model="selection.code" readonly />
          </div>
        </fieldset>
        <fieldset class="org-details">
          <legend>Organisation details in ROR</legend>
          <div class="name">
            <label for="ror-name">Name</label>
            <input id="ror-name" v-model="selection.name" readonly />
          </div>
          <div class="aliases">
            <label for="ror-name-alt">Aliases</label>
            <input id="ror-name-alt" v-model="selection.aliases" readonly />
          </div>
          <div class="acronyms">
            <label for="ror-acronyms">Acronyms</label>
            <input id="ror-acronyms" v-model="selection.acronyms" readonly />
          </div>
          <div class="city">
            <label for="ror-city">City</label>
            <input id="ror-city" v-model="selection.city" readonly />
          </div>
          <div class="country">
            <label for="ror-country">Country</label>
            <input id="ror-country" v-model="selection.country" readonly />
          </div>
          <div class="country-code">
            <label for="ror-country-code">Country Code</label>
            <input
              id="ror-country-code"
              v-model="selection.countryCode"
              readonly
            />
          </div>
          <div class="latitude">
            <label for="ror-lat">Latitude</label>
            <input id="ror-lat" v-model="selection.latitude" readonly />
          </div>
          <div class="longitude">
            <label for="ror-lng">Longitude</label>
            <input id="ror-lng" v-model="selection.longitude" readonly />
          </div>
        </fieldset>
        <fieldset class="org-project">
          <legend>Link with project</legend>
          <div class="org-project-name">
            <label for="project-name">
              Project name
              <span>Name of the project. E.g. "Consortium for X"</span>
            </label>
            <input id="project-name" v-model="projects.project" />
          </div>
          <div class="org-project-identifier">
            <label for="project-identifier">
              Organisation Identifier
              <span>An code that identifies an organisation within the context of the project</span>
            </label>
            <input id="project-identifier" v-model="projects.identifier" />
          </div>
          <div class="org-project-org">
            <label for="project-organisation">
              Organisation Name
              <span>Name of the organisation within the context of the project if different from ROR entry</span>
            </label>
            <input id="project-organisation" v-model="projects.name" />
          </div>
          <div class="org-project-code">
            <label for="project-organisation">
              Organisation
              <span>ROR Code</span>
            </label>
            <input
              id="project-identifier"
              v-model="projects.organisation"
              readonly
            />
          </div>
        </fieldset>
        <div class="form-controls">
          <button @click="resetForm" class="button button-clear">
            Reset
          </button>
          <button @click="saveData" class="button button-save">
            Save
            <PlusCircleIcon />
          </button>
        </div>
        <div
          class="message-box-container"
          v-if="loading || importError || wasImported"
        >
          <MessageBox v-if="!importError && loading">
            Saving data...
          </MessageBox>
          <MessageBox type="error" v-else-if="importError && !loading">
            <p>Failed to save data: {{ importError }}</p>
          </MessageBox>
          <MessageBox
            type="success"
            v-else-if="!importError && !loading && wasImported"
          >
            <p>Imported data!</p>
          </MessageBox>
        </div>
      </PageForm>
      <Accordion
        id="output"
        title="API Resonse and Schema"
        v-if="!resultError && Object.hasOwn(apiResponse, 'name')"
      >
        <output class="json-output">
          {{ apiResponse }}
        </output>
      </Accordion>
    </PageSection>
  </Page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  Page,
  PageHeader,
  PageSection,
  MessageBox,
  PageForm,
  Accordion
} from "rd-components";
import { fetchData } from "$shared/js/utils.js";
import accessibleAutocomplete from "accessible-autocomplete";

import { PlusCircleIcon } from "@heroicons/vue/24/outline";
import headerImage from "../assets/orgs-page-header.jpg";


// define main data elements
let results = ref([]);
let selection = ref({});
let projects = ref({});
let variations = ref({});
let apiResponse = ref({});

let resultError = ref(false);
let loading = ref(false);
let importError = ref(false);
let wasImported = ref(false);


function resetForm() {
  results.value = [];
  selection.value = {};
  projects.value = {};
  variations.value = {};
  apiResponse.value = {};
  resultError.value = false;
  loading.value = false;
  importError.value = false;
  wasImported.value = false;
}


// define handler for searching ROR
function searchRor(query, populateResults) {
  resultError.value = false;
  selection.value = {};
  results.value = {};
  wasImported.value = false;
  loading.value = false;
  resultError.value = false;
  
  const url = `https://api.ror.org/organizations?query=${encodeURI(query)}`;
  Promise.resolve(fetchData(url))
    .then(response => {
      const data = response.items;
      const options = data.map(row => row.name);
      results.value = data;
      populateResults(options);
    })
    .catch(error => {
      resultError.value = error;
    });
}

// filter ROR results and init extra columns
function retrieveRorRecord(value) {
  let org = results.value.filter(row => row.name == value)[0];
  apiResponse.value = org

  // init organisations_organisations
  selection.value = {
    code: org.id.split("/").reverse()[0],
    uri: org.id,
    name: org.name,
    aliases: org.aliases.length ? org.aliases.join(", ") : "",
    acronyms: org.acronyms.length ? org.acronyms.join(", ") : "",
    country: org.country.country_name,
    countryCode: org.country.country_code,
    city: org.addresses[0].city,
    latitude: org.addresses[0].lat,
    longitude: org.addresses[0].lng,
    comment: ""
  };

  // init organisations_projects
  projects.value = {
    name: selection.value.name,
    identifier: "",
    project: "",
    organisation: selection.value.code
  };
  
  // init variations
  variations.value = {
    name: "",
    organisation: selection.value.code
  }
}

// save data into an EMX1 entity
async function importData(pkg_entity, data) {
  const url = `/api/v2/${pkg_entity}`;
  const payload = JSON.stringify({ entities: data });

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: payload
  })
  
  if (!response.ok) {
    return Promise.reject(response);
  }  
  return response.json();
}

function saveData() {
  loading.value = true;
  importError.value = false;
  wasImported.value = false;
  
  Promise.resolve(
    importData("organisations_organisations", [selection.value])
  ).then(() => {
    if (projects.value.project != "") {
      importData("organisations_projects", [projects.value])
      
      if (projects.value.name !== selection.value.name) {
        variations.value.name = projects.value.name
        importData("organisations_namevariations", [variations.value])
      }
    }
  })
  .then(() => {
    loading.value = false;
    importError.value = false;
    wasImported.value = true;
  })
  .catch(response => {
    response.json().then((json) => {
      importError.value = json.errors[0].message;
    })
    loading.value = false;
  })
}

onMounted(() => {
  accessibleAutocomplete({
    element: document.querySelector("#orgsearch-container"),
    id: "orgsearch",
    source: searchRor,
    confirmOnBlur: false,
    minLength: 3,
    onConfirm: retrieveRorRecord
  });
});
</script>
