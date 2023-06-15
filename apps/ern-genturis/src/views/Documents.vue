<template>
  <LoadingScreen v-if="loading" />
  <Page id="page-documents" v-else>
    <PageHeader
      class="genturis-header"
      title="ERN Genturis Registry"
      subtitle="Registry for Genetic Tumour Risk Syndromes"
      :imageSrc="GenturisHeaderPhoto"
      titlePositionX="center"
      titlePositionY="center"
    />
    <PageSection
      id="genturis-section-documents"
      aria-labelledby="genturis-section-documents-title"
      width="large"
    >
      <h2 id="genturis-section-documents-title">Documents</h2>
      <p>Download additional information about the GENTURIS Registry.</p>
      <div class="document-container">
        <MessageBox type="error" v-if="!loading && apiError">
          <p>
            Unable to retrieve file information. Please sign in or try again
            later.
          </p>
        </MessageBox>
        <ul class="document-list" v-else>
          <li class="file" v-for="file in files" :key="file.id">
            <p class="file-element file-name">{{ file.filename }}</p>
            <p class="file-element file-format">
              {{ file.contentType.split("/")[1].toUpperCase() }}
            </p>
            <p class="file-element file-size">
              {{ Math.round(file.size / 1000) }} KB
            </p>
            <a class="file-element file-url" :href="file.url">
              <span class="visually-hidden">Download {{ file.filename }}</span>
              <DownloadIcon />
            </a>
          </li>
        </ul>
      </div>
    </PageSection>
  </Page>
</template>

<script>
import {
  Page,
  PageHeader,
  PageSection,
  MessageBox,
  LoadingScreen
} from "rd-components";
import GenturisHeaderPhoto from "@/assets/genturis-carousel.jpg";
import DownloadIcon from "@/components/icons/arrow-down-tray.vue";
import { fetchData } from "$shared/js/utils.js";

export default {
  name: "page-documents",
  components: {
    Page,
    PageHeader,
    PageSection,
    MessageBox,
    LoadingScreen,
    DownloadIcon
  },
  data() {
    return {
      loading: true,
      apiError: null,
      GenturisHeaderPhoto: GenturisHeaderPhoto,
      GenturisRegistryLeaflet: null
    };
  },
  mounted() {
    Promise.resolve(fetchData("/api/v2/sys_FileMeta?q=(filename=notlike=final2;filename=like=genturis)"))
      .then(response => {
        const files = response.items;
        this.files = files;
      })
      .then(() => {
        this.loading = false;
      })
      .catch(error => {
        this.apiError = error;
      });
  }
};
</script>

<style lang="scss">
.document-list {
  list-style: none;
  padding: 0;
  margin: 0 auto;
  

  .file {
    display: grid;
    grid-template-columns: 0.8fr 0.2fr 0.2fr 0.1fr;
    justify-content: center;
    align-items: stretch;
    box-shadow: $box-shadow;
    box-sizing: border-box;
    margin-bottom: 2em;
    padding: 0;
    margin: 0;
    margin-bottom: 2em;

    .file-element {
      padding: 1.75em 1em;
      margin: 0;
      background-color: $red-050;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .file-name {
      justify-content: flex-start;
    }
    
    .file-url {
      background-color: $blue-050;
      color: $blue-800;
      
      &:hover, &:focus {
        background-color: $blue-800;
        color: $blue-050;
      }
    }
  }
}
</style>
