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

export default {
  props: {
    chartId: {
      type: String,
      required: true
    },
    geojson: {
      type: Object,
      required: true
    },
    chartData: {
      type: Array,
      required: true
    },
    rowId: {
      type: String,
      required: true
    },
    latitude: {
      type: String,
      required: true
    },
    longitude: {
      type: String,
      required: true
    },
    groupingVariable: {
      type: String
    },
    groupColorMappings: {
      type: Object
    },
    chartWidth: {
      type: Number,
      default: 500
    },
    chartHeight: {
      type: Number,
      default: 500
    },
    mapCenter: {
      type: Object,
      default () { 
        return {
          latitude: 3.55,
          longitude: 47.55
        }
      }
    },
    chartSize: {
      type: Number,
      default: 700
    },
    chartScale: {
      type: Number,
      default: 1.1
    },
    pointRadius: {
      type: Number,
      default: 6
    },
    legendLabels: {
      type: Array
    },
    legendColors: {
      type: Array
    },
    showTooltip: {
      type: Boolean,
      default: true
    },
    tooltipTemplate: {
      type: Function,
      default (row) {
        return `<p>${row[this.rowId]}: ${row[this.latitude]}, ${row[this.longitude]}</p>`
      }
    },
    enableZoom: {
      type: Boolean,
      default: true
    },
    mapColors: {
      type: Object,
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
