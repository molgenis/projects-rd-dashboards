<template>
  <Page id="page-home">
    <PageHeader
      id="ithaca-header"
      title="ERN ITHACA"
      subtitle="ILIAD Rare Diseases patient registry"
      :imageSrc="headerImage"
      height="large"
    />
    <PageSection id="section-welcome" aria-labelledby="section-welcome-title" :verticalPadding="2">
      <h2 id="section-welcome-title">Welcome to the ILIAD registry</h2>
      <p>The main objective of this WP is to set up an interoperable registry dedicated to rare diseases within the scope of ITHACA called <strong>ILIAD Rare Diseases patient registry</strong>: an <strong>I</strong>nternational <strong>L</strong>ibrary of <strong>I</strong>ntellectual disability and <strong>A</strong>nomalies of <strong>D</strong>evelopment.</p>
    </PageSection>
    <PageSection id="section-quick-links" width="large" aria-labelledby="quicklinks-card-title">
      <h2 class="visually-hidden" id="quicklinks-card-title">quick links</h2>
      <div class="quicklink-nav">
        <li id="quicklinks-about">
          <router-link :to="{ name: 'about-us' }">About Us</router-link>
          <PlusIcon />
        </li>
        <li id="quicklink-documents">
          <router-link :to="{ name: 'documents' }">Documents</router-link>
          <PlusIcon />
        </li>
        <li id="quicklink-dashboard">
          <router-link :to="{ name: 'dashboard' }">Dashboard</router-link>
          <PlusIcon />
        </li>
        <li id="quicklink-transparency">
          <router-link :to="{ name: 'transparency' }">Transparency</router-link>
          <PlusIcon />
        </li>
        <li id="quicklink-signin">
          <a href="/login">Sign in</a>
          <PlusIcon />
        </li>
      </div>
    </PageSection>
    <PageSection id="section-aims" aria-lablledby="section-aims-title" :verticalPadding="2">
      <h2 id="section-aims-title">Aims of the ILIAD registry</h2>
      <p>We intend to develop a single, trans-ERN “meta-registry” (ILIAD) of patients with developmental anomalies (dysmorphic/Multiple Congenitital Anomalies syndromes and/or Iintellectual Disabilities) recruited by ERN ITHACA, patients with several developmental disorders affecting the head recruited by ERN-CRANIO, and patients with connective tissue disorders recruited by ERN SKIN.</p>
      <p>ILIAD will register 3 types of patients:</p>
      <ul>
        <li>genetically-defined patients (patients must have a genetic/genomic diagnosis to be recorded),</li>
        <li>clinically defined patients (patients must have a precise clinical diagnosis with a disease-level ORPHA code), and </li>
        <li>undiagnosed patients</li>
      </ul>
      <p>For more information on the structure of the registry, please see the <a href="/menu/main/dataexplorer?entity=sys_md_Attribute&mod=entitiesreport">Model Document (account required)</a>.</p>
    </PageSection>
  </Page>
  <AppFooter />
</template>

<script>
import { Page, PageHeader, PageSection } from 'rd-components'
import AppFooter from '@/components/AppFooter.vue'
import PlusIcon from '@/components/icons/plusIcon.vue'
import HeaderImage from '@/assets/ern-ithaca-header.jpg'

export default {
  components: {
    Page,
    PageHeader,
    PageSection,
    PlusIcon,
    AppFooter
  },
  data () {
    return {
      headerImage: HeaderImage
    }
  }
}

</script>

<style lang="scss">
#ithaca-header {
  &.header-image-background {
    background-position: 0 100%;
  }
  .background-image-filter {
    background-color: $gray-transparent-200;
  }
}

.quicklink-nav {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1.5em;
  
  li {
    flex-grow: 1;
    padding: 16px; 
    text-align: center;
    background-color: $gray-050;
    
    $offset: 6px;
    box-shadow: $offset $offset 0 0 $brand-red-orange;
    a {
      color: $brand-blue-900;
    }
  }
}

#section-welcome {
  background-color: $gray-000;
}

#section-quick-links {
  background-color: $brand-blue-900;
  padding: 1em 0;
  
  li {
    position: relative;
    a {
      text-decoration: none;
      color: currentColor;
    }
    svg {
      position: absolute;
      $size: 18px;
      width: $size;
      height: $size;
      bottom: 6px;
      right: 6px;
      color: $brand-red-orange;
    }
    &:hover, &:focus {
      color: $gray-050;
      background-color: $brand-blue-600;
      text-decoration: underline;
      svg {
        color: $gray-050;
      }
    }
  }
}

</style>