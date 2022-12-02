<template>
  <Page id="page-contact-us">
    <PageSection id="genturis-contact" aria-labelledby="genturis-contact-title" :verticalPadding="2" width="large">
      <h2 id="genturis-section-contact-title">Contact</h2>
      <p>For further information, please contact the GENTURIS registry coordination team by email <a href="mailto:genturis-registry@radboudumc.nl">genturis-registry@radboudumc.nl</a> or at the following address.</p>
      <GenturisAddress :centerText="true" />
    </PageSection>
  </Page>
  <AppFooter />
</template>

<script>
import { Page, PageSection } from 'rd-components'
import GenturisAddress from '@/components/Address.vue'
import AppFooter from '@/components/AppFooter.vue'

export default {
  name: 'contact-us',
  components: { Page, PageSection, GenturisAddress, AppFooter }  
}
</script>