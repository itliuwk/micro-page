import Vue from 'vue'
import Router from 'vue-router'
import microPage from '@/views/microPage/list'
import design from '@/views/microPage/design/design'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'microPage',
      component: microPage
    },
    {
      path: '/microPage/design',
      name: 'design',
      hidden: true,
      component: design,
      meta: {title: '编辑微页面'}
    }
  ]
})
