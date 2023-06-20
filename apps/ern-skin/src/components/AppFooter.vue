<template>
  <PageFooter>
    <div class="footer-container width-full">
      <div class="footer-content width-medium">
        <div class="footer-column footer-links">
          <p><strong>ERN-Skin</strong></p>
          <UnorderedList listType="none">
            <li><router-link :to="{name: 'home'}">Home</router-link></li>
            <li><router-link :to="{name: 'about-us'}">About Us</router-link></li>
            <li><router-link :to="{name: 'documents'}">Documents</router-link></li>
            <li><router-link :to="{name: 'dashboard'}">Dashboard</router-link></li>
            <!-- more links here -->
          </UnorderedList>
        </div>
        <div class="footer-column footer-links">
          <p><strong>For Members</strong></p>
          <UnorderedList listType="none">
            <li><a href="/login">Sign in</a></li>
            <!-- more links here -->
          </UnorderedList>
        </div>
        <div class="footer-column footer-logos">
          <UnorderedList listType="none">
            <li id="project-logo-link">
              <router-link :to="{ name: 'home' }"> 
                <img :src="ProjectLogo" alt="ERN-Skin" class="ern-skin-logo" />
              </router-link>
            </li>
            <li class="eu-logos">
              <img :src="ErnLogo" class="logo ern-logo" />
              <img :src="FundingLogo" class="logo funding-logo" alt="funded by the European Union" />
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
import MolgenisLogo from '$shared/images/molgenis-logo-blue-text.png'
import ProjectLogo from '@/assets/ern-skin-logo.png'
import ErnLogo from '@/assets/ern-logo.png'
import FundingLogo from '@/assets/ern-skin-funding.png'

export default {
  data () {
    return {
      ErnLogo: ErnLogo,
      MolgenisLogo: MolgenisLogo,
      ProjectLogo: ProjectLogo,
      FundingLogo: FundingLogo
    }
  },
  components: {
    PageFooter,
    UnorderedList
  }
}
</script>

<style lang="scss">
.page-footer {
  background-color: $gray-000;
  
  .footer-container {
    background-color: $gray-050;
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
    position: relative;
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
      top: 0;
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
    background-color: $gray-000;
  }
}


.eu-logos {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
  background-color: $gray-000;
  
  .logo {
    margin: 0;
    padding: 0;
    
    &.ern-logo {
      width: 200px;
    }
    
    &.funding-logo {
      width: 125px;
    }
  }
  
}

</style>
