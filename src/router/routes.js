const routes = [
  {
    path: '/',
    redirect: '/Furor',
  },

  {
    path: '/Furor',
    component: () => import('pages/LandingPage.vue'),
  },

  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'demo', component: () => import('pages/IndexPage.vue') },
      { path: 'crud', component: () => import('pages/ItemsPage.vue') },
    ],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
