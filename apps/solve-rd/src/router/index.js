import { createRouter, createWebHistory } from 'vue-router';

import HomePage from '../views/HomePage.vue';
import GetStartedPage from '../views/GetStarted.vue';
import PatientExplorerPage from '../views/PatientExplorer.vue';
import ViewTablesPage from '../views/ViewTables.vue';
import CoverageReportPage from '../views/CoverageReport.vue';

const initialState = window.__INITIAL_STATE__ || {}

const router = createRouter({
  history: createWebHistory(initialState.baseUrl),
  routes: [
    {
      name: 'home',
      path: '/',
      component: HomePage,
      meta: {
        title: 'Solve-RD'
      },
      alias: '/home'
    },
    {
      name: 'get-started',
      path: '/get-started',
      component: GetStartedPage,
      meta: {
        title: 'Get Started'
      }
    },
    {
      name: 'patient-explorer',
      path: '/patient-explorer',
      component: PatientExplorerPage,
      meta: {
        title: 'Patient Explorer'
      }
    },
    {
      name: 'view-tables',
      path: '/view-tables',
      component: ViewTablesPage,
      meta: {
        title: 'View Tables'
      }
    },
    {
      name: 'coverage',
      path: '/reports/coverage',
      component: CoverageReportPage,
      meta: {
        title: 'Coverage Report'
      }
    },
    {
      name: 'login',
      path: '/login',
    }
  ],
  scrollBehavior () {
    return {
      top: 0
    }
  }
})

// router.beforeEach(async (to, from, next) => {
//   const response = await fetch('/app-ui-context')
//   const data = response.json()
//   if (to.name == 'get-started' && !data.authenticated) {
//     next({ to: 'login' })
//   } else {
//     next()
//   }
// })

router.afterEach((to) => {
  document.title = `${to.meta.title} | RD3` || 'RD3'
})

export default router
