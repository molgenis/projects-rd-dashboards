<template>
  <Page id="page-home">
    <PageHeader
      class="helloworld-header"
      title="Hello world"
      subtitle="My Example Vue App"
      height="medium"
      :imageSrc="headerImage"
    />
    <PageSection id="section-intro-title" aria-labelledby="section-intro-title" :verticalPadding="2">
      <h2 id="section-intro-title">Welcome to My Project</h2>
      <p>Tempor pariatur duis do minim cillum veniam in exercitation dolor. Quis tempor ad ullamco duis velit ea mollit duis adipisicing veniam ex proident. Consequat nulla minim in aliqua tempor culpa est cupidatat. Do culpa exercitation Lorem commodo labore mollit aliqua minim sit et. Laboris do mollit fugiat eiusmod magna excepteur voluptate est sint et irure aliqua cillum.</p>
    </PageSection>
  </Page>
</template>

<script>
import { Page, PageHeader, PageSection } from 'rd-components'
import headerImage from '@/assets/app-header-background.jpg'

export default {
  components: {
    Page,
    PageHeader,
    PageSection
  },
  data () {
    return {
      headerImage: headerImage
    }
  }
}
</script>
