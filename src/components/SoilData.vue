<template>
  <div class="SoilData">
    <v-container fluid grid-list-md>
    <v-layout row wrap>
          <v-flex  xs12 md6>
            <v-card>
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
                  <td class="text-xs-right">{{ props.item.Soil }}</td>
                </template>
              </v-data-table>
          </v-card>
          </v-flex>
           <v-flex  xs12 md6>
          <v-card> 
          <canvas id="myLineChartsoil" width="200" height="107"></canvas>
        </v-card>
         </v-flex>
        </v-layout>
    </v-container>
  </div>
</template>
<script>
import Chart from 'Chart.js'
import { db } from './firebase.js'
export default {
  name: 'SoilData',
  data () {
    return {
      dataSensors: '',
      dataGraph: '',
      newdata: [],
      soilData: [],
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
        { text: 'ความชื่นในดิน', value: 'Soil' }
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
        this.soilData[index] = newdata[index].Soil
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
            Soil: this.dataSensors[index].Soil
          }
        )
      }
    })
  },
  methods: {
    chart () {
      var ctxsoil = document.getElementById('myLineChartsoil').getContext('2d')
      var myLineChartsoil = new Chart(ctxsoil, {
        type: 'line',
        data: {
          labels: this.dateData,
          datasets: [{
            label: 'ค่าNPK',
            data: this.soilData,
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
      console.log(myLineChartsoil)
    }
  },
  watch: {
    dataGraph () {
      this.chart()
    }
  }
}
</script>