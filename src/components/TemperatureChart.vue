<template>
  <div class="TemperatureChart">
  <v-layout >
    <v-flex >
      <v-card color="grey lighten-5" >
        <v-card-title class="primary white--text">
          อุณหภูมิในอากาศ
         </v-card-title>
         <v-layout justify-center>      
        <v-card-media>
            <v-container>
          <v-progress-circular
          :size="120"
          :width="15"
          :rotate="-90"
          :value="useData[0]"
          color="primary"
        >
          <h1>{{ useData[0] }}</h1>
        </v-progress-circular>
         </v-container>
        </v-card-media>
         </v-layout>
            <v-card-title class="primary white--text">
         อุณหภูมิในอากาศ
         </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
  </div>
</template>

<script>
// import Chart from 'Chart.js'
import { db } from './firebase.js'
export default {
  name: 'TemperatureChart',
  data () {
    return {
      dataSensors: '',
      useData: '',
      temData: [],
      timeData: [],
      dateData: []
    }
  },
  methods: {
    chart () {
    }
  },
  mounted: function () {
    var vm = this
    // vm.$bindAsObject('dataSensors', db.ref('DataSensors').child('History'), null)
    vm.$bindAsObject('dataSensors', db.ref('DataSensors/Temperature'), null)
    vm.$bindAsObject('dataGraph', db.ref('DataSensors/History').limitToLast(7), null, () => {
      let newdata = []
      delete this.dataGraph['.key']
      newdata = Object.values(this.dataGraph)
      console.log(this.dateData)
      for (let index in newdata) {
        this.temData[index] = newdata[index].Temperature
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
