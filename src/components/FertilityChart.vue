<template>
  <div class="FertilityChart">
  <v-layout>
    <v-flex>
      <v-card>
        <v-card-media>
          <v-layout row wrap>  
          <v-progress-circular
          :size="120"
          :width="15"
          :rotate="-90"
          :value="useData[0]"
          color="primary"
        >
          {{ useData[0] }}
        </v-progress-circular>  
        <!-- <div><canvas id="LineChartfer" height="250" width="300"></canvas></div> -->
          </v-layout>
        </v-card-media>
        <v-card-title primary-title>
          <div>
             <h3 class="headline mb-0">FertilityChart</h3><br>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat color="orange">Share</v-btn>
          <v-btn flat color="orange">Explore</v-btn>
        </v-card-actions>
        <div style="flex: 1 1 auto;"/>
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
      useData: '',
      dataGraph: '',
      dateData: [],
      timeData: [],
      ferData: []
    }
  },
  methods: {
    chart () {
      var ctxfer = document.getElementById('LineChartfer').getContext('2d')
      var LineChartfer = new Chart(ctxfer, {
        type: 'line',
        data: {
          labels: this.dateData,
          datasets: [{
            label: 'ค่าNPK',
            data: this.ferData,
            backgroundColor: [
              'rgba(217, 237, 247, 0.4)'
            ],
            borderColor: [
              'rgba(38,144,255,1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            yAxes: [{
              stacked: true
            }]
          }
        }
      })
      console.log(LineChartfer)
    }
  },
  mounted: function () {
    var vm = this
    // vm.$bindAsObject('dataSensors', db.ref('DataSensors').child('History'), null)
    vm.$bindAsObject('dataSensors', db.ref('DataSensors/Fertility'), null)
    vm.$bindAsObject('dataGraph', db.ref('DataSensors/History').limitToLast(7), null, () => {
      let newdata = []
      delete this.dataGraph['.key']
      newdata = Object.values(this.dataGraph)
      console.log(this.dateData)
      for (let index in newdata) {
        this.ferData[index] = newdata[index].Fertility
        this.timeData[index] = newdata[index].Time
        this.dateData[index] = newdata[index].Date
      }
    })
  },
  watch: {
    dataSensors () {
      delete this.dataSensors['.key']
      this.useData = Object.values(this.dataSensors)
      this.chart()
    },
    dataGraph () {
      this.chart()
    }
  }
}
</script>
<style>
#fertilityChart{
  width: 150px;
  height: 150px;
  position: relative;
  top: 50px;
}
#LineChartfer{
   position: relative;
   
}
</style>

