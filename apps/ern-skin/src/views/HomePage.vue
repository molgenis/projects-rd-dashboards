<template>
  <Page id="page-home">
    <PageHeader
      class="project-header main-header"
      title="ERN-Skin Registry"
      subtitle="Registry for Rare and Undiagnosed Skin Diseases"
      :imageSrc="headerImage"
    />
    <PageSection id="section-welcome" aria-labelledby="section-welcome-title" :verticalPadding="2">
      <h2 id="section-welcome-title">Welcome to the ERN-Skin registry!</h2>
      <p>The general objective of this proposal is to build a central registry for all rare skin diseases, connected with the existing registries and including patients with undiagnosed cases.</p>
    </PageSection>
    <PageSection class="quick-links" width="large" aria-labelledby="quicklinks-card-title">
      <h2 class="visually-hidden" id="quicklinks-card-title">quick links</h2>
      <ul class="quick-links-nav">
        <li>
          <router-link :to="{ name: 'about-us' }">About Us</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'documents' }">Documents</router-link>
        </li>
        <li> 
          <router-link :to="{ name: 'dashboard' }">Dashboard</router-link>
        </li>
        <li id="quicklink-signin">
          <a href="/login">Sign in</a>
        </li>
      </ul>
    </PageSection>
    <PageSection id="section-aims" aria-lablledby="section-aims-title" :verticalPadding="2">
      <h2 id="section-aims-title">Aims of the ERN-Skin registry</h2>
      <p>The <strong>ERN-Skin</strong> gathers European medical experts and patient representatives who join their efforts to improve the diagnosis and management of all the patients suffering from rare, complex and undiagnosed skin diseases all over Europe.</p>
      <p>Structured in 9 Disease Groups and Transversal thematic Groups, ERN-Skin has been developing an innovative e-health platform allowing the construction of a common Skin Diseases registry: ERRAS, a key instrument for our ERN.</p>
      <!-- insert image: ern-skin box diagram -->
      <img :src="ernSkinDiagram" class="project-diagrams" alt="ERN-Skin disease groups"/>
      <p>The SKIN ePAGs bring together rare skin disease patient representatives who are actively involved in the work of the ERN-Skin.</p>
      <p>ERRAS, the European registry for rare dermatologic diseases receives information from existing European registries as well as additional manual feeds. It is a means to put scientists and patients together via their respective healthcare providers.</p>
      <!-- insert image: ERDI image -->
      <img :src="ernSkinErdri" class="project-diagrams" alt="European registry for rare dermatologic diseases" />
    </PageSection>
    <PageSection id="section-contact" aria-labelledby="section-contact-title" :verticalPadding="2">
      <h2 id="section-contact-title">Contact</h2>
      <p>If you want to know more, to participate, or to consult the ERN-Skin registry, thanks to send your query to the following email address: <a href="mailto:skin-registry@ern-skin.eu>">skin-registry@ern-skin.eu</a> or at the following address.</p>
      <ProjectAddress :centerText="true" />
    </PageSection>
  </Page>
</template>

<script>
import { Page, PageHeader, PageSection } from 'rd-components'
import ProjectAddress from '@/components/ProjectAddress.vue'

import headerImage from '@/assets/app-header-background.png'
import ernSkinDiagram from '@/assets/ern-skin-groups.png'
import ernSkinErdri from '@/assets/ern-skin-erdri.png'


export default {
  components: {
    Page,
    PageHeader,
    PageSection,
    ProjectAddress
  },
  data () {
    return {
      headerImage: headerImage,
      ernSkinDiagram: ernSkinDiagram,
      ernSkinErdri: ernSkinErdri,
    }
  }
}
</script>

<style lang="scss">
.project-diagrams {
  display: block;
  max-height: 425px;
  margin: 0 auto;
}

.quick-links {
  padding: 1em;
  background-color: $gray-050;
  
  .quick-links-nav {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2em;
    
    li {
      line-height: 1;
      flex-grow: 1;
      text-align: center;
      
      a {
        display: block;
        border: 1px solid currentColor;
        padding: 1.1em 0;
        border-radius: 4px;
        text-decoration: none;
        
        &:hover {
          text-decoration: underline;
        }
      }
      
      &:nth-child(1) {
        a {
          color: $brand-blue-alt;
          background-color: $brand-blue;
        }
      }
      
      &:nth-child(2) {
        a {
          color: $brand-green-alt;
          background-color: $brand-green;
        }
      }
      
      &:nth-child(3) {
        a {
          color: $brand-orange-alt;
          background-color: $brand-orange;
        }
      }
      
      &:nth-child(4) {
        a {
          color: $brand-red-alt;
          background-color: $brand-red;
        }
      }
    
    }
  }
}

</style>
