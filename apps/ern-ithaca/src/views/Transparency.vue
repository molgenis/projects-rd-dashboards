<template>
  <Page id="page-transparency">
    <PageHeader
      id="ithaca-header"
      title="ERN ITHACA"
      subtitle="Transparency"
      :imageSrc="headerImage"
      height="medium"
      :vertical-padding="2"
    />
    <PageSection>
      <MessageBox class="page-warning" type="warning">
        <p>This page is under construction. Please check back later.</p>
      </MessageBox>
    </PageSection>
  </Page>
  <AppFooter />
</template>

<script>
import { Page, PageHeader, PageSection, MessageBox } from 'rd-components'
import AppFooter from '@/components/AppFooter.vue'
import HeaderImage from '@/assets/ern-ithaca-header.jpg'

export default {
  name: 'ithaca-transparency',
  components: {
    Page,
    PageHeader,
    PageSection,
    MessageBox,
    AppFooter
  },
  data () {
    return {
      headerImage: HeaderImage
    }
  }
}
</script>