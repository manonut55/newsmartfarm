<template>
  <div class="SoilChart">
   <v-layout>
    <v-flex >
      <v-card color="grey lighten-5">
        <v-card-title class="pink white--text">
         <v-card-text class="text-md-center">
          <div>
             <h2 class="headline mb-0">ความชื้นในดิน</h2>
          </div>
          </v-card-text>
        </v-card-title>
         <v-layout justify-center>      
        <v-card-media>
          <v-container>
          <v-progress-circular
          :size="120"
          :width="15"
          :rotate="-90"
          :value="useData[0]"
          color="pink"
        >
         <h1> {{ useData[0] }} </h1>
        </v-progress-circular>        
          </v-container>
        </v-card-media>
         </v-layout>
         <v-layout justify-center>  
           <v-card-actions>
          <v-btn small color="pink white--text">Share</v-btn>
          <v-btn small color="pink white--text">Explore</v-btn>
        </v-card-actions>
         </v-layout>
         <br>
      </v-card>
    </v-flex>
  </v-layout>
        </div>
</template>

<script>
// import Chart from 'Chart.js'
import { db } from './firebase.js'
export default {
  name: 'SoilChart',
  data () {
    return {
      dataSensors: '',
      useData: ''
    }
  },
  methods: {
    chart () {
    }
  },
  mounted: function () {
    var vm = this
    // vm.$bindAsObject('dataSensors', db.ref('DataSensors').child('History'), null)
    vm.$bindAsObject('dataSensors', db.ref('DataSensors/Soil'), null)
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
