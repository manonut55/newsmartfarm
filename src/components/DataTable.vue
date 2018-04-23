<template>
  <div class="DataTable">
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
      <td class="text-xs-right">{{ props.item.Soil }}</td>
      <td class="text-xs-right">{{ props.item.Humidity }}</td>
      <td class="text-xs-right">{{ props.item.Temperature }}</td>
      <td class="text-xs-right">{{ props.item.Amountwater }}</td>
    </template>
  </v-data-table>
  </div>
</template>
<script>
import { db } from './firebase.js'
export default {
  name: 'DataTable',
  data () {
    return {
      dataSensors: '',
      newdata: [],
      headers: [
        {
          text: 'วัน/เดือน/ปี',
          align: 'left',
          sortable: false,
          value: 'Date'
        },
        { text: 'เวลา', value: 'Time' },
        { text: 'ค่าNPK', value: 'Fertility' },
        { text: 'ค่าความชื้นในดิน', value: 'Soil' },
        { text: 'ค่าความชื้นในอากาศ', value: 'Humidity' },
        { text: 'อุณหภูมิ', value: 'Temperature' },
        { text: 'จำนวนครั้งในการให้น้ำ', value: 'Amountwater' }
      ]
    }
  },
  mounted: function () {
    var vm = this
    // vm.$bindAsObject('dataSensors', db.ref('DataSensors').child('History').limitToLast(2), null)
    vm.$bindAsObject('dataSensors', db.ref('DataSensors').child('History'), null, () => {
      delete this.dataSensors['.key']
      // newdata = Object.values(this.dataSensors)
      for (let index in this.dataSensors) {
        console.log(index)
        this.newdata.push(
          {
            value: false,
            Date: this.dataSensors[index].Date,
            Time: this.dataSensors[index].Time,
            Fertility: this.dataSensors[index].Fertility,
            Soil: this.dataSensors[index].Soil,
            Humidity: this.dataSensors[index].Humidity,
            Temperature: this.dataSensors[index].Temperature,
            Amountwater: this.dataSensors[index].Amountwater
          }
        )
      }
    })
  },
  watch: {
  },
  methods: {
  }
}
</script>