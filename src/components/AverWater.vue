<template>
  <div class="AverWater">
          <v-card> 
          <canvas id="myLineChartfer" width="200" height="107"></canvas>
        </v-card>
  </div>
</template>
<script>
import Chart from 'Chart.js'
import { db } from './firebase.js'
export default {
  name: 'AverWater',
  data () {
    return {
      dataSensors: '',
      dataGraph: '',
      newdata: [],
      ferData: [],
      timeData: [],
      dateData: []
    }
  },
  mounted: function () {
    var vm = this
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
    vm.$bindAsObject('dataSensors', db.ref('DataSensors').child('History'), null, () => {
      delete this.dataSensors['.key']
      for (let index in this.dataSensors) {
        console.log(index)
        this.newdata.push(
          {
            value: false,
            Date: this.dataSensors[index].Date,
            Time: this.dataSensors[index].Time,
            Fertility: this.dataSensors[index].Fertility
          }
        )
      }
    })
  },
  methods: {
    chart () {
      var ctxfer = document.getElementById('myLineChartfer').getContext('2d')
      var myLineChartfer = new Chart(ctxfer, {
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
          responsive: true,
          scales: {
            yAxes: [{
              stacked: true
            }]
          }
        }
      })
      console.log(myLineChartfer)
    }
  },
  watch: {
    dataGraph () {
      this.chart()
    }
  }
}
</script>
