<template>
  <Page>
    <PageHeader
      class="cosas-page-header"
      title="COSAS Data Sources"
      subtitle="Overview on the data sources"
      :imageSrc="pageHeaderImage"
      height="medium"
      titlePositionX="left"
      titlePositionY="center"
    />
    <PageSection aria-labelledby="overview-title">
      <h2 id="overview-title">Overview</h2>
      <p>
        The COSAS database is populated by a number of data sources that come
        from internal and external providers. This data combined provides a
        centralised location of patient metadata in the Genome Diagnostics
        group. These sources are described in the table below.
      </p>
      <DataTable
        tableId="dataSourcesOverview"
        caption="Data sources and connection status"
        :data="sources"
        :columnOrder="['source', 'metadata', 'status']"
        :enableRowHighlighting="false"
      />
      <p>The status indicators are described below.</p>
      <VizLegend :data="legend" />
    </PageSection>
  </Page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {fetchData } from "$shared/js/utils.js"
import { Page, PageHeader, PageSection, DataTable, VizLegend } from "rd-components";
import pageHeaderImage from "@/assets/cosas-page-header.jpg";

let sources = ref([]);

const legend = {
  "Live: source is connected and the data flow is online": '#629677',
  "Error: source is connected, but there is an error somewhere": '#A40E4C',
  "Not Connected: source has not been connected": '#ADADAD'
}

onMounted(() => {
  Promise.resolve(fetchData('/api/v2/cosasreports_datasources'))
  .then(response => {
    sources.value = response.items
  })
})


</script>

<style lang="scss">
#dataSourcesOverview {
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
            @include statusBubble(#A40E4C, hsl(335, 84%, 55%));
          }
        }
      }
    }
  }
}
</style>