import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// import ShopView from '@/views/ShopView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('@/views/ContactUs.vue'),
    },
    {
      path: '/reviews',
      name: 'reviews',
      component: () => import('@/views/ReviewsView.vue'),
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('@/views/CartView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/auth/LoginPage.vue'),
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/views/auth/SignupPage.vue'),
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
        },
        {
          path: 'details/:id/:variantId',
          name: 'productDetails',
          component: () => import('@/views/ProductDetails.vue'),
          props: true,
          children: [
            {
              path: '',
              name: 'productDetailsVariant',
              component: () => import('@/components/shop/MainDetails.vue'),
              props: true,
            },
          ],
        },
      ],
    },

    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: () => import('@/views/404Error.vue'),
    },
  ],

  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'auto' }
    }
  },
})

// router.afterEach((to, from) => {
//   if (to.path !== from.path) {
//     window.scrollTo({ top: 0, behavior: 'auto' })
//   }
// })

export default router
