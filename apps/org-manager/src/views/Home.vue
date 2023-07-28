<template>
  <Page id="orgmanager">
    <PageHeader
      title="FDHub"
      subtitle="Find and add new organisations"
      imageSrc="orgs-page-header.jpg"
      height="large"
    />
    <PageSection aria-labelledby="welcome-title" :verticalPadding="2">
      <h2 id="welcome-title">ERN ReCONNET registry Documents</h2>
      <p>
        On this page, you can search for organisations in the
        <a href="https://ror.org/">ROR</a> registry and them to the
        <strong>Organistations</strong> ontology table. This allows you to
        standardise institution affiliations and save project specific metadata.
      </p>
      <form class="page-form" id="organisationSearch">
        <label for="orgsearch" class="input-label">
          <span>Search for an institution by name</span>
          <span class="input-description">
            E.g., Amsterdam, VUMC, etc.
          </span>
        </label>
        <div id="orgsearch-container"></div>
      </form>
      <MessageBox v-if="resultError">
        <p>Error retrieving records:</p>
        <span>{{ error }}</span>
      </MessageBox>
      <PageForm
        id="orgreview"
        title="Review Organisation"
        description="Review the information about the selected organisation and click confirm to add the record to the database."
        v-else-if="!resultError && Object.hasOwn(selection, 'name')"
      >
        <fieldset class="ror-meta">
          <legend>ROR Metadata</legend>
          <div>
            <label for="ror-id">Identifier</label>
            <input id="ror-id" v-model="selection.iri" readonly />
          </div>
          <div>
            <label for="ror-code">Code</label>
            <input id="ror-code" v-model="selection.code" readonly />
          </div>
        </fieldset>
        <fieldset class="org-details">
          <legend>Organisation Details</legend>
          <div>
            <label for="ror-name">
              Name
              <span>Organisation name as defined by ROR</span>
            </label>
            <input id="ror-name" v-model="selection.name" readonly />
          </div>
          <div>
            <label for="ror-name-official">
              Project Offical Name
              <span>
                Enter the official name specified by the relevant project
              </span>
            </label>
            <input
              id="ror-name-official"
              v-model="selection.projectOfficialName"
            />
          </div>
          <div>
            <label for="ror-department">
              Department
              <span
                >Enter a sub-institutional affiliation; e.g., Department of
                Genetics</span
              >
            </label>
            <input id="ror-department" v-model="selection.department" />
          </div>
          <div>
            <label for="ror-alt-ids">
              Alternative Identifiers
              <span>Enter one or more alternative identifiers</span>
            </label>
            <input
              id="ror-alt-ids"
              v-model="selection.alternativeIdentifiers"
            />
          </div>
          <div>
            <label for="ror-name-alt">
              Aliases
              <span>Additional names stored in ROR</span>
            </label>
            <input id="ror-name-alt" v-model="selection.aliases" readonly />
          </div>
        </fieldset>
        <fieldset class="org-location">
          <legend>Location</legend>
          <div>
            <label for="ror-country">Country</label>
            <input
              id="ror-country"
              v-model="selection.country"
              readonly
            />
          </div>
          <div>
            <label for="ror-country-code">Country Code</label>
            <input
              id="ror-country-code"
              v-model="selection.countryCode"
              readonly
            />
          </div>
          <div>
            <label for="ror-city">City</label>
            <input
              id="ror-city"
              v-model="selection.city"
              readonly
            />
          </div>
          <div>
            <label for="ror-lat">Latitude</label>
            <input id="ror-lat" v-model="selection.latitude" readonly />
          </div>
          <div>
            <label for="ror-lng">Longitude</label>
            <input id="ror-lng" v-model="selection.longitude" readonly />
          </div>
        </fieldset>
        <fieldset class="org-extra">
          <legend>Additional Information</legend>
          <div>
            <label for="ror-comment">
              Comment
              <span>
                Enter any additional information or comments about this
                organisation
              </span>
            </label>
            <textarea id="ror-comment" />
          </div>
        </fieldset>
        <div class="form-controls">
          <button @click="storeOrganisations">Save</button>
        </div>
        <div class="message-box-container" v-if="loading || importError || wasImported">
          <MessageBox v-if="!importError && loading">
            Saving data...
          </MessageBox>
          <MessageBox type="error" v-else-if="importError && !loading">
            <p>Failed to save data: {{ importError }}</p>
          </MessageBox>
          <MessageBox type="success" v-else-if="!importError && !loading && wasImported">
            <p>Imported data!</p>
          </MessageBox>
        </div>
      </PageForm>
    </PageSection>
    <PageSection v-if="!resultError && Object.hasOwn(selection, 'name')">
      <h2>ROR API Response + Schema</h2>
      <output class="json-output">
        {{ selection }}
      </output>
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
  PageForm
} from "rd-components";
import { fetchData } from "$shared/js/utils.js";
import accessibleAutocomplete from "accessible-autocomplete";

// define main data elements
let results = ref([]);
let selection = ref({});
let resultError = ref(false);
let loading = ref(false);
let importError = ref(false);
let wasImported = ref(false);

// define handler for searching ROR
function searchRor(query, populateResults) {
  resultError.value = false;
  selection.value = {};
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
  selection.value = {
    code: org.id.split("/").reverse()[0],
    iri: org.id,
    name: org.name,
    projectOfficialName: "",
    aliases: org.aliases.length ? org.aliases.join(", ") : "",
    department: "",
    alternativeIdentifiers: "",
    country: org.country.country_name,
    countryCode: org.country.country_code,
    city: org.addresses[0].city,
    latitude: org.addresses[0].lat,
    longitude: org.addresses[0].lng,
    comment: "",
  }
}

function importData(pkg_entity, data) {
  loading.value = true;
  importError.value = false;
  wasImported.value = false;
  
  const url = `/api/v2/${pkg_entity}`
  const payload = JSON.stringify({ entities: data });
  
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: payload
  })
  .then(response => {
    if (!response.ok) {
      return Promise.reject(response);
    }
    loading.value = false;
    importError.value = false;
    wasImported.value = true;
    return response.json();
  })
  .catch(response => {
    response.json().then((json) => {
      importError.value = json.errors[0].message;
    })
    loading.value = false;
  })
}

function storeOrganisations() {
  importData("organisations_organisations", [selection.value])
}

function initAutoComplete () {
  accessibleAutocomplete({
    element: document.querySelector("#orgsearch-container"),
    id: "orgsearch",
    source: searchRor,
    confirmOnBlur: false,
    minLength: 3,
    onConfirm: retrieveRorRecord
  });
}

onMounted(() => initAutoComplete());
</script>

<style lang="scss">
@import "accessible-autocomplete";

#organisationSearch {
  box-shadow: none;
  padding: 0;
}

#orgreview {
  margin-top: 2em;
  box-shadow: none;
  background-color: $gray-050;

  .form-sections {
    input {
      display: block;
      width: 100%;
      font-size: 12pt;

      &:read-only {
        background-color: $blue-050;
        color: $gray-700;
      }
    }

    fieldset {
      display: grid;
      gap: 0.5em 1.5em;
      margin-top: 1.25em;
      border: none;
      padding: 0;

      legend {
        font-size: 16pt;
        margin-bottom: 0.4em;
      }

      div {
        flex-grow: 1;
        label {
          display: block;
          margin-bottom: 0.2em;
          font-size: 13pt;

          span {
            display: block;
            color: $gray-600;
            font-size: 11pt;
          }
        }

        textarea {
          width: 100%;
        }
      }

      &.ror-meta {
        grid-template:
          "Title Title"
          "ID Code";

        legend {
          grid-area: Title;
        }

        &:nth-child(2) {
          grid-area: ID;
        }

        &:nth-child(3) {
          grid-area: Code;
        }
      }

      &.org-details {
        grid-template:
          "Title Title"
          "RorName OfficialName"
          "Department Department"
          "Identifiers Aliases";

        legend {
          grid-area: Title;
        }

        :nth-child(2) {
          grid-area: RorName;
        }

        :nth-child(3) {
          grid-area: OfficialName;
        }

        :nth-child(4) {
          grid-area: Department;
        }

        :nth-child(5) {
          grid-area: Identifiers;
        }

        :nth-child(6) {
          grid-area: Aliases;
        }
      }

      &.org-location {
        grid-template:
          "Title Title Title"
          "City Country CountryCode"
          "Latitude Longitude EMPTY";

        legend {
          grid-area: Title;
        }

        :nth-child(2) {
          grid-area: City;
        }

        :nth-child(3) {
          grid-area: Country;
        }

        :nth-child(4) {
          grid-area: CountryCode;
        }

        :nth-child(5) {
          grid-area: Latitude;
        }
        :nth-child(6) {
          grid-area: Longitude;
        }
      }

      &.org-contact {
        grid-template:
          "Title Title"
          "Email Email"
          "FirstName LastName"
          "Role EMPTY";

        legend {
          grid-area: Title;
        }

        :nth-child(2) {
          grid-area: Email;
        }

        :nth-child(3) {
          grid-area: FirstName;
        }

        :nth-child(4) {
          grid-area: LastName;
        }

        :nth-child(5) {
          grid-area: Role;
        }
      }
    }
  }

  .form-controls {
    margin-top: 1em;
    display: flex;
    justify-content: flex-end;

    button {
      width: 150px;
    }
  }
}

.json-output {
  display: block;
  box-sizing: content-box;
  padding: 1em;
  background-color: $gray-050;
  white-space: pre;
}

</style>
