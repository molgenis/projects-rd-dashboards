<template>
  <Page class="cosas-data-sources-page">
    <PageHeader
      class="cosas-page-header"
      title="COSAS Data Sources"
      subtitle="Overview on the data sources"
      :imageSrc="pageHeaderImage"
      height="medium"
      titlePositionX="left"
      titlePositionY="center"
    />
    <PageSection
      id="section-sources"
      aria-labelledby="overview-title"
      :verticalPadding="2"
    >
      <h2 id="overview-title">Data Sources</h2>
      <p>
        The COSAS database is populated by a number of data sources that come
        from internal and external providers. This data combined provides a
        centralised location of patient metadata in the Genome Diagnostics
        group. These sources are described in the table below.
      </p>
      <MessageBox type="error" v-if="loadError">
        <p>{{ loadError }}</p>
      </MessageBox>
      <div v-else>
        <DataTable
          tableId="dataSourcesOverview"
          caption="Data sources and connection status"
          :data="sources"
          :columnOrder="['source', 'metadata','type','status']"
          :enableRowHighlighting="false"
        />
        <p>The status indicators are described below.</p>
        <VizLegend :data="legend" />
      </div>
    </PageSection>
    <PageSection
      id="section-alissa"
      aria-labelledby="alissa-title"
      :verticalPadding="2"
    >
      <h2 id="alissa-title">Alissa Data Flow</h2>
      <p>
        The variant database is populated by data from COSAS and Alissa. The
        Alissa database provides metadata on variant classification, and this
        information is retrievable using the Alissa API. Alissa data is prepared
        for import into a the variant database in a series of steps as depicted
        in the following image and described below.
      </p>
      <img
        :src="AlissaDataFlow"
        class="image"
        alt="alissa to variant database data flow"
      />
      <ol>
        <li>
          <strong>Accession Number Validation</strong>
          <p style="margin-top:8px;">
            The first step in the workflow is to determine which UMCG patients
            also exist in Alissa Interpret. UMCG numbers of family IDs are
            pulled from the nightly Adlas/Darwin exports, and formatted into the
            Alissa accession number format:
            <code>familieNumr_umcgNumr</code>. These numbers are sent to patient
            endpoint to determine if the patient exists in Alissa. The result is
            stored in the "Alissa Patients" staging table.
          </p>
        </li>
        <li>
          <strong>Retrieval of Patient Metadata</strong>
          <p style="margin-top:8px;">
            For patients that exist in Alissa, the patient metadata is retrieved
            and stored in the "Alissa Patients" table. If a patient was not
            previously found in Alissa, they will be rechecked and updated
            accordingly.
          </p>
        </li>
        <li>
          <strong>Retrieval of Patient Analyses</strong>
          <p style="margin-top:8px;">
            For patients that exist in Alissa, analyses for each patient are
            retrieved and stored in the "Alissa Analyses" table. Only analyses
            that are marked "complete" are retained in the staging table.
          </p>
        </li>
        <li>
          <strong>Retrieval of Inheritance Analyses</strong>
          <p style="margin-top:8px;">
            Additional metadata on inheritance analyses are stored separately
            and are retrieved by filtering the analyses where the analysis type
            is marked "inheritance". Metadata is stored in the "Alissa
            Inheritance Analyses" staging table.
          </p>
        </li>
        <li>
          <strong>Retrieval of Classified Variants</strong>
          <p style="margin-top:8px;">
            Retrieving classification metadata is a two-part process. First, a
            "variant export" must be generated for each analysis; only reports
            that have been marked for review are generated. This step returns a
            unique identifier that is used to retrieve the actual metadata.
            Metadata is stored in the "Alissa Variants" staging table. This
            process is run a second time to retrieve variants for inheritance
            analyses.
          </p>
        </li>
      </ol>
      <p>
        The retrieval of data is managed by five scripts. Each script runs
        independently, and is designed to update existing records, import new
        records, and retry cases that previously failed.
      </p>
    </PageSection>
    <PageSection id="section-jobs" aria-labelledby="jobs-overview-title">
      <h2 id="jobs-overview-title">Jobs Overview</h2>
      <p>
        Data is imported into COSAS at regular intervals using a series of
        scripts. Each script is scheduled as a job and is responsible for
        retrieving and importing a specific dataset (e.g., phenotypic data,
        variants, consent, etc.). There are a {{ jobs.length }} jobs in total
        that run throughout the week. The following table shows when each job is
        run and the status of the most recent run.
      </p>
      <MessageBox type="error" v-if="loadError">
        <p>{{ loadError }}</p>
      </MessageBox>
      <div class="table-container" v-else>
        <DataTable
          tableId="jobsSchedule"
          :data="jobs"
          :columnOrder="[
            'job',
            'time',
            'status',
            'MON',
            'TUE',
            'WED',
            'THU',
            'FRI',
            'SAT',
            'SUN'
          ]"
          :renderHtml="true"
          :enableAlternateRowColor="false"
        />
      </div>
    </PageSection>
  </Page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { fetchData, sortData } from "$shared/js/utils.js";
import {
  Page,
  PageHeader,
  PageSection,
  DataTable,
  VizLegend,
  MessageBox
} from "rd-components";

import pageHeaderImage from "@/assets/cosas-page-header.jpg";
import AlissaDataFlow from "@/assets/cosas-variant-db-alissa.png";

let sources = ref([]);
let jobs = ref([]);
let loadError = ref(null);

const legend = {
  "Live: source is connected and the data flow is online": "#629677",
  "Error: source is connected, but there is an error somewhere": "#A40E4C",
  "Not Connected: source has not been connected": "#ADADAD"
};

onMounted(() => {
  Promise.all([
    fetchData("/api/v2/cosasreports_datasources"),
    fetchData("/api/v2/cosasreports_jobs")
  ]).then(response => {
    const datasources = response[0].items;
    sources.value = datasources;

    const schedule = response[1].items.map(row => {
      const [
        seconds,
        minutes,
        hours,
        dayOfMonth,
        month,
        dayOfWeek,
        year
      ] = row.cron.split(" ");

      // parse time into readable format
      const datetime = new Date().setHours(hours, minutes, seconds);
      const time = new Date(datetime).toLocaleTimeString("en-GB", {
        timeZone: "Europe/Amsterdam",
        hour: "numeric",
        minute: "numeric"
      });

      // create "heat map" for days a job is scheduled
      const weekdays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
      let days = {};
      if (dayOfWeek === "?") {
        weekdays.map(day => (days[day] = 1));
      } else if (dayOfWeek.indexOf("-") > -1) {
        const [start, end] = dayOfWeek
          .split("-")
          .map(value => weekdays.indexOf(value));
        weekdays.map((day, index) => {
          if (index >= start && index <= end) {
            days[day] = 1;
          } else {
            days[day] = 0;
          }
        });
      } else {
        weekdays.map(day => {
          if (day.indexOf(dayOfWeek) > -1) {
            days[day] = 1;
          } else {
            days[day] = 0;
          }
        });
      }

      const jobState = row.isStable ? 'live' : 'error'
      const jobHtml = `
        <div class="job-meta">
          <span class="job-name">${row.name}</span>
          <span class="job-description">${row.description}</span>
        </div>`
      
      return {
        name: row.name,
        job: jobHtml,
        status: `<span class="job-status job-status-${jobState}">${jobState}</span>`,
        time: time,
        ...days
      };
    });
    jobs.value = sortData(schedule, "name");
  }).catch(error => {
    const e = JSON.parse(error.message)
    if (e.status === 401) {
      loadError.value = `Please sign in to view information (error: ${e.status})`
    } else {
      loadError.value = `Unable to retrieve information. (error: ${e.status})`
    }
  })
});
</script>

<style lang="scss">
.cosas-data-sources-page {
  .image {
    display: block;
    width: 90%;
    margin: 1em auto;
    max-width: 800px;
  }
}

#dataSourcesOverview {
  margin-bottom: 1em;

  caption {
    font-weight: bold;
    font-size: 14pt;
  }

  thead {
    tr {
      th[data-column-name="status"] {
        text-align: center;
      }
    }
  }
  tbody {
    tr {
      td.column-status {
        text-align: center;

        @mixin statusBubble($color, $shadow) {
          display: block;
          $size: 21px;
          width: $size;
          height: $size;
          margin: 0 auto;
          border-radius: 12px;
          color: $color;
          background-color: $color;
          box-shadow: 0 0 3px 4px $shadow;
        }

        &.value-zero {
          .cell-value {
            @include statusBubble($gray-300, $gray-200);
          }
        }

        &.value-positive {
          .cell-value {
            @include statusBubble(#629677, hsl(144, 21%, 75%));
          }
        }

        &.value-negative {
          .cell-value {
            @include statusBubble(#a40e4c, hsl(335, 84%, 85%));
          }
        }
      }
    }
  }
}

#jobsSchedule {
  margin-bottom: 1em;
  position: relative;

  thead {
    
    tr {
      th {
        position: sticky;
        position: -webkit-sticky;
        top: 0;
        background-color: $gray-000;
        padding-top: 1.25em;
        
        &.column-numeric {
          text-align: center;
        }
      }
    }
  }
  tbody {
    tr {
      td {
        
        @mixin heatMapCell($color) {
          background-color: $color;
          color: transparent;
          border: 1px solid $gray-600;
        }

        &.value-positive {
          @include heatMapCell(hsl(222, 80%, 90%));
        }

        &.value-zero {
          @include heatMapCell(none);
        }

        &.column-job {
          .job-name {
            display: block;
            font-size: 10pt;
            text-transform: uppercase;
            color: $gray-700;
            letter-spacing: 1px;
          }
          
          .job-description {
            display: block;
            font-size: 11pt;
            margin-top: 6px;
            color: $gray-500;
            line-height: 1.4;
          }
        }
        
        &.column-status {
          text-align: center;
          .job-status {
            font-size: 8pt;
            padding: 4px 12px;
            border-radius: 12px;
            text-transform: uppercase;
            letter-spacing: 2px;
            font-weight: bold;
            
            &.job-status-live {
              background-color: hsl(144, 21%, 88%);
              color: hsl(144, 21%, 15%);
            }
            
            &.job-status-error {
              color: hsl(335, 84%, 30%);
              background-color: hsl(335, 84%, 95%);
            }
          }
        }
        
        &.column-status, &.column-job, &.column-time {
          border-bottom: 1px dotted $gray-500;
        }
      }
    }
  }
}
</style>
