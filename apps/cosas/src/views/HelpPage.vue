<template>
  <Page id="help-page">
    <PageHeader
      id="helpHeader"
      title="Database Help"
      subtitle="Frequently asked questions and troubleshooting"
      :imageSrc="pageHeaderImage"
      height="medium"
      titlePositionX="center"
      titlePositionY="center"
    />
    <PageSection id="troubleshooting-searches" :verticalPadding="2">
      <h2>Troubleshooting</h2>
      <p>On this page, you can find information on how to resolve issues with the search and what error messages mean. In the event that something goes wrong while conducting a search, an error message will be displayed below the search button. The message will give you an error code, reason, and the URL that was used to search. This information is useful for diagnosing potential bugs or other issues. If you encounter any issues, take a look at the questions below.</p>
      <Accordion
        id="troubleshooting-search-multiple-values"
        title="How do I search for multiple values?"
      >
        <p>All text fields accept multiple values. To search for more than one value, separate all the values with a comma. You do not need to worry about formatting spaces as this is handled automatically. For example, if you were searching for more than one patient, enter the patient IDs like so, "Patient-01234, Patient-56789". You may enter as many values as you like.</p>
      </Accordion>
      <Accordion
        id="troubleshooting-errors-found-0-records"
        title="I've received the message 'Found 0 records'. What does this mean?"
      >
        <p>The message "Found 0 records" means that there are no matching records in the database based on the search criteria that you provided. Make sure the value is entered correctly, try entering a new value, or adjusting the filters. If you continue to receive zero results, then it is likely that the data is not yet available in a database.</p>
      </Accordion>
      <Accordion
        id="troubleshooting-errors-bad-reqest"
        title="My search returns the error 'Bad Request (400)'. How do I fix this?"
      >
        <p>First, make sure you are <a href="/login">signed in</a>. Otherwise, this error occurrs when all search fields are blank. Make sure at least one of the search fields is filled in or at least one box has been ticked.</p>
      </Accordion>
    </PageSection>
  </Page>
</template>

<script setup>
import { Page, PageHeader, PageSection, Accordion } from 'rd-components'
import pageHeaderImage from '@/assets/cosas-page-header.jpg'

</script>
