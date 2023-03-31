<template>
  <div class="d3-viz d3-bar-chart">
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

// Create a bar chart (horizontal bars) that displays values along the
// x-axis by groups (along the y-axis). This component is ideal if you
// have many categorical variables or you would like to display ordinal
// data. However, if you many groups, consider combining or excluding
// groups with smaller values. If the labels excede the chart bounds,
// abbreviate labels and adjust the chart margins to allow for more space
// around the chart area. You may also want to consider describing the
// abbreviations in a figure caption or elsewhere on the page.
//
// @group VISUALISATIONS
export default {
  name: 'BarChart',
  props: {
    // a unique ID for the chart
    chartId: {
      type: String,
      required: true
    },
    // A title that describes the chart
    title: String,

    // Name of the column that contains the values to plot
    // along the x-axis
    xvar: {
      type: String,
      required: true
    },
    // Name of the column that contains the groups to plot
    // along the y-axis
    yvar: {
      type: String,
      required: true
    },
    // Specify the max value of the x-axis. If left undefined,
    // max value will be automatically calculated using `d3.max`
    xMax: Number,
    
    // Specify the x-axis ticks
    xTickValues: Array,
    
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
      // `{ top: 15, right: 0, bottom: 60, left: 110 }`
      default () {
        return {
          top: 15,
          right: 15,
          bottom: 60,
          left: 110
        }
      }
    },
    
    // If true, the drawing of the bars will be animated
    chartAnimate: {
      type: Boolean,
      default: true
    },
    
    // Set the fill of all bars (hex code)
    barFill: {
      type: String,
      // `#6C85B5`
      default: '#6C85B5'
    },
    
    // Set the color that is displayed when a bar is hovered (hex code)
    barHoverFill: {
      type: String,
      // `#163D89`
      default: '#163D89'
    },
    
    // Adjust the amount of blank space inbetween bar between 0 and 1
    barPaddingInner: {
      type: Number,
      // `0.2`
      default: 0.2,
      validator: (value) => validateNumRange(value)
    },
    
    // Adjust the amount of blank space before the first bar and after
    // the last bar. Value must be between 0 and 1.
    barPaddingOuter: {
      type: Number,
      // `0.2`
      default: 0.2,
      validator: (value) => validateNumRange(value)
    },
    
    // Along with `barPaddingOuter`, specify how the bars are distributed
    // y-axis. A value of 0 will position the bars closer to the x-axis.
    barAlign: {
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
        
      const yAxis = d3.scaleBand()
        .range([0, heightMarginAdjusted])
        .domain(this.chartData.map(row => row[this.yvar]))
        .paddingInner(this.barPaddingInner)
        .paddingOuter(this.barPaddingOuter)
        .round(true)
      
      chartArea.append('g')
        .attr('transform', `translate(0, 0)`)
        .call(d3.axisLeft(yAxis))
        .selectAll('text')
        .style('text-anchor', 'end')
        .style('font-size', '11pt')
        
      const xmax = this.xMax ? this.xMax : d3.max(this.chartData, row => row[this.xvar])
      const xAxis = d3.scaleLinear()
        .domain([0, xmax])
        .range([0,widthMarginAdjusted])
        .nice()
      
      let chartBottomAxis = d3.axisBottom(xAxis)
      if (this.xTickValues) {
        chartBottomAxis = chartBottomAxis.tickValues(this.xTickValues)
      }
        
      chartArea.append('g')
        .attr('transform', `translate(0, ${heightMarginAdjusted})`)
        .call(chartBottomAxis)
        .selectAll('text')
        .style('font-size', '11pt')

      const chartColumns = chartArea.selectAll('bars')
        .data(this.chartData)
        .enter()
        .append('rect')
        .attr('class', 'chart-bar')
        .attr('data-bar', row => row[this.yvar])
        .attr('x', xAxis(0))
        .attr('y', row => yAxis(row[this.yvar]))
        .attr('fill', this.barFill)
        .attr('height', yAxis.bandwidth())

      if (this.chartAnimate) {
        chartColumns.attr('width', xAxis(0))
          .transition()
          .delay(200)
          .duration(500)
          .attr('width', row => xAxis(row[this.xvar]))
        } else {
          chartColumns
            .attr('width', row => xAxis(row[this.xvar]))
      }

      chartArea.selectAll('bar-labels')
        .data(this.chartData)
        .enter()
        .append('text')
        .attr('data-bar', row => row[this.yvar])
        .attr('class', 'chart-bar-labels')
        .attr('x', row => xAxis(row[this.xvar]))
        .attr('y', row => yAxis(row[this.yvar]))
        .attr('dy', (yAxis.bandwidth() / 2) * 1.25)
        .attr('dx', '3px')
        .attr('text-anchor', 'start')
        .text(row => row[this.xvar])
        .style('opacity', '0')
        
      chartColumns.style('cursor', 'pointer')
        .on('mouseover', (event) => {
          const column = d3.select(event.target)
          const targetLabel = column.attr('data-bar')
          const label = d3.select(`text[data-bar="${targetLabel}"]`)
          column.attr('fill', this.barHoverFill)
          label.style('opacity', '1')
        })
        .on('mouseout', (event) => {
          const column = d3.select(event.target)
          const targetLabel = column.attr('data-bar')
          const label = d3.select(`text[data-bar="${targetLabel}"]`)
          column.attr('fill', this.barFill)
          label.style('opacity', '0')
        })

      svg.append('text')
        .attr('class', 'chart-text chart-axis-title chart-axis-x')
        .attr('x', (this.chartWidth / 2) * 1.15)
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
