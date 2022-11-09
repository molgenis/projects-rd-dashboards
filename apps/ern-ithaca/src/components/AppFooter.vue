<template>
  <PageFooter>    
    <div class="footer-container width-full">
      <div class="footer-content width-medium">
        <div class="footer-column footer-links">
          <p><strong>Ithaca registry</strong></p>
          <UnorderedList listType="none">
            <li><router-link :to="{name: 'home'}">Home</router-link></li>
          </UnorderedList>
        </div>
        <div class="footer-column footer-links">
          <p><strong>For members</strong></p>
          <UnorderedList listType="none">
            <li><a href="/login">Sign in</a></li>
          </UnorderedList>
        </div>
        <div class="footer-column footer-logos">
          <UnorderedList listType="none">
            <li id="ithaca-logo-link">
              <a href="https://ern-ithaca.eu/">
                <img :src="IthacaLogo" class="project-logo" altalt="European Reference Network for Rare Malformation Syndromes, Intellectual and Other Neurodevelopmental Disorders"/>
              </a>
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
    <PageFooterMeta />
  </PageFooter>
</template>

<script>
import { PageFooter, PageFooterMeta, UnorderedList } from 'rd-components'

import IthacaLogo from '@/assets/ern-ithaca-logo-white.png'
import MolgenisLogo from '@/assets/molgenis-logo-blue-white.png'

export default {
  data () {
    return {
      IthacaLogo: IthacaLogo,
      MolgenisLogo: MolgenisLogo
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

// #ithaca-logo-link {
//   background-color: $gray-000;
//   padding: 0 2px;
//   padding-top: 3px;
// }

</style>