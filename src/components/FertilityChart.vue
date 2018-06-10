<template>
  <div class="FertilityChart">
  <v-layout>
    <v-flex> 
      <v-card color="grey lighten-5">   
        <v-card-title class="orange white--text">
            ค่าสารอาหารในดิน
          </v-card-title >
          <v-layout justify-center>      
        <v-card-media >
          <v-container>
          <v-progress-circular
          :size="120"
          :width="15"
          :rotate="-90"
          :value="useData[0]"
          color="orange"
        >
          <h1> {{ useData[0] }} </h1>
        </v-progress-circular>  
        <!-- <div><canvas id="LineChartfer" height="250" width="300"></canvas></div> -->
          </v-container>
        </v-card-media>
        </v-layout>
         <v-card-title class="orange white--text">
            ค่าสารอาหารในดิน
          </v-card-title >
        </v-card>
    </v-flex>
  </v-layout>
    </div>
</template>
<script>
import { db } from './firebase.js'
export default {
  name: 'FertilityChart',
  data () {
    return {
      dataSensors: '',
      useData: '',
      dateData: [],
      timeData: [],
      ferData: []
    }
  },
  methods: {
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
