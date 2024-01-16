<template>
  <Page id="page-documents">
    <div class="custom-page-header">
      <img :src="headerImage"/>
      <div class="header-content">
        <h1 class="header-title">ERN-Skin Registry</h1>
        <h2 class="header-subtitle">Download documents</h2>
      </div>
    </div>
    <PageSection>
      <MessageBox class="page-warning" type="warning">
        <p>This page is under construction. Please check back later.</p>
      </MessageBox>
    </PageSection>
  </Page>
</template>

<script>
import { Page, PageSection, MessageBox } from 'rd-components'
import headerImage from '@/assets/app-header-background.jpg'

export default {
  name: 'download-documents',
  components: {
    Page,
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
