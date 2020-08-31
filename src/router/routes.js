
const routes = [
  {
    path: '/',
    component: () => import('layouts/Midiblock.vue'),
    children: [
      { path: '/', component: () => import('pages/Index.vue') },
      { path: '/code', component: () => import('pages/Code.vue') }
    ]
  },

  {
    path: '/block',
    component: () => import('layouts/Blank.vue'),
    children: [
      {
        path: ':id', component: () => import('pages/Block.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
