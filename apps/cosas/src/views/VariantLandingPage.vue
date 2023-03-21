<template>
  <Page id="page-variant-landing">
    <PageHeader
      class="cosas-page-header"
      title="Genetica Diagnostiek Portal"
      subtitle="Find, explore, and access data"
      :imageSrc="pageHeaderImage"
      height="medium"
      titlePositionX="center"
      titlePositionY="center"
    />
    <PageSection id="page-variant-landing-about" aria-labelledby="page-variant-landing-about-title">
      <h2 id="page-variant-landing-about-title">About the Variant Database</h2>
      <p>....</p>
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