<template>
  <Page id="page-about-us">
    <PageHeader
      class="project-header"
      title="ERN ITHACA"
      subtitle="About Us"
      :imageSrc="headerImage"
    />
    <PageSection>
      <MessageBox class="page-warning" type="warning">
        <p>This page is under construction. Please check back later.</p>
      </MessageBox>
    </PageSection>
  </Page>
</template>

<script>
import { Page, PageHeader, PageSection, MessageBox } from 'rd-components'
import HeaderImage from '@/assets/app-header-background.png'

export default {
  components: {
    Page,
    PageHeader,
    PageSection,
    MessageBox
  },
  data () {
    return {
      headerImage: HeaderImage
    }
  }
}
</script>