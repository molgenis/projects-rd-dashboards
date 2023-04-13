<template>
  <Page>
    <PageSection id="intro">
      <h2>Welcome to the <strong>rd-components</strong> library!</h2>
      <p>Use this application, view and test visualisation components.</p>
      <h3>Visualisation Components</h3>
      <ul class="link-list">
        <li>
          <router-link :to="{name: 'bar-chart'}">Bar Chart</router-link>
        </li>
        <li>
          <router-link :to="{name: 'column-chart'}">Column Chart</router-link>
        </li>
        <li>
          <router-link :to="{name: 'data-highlights'}">Data Highlights</router-link>
        </li>
        <li>
          <router-link :to="{name: 'pie-chart'}">Pie Chart</router-link>
        </li>
        <li>
          <router-link :to="{name: 'chart-legend'}">Legends</router-link>
        </li>
      </ul>
    </PageSection>
  </Page>
</template>

<script>
import Page from '@/components/Page.vue'
import PageSection from '@/components/PageSection.vue'

export default {
  components: {
    Page,
    PageSection
  }
}
</script>