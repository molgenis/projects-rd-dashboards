<template>
    <div class="d3-viz d3-pie-chart">
      <svg :id="chartId" preserveAspectRatio="xMinYMin"></svg>
    </div>
</template>

<script>
import { select, selectAll, scaleOrdinal, pie, arc, schemeBlues } from 'd3'
const d3 = { select, selectAll, scaleOrdinal, pie, arc, schemeBlues }

export default {
  name: 'PieChart',
  props: {
    chartId: {
      type: String,
      required: true
    },
    chartData: {
      type: Object,
      required: true,
      validator: (object) => {
        return Object.keys(object).length <= 7
      }
    },
    chartHeight: {
      type: Number,
      default: 300
    },
    chartWidth: {
      type: Number,
      default: 400
    },
    chartMargins: {
      type: Number,
      default: 20
    },
    /*
    * @param chartColors An object containing one-to-one mappings of groups to colors.
    *     If colors are not defined, a default palette will be chosen for you.
    */
    chartColors: {
      type: Object,
      default: null
    },
    /*
    * @param animate If True (default), the chart will render with interactive elements
    */
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
        
      const radius = Math.min(this.chartWidth, this.chartHeight) / 2 - this.chartMargins
      const pie = d3.pie().sort(null).value(value => value[1])
      const pieChartData = pie(Object.entries(this.chartData))
      
      const arcGenerator = d3.arc()
        .innerRadius(0)
        .outerRadius(radius * 0.7)
        
      const labelArcGenerator = d3.arc()
        .innerRadius(radius * 0.8)
        .outerRadius(radius * 0.8)

      const slices = dataLayer.selectAll('slices')
        .data(pieChartData)
        .join('path')
        .attr('d', arcGenerator)
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
          const centroid = arcGenerator.centroid(value)
          const outerCircleCentroid = labelArcGenerator.centroid(value)
          const labelPosition = labelArcGenerator.centroid(value)
          const angle = value.startAngle + (value.endAngle - value.startAngle) / 2
          labelPosition[0] = radius * 0.95 * (angle < Math.PI ? 1 : -1)
          return [centroid, outerCircleCentroid, labelPosition]
        })

      const labels = dataLayer.selectAll('slice-labels')
        .data(pieChartData)
        .join('text')
        .attr('class', 'slice-labels')
        .attr('data-group', value => value.data[0])
        .attr('transform', value => {
          const position = labelArcGenerator.centroid(value)
          const angle = value.startAngle + (value.endAngle - value.startAngle) / 2
          position[0] = radius * 0.99 * (angle < Math.PI ? 1 : -1)
          return `translate(${position})`
        })
        .style('text-anchor', value => {
          const angle = value.startAngle + (value.endAngle - value.startAngle) / 2
          return angle < Math.PI ? 'start' : 'end'
        })
        .style('font-size', '11pt')
      
      labels.append('tspan')
        .attr('class', 'data-label')
        .attr('data-group', value => value.data[0])
        .text(value => value.data[0])
        
      labels.append('tspan')
        .attr('dx', '-3.7em')
        .attr('dy', '1.5em')
        .attr('class', 'data-value')
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
