const routes = [
  {
    path: '/admin',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/demo', component: () => import('pages/IndexPage.vue') },
      { path: '/crud', component: () => import('pages/ItemsPage.vue') },
    ],
  },
  { path: '', redirect: '/Furor' },
  {
    path: '/Furor',
    component: () => import('pages/LandingPage.vue'),
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
