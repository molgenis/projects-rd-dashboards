<template>
  <PageFooter>
    <div class="solve-rd-footer">
      <div class="footer-content width-medium">
        <div class="footer-column solve-rd-links">
          <p><strong>RD3</strong></p>
          <UnorderedList listType="none">
            <li><a href="/login">Sign in</a></li>
            <li><router-link :to="{name: 'get-started'}">Get Started</router-link></li>
            <li>
              <a href="https://rdnexus.molgeniscloud.org/discover/index">
                <span>Discovery Nexus</span>
                <ExternalLink class="heroicons external-link" />
              </a>
            </li>
          </UnorderedList>
        </div>
        <div class="footer-column solve-rd-links">
          <p><strong>Information</strong></p>
          <UnorderedList listType="none">
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
              <a href="https://solve-rd.eu">
                <span>solve-rd.eu</span>
                <ExternalLink class="heroicons external-link" />
              </a>
            </li>
          </UnorderedList>
        </div>
        <div class="footer-column solve-rd-logos">
          <UnorderedList listType="none">
            <li><SolveRdLogo /></li>
            <li><img :src="MolgenisLogo" class="molgenis-logo" alt="molgenis open source data platform"/></li>
          </UnorderedList>
        </div>
      </div>
    </div>
  </PageFooter>
</template>

<script>
import { PageFooter, UnorderedList } from 'rd-ui-components'
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
  
  .solve-rd-footer {
    background-color: $gray-900;
    color: $gray-050;
    
    .footer-content {
      margin: 0 auto;
      padding: 1.5em;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      flex-direction: row;
      flex-wrap: wrap;
      gap: 2em;
  
      .footer-column {
        flex-grow: 1;
      }
      
      .solve-rd-links {
        .unordered-list {
          @include linkTextTransform;
          row-gap: 12px;
          
          li {
            position: relative;

            .heroicons {
              position: absolute;
              top: -3px;
              margin-left: 3px;
              $size: 15px;
              width: $size;
              height: $size;
            }
          }
        }
      }
      
      .solve-rd-logos {
        .unordered-list {
          gap: 1.2em;
        }
      }
    }  
  }
  
  .page-footer-meta-links {
    background-color: $gray-200;
  }
}
</style>
