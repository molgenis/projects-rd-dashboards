<template>
  <div class="d3-viz d3-gauge">
    <h3 v-if="title" class="chart-title">{{ title }}</h3>
    <p v-if="description" class="chart-description">{{ description }}</p>
    <svg
      :id="chartId"
      :class="svgClassNames"
      width="100%"
      height="100%"
      :viewBox="viewbox"
      preserveAspectRatio="xMinYMin"
    >
      <g 
        class="chart-area"
        :transform="`translate(${ (chartWidth / 2 ) }, ${chartHeight / 2})`"
        >
        <g class="gauge-base-layer"></g>
        <g class="gauge-metric-layer"></g>
      </g>
    </svg>
  </div>
</template>

<script>

import { select, arc, pie } from "d3";
const d3 = { select, arc, pie }

import { validateNumRange } from '$shared/js/d3.js'

export default {
  name: "GaugeChart",
  props: {
    // A unique ID for the chart
    chartId: {
      type: String,
      required: true
    },
    
    // A title that describes the chart
    title: String,
    
    // Additional information to display below the title
    description: String,
    
    //
    value: {
      type: Number,
      required: true
    },
    
    // set the height of the chart. Width is determined by the
    // dimensions of the parent container so that the chart is
    // responsive. If you would like to specify the width of the
    // chart, use CSS or adjusted the `chartHeight`.
    chartHeight: {
      type: Number,
      // `300`
      default: 400
    },
    
    // set all chart margins
    chartMargins: {
      type: Number,
      // `20`
      default: 20
    },
    
    // set chart scale
    chartScale: {
      type: Number,
      // `0.75`
      default: 0.75,
      validator: (value) => validateNumRange(value)
    },
    
  },
  
  data () {
    return {
      chartWidth: 300
    }
  },
  
  computed: {
    svg () {
      return d3.select(`#${this.chartId}`)
    },
    svgClassNames () {
      const css = ['chart']
      if (this.title || this.description) {
        css.push('chart-has-context')
      }
      return css.join(' ')
    },
    chartArea () {
      return this.svg.select('g.chart-area')
    },
    viewbox () {
      return `0 0 ${this.chartWidth} ${this.chartHeight}`
    },
    radius () {
      return (Math.min(this.chartWidth, this.chartHeight) / 2) - this.chartMargins
    },
    pie () {
      return d3.pie().sort(null).value(value => value[0]);
    },
    gaugeChartData () {
      return this.pie([this.value])
    },
    arcGenerator () {
      return d3.arc().outerRadius(this.radius * 0.7)
    }
  },
  methods: {
    setChartDimensions () {
      const parent = this.$el.parentNode
      this.chartWidth = parent.offsetWidth * this.chartScale
    },
    drawSlices () {
      const slice = this.chartArea.select('.gauge-metric-layer') 
      slice.selectAll('*').remove()
      console.log(this.gaugeChartData)
      // slice.selectAll('slices')
      //   .data(this.pieChartData)
      //   .join('path')
      //   .attr('d', this.arcGenerator)
      //   .attr('class', 'slice')
      //   // .attr('stroke', this.strokeColor)
      //   .attr('data-group', value => value.data[0])
        // .attr('fill', value => 'blue')
    },
    renderChart () {
      this.setChartDimensions()
      this.drawSlices()
    }
  },
  mounted () {
    this.renderChart()
    window.addEventListener('resize', this.renderChart)
  },
  updated () {
    this.renderChart()
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.renderChart)
  }
}
</script>

<style lang="scss">

</style>