<template>
  <Page id="page-contact-us">
    <PageHeader
      class="genturis-header"
      title="ERN Genturis Registry"
      subtitle="Contact Us"
      :imageSrc="GenturisHeaderPhoto"
      titlePositionX="center"
      titlePositionY="center"
    />
    <PageSection id="genturis-contact" aria-labelledby="genturis-contact-title" :verticalPadding="2" width="large">
      <h2 id="genturis-section-contact-title">Contact</h2>
      <p>For further information, please contact the GENTURIS registry coordination team by email <a href="mailto:genturis-registry@radboudumc.nl">genturis-registry@radboudumc.nl</a> or at the following address.</p>
      <GenturisAddress :centerText="true" />
    </PageSection>
  </Page>
</template>

<script>
import { Page, PageHeader, PageSection } from 'rd-components'
import GenturisAddress from '@/components/Address.vue'
import GenturisHeaderPhoto from '@/assets/genturis-carousel.jpg'

export default {
  name: 'contact-us',
  components: {
    Page,
    PageHeader,
    PageSection,
    GenturisAddress
  },
  data () {
    return {
      GenturisHeaderPhoto: GenturisHeaderPhoto
    }
  }
}
</script>