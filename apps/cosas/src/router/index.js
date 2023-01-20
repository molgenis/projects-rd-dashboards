import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '@/views/HomePage.vue'
import HelpPage from '@/views/HelpPage.vue'
import CosasLandingPage from '@/views/CosasLandingPage.vue'
import CosasDataFinder from '@/views/CosasDataFinder.vue'
import CosasDashboard from '@/views/CosasDashboard.vue'
import VariantLandingPage from '@/views/VariantLandingPage.vue'
import VariantDataFinder from '@/views/VariantDataFinder.vue'

const initialState = window.__INITIAL_STATE__ || {}

const router = createRouter({
  history: createWebHistory(initialState.baseUrl),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/help',
      name: 'help',
      component: HelpPage,
      meta: {
        title: 'Help'
      }
    },
    {
      path: '/cosas',
      name: 'cosas',
      component: CosasLandingPage,
      meta: {
        title: 'COSAS'  
      }
    },
    {
      path: '/cosas/dashboard',
      name: 'cosas-dashboard',
      component: CosasDashboard,
      meta: {
        title: 'COSAS Dashboard'
      }
    },
    {
      path: '/cosas/data-finder',
      name: 'cosas-data-finder',
      component: CosasDataFinder,
      meta: {
        title: 'COSAS Data Finder'
      }
    },
    {
      path: '/varian-db',
      name: 'variant-db',
      component: VariantLandingPage,
      meta: {
        title: 'Variants Database'
      }
    },
    {
      path: '/variant-db/data-finder',
      name: 'variant-db-data-finder',
      component: VariantDataFinder,
      meta: {
        title: 'Variant Data Finder'
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
  const rootTitle = 'Genetica Portal'
  document.title = to.meta.title ? `${to.meta.title} | ${rootTitle}` : rootTitle
})

export default router