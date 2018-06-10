import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import DataTable from '@/components/DataTable'
import FertilityData from '@/components/FertilityData'
import HumidityData from '@/components/HumidityData'
import SoilData from '@/components/SoilData'
import TemperatureData from '@/components/TemperatureData'
import SetTime from '@/components/SetTime'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/DataTable',
      name: 'DataTable',
      component: DataTable
    },
    {
      path: '/HumidityData',
      name: 'HumidityData',
      component: HumidityData
    },
    {
      path: '/SoilData',
      name: 'SoilData',
      component: SoilData
    },
    {
      path: '/TemperatureData',
      name: 'TemperatureData',
      component: TemperatureData
    },
    {
      path: '/FertilityData',
      name: 'FertilityData',
      component: FertilityData
    },
    {
      path: '/SetTime',
      name: 'SetTime',
      component: SetTime
    }
  ]
})
