<template>
  <PageFooter>
    <div class="footer-container width-full">
      <div class="footer-content width-medium">
        <div class="footer-column footer-links">
          <p><strong>Cosas</strong></p>
          <UnorderedList listType="none">
            <li>
              <router-link :to="{ name: 'cosas-data-finder' }"
                >Data Finder</router-link
              >
            </li>
            <li>
              <router-link :to="{ name: 'cosas-dashboard' }"
                >Dashboard</router-link
              >
            </li>
          </UnorderedList>
        </div>
        <div class="footer-column footer-links">
          <p><strong>Variant Database</strong></p>
          <UnorderedList listType="none">
            <li>
              <router-link :to="{ name: 'variant-db-data-finder' }"
                >Data Finder</router-link
              >
            </li>
          </UnorderedList>
        </div>
        <div class="footer-column footer-links">
          <p><strong>Information</strong></p>
          <UnorderedList listType="none">
            <li>
              <router-link :to="{ name: 'help' }"
                >Frequently Asked Questions</router-link
              >
            </li>
            <li>
              <router-link :to="{ name: 'data-sources' }"
                >Data Sources</router-link
              >
            </li>
          </UnorderedList>
        </div>
        <div class="footer-column footer-logos">
          <UnorderedList listType="none">
            <li id="project-logo-link">
              <router-link :to="{ name: 'home' }">
                <img
                  :src="ProjectLogo"
                  class="umcg-genetics-logo"
                  alt="Universitair Medisch Centrum Groningen; Genetica Afdeling"
                />
              </router-link>
            </li>
            <li>
              <a href="https://www.molgenis.org">
                <span class="visually-hidden"
                  >visit the molgenis website to learn more</span
                >
                <img
                  :src="MolgenisLogo"
                  class="molgenis-logo"
                  alt="molgenis open source data platform"
                />
              </a>
            </li>
          </UnorderedList>
        </div>
      </div>
    </div>
  </PageFooter>
</template>

<script>
import { PageFooter, UnorderedList } from "rd-components";
import ProjectLogo from "@/assets/umcg-genetica-logo.jpg";
import MolgenisLogo from "$shared/images/molgenis-logo-blue-white.png";

export default {
  data() {
    return {
      MolgenisLogo: MolgenisLogo,
      ProjectLogo: ProjectLogo
    };
  },
  components: {
    PageFooter,
    UnorderedList
  }
};
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

      &:hover,
      &:focus {
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

      &:hover,
      &:focus {
        border-bottom-color: currentColor;
      }
    }
  }

  .molgenis-citation {
    background-color: $gray-050;
  }
}
</style>
