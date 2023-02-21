<template>
  <div class="d3-viz d3-geo-mercator" :style="this.mapColors.water ? `background-color: ${this.mapColors.water}` : ''">
    <svg :id="chartId"></svg>
    <div class="d3-viz-legend" v-if="legendLabels && legendColors">
      <chartLegend :labels="legendLabels" :colors="legendColors"/>
    </div>
  </div>
</template>

<script>
import chartLegend from './VizLegend.vue'
import { select, selectAll, geoMercator, geoPath, json, zoom } from 'd3'
const d3 = { select, selectAll, geoMercator, geoPath, json, zoom }

// Create a point location visualation using a geomercator map from the D3 library.
// Each point represents a unique location in the dataset.
//
// @group VISUALISATIONS
export default {
  name: 'GeoMercator',
  props: {
    // a unique identifier for the map
    chartId: {
      type: String,
      required: true
    },
    // reference dataset for the base layer
    geojson: {
      type: Object,
      required: true
    },
    // the dataset containing all locations and coordinates
    chartData: {
      type: Array,
      required: true
    },
    // the column containing the identifiers of each location
    rowId: {
      type: String,
      required: true
    },
    // the name of the column containing the latitudes
    latitude: {
      type: String,
      required: true
    },
    // the name of the column containing the longitude
    longitude: {
      type: String,
      required: true
    },
    // the name of the column containing grouping information (i.e., how locations 
    // are related, categorised, etc.)
    groupingVariable: {
      type: String
    },
    // if grouping variable is supplied, color mappings can also be added here.
    // Input must be an object that maps each unique group to a colour.
    groupColorMappings: {
      type: Object
    },
    // set the width of a chart
    chartWidth: {
      type: Number,
      // `500`
      default: 500
    },
    // set the height of the chart
    chartHeight: {
      type: Number,
      // `500`
      default: 500
    },
    // the point (lat, long) to the center map
    mapCenter: {
      type: Object,
      // `{latitude: 3.55, longitude: 47.55 }`
      default () { 
        return {
          latitude: 3.55,
          longitude: 47.55
        }
      }
    },
    // control the size of the chart
    chartSize: {
      type: Number,
      // `700`
      default: 700
    },
    // set the scale of the chart
    chartScale: {
      type: Number,
      // `1.1`
      default: 1.1
    },
    // set the radius of the points
    pointRadius: {
      type: Number,
      // `6`
      default: 6
    },
    
    // set the labels in the chart legend
    legendLabels: {
      type: Array
    },
    // set the color of the labels in the chart legend
    legendColors: {
      type: Array
    },
    // If true (default), a tool will be displayed when hovering over a point
    showTooltip: {
      type: Boolean,
      // `true`
      default: true
    },
    // A function that controls the HTML content in the tooltip. The name
    // of the point is always displayed. However, you may specify the
    // content in the body of the tooltip. The default text is:
    // `<row-id>: <latitude>, <longitude>`. To modify the content, pass define
    // a new function. Row-level data can be accessed by supplying `row` in the
    // function. E.g., `(row) { return ...}`.
    tooltipTemplate: {
      type: Function,
      // `<p>${row[this.rowId]}: ${row[this.latitude]}, ${row[this.longitude]}</p>`
      default (row) {
        return `<p>${row[this.rowId]}: ${row[this.latitude]}, ${row[this.longitude]}</p>`
      }
    },
    // If true (default), the map can be zoomed in and out
    enableZoom: {
      type: Boolean,
      default: true
    },
    // Set the colors of the land, borders, and water
    mapColors: {
      type: Object,
      // `{land: '#4E5327', border: '#757D3B', water: '#6C85B5'}`
      default () {
        return {
          land: '#4E5327',
          border: '#757D3B',
          water: '#6C85B5'
        }
      }
    }
  },
  components: { chartLegend },
  data () {
    return {
      svg: null,
      tooltip: null,
      pointRadiusScaler: 1
    }
  },
  computed: {
    pointRadiusTransformed () {
      return this.pointRadius / (this.pointRadiusScaler * 0.8)
    }
  },
  methods: {
    initSvg () {
      this.svg = d3.select(`#${this.$el.childNodes[0].id}`)
        .attr('width', '100%')
        .attr('height', this.chartHeight)
        .attr('preserveAspectRatio', 'xMinYMin')
        .attr('viewbox', `0 0 ${this.chartSize} ${this.chartSize / 2}`)
    },
    removeTooltip () {
      d3.selectAll(`#${this.chartId}-tooltip`).remove()
    },
    createTooltip () {
      this.removeTooltip()
      this.tooltip = d3.select('body')
        .style('position', 'relative')
        .append('div')
        .style('position', 'absolute')
        .attr('id', `${this.chartId}-tooltip`)
        .attr('class', 'geo-mercator-tooltip')
        .style('opacity', 0)
    },
    onMouseOver (event, data) {
      const pointId = data[this.rowId]
      d3.select(`circle[data-row-id="${pointId}"]`)
        .attr('r', this.pointRadiusTransformed)
      this.tooltip.style('opacity', 1)
    },
    onMouseMove (event, data) {
      this.tooltip
        .html(this.tooltipTemplate(data))
        .style('left', `${event.pageX + 8}px`)
        .style('top', `${event.pageY - 55}px`)
    },
    onMouseLeave (event, data) {
      const pointId = data[this.rowId]
      d3.select(`circle[data-row-id="${pointId}"]`)
        .attr('r', this.pointRadiusTransformed)
      this.tooltip.style('opacity', 0)
    },
    renderChart () {
      this.initSvg()
      this.svg.selectAll("*").remove()

      const mapLayer = this.svg.append('g').attr('class', 'geojson-layer')
      const projection = d3.geoMercator()
        .center([this.mapCenter.latitude, this.mapCenter.longitude])
        .scale(this.chartWidth * this.chartScale)
        .translate([this.chartWidth / 2, this.chartHeight / 2])
    
      const path = d3.geoPath().projection(projection)
      mapLayer.selectAll('path')
        .data(this.geojson.features)
        .enter()
        .append('path')
        .attr('fill', this.mapColors.land)
        .attr('d', path)
        .attr('stroke', this.mapColors.border)
        
      const dataLayer = this.svg.append('g').attr('class', 'data-layer')
      const points = dataLayer.selectAll('circle')
        .data(this.chartData)
        .enter()
        .append('circle')
        .attr('cx', row => projection([row[this.longitude], row[this.latitude]])[0])
        .attr('cy', row => projection([row[this.longitude], row[this.latitude]])[1])        
        .attr('r', this.pointRadius)
        .attr('data-row-id', row => row[this.rowId])
        .style('cursor', 'pointer')
        
      if (this.groupingVariable && this.groupColorMappings) {
        points.attr('fill', row => {
          return this.groupColorMappings[row[this.groupingVariable]]
        })
      }
      
      if (this.showTooltip) {
        this.createTooltip()
        points.on('mouseover', (event, row) => this.onMouseOver(event, row))
          .on('mousemove', (event, row) => this.onMouseMove(event, row))
          .on('mouseleave', (event, row) => this.onMouseLeave(event, row))
      }
      
      if (this.enableZoom) {
        mapLayer.style('cursor', 'pointer')
        const zoom = d3.zoom().on('zoom', (event) => {
          this.pointRadiusScaler = event.transform.k
          mapLayer.attr('transform', event.transform)
          dataLayer.attr('transform', event.transform)
          points.attr('r', this.pointRadiusTransformed)
        })
        this.svg.call(zoom)
      }
    }
  },
  mounted () {
    this.renderChart()
  },
  updated () {
    this.renderChart()
  },
  unmount () {
    this.removeTooltip()
  }
}
</script>

<style lang="scss">
.d3-geo-mercator {
  width: 100%;
  position: relative;

  svg {
    display: block;
    margin: 0 auto;
  }
  
  .d3-viz-legend {
    position: absolute;
    top: 0;
    left: 0;
    font-size: 11pt;
    color: $gray-050;
    border: 1px solid $gray-900;
    background-color: $gray-transparent-700;
    padding: 12px;
    box-shadow: 2px 4px 4px 2px hsla(0, 0%, 0%, 0.2)
  }
}

.geo-mercator-tooltip {
  max-width: 325px;
  z-index: 10;
  background-color: $gray-000;
  box-shadow: 0 0 4px 2px $gray-transparent-400;
  border-radius: 3px;
  padding: 8px 12px;

  p {
    font-size: 10pt;
    padding: 0;
    margin: 0;
    
    &.title {
      font-size: 10pt;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      line-height: 1.2;
      font-weight: bold;
    }
  }
}
</style>
