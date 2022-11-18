<template>
  <PageFooter>
    <div class="footer-container width-full">
      <div class="footer-content width-medium">
        <div class="footer-column footer-links">
          <p><strong>RD3</strong></p>
          <UnorderedList listType="none">
            <li><router-link :to="{name: 'get-started'}">Get Started</router-link></li>
            <li><router-link :to="{name: 'view-tables'}">View Tables</router-link></li>
            <li><router-link :to="{name: 'patient-tree'}">Patient Tree</router-link></li>
            <li>
              <a href="https://solve-rd.eu">
                <span>solve-rd.eu</span>
                <ExternalLink class="heroicons external-link" />
              </a>
            </li>
          </UnorderedList>
        </div>
        <div class="footer-column footer-links">
          <p><strong>For Members</strong></p>
          <UnorderedList listType="none">
            <li><a href="/login">Sign in</a></li>
            <li>
              <a href="https://docs.google.com/document/d/10N6kTdbyUgjzsEO3BjwV6nSKZymIyv36-jxooqDPMOc/edit#">
                RD3 User Guide
              </a>
            </li>
            <li>
              <a href="http://docs.gcc.rug.nl/fender/index.html">
                Sandbox Manual
              </a>
            </li>
            <li>
              <a href="https://rdnexus.molgeniscloud.org/discover/index">
                <span>Discovery Nexus</span>
                <ExternalLink class="heroicons external-link" />
              </a>
            </li>
          </UnorderedList>
        </div>
        <div class="footer-column footer-logos">
          <UnorderedList listType="none">
            <li id="solverd-logo-link">
              <router-link :to="{ name: 'home' }"> 
                <SolveRdLogo />
              </router-link>
            </li>
            <li>
              <a href="https://www.molgenis.org">
                <span class="visually-hidden">visit the molgenis website to learn more</span>
                <li><img :src="MolgenisLogo" class="molgenis-logo" alt="molgenis open source data platform"/></li>
              </a>
            </li>
          </UnorderedList>
        </div>
      </div>
    </div>
  </PageFooter>
</template>

<script>
import { PageFooter, UnorderedList } from 'rd-components'
import { ArrowTopRightOnSquareIcon } from '@heroicons/vue/24/outline'
import SolveRdLogo from './SolveRdLogo.vue'
import MolgenisLogo from '../assets/molgenis-logo-blue-white.png'

export default {
  name: 'solverd-footer',
  data () {
    return {
      MolgenisLogo: MolgenisLogo
    }
  },
  components: {
    PageFooter,
    UnorderedList,
    SolveRdLogo,
    ExternalLink: ArrowTopRightOnSquareIcon
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
      @include linkTextTransform;
      text-decoration: none;
      padding-bottom: 2px;
      border-bottom: 2px solid transparent;
    
      &:hover, &:focus {
        border-bottom-color: currentColor;
      }
    }
    .heroicons {
      position: absolute;
      top: -3px;
      margin-left: 3px;
      $size: 15px;
      width: $size;
      height: $size;
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
</style>
