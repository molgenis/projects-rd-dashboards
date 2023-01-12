import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '../views/HomePage.vue'
import AboutUs from '../views/AboutUs.vue'
import ContactUs from '../views/ContactUs.vue'
import Disclaimer from '../views/Disclaimer.vue'
import Documents from '../views/Documents.vue'
import GenturisGovernance from '../views/GenturisGovernance.vue'
// import MembersArea from '../views/MembersArea.vue'
import PrivacyPolicy from '../views/PrivacyPolicy.vue'
import Dashboard from '../views/Dashboard.vue'

const initialState = window.__INITIAL_STATE__ || {}

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHistory(initialState.baseUrl),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/about-us',
      name: 'about-us',
      component: AboutUs,
      meta: {
        title: 'About Us'
      }
    },
    {
      path: '/contact-us',
      name: 'contact-us',
      component: ContactUs,
      meta: {
        title: 'Contact Us'
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        title: 'Dashboard'
      }
    },
    {
      path: '/disclaimer',
      name: 'disclaimer',
      component: Disclaimer,
      meta: {
        title: 'Disclaimer'
      }
    },
    {
      path: '/documents',
      name: 'documents',
      component: Documents,
      meta: {
        title: 'Documents'
      }
    },
    {
      path: '/governance',
      name: 'governance',
      component: GenturisGovernance,
      meta: {
        title: 'Governance'
      }
    },
    // will be added at a later date
    // {
    //   path: '/members-area',
    //   name: 'members-area',
    //   component: MembersArea,
    //   meta: {
    //     title: 'Members Area'
    //   }
    // },
    {
      path: '/privacy-policy',
      name: 'privacy-policy',
      component: PrivacyPolicy,
      meta: {
        title: 'Privacy Policy'
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
  document.title = to.meta.title ? `${to.meta.title} | GENTURIS Registry` : 'GENTURIS Registry'
})

export default router
