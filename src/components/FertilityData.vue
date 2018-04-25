<template>
  <div class="FertilityData">
    <v-layout row>
      <div>
   <v-data-table
    :items="newdata"
    :headers="headers"
    class="elevation-1"
  >
    <template slot="headerCell" slot-scope="props">
      <v-tooltip bottom>
        <span slot="activator">
          {{ props.header.text }}
        </span>
      </v-tooltip>
    </template>
    <template slot="items" slot-scope="props" value="key">
      <td>{{ props.item.Date }}</td>
      <td class="text-xs-right">{{ props.item.Time }}</td>
      <td class="text-xs-right">{{ props.item.Fertility }}</td>
    </template>
  </v-data-table>
    </div>
    </v-layout>
    {{ferData[6]}}
      <v-layout row>
        <div>
          <canvas id="myLineChartfer" width="400" height="400"></canvas>
        </div>
    </v-layout>
  </div>
</template>
<script>
import Chart from 'Chart.js'
import { db } from './firebase.js'
export default {
  name: 'FertilityData',
  data () {
    return {
      dataSensors: '',
      dataGraph: '',
      newdata: [],
      ferData: [],
      timeData: [],
      dateData: [],
      headers: [
        {
          text: 'วัน/เดือน/ปี',
          align: 'left',
          sortable: false,
          value: 'Date'
        },
        { text: 'เวลา', value: 'Time' },
        { text: 'ค่าNPK', value: 'Fertility' }
      ]
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