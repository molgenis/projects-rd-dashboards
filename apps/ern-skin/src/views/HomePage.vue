<template>
  <Page id="page-home">
    <PageHeader
      class="ernskin-header"
      title="ERN-Skin"
      subtitle="some subtitle"
      height="medium"
      :imageSrc="headerImage"
    />
    <PageSection id="section-welcome" aria-labelledby="section-welcome-title" :verticalPadding="2">
      <h2 id="section-welcome-title">Welcome to the ERN-Skin registry!</h2>
      <p>The general objective of this proposal is to build a central registry for all rare skin diseases, connected with the existing registries and including patients with undiagnosed cases.</p>
    </PageSection>
    <PageSection id="section-quick-links" width="large" aria-labelledby="quicklinks-card-title">
      <h2 class="visually-hidden" id="quicklinks-card-title">quick links</h2>
      <div class="quicklink-nav">
        <li>
          About Us
          <!-- <router-link :to="{ name: 'about-us' }">About Us</router-link> -->
        </li>
        <li>
          Documents
          <!-- <router-link :to="{ name: 'documents' }">Documents</router-link> -->
        </li>
        <li>
          Dashboard
          <!-- <router-link :to="{ name: 'dashboard' }">Dashboard</router-link> -->
        </li>
        <li id="quicklink-signin">
          <a href="/login">Sign in</a>
        </li>
      </div>
    </PageSection>
    <PageSection id="section-aims" aria-lablledby="section-aims-title" :verticalPadding="2">
      <h2 id="section-aims-title">Aims of the ERN-Skin registry</h2>
      <p>The <strong>ERN-Skin</strong> gathers European medical experts and patient representatives who join their efforts to improve the diagnosis and management of all the patients suffering from rare, complex and undiagnosed skin diseases all over Europe.</p>
      <p>Structured in 9 Disease Groups and Transversal thematic Groups, ERN-Skin has been developing an innovative e-health platform allowing the construction of a common Skin Diseases registry: ERRAS, a key instrument for our ERN.</p>
      <!-- insert image: ern-skin box diagram -->
      <p>The SKIN ePAGs bring together rare skin disease patient representatives who are actively involved in the work of the ERN-Skin.</p>
      <p>ERRAS, the European registry for rare dermatologic diseases receives information from existing European registries as well as additional manual feeds. It is a means to put scientists and patients together via their respective healthcare providers.</p>
      <!-- insert image: ERDI image -->
    </PageSection>
    <PageSection id="section-contact" aria-labelledby="section-contact-title" :verticalPadding="2" width="large">
      <h2 id="section-contact-title">Contact</h2>
      <p>If you want to know more, to participate, or to consult the ERN-Skin registry, thanks to send your query to the following email address: <a href="mailto:registry@ern-skin.eu">registry@ern-skin.eu</a> or at the following address.</p>
      <ProjectAddress :centerText="true" />
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
