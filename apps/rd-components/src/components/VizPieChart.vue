<template>
  <div class="d3-viz d3-pie-chart">
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
        :transform="`translate(${this.chartWidth / 2 }, ${this.chartHeight / 2})`"
      >
        <g class="pie-slices"></g>
        <g class="pie-labels"></g>
      </g>
    </svg>
  </div>
</template>

<script>
import { select, selectAll, scaleOrdinal, pie, arc, schemeBlues } from 'd3'
const d3 = { select, selectAll, scaleOrdinal, pie, arc, schemeBlues }

// Create a pie chart to visually display subelements of your data in relation
// to the entire dataset. The data should contain no more than 7 elements and
// all group-values pairs that are less than 1% must be combined into an
// "other" category. Colors should be used to highlight interesting findings
// rather than emphasizing groups. However, if you require a group-based color
// scheme, make sure colors are accessible and use a *muted* color palette.
// Please note that group differences can be emphasized by enabling animations.
//
// @group VISUALISATIONS 
export default {
  name: 'PieChart',
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
    
    // An object containing 7 or fewer group-value pairs
    chartData: {
      type: Object,
      required: true,
      validator: (object) => {
        return Object.keys(object).length <= 7
      }
    },
    // set the height of the chart
    chartHeight: {
      type: Number,
      // `300`
      default: 300
    },
    
    // set the width of the chart
    chartWidth: {
      type: Number,
      // `400`
      default: 600
    },
    
    // set all chart margins
    chartMargins: {
      type: Number,
      // `20`
      default: 20
    },
  
    // An object containing one-to-one mappings of groups to colors.
    // If colors are not defined, a default palette will be chosen for you.
    chartColors: {
      type: Object,
      default: null
    },
    
    //
    strokeColor: {
      type: String,
      default: '#3f454b'
    },
    
    // If `true`, click events will be enabled for all bars. When a bar is
    // clicked, the row-level data for that bar will be emitted.
    // To access the data, use the event `@barClicked=>(value) => ...`
    enableClicks: {
      type: Boolean,
      // `false`
      default: true
    },

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
      if (this.enableClicks) {
        css.push('slice-clicks-enabled')
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
      return d3.pie().sort(null).value(value => value[1])
    },
    pieChartData () {      
      return this.pie(Object.entries(this.chartData))
    },
    arcGenerator () {
      return d3.arc().innerRadius(0).outerRadius(this.radius * 0.7)
    },
    labelArcGenerator () {
      return d3.arc()
        .innerRadius(this.radius * 0.8)
        .outerRadius(this.radius * 0.8)
    },
    colors () {
      if (!this.chartColors) {
        const autoColors = {}
        const length = Object.keys(this.chartData).length
        const palette = d3.scaleOrdinal(d3.schemeBlues[length])
        Object.keys(this.chartData).forEach((key, index) => {
          autoColors[key] = palette(index)
        })
        return autoColors
      }
      return this.chartColors
    }
  },
  methods: {
    setLabelPosition (value) {
      const position = this.labelArcGenerator.centroid(value)
        const angle = value.startAngle + (value.endAngle - value.startAngle) / 2
        position[0] = this.radius * 0.99 * (angle < Math.PI ? 1 : -1)
        return position
    },
    setTextAnchor (value) {
      const angle = value.startAngle + (value.endAngle - value.startAngle) / 2
      return angle < Math.PI ? 'start' : 'end'
    },
    setOffsetX (value) {
      const angle = value.startAngle + (value.endAngle - value.startAngle) / 2
      return angle < Math.PI ? '-1em' : '1em'
    },
    setPieChartData () {
      const pie = d3.pie().sort(null).value(value => value[1])
      this.pieChartData = pie(Object.entries(this.chartData))
    },
    onMouseOver (value) {
      const selector = value.data[0]
      const slice = this.svg.select(`path.slices[data-group="${selector}"]`)
      const sliceLabel = this.svg.select(`tspan.data-label[data-group="${selector}"]`)
      const sliceValue = this.svg.select(`tspan.data-value[data-group="${selector}"]`)
      slice.attr('transition', '600').attr('transform', 'scale(1.2)')
      sliceLabel.style('font-size', '13pt').style('font-weight', 'bold')
      sliceValue.style('font-size', '13pt')
    },
    onMouseOut (value) {
      const selector = value.data[0]
      const slice = this.svg.select(`path.slices[data-group="${selector}"]`)
      const sliceLabel = this.svg.select(`tspan.data-label[data-group="${selector}"]`)
      const sliceValue = this.svg.select(`tspan.data-value[data-group="${selector}"]`)
      slice.attr('transition', '600').attr('transform', 'scale(1)')
      sliceLabel.style('font-size', '11pt').style('font-weight', 'normal')
      sliceValue.style('font-size', '11pt')
    },
    onClick (value) {
      const data = {}
      data[value.data[0]] = value.data[1]
      this.$emit('sliceClicked', data)
    },
    renderChart () {
      const pieSlices = this.chartArea.select('.pie-slices') 
      pieSlices.selectAll('*').remove()
      const slices = pieSlices.selectAll('slices')
        .data(this.pieChartData)
        .join('path')
        .attr('d', this.arcGenerator)
        .attr('class', 'slice')
        .attr('stroke', this.strokeColor)
        .attr('data-group', value => value.data[0])
        .attr('fill', value => this.colors[value.data[0]])
        
      const pieLabels = this.chartArea.select('.pie-labels')
      pieLabels.selectAll('*').remove()
      pieLabels.selectAll('pie-label-lines')
        .data(this.pieChartData)
        .join('polyline')
        .attr('class', 'pie-label-line')
        .attr('stroke', this.strokeColor)
        .attr('points', value => {
          const centroid = this.arcGenerator.centroid(value)
          const outerCircleCentroid = this.labelArcGenerator.centroid(value)
          const labelPosition = this.labelArcGenerator.centroid(value)
          const angle = value.startAngle + (value.endAngle - value.startAngle) / 2
          labelPosition[0] = this.radius * 0.95 * (angle < Math.PI ? 1 : -1)
          return [centroid, outerCircleCentroid, labelPosition]
        })

      const labels = pieLabels.selectAll('slice-labels')
        .data(this.pieChartData)
        .join('text')
        .attr('class', 'pie-label-text')
        .attr('data-group', value => value.data[0])
        .attr('x', value => this.setLabelPosition(value)[0])
        .attr('y', value => this.setLabelPosition(value)[1])
        .style('text-anchor', this.setTextAnchor)
        .style('font-size', '11pt')

      labels.append('tspan')
        .attr('class', 'data-label')
        .attr('x', value => this.setLabelPosition(value)[0])
        .attr('data-group', value => value.data[0])
        .text(value => value.data[0])
        
      labels.append('tspan')
        .attr('class', 'data-value')
        .attr('x', value => this.setLabelPosition(value)[0])
        .attr('dy', '1.1em')
        .attr('data-group', value => value.data[0])
        .text(value => `${value.data[1]}%`)
        
      if (this.enableClicks) {
        slices.on('mouseover', (event, value) => this.onMouseOver(value))
        slices.on('mouseout', (event, value) => this.onMouseOut(value))
      }
      
      if (this.enableClicks) {
        slices.on('click', (event, value) => this.onClick(value))
      }
    }
  },
  mounted () {
    this.renderChart()
  },
  updated () {
    this.renderChart()
  }
}
</script>

<style lang="scss">
.d3-pie-chart {
  .chart {
    display: block;
    
    .chart-area {
      path.slice {
        stroke-width: 1px;
        opacity: 0.7;
        cursor: pointer;
      }
      polyline.pie-label-line {
        fill: none;
        stroke-width: 1px;
      }
    }
  }
}
</style>
