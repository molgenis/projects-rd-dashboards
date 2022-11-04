<template>
  <PageFooter>
    <div class="footer-container width-full">
      <div class="footer-content width-medium">
        <div class="footer-column footer-links">
          <p><strong>Genturis registry</strong></p>
          <UnorderedList listType="none">
            <li><router-link :to="{name: 'about-us'}">About Us</router-link></li>
            <li><router-link :to="{name: 'contact-us'}">Contact Us</router-link></li>
            <li><router-link :to="{name: 'dashboard'}">Dashboard</router-link></li>
            <li><router-link :to="{name: 'governance'}">Governance</router-link></li>
          </UnorderedList>
        </div>
        <div class="footer-column footer-links">
          <p><strong>For providers</strong></p>
          <UnorderedList listType="none">
            <li><a href="/login">Sign in</a></li>
            <li><router-link :to="{ name: 'documents' }">Documents</router-link></li>
            <li><router-link :to="{ name: 'members-area'}">Information for Providers</router-link></li>
          </UnorderedList>
        </div>
        <div class="footer-column footer-logos">
          <UnorderedList listType="none">
            <li id="genturis-logo-link">
              <router-link :to="{ name: 'home' }"> 
                <img :src="GenturisLogo" class="genturis-logo" altalt="Registry for the European Reference Network on genetic tumour risk syndromes"/>
              </router-link>
            </li>
            <li>
              <a href="https://www.molgenis.org">
                <span class="visually-hidden">visit the molgenis website to learn more</span>
                <img :src="MolgenisLogo" class="molgenis-logo" alt="molgenis open source data platform"/>
              </a>
            </li>
          </UnorderedList>
        </div>
      </div>
    </div>
    <PageFooterMeta>
      <UnorderedList listLayout="horizontal" listType="circle">
        <li><router-link :to="{ name: 'privacy-policy' }">Privacy Policy</router-link></li>
        <li><router-link :to="{ name: 'disclaimer'}" >Disclaimer</router-link></li>
      </UnorderedList>
    </PageFooterMeta>
  </PageFooter>
</template>

<script>
import { PageFooter, PageFooterMeta, UnorderedList } from 'rd-ui-components'
import GenturisLogo from '@/assets/genturis-registry-logo.png'
import MolgenisLogo from '@/assets/molgenis-logo-blue-white.png'

export default {
  data () {
    return {
      MolgenisLogo: MolgenisLogo,
      GenturisLogo: GenturisLogo
    }
  },
  components: {
    PageFooter,
    PageFooterMeta,
    UnorderedList
  }
}
</script>

<style lang="scss">
.page-footer {
  background-color: $gray-050;
  
  .footer-container {
    color: $gray-050;
    background-color: $gray-800;
  }
  
  .footer-content {
    box-sizing: padding-box;
    padding: 2em 5em;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 2em;
    margin: 0 auto;
  }
  
  .footer-links {
    flex-grow: 2;
    
    a {
      @include textTransform;
      text-decoration: none;
      padding-bottom: 2px;
      border-bottom: 2px solid transparent;
    
      &:hover, &:focus {
        border-bottom-color: currentColor;
      }
    }
  }
  
  .page-footer-meta-links {
    box-sizing: padding-box;
    padding: 0.8em;
    background-color: $blue-200;
    
    a {
      @include textTransform;
      text-decoration: none;
      padding-bottom: 2px;
      border-bottom: 2px solid transparent;
    
      &:hover, &:focus {
        border-bottom-color: currentColor;
      }
    }
  }
  
  .molgenis-citation {
    background-color: $gray-050;
  }
}

#genturis-logo-link {
  background-color: $gray-000;
  padding: 0 2px;
  padding-top: 3px;
}

</style>