<template>
  <Page id="page-request">
    <PageHeader
      class="gonl-page-header"
      title="Genome of the Netherlands"
      subtitle="Request access"
      titlePositionX="center"
      titlePositionY="center"
      height="large"
      :imageSrc="pageHeader"
    />
    <PageSection
      id="request-process"
      :verticalPadding="2"
      aria-labelledby="request-process-title"
    >
      <h2 id="request-process-title">Request Data</h2>
      <p>
        Individual level sequence data and/or variant calls can be requested
        only by researchers associated with a research institute located within
        the European Union. Given legal and privacy regulations we are not
        allowed to disctribute these datasets outside the EU. To submit a new
        request, follow the steps below.
      </p>
      <ol class="ordered-list">
        <li>
          To apply for access, fill in the
          <a href="/api/files/aaaadh6madcdj6qwhyxcxhyaai?alt=media" download>
            GoNL Data Access Request Application v1.2 (PDF, 138KB)
          </a>
          and send to
          <a href="mailto:support@molgenis.org">support@molgenis.org</a>.
        </li>
        <li>
          Your research request will be evaluated by the GoNL steering
          committee.
        </li>
        <li>
          If your request is successful, you will be sent the
          <a href="/api/files/aaaadh6l7lsbj6qwhyxcxhyaai?alt=media" download>
            Data Access Agreement (PDF, 507KB) </a
          >. This agreement requires signatures from the applicant and a legal
          representative of the applicant's institution.
        </li>
        <li>You will be granted access to the data using a suitable method.</li>
        <li>
          At the time of publication, add the suitable acknowledgement. More
          information can be found in the
          <a href="/api/files/aaaadh6l6rutj6qwhyxcxhyaae?alt=media" download>
            GoNL Publication Acknowledgment document (PDF, 99KB) </a
          >.
        </li>
      </ol>
    </PageSection>
  </Page>
  <AppFooter />
</template>

<script>
import { Page, PageHeader, PageSection } from "rd-components";
import AppFooter from "@/components/AppFooter.vue";
import pageHeader from "@/assets/gonl-pg-header-2.jpg";

export default {
  components: {
    Page,
    PageHeader,
    PageSection,
    AppFooter,
  },
  data() {
    return {
      pageHeader: pageHeader,
    };
  },
};
</script>

<style lang="scss">
.ordered-list {
  li {
    line-height: 1.5;
    margin-top: 6px;
  }
}
</style>
