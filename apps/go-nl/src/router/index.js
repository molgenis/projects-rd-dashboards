import { createRouter, createWebHistory } from 'vue-router'
const initialState = window.__INITIAL_STATE__ || {}

import HomePage from '@/views/HomePage.vue'
// import AboutPage from '../views/AboutPage.vue'
// import BrowsePage from '../views/BrowsePage.vue'
// import DownloadPage from '../views/DownloadPage.vue'
// import NewsPage from '../views/NewsPage.vue'
// import PublicationsPage from '../views/PublicationsPage.vue'
// import RequestPage from '../views/RequestPage.vue'

const router = createRouter({
  history: createWebHistory(initialState.baseUrl),
  routes: [
    {
      name: 'home',
      path: '/',
      component: HomePage,
      meta: {
        title: 'Home'
      }
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   component: AboutPage,
    //   meta: {
    //     title: 'About'
    //   }
    // },
    // {
    //   path: '/browse-data',
    //   name: 'browse',
    //   component: BrowsePage,
    //   meta: {
    //     title: 'Browse Data'
    //   }
    // },
    // {
    //   path: '/download-data',
    //   name: 'download',
    //   component: DownloadPage,
    //   meta: {
    //     title: 'Download Data'
    //   }
    // },
    // {
    //   path: '/news',
    //   name: 'news',
    //   component: NewsPage,
    //   meta: {
    //     title: 'News'
    //   }
    // },
    // {
    //   path: '/publications',
    //   name: 'publications',
    //   component: PublicationsPage,
    //   meta: {
    //     title: 'Publications'
    //   }
    // },
    // {
    //   path: '/request-access',
    //   name: 'request',
    //   component: RequestPage,
    //   meta: {
    //     title: 'Request Access'
    //   }  
    // }
  ],
  scrollBehavior () {
    return {
      top: 0
    }
  }
})

router.afterEach((to) => {
  document.title = `${to.meta.title} | GoNL` || 'GoNL'
})

export default router
