<template>
  <div class="FertilityChart">
   <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">FertilityChart</h3>
            <div><canvas id="fertilityChart" width="400" height="400"></canvas></div>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat color="orange">Share</v-btn>
          <v-btn flat color="orange">Explore</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
    </div>
</template>

<script>
import Chart from 'Chart.js'
import { db } from './firebase.js'
export default {
  name: 'FertilityChart',
  data () {
    return {
      dataSensors: '',
      useData: ''
    }
  },
  methods: {
    chart () {
      var oilCanvasf = document.getElementById('fertilityChart')
      // Chart.defaults.global.defaultFontFamily = 'Lato'
      // Chart.defaults.global.defaultFontSize = 18
      var fertilityChart = new Chart(oilCanvasf, {
        type: 'doughnut',
        data: {
          labels: ['NPK'],
          datasets: [{
            data: [this.useData[0], (100 - this.useData[0])],
            backgroundColor: [
              '#894F18',
              'white'],
            borderColor: [
              '#723F0E',
              '#723F0E']

          }]
        },
        options: {
          events: ['onHover']
        }
      })
      console.log(fertilityChart)
    }
  },
  mounted: function () {
    var vm = this
    // vm.$bindAsObject('dataSensors', db.ref('DataSensors').child('History'), null)
    vm.$bindAsObject('dataSensors', db.ref('DataSensors/Fertility'), null)
  },
  watch: {
    dataSensors () {
      delete this.dataSensors['.key']
      this.useData = Object.values(this.dataSensors)
      this.chart()
    }
  }
}
</script>

