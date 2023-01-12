<template>
  <Page id="page-news">
    <PageHeader
       id="go-nl-header"
       title="Genome of the Netherlands"
       subtitle="Latest News"
       height="medium"
    />
    <PageSection id="news-latest" :verticalPadding="2" aria-labelledby="news-latest-title">
      <h2 id="news-latest-title">Latest Interviews and announcements</h2>
      <ul>
        <li>Read the <a href="http://bbmri.nl/images/stories/gonlarticlehub.pdf">interview with Professor Cisca Wijmenga in the Hub</a></li>
        <li>Read the <a href="http://www.bbmri.nl/images/stories/hub2_web.pdf">interview with Dr. Morris Swertz in the Hub</a></li>
        <li>Read the <a href="http://bbmri.nl/images/stories/factsheet_eng.pdf">Genome of the Netherlands factsheet (September 2010)</a></li>
        <li>Explore the <a href="http://www.bbmriwiki.nl/">wiki of the Genome of the Netherlands analysis team</a></li>
        <li>Read more on <a href="http://www.bbmri.nl/">BBMRI-NL</a></li>
        <!-- <li><a href="http://www.nlgenome.nl/?page_id=114">Data access request form</a></li>
        <li><a href="http://www.nlgenome.nl/wp-content/uploads/2015/02/14-09-2011_GoNLDATA_ACCESS_POLICY_CONDITIONS_FINAL_MTA_ONLY.pdf">Data access agreement</a></li>
        <li><a href="http://www.genoomvannederland.nl/wp-content/uploads/2013/06/GoNL-Acknowledgements.docx">Acknowledgement rules</a></li> -->
      </ul>
    </PageSection>
    <PageSection id="news-articles" :verticalPadding="2" aria-labelledby="news-articles-title">
      <h2 id="news-articles-title">Recent articles</h2>
      <NewsItem
        title="GoNL in the Dutch Press"
        author="Laurent Francioli"
        date="8 July 2014"
      >
        <p>The publication of our article <a href="https://doi.org/10.1038/ng.3021">Whole-genome sequence variation, population structure and demographic history of the Dutch population</a> in Nature Genetics attracted the attention of the Dutch press.
        </p>
        <ul>
          <li>
            NRC Handelsblad: <a href="http://www.nrc.nl/nieuws/2014/06/30/nederlandse-dna-atlas-toont-een-honkvast-volk/" target="_blank">http://www.nrc.nl/nieuws/2014/06/30/nederlandse-dna-atlas-toont-een-honkvast-volk/</a> (subscribers only)
          </li>
          <li>
            de Volkskrant: <a href="https://www.volkskrant.nl/nieuws-achtergrond/made-in-holland~bfe20ac5/">https://www.volkskrant.nl/nieuws-achtergrond/made-in-holland~bfe20ac5/</a> (subscribers only)
          </li>
          <li>
            Dagblad van het Noorden: <a href="https://www.dvhn.nl/archief/Genoom-Nederlandse-volk-ontrafeld-20805343.html">https://www.dvhn.nl/archief/Genoom-Nederlandse-volk-ontrafeld-20805343.html</a> (subscribers only)
          </li>
        </ul>
      </NewsItem>
      <NewsItem
        title="GoNL in Nature Genetics"
        author="mswertz"
        date="3 July 2014"
      >
        <p>We are happy to present the first comprehensive report on the whole-genome sequence variation, population structure and demographic history of the Dutch population. Read all about it in Nature Genetics (<a href="https://doi.org/10.1038/ng.3021">https://doi.org/10.1038/ng.3021</a>).</p>
        <h3>Abstract</h3>
        <p>
          Whole-genome sequencing enables complete characterization of genetic variation, but geographic clustering of rare alleles demands many diverse populations be studied. Here we describe the Genome of the Netherlands (GoNL) Project, in which we sequenced the whole genomes of 250 Dutch parent-offspring families and constructed a haplotype map of 20.4 million single-nucleotide variants and 1.2 million insertions and deletions. The intermediate coverage (~13×) and trio design enabled extensive characterization of structural variation, including midsize events (30-500 bp) previously poorly catalogued and <i>de novo</i> mutations. We demonstrate that the quality of the haplotypes boosts imputation accuracy in independent samples, especially for lower frequency alleles. Population genetic analyses demonstrate fine-scale structure across the country and support multiple ancient migrations, consistent with historical changes in sea level and flooding. The GoNL Project illustrates how single-population whole-genome sequencing can provide detailed characterization of genetic variation and may guide the design of future population studies.
        </p>
      </NewsItem>
      <NewsItem
        title="Prizes at Genetics Retreat 2014"
        author="mswertz"
        date="27 March 2014"
      >
        <p>
          We are proud that GoNL won again prizes, this time at the 24th edition of the <a href="https://klinischegenetica.mumc.nl/prize-winners">Genetics Retreat</a>. The first prize goes to <strong>Sara Pulit</strong> (UMC Utrecht) for her talk <em>&#8216;Genome-wide significance in the sequencing era&#8217;</em>. The poster prize goes to <strong>Jessica van Setten </strong>(UMC Utrecht) for her poster presentation <em>&#8216;Genome of the Netherlands imputation identifies seven new loci for quantitative ECG traits in meta-analysis of 30,000 samples&#8217;</em>.
        </p>
      </NewsItem>
      <NewsItem
        title="Search GoNL snps online"
        author="mswertz"
        date="7 July 2013"
      >
        <p>Search counts of alternative alleles and genotypes from only the parents (498 individuals) in the web search via <a href="http://www.nlgenome.nl/search/">http://www.nlgenome.nl/search/</a></p>
      </NewsItem>
      <NewsItem
        title="Position paper online"
        author="mswertz"
        date="3 June 2013"
      >
        <p>The position paper describing Genome of the Netherlands is available to read online at the <a href="https://doi.org/10.1038/ejhg.2013.118">European Journal of Human Gentics</a> and on <a href="http://www.ncbi.nlm.nih.gov/pubmed/23714750">Pubmed</a>. The full citation is listed below. </p>
        <p>Boomsma, D. I., Wijmenga, C., Slagboom, E. P., Swertz, M. A., Karssen, L. C., Abdellaoui, A., et al. (2013). <strong>The Genome of the Netherlands: design, and project goals.</strong> European Journal of Human Genetics. (<a href="https://doi.org/10.1038/ejhg.2013.118">doi:10.1038/ejhg.2013.118</a>; <a href="http://www.ncbi.nlm.nih.gov/pubmed/23714750">pubmed</a>)</p>
      </NewsItem>
      <NewsItem
        title="SNP Calling Complete"
        author="mswertz"
        date="15 July 2012"
      >
        <p>After over a year of major sample handling and number crunching by all involved we are delighted to report that the SNPs have now been called on all 769 individuals. Next stop: a phased reference set for imputation.</p>
      </NewsItem>
    </PageSection>
  </Page>
  <AppFooter />
</template>

<script>
import { Page, PageHeader, PageSection } from 'rd-components'
import AppFooter from '@/components/AppFooter.vue'
import NewsItem from '@/components/NewsItem.vue'

export default {
  components: {
    Page,
    PageHeader,
    PageSection,
    NewsItem,
    AppFooter
  }
}
</script>

<style lang="scss">
#news-articles {
  background-color: $gray-050;
}
</style>
