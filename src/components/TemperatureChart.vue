<template>
  <div class="TemperatureChart">
   <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">อุณหภูมิในอากาศ</h3>
            <div><canvas id="temperatureChart" width="400" height="400"></canvas></div>
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
  name: 'TemperatureChart',
  data () {
    return {
      dataSensors: '',
      useData: ''
    }
  },
  methods: {
    chart () {
      var oilCanvast = document.getElementById('temperatureChart')
      // Chart.defaults.global.defaultFontFamily = 'Lato'
      // Chart.defaults.global.defaultFontSize = 18
      var temperatureChart = new Chart(oilCanvast, {
        type: 'doughnut',
        data: {
          labels: ['อุณหภูมิ'],
          datasets: [{
            data: [this.useData[0], (100 - this.useData[0])],
            backgroundColor: [
              '#2b7cff',
              'white'],
            borderColor: [
              '#2072f7',
              '#2072f7']
          }]
        },
        options: {
          events: ['onHover']
        }
      })
      console.log(temperatureChart)
    }
  },
  mounted: function () {
    var vm = this
    // vm.$bindAsObject('dataSensors', db.ref('DataSensors').child('History'), null)
    vm.$bindAsObject('dataSensors', db.ref('DataSensors/Temperature'), null)
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

<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
