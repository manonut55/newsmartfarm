<template >
<v-app class="grey darken-3" >
<v-container  grid-list-md>
      <v-layout row wrap>
          <v-flex md3>
            <TemperatureChart></TemperatureChart>
          </v-flex>
          <v-flex md3>
            <HumidityChart></HumidityChart>
          </v-flex>
          <v-flex md3 >
            <FertilityChart></FertilityChart>
          </v-flex>
          <v-flex md3>
            <SoilChart></SoilChart>
        </v-flex>
    </v-layout>
  </v-container>
</v-app>
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