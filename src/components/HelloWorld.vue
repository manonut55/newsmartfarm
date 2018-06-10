<template >
<v-app class="grey darken-3" >
<v-container fluid grid-list-md>
      <v-layout row wrap>
   <v-flex xs12 md6>
        <v-layout row wrap>
          <v-flex md3>
            <TemperatureChart></TemperatureChart>
          </v-flex>
          <v-flex md3>
            <HumidityChart></HumidityChart>
          </v-flex>
          <v-flex md3>
            <FertilityChart></FertilityChart>
          </v-flex>
          <v-flex md3>
            <SoilChart></SoilChart>
        </v-flex>
     <v-flex  xs12 md12>
      <AverWater></AverWater>
      </v-flex>
      </v-layout>
    </v-flex>
       <v-flex md6>
      <v-card>
             <v-data-iterator
      :items="items"
      :rows-per-page-items="rowsPerPageItems"
      :pagination.sync="pagination"
      content-tag="v-layout"
      row
      wrap
    >
      <v-flex
        slot="item"
        slot-scope="props"
        xs12
        sm6
        md4
        lg3
      >
        <v-card>
          <v-card-title><h4>{{ props.item.Date }}</h4></v-card-title>
          <v-divider></v-divider>
          <v-list dense>
            <v-list-tile>
              <v-list-tile-content>Amountwater:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ props.item.Amountwater }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>Date:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ props.item.Date }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>Fertility:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ props.item.Fertility }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>Humidity:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ props.item.Humidity }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>Soil:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ props.item.Soil }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>Temperature:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ props.item.Temperature }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>Time:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ props.item.Time }}</v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </v-data-iterator>
    </v-card>
    </v-flex>
    </v-layout>
  </v-container>
</v-app>
</template>

<script>
import { db } from './firebase.js'
import AverWater from './AverWater'
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
    PhChart,
    AverWater
  },
  name: 'HelloWorld',
  data () {
    return {
      datatest: [],
      items: [],
      rowsPerPageItems: [4, 8, 12],
      pagination: {
        rowsPerPage: 4
      }
    }
  },
  methods: {
    // updata () {
    //   let data = {}
    //   for (let mon = 5; mon <= 7; mon++) {
    //     for (let day = 1; day <= 30; day++) {
    //       for (let i = 0; i < this.time.length; i++) {
    //         data = {}
    //         data.Amountwater = 2
    //         data.Date = day + '/' + mon + '/' + 18
    //         data.Fertility = Math.floor(Math.random() * (55 - 45 + 1)) + 55
    //         data.Fertility2 = Math.floor(Math.random() * (55 - 45 + 1)) + 55
    //         data.Humidity = Math.floor(Math.random() * (70 - 55 + 1)) + 70
    //         data.Soil = Math.floor(Math.random() * (60 - 54 + 1)) + 60
    //         data.Soil2 = Math.floor(Math.random() * (69 - 60 + 1)) + 69
    //         data.Temperature = Math.floor(Math.random() * (20 - 10 + 1)) + 10
    //         data.Time = this.time[i].time
    //         this.updatatest.push(data)
    //       }
    //     }
    //   }
    //   this.$firebaseRefs.dataSensors.child('datatest').set(this.updatatest)
    // }
  },
  mounted: function () {
    var vm = this
    vm.$bindAsObject('datatest', db.ref('DataSensors/datatest'), null)
  },
  watch: {
    datatest () {
      delete this.datatest['.key']
      this.items = Object.values(this.datatest)[0]
      // this.items = this.items.reverse()
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