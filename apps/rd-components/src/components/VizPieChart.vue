<template>
    <div class="d3-viz d3-pie-chart">
      <svg :id="chartId" preserveAspectRatio="xMinYMin"></svg>
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
      default: 400
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
    // If True (default), the chart will render with interactive elements
    animate: {
      type: Boolean,
      default: true
    }
  },
  computed: {
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
    renderChart () { 
      const svg = d3.select(`#${this.chartId}`)
      svg.selectAll('*').remove()
      
      const dataLayer = svg
        .attr('width', this.chartWidth)
        .attr('height', this.chartHeight)
        .attr('viewbox', `0 0 ${this.chartWidth} ${this.chartHeight}`)
        .append('g')
        .attr('class', 'pie-chart-content')
        .attr('transform', `translate(${this.chartWidth / 2}, ${this.chartHeight / 2})`)
        
      this.radius = Math.min(this.chartWidth, this.chartHeight) / 2 - this.chartMargins
      const pie = d3.pie().sort(null).value(value => value[1])
      const pieChartData = pie(Object.entries(this.chartData))
      
      this.arcGenerator = d3.arc()
        .innerRadius(0)
        .outerRadius(this.radius * 0.7)
        
      this.labelArcGenerator = d3.arc()
        .innerRadius(this.radius * 0.8)
        .outerRadius(this.radius * 0.8)

      const slices = dataLayer.selectAll('slices')
        .data(pieChartData)
        .join('path')
        .attr('d', this.arcGenerator)
        .attr('class', 'slices')
        .attr('data-group', value => value.data[0])
        .attr('fill', value => this.colors[value.data[0]])
        .attr('stroke', '#3f454b')
        .style('stroke-width', '1px')
        .style('opacity', 0.7)
        .attr('cursor', 'pointer')
        
      dataLayer.selectAll('slice-label-lines')
        .data(pieChartData)
        .join('polyline')
        .attr('class', 'slice-label-lines')
        .attr('stroke', '#3f454b')
        .attr('fill', 'none')
        .attr('stroke-width', '1px')
        .attr('points', value => {
          const centroid = this.arcGenerator.centroid(value)
          const outerCircleCentroid = this.labelArcGenerator.centroid(value)
          const labelPosition = this.labelArcGenerator.centroid(value)
          const angle = value.startAngle + (value.endAngle - value.startAngle) / 2
          labelPosition[0] = this.radius * 0.95 * (angle < Math.PI ? 1 : -1)
          return [centroid, outerCircleCentroid, labelPosition]
        })

      const labels = dataLayer.selectAll('slice-labels')
        .data(pieChartData)
        .join('text')
        .attr('class', 'slice-labels')
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
        
      if (this.animate) {
        slices.on('mouseover', (event, value) => {
          const selector = value.data[0]
          const slice = svg.select(`path.slices[data-group="${selector}"]`)
          const sliceLabel = svg.select(`tspan.data-label[data-group="${selector}"]`)
          const sliceValue = svg.select(`tspan.data-value[data-group="${selector}"]`)
          slice.attr('transition', '600').attr('transform', 'scale(1.2)')
          sliceLabel.style('font-size', '13pt').style('font-weight', 'bold')
          sliceValue.style('font-size', '13pt')
        })
        .on('mouseout', (event, value) => {
          const selector = value.data[0]
          const slice = svg.select(`path.slices[data-group="${selector}"]`)
          const sliceLabel = svg.select(`tspan.data-label[data-group="${selector}"]`)
          const sliceValue = svg.select(`tspan.data-value[data-group="${selector}"]`)
          slice.attr('transition', '600').attr('transform', 'scale(1)')
          sliceLabel.style('font-size', '11pt').style('font-weight', 'normal')
          sliceValue.style('font-size', '11pt')
        })
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
  svg {
    display: block;
    margin: 0 auto;
  }
}
</style>
