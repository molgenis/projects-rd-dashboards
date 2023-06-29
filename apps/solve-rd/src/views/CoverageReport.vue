<template>
  <Page>
    <PageHeader
      title="Coverage Report"
      subtitle="Overview of RD3 tables and existing data"
    />
    <PageSection aria-labelledby="coverage-report-title">
      <h2 id="coverage-report-title">Coverage by RD3 Table</h2>
      <p>
        The following table provides insight on RD3 tables and how much data
        there is.
      </p>
      <MessageBox type="error" v-if="error">
        {{ error }}
      </MessageBox>
      <div v-else>
        <form class="options-menu">
          <legend class="visually-hidden">Options</legend>
          <div class="option">
            <label for="attribute-select">Sort data</label>
            <select id="attribute-select" v-model="sortAttribute">
              <option value="attribute" selected>Attribute</option>
              <option value="difference">Difference</option>
              <option value="observed">Observed</option>
              <option value="percent">% Complete</option>
            </select>
          </div>
          <div class="option">
            <label for="order-input">
              <input id="order-input" type="checkbox" v-model="reverseSort" />
              Reverse sort data?
            </label>
          </div>
        </form>
        <DataTable
          tableId="subjects-table"
          :data="data"
          :columnOrder="[
            'attribute',
            'observed',
            'expected',
            'difference',
            '% complete'
          ]"
          caption="Subjects Table"
        />
      </div>
    </PageSection>
  </Page>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { fetchData, sortData, reverseSortData } from "$shared/js/utils.js";

import {
  Page,
  PageHeader,
  PageSection,
  MessageBox,
  DataTable
} from "rd-components";

let data = ref([]);
let error = ref(null);
let sortAttribute = ref("attribute");
let reverseSort = ref(false);

function updateDataset() {
  data.value = reverseSort.value
    ? reverseSortData(data.value, sortAttribute.value)
    : sortData(data.value, sortAttribute.value);
}

onMounted(() => {
  Promise.resolve(fetchData("/api/v1/rd3stats_coverage"))
    .then(response => {
      data.value = response.items.map(row => {
        return {
          ...row,
          difference: row.expected - row.observed,
          '% complete': (row.percent * 100).toFixed(2),
        };
      });
    })
    .catch(error => {
      error.value = error;
    });
});

watch([data, sortAttribute, reverseSort], updateDataset);
</script>

<style lang="scss">
.options-menu {
  background-color: $blue-050;
  box-sizing: border-box;
  padding: 1em;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  gap: 2em;
  margin: 1em 0;

  .option {
    flex-grow: 1;

    label {
      font-size: 13pt;
    }

    select {
      width: 100%;
      margin-top: 8px;
    }
  }
}

#subjects-table {
  th[data-column-index="4"],
  td[data-column-index="4"] {
    text-align: right;
  }
}
</style>
