import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard', noCache: true, affix: true }
      }
    ]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/product',
    name: 'Example',
    meta: { title: '袜妖管理系统', icon: 'example' },
    children: [
      // {
      //   path: 'product',
      //   name: 'Table',
      //   component: () => import('@/views/product/index'),
      //   meta: { title: '商品列表', icon: 'product' }
      // },
      // {
      //   path: 'tree',
      //   name: 'Tree',
      //   component: () => import('@/views/tree/index'),
      //   meta: { title: 'Tree', icon: 'tree' }
      // },
      {
        path: 'complex-table',
        name: 'Complex-product',
        component: () => import('@/views/product/productList'),
        meta: { title: '商品列表', icon: 'table' }
      }
    ]
  },
  {
    path: '/slideBanner',
    component: Layout,
    redirect: '/slideBanner',
    name: 'Slide',
    meta: {
      title: 'slide',
      icon: 'slide'
    },
    children: [
      {
        path: 'slide',
        component: () => import('@/views/banner/index'),
        name: 'MangeSlide',
        meta: { title: '轮播图片管理', icon: 'form' }
      }
    ]
  },
  {
    path: '/excel',
    component: Layout,
    redirect: '/excel/export-excel',
    name: 'Excel',
    meta: {
      title: 'excel',
      icon: 'excel'
    },
    children: [
      {
        path: 'upload-excel',
        component: () => import('@/views/excel/uploadExcel'),
        name: 'UploadExcel',
        meta: { title: '上传Excel', icon: 'form' }
      }
    ]
  },
  // {
  //   path: '/upload',
  //   component: Layout,
  //   redirect: '/upload/qiniu',
  //   name: 'Upload',
  //   meta: {
  //     title: 'upload',
  //     icon: 'upload'
  //   },
  //   children: [
  //     {
  //       path: 'qiniu',
  //       component: () => import('@/views/qiniu/upload'),
  //       name: 'upload',
  //       meta: { title: 'upload' }
  //     }
  //   ]
  // },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
