<template>
  <Page id="page-cosas-landing">
    <PageHeader
      class="cosas-page-header"
      title="COSAS"
      subtitle="Catalog of Sequences, Arrays, and Samples"
      :imageSrc="pageHeaderImage"
      height="medium"
      titlePositionX="center"
      titlePositionY="center"
    />
    <PageSection id="page-cosas-landing-about" aria-labelledby="page-cosas-landing-about-title">
      <h2 id="page-cosas-landing-about-title">About the COSAS Database</h2>
      <p>The COSAS &mdash; or the Catalog of Sequences, Arrays, and Samples &mdash; ....</p>
    </PageSection>
  </Page>
</template>

<script>
import { Page, PageHeader, PageSection } from 'rd-components'
import pageHeaderImage from '@/assets/cosas-page-header.jpg'

export default {
  components: {
    Page,
    PageHeader,
    PageSection
  },
  data () {
    return {
      pageHeaderImage: pageHeaderImage
    }
  }
}
</script>