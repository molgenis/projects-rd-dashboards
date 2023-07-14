<template>
  <Page id="cosas-dashboard" class="data-page">
    <PageHeader
      class="cosas-page-header"
      title="COSAS"
      subtitle="COSAS Dashboard"
      :imageSrc="pageHeaderImage"
      height="medium"
      titlePositionX="center"
      titlePositionY="center"
    />
    <PageSection v-if="requestHasFailed">
      <MessageBox type="error">
        <p>
          Error! Unable to retrieve data. Please sign in or try again later.
        </p>
      </MessageBox>
    </PageSection>
    <PageSection v-else-if="!requestHasFailed && loading">
      <MessageBox type="default">
        <p>Retrieving data....</p>
      </MessageBox>
    </PageSection>
    <div v-else>
      <PageSection
        id="cosas-dashboard-highlights"
        aria-labelledby="cosas-dashboard-highlights-title"
        :verticalPadding="1"
        width="large"
      >
        <h2 class="visually-hidden" id="cosas-dashboard-highlights-title">
          Cosas to date
        </h2>
        <DataValueHighlights
          title="summary of the database based on the most recent import"
          :data="mostRecentImport.values"
        />
        <p class="viz-note">
          <span v-if="mostRecentImport.date">
            Data was last updated {{ mostRecentImport.date }}
          </span>
          <span v-else class="text-error"
            >Error: unable to retrieve latest metadata.</span
          >
        </p>
      </PageSection>
      <PageSection
        id="cosas-dashboard-summary"
        aria-labelledby="cosas-dashboard-sumary-title"
        :verticalPadding="2"
      >
        <h2>COSAS over the last 30 days</h2>
        <p>
          Data is imported into COSAS at regular intervals. The following table
          displays the change in values over the last 30 days. For more
          information, see the
          <a
            href="/menu/plugins/dataexplorer?entity=cosasreports_imports&hideselect=true"
            >Daily Import</a
          >
          table to view the raw data.
        </p>
        <DataTable
          tableId="daily-import-summary"
          :data="dailyImportSummary"
          caption="Growth of the COSAS database over the last 30 days"
          :columnOrder="[
            'category',
            'starting.value',
            'final.value',
            'difference'
          ]"
        />
      </PageSection>
      <PageSection
        id="cosas-dashboard-coverage-report"
        aria-labelledby="cosas-dashboard-coverage-report-title"
        :verticalPadding="2"
      >
        <h2 id="cosas-dashboard-coverage-report-title">
          COSAS Coverage Report
        </h2>
        <p>
          How much of the COSAS database is used? COSAS has 6 primary tables, 7
          secondary tables, and 24 reference tables. To understand how much data
          is in COSAS, the following tables provide a summary of the primary
          tables. This includes the columns that are used and how much data is
          stored in those columns.
        </p>
        <p>
          The data used in the following tables was updated on
          {{ dateAttributeSummaryDataUpdated }}. If you would like to view the
          raw data, please follow the link to the
          <a
            href="/menu/plugins/dataexplorer?entity=cosasreports_attributesummary&hideselect=true"
            >COSAS Attribute Summary Table</a
          >.
        </p>
        <DataTable
          tableId="subject-attributes"
          caption="Summary of subject table attributes"
          :data="attributeSummaryData.subjects"
          :columnOrder="attributeSummaryColumnOrder"
        />
        <DataTable
          tableId="clinical-attributes"
          caption="Summary of clinical table attributes"
          :data="attributeSummaryData.clinical"
          :columnOrder="attributeSummaryColumnOrder"
        />
        <DataTable
          tableId="samples-attributes"
          caption="Summary of sample table attributes"
          :data="attributeSummaryData.samples"
          :columnOrder="attributeSummaryColumnOrder"
        />
        <DataTable
          tableId="sampleprep-attributes"
          caption="Summary of sample preparation table attributes"
          :data="attributeSummaryData.samplePreparation"
          :columnOrder="attributeSummaryColumnOrder"
        />
        <DataTable
          tableId="sequencing-attributes"
          caption="Summary of sequencing table attributes"
          :data="attributeSummaryData.sequencing"
          :columnOrder="attributeSummaryColumnOrder"
        />
      </PageSection>
    </div>
  </Page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  Page,
  PageHeader,
  PageSection,
  MessageBox,
  DataValueHighlights,
  DataTable
} from "rd-components";
import {
  fetchData,
  minDate,
  maxDate,
  stringAsNumber,
  daysDiff
} from "$shared/js/utils.js";
import pageHeaderImage from "@/assets/cosas-page-header.jpg";

let requestHasFailed = ref(false);
let loading = ref(true);
let mostRecentImport = ref({});
let attributeSummaryData = ref({});
let dateAttributeSummaryDataUpdated = ref(null);
let dailyImportSummary = ref([]);

const attributeSummaryColumnOrder = [
  "column",
  "expected",
  "actual",
  "difference",
  "complete",
  "key.type"
];

function transformDailyImportsData(data) {
  const dateRange = {
    min: minDate(data.items, "date")
      .toISOString()
      .split("T")[0],
    max: maxDate(data.items, "date")
      .toISOString()
      .split("T")[0]
  };
  const dataFiltered = {
    min: data.items.filter(row => row.date === dateRange.min),
    max: data.items.filter(row => row.date === dateRange.max)
  };

  const columns = ["subjects", "samples", "sequencing"];
  const result = columns.map(column => {
    const row = {
      category: column,
      "starting.value": stringAsNumber(dataFiltered.min[0][column]),
      "final.value": stringAsNumber(dataFiltered.max[0][column])
    };
    row.difference = row["final.value"] - row["starting.value"];
    return row;
  });
  return result;
}

function transformSummaryData(data) {
  dateAttributeSummaryDataUpdated.value = data.items[0].dateLastUpdated;
  data.items.forEach(row => {
    if (!attributeSummaryData.value[row.databaseTable]) {
      attributeSummaryData.value[row.databaseTable] = [];
    }
    attributeSummaryData.value[row.databaseTable].push({
      column: row.displayName,
      actual: row.countOfValues,
      expected: row.totalValues,
      difference: row.differenceInValues,
      complete: `${row.percentComplete * 100}%`,
      "key.type": row.databaseKey !== undefined ? row.databaseKey.value : ""
    });
  });

  Object.keys(attributeSummaryData.value).forEach(key => {
    attributeSummaryData.value[key].sort((a, b) => {
      return a.column.toLowerCase() > b.column.toLowerCase() ? 1 : -1;
    });
  });
}

onMounted(() => {
  Promise.all([
    fetchData(
      "/api/v2/cosasreports_imports?sort=date:desc&num=30&q=hasCompleted==true"
    ),
    fetchData("/api/v2/cosasreports_attributesummary?")
  ])
    .then(result => {
      const dailyImportReports = result[0];
      const attributeSummaryData = result[1];

      const latestImport = dailyImportReports.items[0];
      const dateLastUpdated = daysDiff(new Date(), new Date(latestImport.date));
      mostRecentImport.value.date = dateLastUpdated;
      mostRecentImport.value.values = {
        subjects: latestImport.subjects.toLocaleString("en"),
        samples: latestImport.samples.toLocaleString("en"),
        sequences: latestImport.sequencing.toLocaleString("en")
      };

      const reportData = transformDailyImportsData(dailyImportReports);
      dailyImportSummary.value = reportData;

      transformSummaryData(attributeSummaryData);
    })
    .then(() => {
      loading.value = false;
    })
    .catch(error => {
      const err = JSON.parse(error.message);
      const message = `${err.message} (${err.status})`;
      requestHasFailed.value = true;
      throw new Error(`${message} ${err.url}`);
    });
});
</script>

<style lang="scss">
#cosas-dashboard-highlights {
  background-color: $gray-100;
}

.viz-note {
  font-size: 11pt;
  font-style: italic;
  color: $gray-600;
}

#daily-import-summary {
  .column-difference {
    &.value-positive {
      .cell-value {
        background-color: hsl(140, 33%, 92%);
        color: hsl(140, 33%, 40%);
        padding: 9px;
        border-radius: 12pt;
        font-size: 12pt;
        font-weight: bold;
        
        &::before {
          content: "\002B";
        }
      }
    }
  }
}

#cosas-dashboard-coverage-report {
  .d3-table {
    margin-bottom: 2.25em;
  }
}
</style>
