<template>
  <div class="d3-viz d3-column-chart">
    <h3 v-if="title" class="chart-title">{{ title }}</h3>
    <svg :id="chartId" preserveAspectRatio="xMinYMin"></svg>
  </div>
</template>

<script>
import { select, selectAll, scaleBand, axisBottom, max, min, scaleLinear, axisLeft } from 'd3'
const d3 = { select, selectAll, scaleBand, axisBottom, max, min, scaleLinear, axisLeft }

const validateNumRange = function (value) {
  return value >= 0 && value <= 1
}

export default {
  name: 'bar-chart',
  props: {
    chartId: {
      type: String,
      required: true
    },
    title: {
      type: String
    },
    xvar: {
      type: String,
      require: true
    },
    yvar: {
      type: String,
      require: true
    },
    yMax: {
      type: Number
    },
    xAxisLabel: String,
    yAxisLabel: String,
    chartData: {
      type: Array,
      required: true
    },
    chartWidth: {
      type: Number,
      default: 675
    },
    chartHeight: {
      type: Number,
      default: 425
    },
    chartMargins: {
      type: Object,
      default () {
        return {
          top: 15,
          right: 0,
          bottom: 60,
          left: 60
        }
      }
    },
    chartAnimate: {
      type: Boolean,
      default: true
    },
    columnFill: {
      type: String,
      default: '#6C85B5'
    },
    columnHoverFill: {
      type: String,
      default: '#163D89'
    },
    columnPaddingInner: {
      type: Number,
      default: 0.2,
      validator: (value) => validateNumRange(value)
    },
    columnPaddingOuter: {
      type: Number,
      default: 0.2,
      validator: (value) => validateNumRange(value)
    },
    columnAlign: {
      type: Number,
      default: 0.5,
      validator: (value) => validateNumRange(value)
    }
  },
  computed: {
    xlabel () {
      return this.xAxisLabel ? this.xAxisLabel : this.xvar
    },
    ylabel () {
      return this.yAxisLabel ? this.yAxisLabel : this.yvar
    }
  },
  methods: {
    renderChart () {
      const widthMarginAdjusted = this.chartWidth - this.chartMargins.left - this.chartMargins.right
      const heightMarginAdjusted = this.chartHeight - this.chartMargins.top - this.chartMargins.bottom
      
      const svg = d3.select(`#${this.chartId}`)
      svg.selectAll('*').remove()
      
      svg.attr('width', this.chartWidth)
        .attr('height', this.chartHeight)
        .attr('viewbox', `0 0 ${this.chartWidth} ${this.chartHeight}`)
        
      const chartArea = svg.append('g')
        .attr('transform', `translate(${this.chartMargins.left}, ${this.chartMargins.top})`)
        
      const xAxis = d3.scaleBand()
        .range([0, widthMarginAdjusted])
        .domain(this.chartData.map(row => row[this.xvar]))
        .paddingInner(this.columnPaddingInner)
        .paddingOuter(this.columnPaddingOuter)
        .round(true)
      
      chartArea.append('g')
        .attr('transform', `translate(0, ${heightMarginAdjusted})`)
        .call(d3.axisBottom(xAxis))
        .selectAll('text')
        .style('text-anchor', 'middle')
        .style('font-size', '11pt')
        
      const ymax = this.yMax ? this.yMax : d3.max(this.chartData, row => row[this.yvar])
      const yAxis = d3.scaleLinear()
        .domain([0, ymax])
        .range([heightMarginAdjusted, 0])
        .nice()
      
      chartArea.append('g')
        .call(d3.axisLeft(yAxis))
        .selectAll('text')
        .style('font-size', '11pt')

      const chartColumns = chartArea.selectAll('columns')
        .data(this.chartData)
        .enter()
        .append('rect')
        .attr('class', 'chart-column')
        .attr('data-column', row => row[this.xvar])
        .attr('x', row => xAxis(row[this.xvar]))
        .attr('y', yAxis(0))
        .attr('fill', this.columnFill)
        .attr('width', xAxis.bandwidth())
        
      if (this.chartAnimate) {
        chartColumns.attr('height', 0)
          .transition()
          .delay(200)
          .duration(500)
          .attr('y', row => yAxis(row[this.yvar]))
          .attr('height', row => heightMarginAdjusted - yAxis(row[this.yvar]))
      } else {
        chartColumns
          .attr('y', row => yAxis(row[this.yvar]))
          .attr('height', row => heightMarginAdjusted - yAxis(row[this.yvar]))
      }
      
        
      chartArea.selectAll('column-labels')
        .data(this.chartData)
        .enter()
        .append('text')
        .attr('data-column', row => row[this.xvar])
        .attr('class', 'chart-column-labels')
        .attr('x', row => xAxis(row[this.xvar]))
        .attr('y', row => yAxis(row[this.yvar]))
        .attr('dx', xAxis.bandwidth() / 2)
        .attr('dy', '-3px')
        .attr('text-anchor', 'middle')
        .text(row => row[this.yvar])
        .style('opacity', '0')
        
      chartColumns.style('cursor', 'pointer')
        .on('mouseover', (event) => {
          const column = d3.select(event.target)
          const targetLabel = column.attr('data-column')
          const label = d3.select(`text[data-column="${targetLabel}"]`)
          column.attr('fill', this.columnHoverFill)
          label.style('opacity', '1')
        })
        .on('mouseout', (event) => {
          const column = d3.select(event.target)
          const targetLabel = column.attr('data-column')
          const label = d3.select(`text[data-column="${targetLabel}"]`)
          column.attr('fill', this.columnFill)
          label.style('opacity', '0')
        })
      
      svg.append('text')
        .attr('class', 'chart-text chart-axis-title chart-axis-x')
        .attr('x', (this.chartWidth / 2) + (this.chartMargins.left * -0.35))
        .attr('y', this.chartHeight - (this.chartMargins.bottom / 4.5))
        .attr('text-anchor', 'middle')
        .style('font-size', '12pt')
        .text(this.xlabel)
      
      svg.append('text')
        .attr('class', 'chart-text chart-axis-title chart-axis-y')
        .attr('transform', 'rotate(-90)')
        .attr('transform-origin', 'top left')
        .attr('x', -(this.chartHeight / 2.25))
        .attr('y', this.chartMargins.left / 5.1)
        .attr('text-anchor', 'middle')
        .style('font-size', '12pt')
        .text(this.ylabel)
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
.d3-column-chart {
  .chart-title {
    margin: 0;
  }

  svg {
    display: block;
    margin: 0 auto;
  }
}
</style>
