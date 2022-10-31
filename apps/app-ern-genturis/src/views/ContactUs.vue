<script setup>
import { Page, PageSection } from 'rd-ui-components'
import GenturisAddress from '@/components/Address.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>

<template>
  <Page id="page-contact-us">
    <PageSection id="genturis-contact" aria-labelledby="genturis-contact-title">
      <h2 id="genturis-section-contact-title">Contact</h2>
      <p>For further information, please contact the GENTURIS registry coordination team by email <a href="mailto:genturis-registry@radboudumc.nl">genturis-registry@radboudumc.nl</a> or at the following address.</p>
      <GenturisAddress :centerText="true" />
    </PageSection>
  </Page>
  <AppFooter />
</template>
