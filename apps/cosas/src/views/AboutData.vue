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
    <PageSection aria-labelledby="overview-title" :verticalPadding="2">
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
    <PageSection>
      <h2>Jobs Overview</h2>
      <p>
        Data sourced from each source at regular intervals. The following table
        lists the current active jobs and when they run.
      </p>
      <DataTable
        tableId="jobsSchedule"
        :data="jobs"
        :columnOrder="['name', 'time', 'MON','TUE','WED','THU','FRI','SAT','SUN']"
      />
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
  VizLegend
} from "rd-components";
import pageHeaderImage from "@/assets/cosas-page-header.jpg";

let sources = ref([]);
let jobs = ref([]);

const legend = {
  "Live: source is connected and the data flow is online": "#629677",
  "Error: source is connected, but there is an error somewhere": "#A40E4C",
  "Not Connected: source has not been connected": "#ADADAD"
};

onMounted(() => {
  Promise.all([
    fetchData("/api/v2/cosasreports_datasources"),
    fetchData("/api/v2/sys_job_ScheduledJob?attrs=name,cronExpression")
  ]).then(response => {
    const datasources = response[0].items;
    sources.value = datasources;

    const schedule = response[1].items.map(row => {
      const [seconds, minutes, hours, dayOfMonth, month, dayOfWeek, year] = row.cronExpression.split(' ')
      
      // parse time into readable format
      const datetime = new Date().setHours(hours, minutes, seconds);
      const time = new Date(datetime).toLocaleTimeString("en-GB", {
        timeZone: "UTC",
        hour: "numeric",
        minute: "numeric"
      });

      // create "heat map" for days a job is scheduled
      const weekdays = ['MON','TUE','WED','THU','FRI','SAT','SUN']
      let days = {}
      if (dayOfWeek === '?') {
        weekdays.map(day => days[day] = 1)
      } else if (dayOfWeek.indexOf('-') > -1) {
        const [start, end] = dayOfWeek.split('-').map(value => weekdays.indexOf(value))
        weekdays.map((day,index) => {
          if (index >= start && index <= end) {
            days[day] = 1
          } else {
            days[day] = 0
          }
        })
      } else {
        weekdays.map(day => {
          if (day.indexOf(dayOfWeek) > -1) {
            days[day] = 1
          } else {
            days[day] = 0
          }
        })
      }

      return {
        name: row.name,
        time: time,
        ...days
      };
    });
    jobs.value = sortData(schedule, "name");
  });
});
</script>

<style lang="scss">
#dataSourcesOverview {
  margin-bottom: 1em;

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
            @include statusBubble(#a40e4c, hsl(335, 84%, 55%));
          }
        }
      }
    }
  }
}

#jobsSchedule {
  margin-bottom: 1em;
  
  thead {
    tr {
      th.column-numeric {
        text-align: center;
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
          @include heatMapCell(hsl(144, 21%, 75%));
        }
        
        &.value-zero {
          @include heatMapCell(none);
        }
      }
    }
  }
}
</style>
