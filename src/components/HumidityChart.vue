<template>
  <div class="HumidityChart">
  <v-layout>
    <v-flex >
      <v-card >
         <v-card-text class="text-md-center">
         <v-card-title class="teal white--text">
          <div>
             <h3 class="headline mb-0">ความชื้นในอากาศ</h3><br>
          </div>
        </v-card-title>
        </v-card-text>
         <v-layout justify-center>      
        <v-card-media>
                   <v-progress-circular
          :size="120"
          :width="15"
          :rotate="-90"
          :value="useData[0]"
          color="teal"
        >
          <h1>{{ useData[0] }}</h1>
        </v-progress-circular>
        </v-card-media>
         </v-layout>
         <v-layout justify-center>
               <v-card-actions>
          <v-btn small color="teal white--text">Share</v-btn>
          <v-btn small color="teal white--text" >Explore</v-btn>
        </v-card-actions>
         </v-layout>
      </v-card>
    </v-flex>
  </v-layout>
      </div>
</template>

<script>
// import Chart from 'Chart.js'
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
