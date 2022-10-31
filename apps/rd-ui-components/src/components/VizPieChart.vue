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
    title: {
      type: String
    },
    chartHeight: {
      type: Number,
      default: 250
    },
    chartWidth: {
      type: Number,
      default: 350
    },
    chartMargins: {
      type: Number,
      default: 20
    },
    chartColors: {
      type: Array,
      // default: () => ['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56']
    }
  },
  computed: {
    colors () {
      return this.chartColors ? this.chartColors : d3.scaleOrdinal(d3.schemeBlues[7]);
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
      const pie = d3.pie().sort(null).value(d => d[1])
      const pieChartData = pie(Object.entries(this.chartData))
      
      const arcGenerator = d3.arc()
        .innerRadius(0)
        .outerRadius(radius * 0.7)
        
      const labelArcGenerator = d3.arc()
        .innerRadius(radius * 0.8)
        .outerRadius(radius * 0.8)

      dataLayer.selectAll('slices')
        .data(pieChartData)
        .join('path')
        .attr('d', arcGenerator)
        .attr('class', 'slices')
        .attr('fill', (value, index) => this.colors(index))
        .attr('stroke', '#3f454b')
        .style('stroke-width', '1px')
        .style('opacity', 0.7)
        
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

      const labelPositions = dataLayer.selectAll('slice-labels')
        .data(pieChartData)
        .join('text')
        .attr('class', 'slice-labels')
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
      
      labelPositions.append('tspan')
        .attr('class', 'data-label')
        .html(value => value.data[0])
        
      labelPositions.append('tspan')
        .attr('dx', '-3.25em')
        .attr('dy', '1.5em')
        .attr('class', 'data-value')
        .html(value => `${value.data[1]}%`)
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
  .pie-chart-content {
    .slice-labels {
      white-space: pre;
    }
  }
}
</style>
