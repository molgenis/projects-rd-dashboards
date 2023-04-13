<template>
  <ul :class="classNames">
    <li
      class="legend-item"
      data-legend-item="item" v-for="key in Object.keys(data)"
      :key="key"
    >
    <button
      class="legend-item-button" 
      v-if="enableClicks"
      :data-group="key"
      @click="onClick(key)"
    >
      <LegendItem :label="key" :fill="data[key]" />
    </button>
    <LegendItem :label="key" :fill="data[key]" v-else/>
    </li>
  </ul>
</template>

<script>
import LegendItem from '@/components/VizLegendItem.vue'

// Create a legend for a visualisation for use outside the chart element. This
// component may be useful if you have several charts that display the
// same groups.
//
// @group VISUALISATIONS
export default {
  name: 'ChartLegend',
  components: { LegendItem },
  props: {
    // One or more key-value pairs
    data: {
      type: Object,
      required: true
    },
    // If true (default), all legend items will be stacked
    stackLegend: {
      type: Boolean,
      default: true
    },
    
    // If `true`, click events will be enabled for all bars. When a bar is
    // clicked, the row-level data for that bar will be emitted.
    // To access the data, use the event `@barClicked=>(value) => ...`
    enableClicks: {
      type: Boolean,
      // `false`
      default: false
    },
  },
  computed: {
    classNames () {
      const css = ['legend']
      if (!this.stackLegend) {
        css.push('legend-horizontal')
      }
      
      if (this.enableClicks) {
        css.push('clicks-enabled')
      }
      
      return css.join(' ')
    }
  },
  methods: {
    onClick (value) {
      this.$emit('itemClicked', value)
    }
  }
}
</script>

<style lang="scss">
.legend {
  list-style: none;
  padding: 0;
  margin: 0;

  .legend-item, .legend-item-button {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    flex-wrap: nowrap;
    column-gap: 4px;
    margin-bottom: 5px;
    
    &:last-child {
      margin: 0;
    }
    
    .item-marker {
      width: 16px;
    }
    .item-label {
      flex-grow: 1;
    }
  }
  
  .legend-item-button {
    background: none;
    padding: 0;
    color: inherit;
    border: none;
    font-size: inherit;
    cursor: pointer;
  }
  
  &.legend-horizontal {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.5em;
    
    .legend-item {
      margin-bottom: 0;
    }
  }
  
  &.clicks-enabled {
    .legend-item-button {
      .item-label {
        border-bottom: 1px solid transparent;
        
      }
      &:hover {
        .item-label {
          border-bottom-color: currentColor;
        }
      }
    }
  }
}
</style>
