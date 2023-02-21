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

// Create a column chart that plots values (y-axis) to groups (x-axis).
// At the moment, this component only displays positive values and does
// group or stack columns. Please see the BarChart component (in.progress)
// to arrange the chart horizontally.
//
// @group VISUALISATIONS
export default {
  name: 'ColumnChart',
  props: {
    // a unique ID for the chart
    chartId: {
      type: String,
      required: true
    },
    // A title that describes the chart
    title: String,

    // Name of the column that contains the groups to plot
    // along the x-axis
    xvar: {
      type: String,
      required: true
    },
    // Name of the column that contains the values to plot
    // along the y-axis
    yvar: {
      type: String,
      required: true
    },
    // Specify the max value of the y-axis. If left undefined,
    // max value will be automatically calculated using `d3.max`
    yMax: Number,
    
    // Specify the y-axis ticks
    yTickValues: Array,
    
    // A label that describes the x-axis
    xAxisLabel: String,
    
    // A label that describes the y-axis
    yAxisLabel: String,
    
    // the dataset the plot
    chartData: {
      type: Array,
      required: true
    },
    
    // set the width of the chart
    chartWidth: {
      type: Number,
      // `675`
      default: 675
    },
    
    // set the height of the chart
    chartHeight: {
      type: Number,
      // `425`
      default: 425
    },
    
    // adjust the chart margins
    chartMargins: {
      type: Object,
      // `{ top: 15, right: 0, bottom: 60, left: 60 }`
      default () {
        return {
          top: 15,
          right: 0,
          bottom: 60,
          left: 60
        }
      }
    },
    
    // If true, the drawing of the columns will be animated
    chartAnimate: {
      type: Boolean,
      default: true
    },
    
    // Set the fill of all columns (hex code)
    columnFill: {
      type: String,
      // `#6C85B5`
      default: '#6C85B5'
    },
    
    // Set the color that is displayed when a column is hovered (hex code)
    columnHoverFill: {
      type: String,
      // `#163D89`
      default: '#163D89'
    },
    
    // Adjust the amount of blank space inbetween columns between 0 and 1
    columnPaddingInner: {
      // `0.0:1.0`
      type: Number,
      // `0.2`
      default: 0.2,
      validator: (value) => validateNumRange(value)
    },
    
    // Adjust the amount of blank space before the first column and after
    // the last column.
    columnPaddingOuter: {
      // `0.0:1.0`
      type: Number,
      // `0.2`
      default: 0.2,
      validator: (value) => validateNumRange(value)
    },
    
    // Along with `columnPaddingOuter`, specify how the columns are distributed
    // x-axis. A value of 0 will position the columns closer to the y-axis.
    columnAlign: {
      // `0.0:1.0`
      type: Number,
      // `0.5`
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
      
      let chartLeftAxis = d3.axisLeft(yAxis)
      if (this.yTickValues) {
        chartLeftAxis = chartLeftAxis.tickValues(this.yTickValues)
      }
        
      chartArea.append('g')
        .call(chartLeftAxis)
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
