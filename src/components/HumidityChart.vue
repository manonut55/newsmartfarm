<template>
  <div class="HumidityChart">
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-card-media
          class="white--text"
          height="300px">
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
                 <div><canvas id="humidityChart" width="200"height="200"></canvas></div>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-media>
        <v-card-title>
          <div>
            <h3 class="headline mb-0">ความชื้นในอากาศ</h3><br>
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
  name: 'HumidityChart',
  data () {
    return {
      dataSensors: '',
      useData: ''
    }
  },
  methods: {
    chart () {
      var oilCanvash = document.getElementById('humidityChart')
      // Chart.defaults.global.defaultFontFamily = 'Lato'
      // Chart.defaults.global.defaultFontSize = 18
      var humidityChart = new Chart(oilCanvash, {
        type: 'doughnut',
        data: {
          labels: ['ความชื้นในอากาศ'],
          datasets: [{
            data: [this.useData[0], (100 - this.useData[0])],
            backgroundColor: [
              '#A1C734',
              'white'],
            borderColor: [
              '#8cb21a',
              '#8cb21a']
          }]
        },
        options: {
          events: ['onHover']
        }
      })
      console.log(humidityChart)
    }
  },
  mounted: function () {
    var vm = this
    // vm.$bindAsObject('dataSensors', db.ref('DataSensors').child('History'), null)
    vm.$bindAsObject('dataSensors', db.ref('DataSensors/Humidity'), null)
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
