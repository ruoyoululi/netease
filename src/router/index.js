import Vue from 'vue'
import Router from 'vue-router'
// import Recommend from 'components/recommend/recommend'
// import Discovery from 'components/discovery/discovery'
// import SellList from 'components/sell-list/sell-list'
Vue.use(Router)

const Home = ((resolve) => {
	import('components/home/home').then((module) => {
		resolve(module)
	})
})
const SellList = ((resolve) => {
  import('components/sell-list/sell-list').then((module) => {
    resolve(module)
  })
})
const Refresh = ((resolve) => {
  import('base/refresh/refresh').then((module) => {
    resolve(module)
  })
})
const Discovery = ((resolve) => {
  import('components/discovery/discovery').then((module) => {
    resolve(module)
  })
})
const Recommend = ((resolve) => {
  import('components/recommend/recommend').then((module) => {
    resolve(module)
  })
})
const Follow = ((resolve) => {
  import('components/follow/follow').then((module) => {
    resolve(module)
  })
})
const MyStudy = ((resolve) => {
  import('components/myStudy/myStudy').then((module) => {
    resolve(module)
  })
})
const Stalus = ((resolve) => {
  import('components/stalus/stalus').then((module) => {
    resolve(module)
  })
})
const Storage = ((resolve) => {
  import('components/storage/storage').then((module) => {
    resolve(module)
  })
})
const Mine = ((resolve) => {
  import('components/mine/mine').then((module) => {
    resolve(module)
  })
})
const Classify = ((resolve) => {
  import('components/classify/classify').then((module) => {
    resolve(module)
  })
})
const Search = ((resolve) => {
  import('components/search/search').then((module) => {
    resolve(module)
  })
})
const Systematize = ((resolve) => {
  import('components/systematize/systematize').then((module) => {
    resolve(module)
  })
})
const Interest = ((resolve) => {
  import('components/interest/interest').then((module) => {
    resolve(module)
  })
})

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Home,
      redirect: '/index'
    },
    {
    	path: '/index',
    	name: 'index',
    	component: Home,
      children: [
        {
          path: '/',
          component: SellList
        },
        {
          path: ':id',
          component: SellList
        }
      ]
    },
    {
    	path: '/discovery',
      component: Discovery,
      children: [
        {
          path: '/',
          redirect: 'recommend',
          component: Recommend
        },
        {
          path: 'recommend',
          component: Recommend
        },
        {
          path: 'follow',
          component: Follow
        }
      ]
    },
    {
    	path: '/study',
      component: MyStudy,
      children: [
        {
          path: '/',
          redirect: 'stalus',
          component: Stalus
        },
        {
          path: 'stalus',
          component: Stalus
        },
        {
          path: 'storage',
          component: Storage
        }
      ]
    },
    {
    	path: '/mine',
      component: Mine
    },
    {
      path: '/refresh',
      // redirect: '/index',
      component: Refresh
    },
    {
      path: '/classify',
      component: Classify,
      children: [
        {
          path: '/',
          component: Classify
        },
        {
          path: ':id',
          component: Classify
        }
      ]
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/system',
      component: Systematize,
      children: [
        {
          path: '/',
          component: Systematize
        },
        {
          path: ':id',
          component: Systematize
        }
      ],
      meta: {
        keepAlive: false //此组件不需要被缓存
      }
    },
    {
      path: '/interest',
      component: Interest
    }
  ]
})
