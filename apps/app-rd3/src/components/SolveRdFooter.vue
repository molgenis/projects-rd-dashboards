<template>
  <PageFooter>
    <div class="solve-rd-footer">
      <div class="footer-content width-medium">
        <div class="footer-column solve-rd-links">
          <p><strong>RD3</strong></p>
          <UnorderedList listType="none">
            <li><RouterLink to="#">Get Started</RouterLink></li>
            <li><a href="#"></a></li>
          </UnorderedList>
        </div>
        <div class="footer-column solve-rd-links">
          <p><strong>For Researchers</strong></p>
          <UnorderedList listType="none">
            <li><a href="/login">Sign in</a></li>
            <li><RouterLink to="#">Get Started</RouterLink></li>
            <li>
              <a href="https://rdnexus.molgeniscloud.org/discover/index">
                <span>Discovery Nexus</span>
                <ExternalLink class="heroicons external-link" />
              </a>
            </li>
          </UnorderedList>
        </div>
        <div class="footer-column solve-rd-logos">
          <MolgenisLogo />
        </div>
      </div>
    </div>
    <PageFooterMeta>
      <UnorderedList listType="circle" listLayout="horizontal">
        <li><a href="#">Disclaimer</a></li>
        <li><a href="http://solve-rd.eu/">solve-rd.eu</a></li>
      </UnorderedList>
    </PageFooterMeta>
  </PageFooter>
</template>

<script>
import { PageFooter, PageFooterMeta, UnorderedList, MolgenisLogo } from 'rd-ui-components'
import { RouterLink } from 'vue-router'
import { ArrowTopRightOnSquareIcon } from '@heroicons/vue/24/outline'

export default {
  name: 'solverd-footer',
  components: {
    PageFooter,
    PageFooterMeta,
    UnorderedList,
    MolgenisLogo,
    RouterLink,
    ExternalLink: ArrowTopRightOnSquareIcon
  }
}
</script>

<style lang="scss">
.page-footer {
  
  .solve-rd-footer {
    background-color: $gray-100;
    
    .heroicons {
      position: relative;
      $size: 16px;
      width: $size;
      height: $size;
      margin-bottom: -2px;
    }
    
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
        }
      }
    }  
  }
  
  .page-footer-meta-links {
    background-color: $gray-700;
    color: $gray-050;
  }
}
</style>
