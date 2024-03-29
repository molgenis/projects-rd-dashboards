import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '../views/home-view.vue'
import DemoDashboard from "../views/demo-dashboard.vue"

import BarChart from '../views/viz-bar-chart.vue'
import ChartLegend from '../views/viz-chart-legend.vue'
import ColumnChart from '../views/viz-column-chart.vue'
import DataHighlights from '../views/viz-data-highlights.vue'
import Datatable from '../views/viz-datatable.vue'
import GaugeChart from "../views/viz-gauge-chart.vue"
import GeoMercator from '../views/viz-geo-mercator.vue'
import GroupedColumnChart from '../views/viz-grouped-column-chart.vue'
import PieChart from '../views/viz-pie-chart.vue'
import ScatterPlot from "../views/viz-scatter-plot.vue"


const initialState = window.__INITIAL_STATE__ || {}
const router = createRouter({
  history: createWebHistory(initialState.baseUrl),
  routes: [
    {
      name: 'home',
      path: '/',
      component: HomePage
    },
    {
      name: 'demo',
      path: '/demo',
      component: DemoDashboard,
      meta: {
        title: 'Demo'
      }
    },
    {
      name: 'bar-chart',
      path: '/bar-chart',
      component: BarChart,
      meta: {
        title: 'Bar Chart'
      }
    },
    {
      name: 'chart-legend',
      path: '/chart-legend',
      component: ChartLegend,
      meta: {
        title: 'Chart Legends'
      }
    },
    {
      name: 'column-chart',
      path: '/column-chart',
      component: ColumnChart,
      meta: {
        title: 'Column Chart'
      }
    },
    {
      name: 'gauge-chart',
      path: '/gauge-chart',
      component: GaugeChart,
      meta: {
        title: 'Gauge Chart'
      }
    },
    {
      name: 'grouped-column-chart',
      path: '/grouped-column-chart',
      component: GroupedColumnChart,
      meta: {
        title: 'Grouped Column Chart'
      }
    },
    {
      name: 'data-highlights',
      path: '/data-highlights',
      component: DataHighlights,
      meta: {
        title: 'Data Highlights'
      }
    },
    {
      name: 'datatable',
      path: '/datatable',
      component: Datatable,
      meta: {
        title: 'Datatable'
      }
    },
    {
      name: 'geo-mercator',
      path: '/geo-mercator',
      component: GeoMercator,
      meta: {
        title: 'Geomercator'
      }
    },
    {
      name: 'pie-chart',
      path: '/pie-chart',
      component: PieChart,
      meta: {
        title: 'Pie Chart'
      }
    },
    {
      name: 'scatter-plot',
      path: '/scatter-plot',
      component: ScatterPlot,
      meta: {
        title: 'Scatter Plot'
      }
    }
  ],
  scrollBehavior () {
    return {
      top: 0
    }
  }
})

router.afterEach((to) => {
  document.title = to.meta.title ? `${to.meta.title} | RD-Components` : 'RD-Components'
})

export default router
