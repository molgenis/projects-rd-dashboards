<template>
  <PageFooter>    
    <div class="footer-container width-full">
      <div class="footer-content width-medium">
        <div class="footer-column footer-links">
          <p><strong>GoNL</strong></p>
          <UnorderedList listType="none">
            <li><router-link :to="{name: 'about'}">About</router-link></li>
            <li><router-link :to="{name: 'news'}">News</router-link></li>
            <li><router-link :to="{name: 'publications'}">Publications</router-link></li>
          </UnorderedList>
        </div>
        <div class="footer-column footer-links">
          <p><strong>For researchers</strong></p>
          <UnorderedList listType="none">
            <li><router-link :to="{name: 'browse'}">Browse Data</router-link></li>
            <li><router-link :to="{name: 'download'}">Download Data</router-link></li>
            <li><router-link :to="{name: 'request'}">Request Access</router-link></li>
          </UnorderedList>
        </div>
        <div class="footer-column footer-logos">
          <UnorderedList listType="none">
            <li id="project-logo-entry">
              <router-link :to="{name: 'home'}">
                <img :src="gonlLogo" class="gonl-logo" alt="The Genome of the Netherlands Consortium"/>
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
    <PageFooterMeta />
  </PageFooter>
</template>

<script>
import { PageFooter, PageFooterMeta, UnorderedList } from 'rd-components'

import gonlLogo from '@/assets/gonl_logo.png'
import MolgenisLogo from '$shared/images/molgenis-logo-blue-text.png'

export default {
  data () {
    return {
      gonlLogo: gonlLogo,
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
  box-shadow: 0 -2px 3px 1px $gray-transparent-100;
  background-color: $gray-050;
  
  .footer-container {
    color: $gray-900;
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
    padding: 0;
    // padding: 0.2em;
    // background-color: $brand-red-orange;
    
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

</style>