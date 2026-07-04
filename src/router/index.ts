import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: 'Xeram Perfumes — Maison de Parfum' },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: { title: 'Our Story — Xeram Perfumes' },
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('@/views/ContactUs.vue'),
      meta: { title: 'Contact the Atelier — Xeram Perfumes' },
    },
    {
      path: '/reviews',
      name: 'reviews',
      component: () => import('@/views/ReviewsView.vue'),
      meta: { title: 'Reviews — Xeram Perfumes' },
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('@/views/CartView.vue'),
      meta: { title: 'The Vanity — Xeram Perfumes' },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/auth/LoginPage.vue'),
      meta: { title: 'Sign In — Xeram Perfumes' },
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/views/auth/SignupPage.vue'),
      meta: { title: 'Create Account — Xeram Perfumes' },
    },
    {
      path: '/shop',
      name: 'shop',
      component: () => import('@/views/ShopView.vue'),
      redirect: '/shop/all-products',
      children: [
        {
          path: ':id',
          name: 'allProducts',
          component: () => import('@/views/AllProducts.vue'),
          meta: { title: 'The Atelier — Xeram Perfumes' },
        },
        {
          path: 'details/:id/:variantId',
          name: 'productDetails',
          component: () => import('@/components/shop/MainDetails.vue'),
          props: true,
          meta: { title: '' }, // Set dynamically in MainDetails.vue via useHead
        },
      ],
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: () => import('@/views/404Error.vue'),
      meta: { title: 'Page Not Found — Xeram Perfumes' },
    },
  ],

  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (savedPosition) {
          resolve({ ...savedPosition, behavior: 'auto' })
        } else {
          resolve({ top: 0, behavior: 'auto' })
        }
      }, 350)
    })
  },
})

// Update document title on every navigation
router.afterEach((to) => {
  const title = to.meta?.title as string
  if (title) {
    document.title = title
  }
})

export default router
