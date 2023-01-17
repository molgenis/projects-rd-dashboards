<template>
  <Page id="page-home">
    <PageHeader
      class="gonl-page-header"
      title="Genome of the Netherlands"
      subtitle="An ultra-sharp genetic group portrait of the Dutch"
      titlePositionX="center"
      titlePositionY="center"
      height="large"
      :imageSrc="pageHeader"
    />
    <PageSection aria-labelledby="quicklinks-card-title" width="full" :verticalPadding="0" :horizontalPadding="0">
      <h2 class="visually-hidden" id="quicklinks-card-title">quick links</h2>
      <div class="quicklink-cards">
        <LinkCard id="quicklinks-about">
          <router-link :to="{ name: 'about' }">About Us</router-link>
        </LinkCard>
        <LinkCard id="quicklink-documents">
          <router-link :to="{ name: 'documents' }">Documents</router-link>
        </LinkCard>
        <LinkCard id="quicklink-browse">
          <router-link :to="{ name: 'browse' }">Browse Data</router-link>
        </LinkCard>
        <LinkCard id="quicklink-request">
          <router-link :to="{ name: 'request' }">Request access</router-link>
        </LinkCard>
      </div>
    </PageSection>
    <PageSection id="section-intro" :verticalPadding="2">
      <h2>Welcome to the Genome of the Netherlands!</h2>
      <p>What genetic variation is to be found in the Dutch indigenous population? Detailed knowledge about this is not only interesting in itself, it also helps to extract useful biomedical information from Dutch biobanks. The Dutch biobank collaboration BBMRI-NL has initiated the extensive Rainbow Project &#8220;Genome of the Netherlands&#8221; (GoNL) because it offers unique opportunities for science and for the development of new treatments and diagnostic techniques. A close-up look at the DNA of 750 Dutch people-250 trio&#8217;s of two parents and an adult child-plus a global genetic profile of large numbers of Dutch will disclose a wealth of new information, new insights, and possible applications.</p>
      <img id="datasources-chart" :src="DataSourcesFlowChart" alt="data from 769 individuals comes from four biobanks in the netherlands;" />
    </PageSection>
    <PageSection id="section-about" :verticalPadding="2">
      <h2>About</h2>
      <p>The Genome of the Netherlands (GoNL) is a consortium of the <a href="http://www.umcg.nl/EN/corporate/pages/default.aspx">UMCG</a>,<a href="http://www.lumc.nl/home/?setlanguage=English&amp;setcountry=en">LUMC</a>, <a href="http://www.erasmusmc.nl/?lang=en">Erasmus MC</a>, <a href="http://www.psy.vu.nl/nl/over-de-faculteit/medewerkers-alfabetisch/medewerkers-a-b/d-boomsma/index.asp">VU university</a> and <a href="http://www.umcutrecht.nl/zorg/">UMCU</a>, led by Professor Cisca Wijmenga. Samples where contributed by <a title="LifeLines" href="http://lifelines.nl/lifelines-research/general">LifeLines</a>, <a href="http://www.healthy-ageing.nl">The Leiden Longevity Study</a>, <a href="http://www.tweelingenregister.org">The Netherlands Twin Registry</a> (NTR), <a href="http://www.erasmus-epidemiology.nl/rotterdamstudy">The Rotterdam studies</a>, and <a href="http://www.epib.nl/research/geneticepi/research.html#gip">The Genetic Research in Isolated Populations program</a>. All the sequencing work is done by <a href="http://www.bgisequence.com/">BGI Hong Kong</a>. Funding for the project was provided by the Netherlands Organization for Scientific Research under award number 184021007, dated July 9, 2009 and made available as a Rainbow Project of the Biobanking and Biomolecular Research Infrastructure Netherlands (<a href="http://www.bbmri.nl">BBMRI-NL</a>).</p>
      <ConsortiumLogos />
    </PageSection>
  </Page>
  <AppFooter />
</template>

<script>
import { Page, PageHeader, PageSection, LinkCard } from 'rd-components'
import AppFooter from '@/components/AppFooter.vue'
import ConsortiumLogos from '@/components/ConsortiumLogos.vue'
import DataSourcesFlowChart from '@/assets/gonl_datasources_flowchart.png'
import pageHeader from '@/assets/gonl-pg-header-2.jpg'

export default {  
  components: {
    Page,
    PageHeader,
    PageSection,
    LinkCard,
    ConsortiumLogos,
    AppFooter
  },
  data () {
    return {
      DataSourcesFlowChart: DataSourcesFlowChart,
      pageHeader: pageHeader
    }
  }
}
</script>

<style lang="scss">
#datasources-chart {
  display: block;
  max-width: 525px;
  margin: 0 auto;
}
</style>
