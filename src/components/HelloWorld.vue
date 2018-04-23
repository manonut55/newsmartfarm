<template>
 <!-- src="/static/doc-images/cards/docks.jpg" -->
<v-container grid-list-md text-xs-center>
      <v-layout row>
      <v-flex xs6 order-lg2>
        <TemperatureChart></TemperatureChart>
      </v-flex>
      <v-flex xs6>
        <HumidityChart></HumidityChart>
      </v-flex>
    </v-layout>
      <v-layout row>
      <v-flex xs6 order-lg2>
            <FertilityChart></FertilityChart>
      </v-flex>
      <v-flex xs6>
            <SoilChart></SoilChart>
      </v-flex>
    </v-layout>
      <v-layout row>
      <v-flex xs6 order-lg2>
            <PhChart></PhChart>
      </v-flex>
      <v-flex xs6>
        <v-card>
          <v-card-text>#6</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import FertilityChart from './FertilityChart'
import TemperatureChart from './TemperatureChart'
import HumidityChart from './HumidityChart'
import SoilChart from './SoilChart'
import PhChart from './PhChart'
export default {
  components: {
    FertilityChart,
    HumidityChart,
    TemperatureChart,
    SoilChart,
    PhChart
  },
  name: 'HelloWorld',
  data () {
    return {
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
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