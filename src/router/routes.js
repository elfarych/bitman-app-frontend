
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    redirect: '/home',
    children: [
      { path: 'home', name: 'home', component: () => import('pages/Index.vue') }
    ]
  },

  {
    path: '/roadmap',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'Roadmap', component: () => import('pages/page-roadmap') }
    ]
  },

  {
    path: '/new-fitch',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'New-fitch', component: () => import('pages/page-new-fitch') }
    ]
  },

  {
    path: '/donat',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'Donat', component: () => import('pages/page-donat') }
    ]
  },

  {
    path: '/contacts',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'Contacts', component: () => import('pages/page-contacts') }
    ]
  },

  {
    path: '/chart',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'Chart', component: () => import('pages/chart') }
    ]
  },

  {
    path: '/market',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'Binance-Market',
        component: () => import('pages/page-binance-market')
      },
      {
        path: ':symbol',
        name: 'market-ticker-detail',
        component: () => import('pages/page-ticker-detail')
      }
    ]
  },

  {
    path: '/volatility',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      title: 'Gate Spot'
    },
    children: [
      {
        path: '',
        name: 'Binance-Vol',
        component: () => import('pages/page-binance-vol'),
        meta: {
          title: 'Binance Spot'
        }
      }
    ]
  },

  {
    path: '/blog',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'Blog',
        component: () => import('pages/blog/page-blog')
      },
      {
        path: ':slug',
        name: 'Post-detail',
        component: () => import('pages/blog/page-blog-detail')
      }
    ]
  },

  {
    path: '/auth',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'Auth',
        component: () => import('pages/trader/authorization')
      }
    ]
  },

  {
    path: '/profile',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'Profile',
        component: () => import('pages/trader/profile')
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
