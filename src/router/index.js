import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import DataTable from '@/components/DataTable'
import FertilityData from '@/components/FertilityData'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/FertilityData',
      name: 'FertilityData',
      component: FertilityData
    },
    {
      path: '/DataTable',
      name: 'DataTable',
      component: DataTable
    }
  ]
})
