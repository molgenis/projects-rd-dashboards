<template>
  <Page id="page-documents">
    <PageHeader
      class="project-header main-header"
      title="ERN-Skin"
      subtitle="Download Documents"
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
import headerImage from '@/assets/app-header-background.jpg'

export default {
  name: 'download-documents',
  components: {
    Page,
    PageHeader,
    PageSection,
    MessageBox
  },
  data () {
    return {
      headerImage: headerImage
    }
  }
}
</script>
