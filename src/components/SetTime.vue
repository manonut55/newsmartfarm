<template>
  <v-app>
<div class="SetTime">
  <v-content app>
  <v-container fluid grid-list-md >
    <v-layout row wrap>
      <v-flex >
        <v-card>
          <v-card-media >
            <v-time-picker
              v-model="time"
              full-width
              landscape
              type="month"
              class="mt-3"
              format="24hr"
            ></v-time-picker>
          </v-card-media>
        </v-card>
      </v-flex>
      <v-flex >
        <v-card>
          <v-card-media
            class="black--text"
            height="255px">
            <v-container fill-height fluid>
                <v-flex xs12 align-end flexbox>
                  <h3 class="headline mb-0" >เพิ่มเวลารดน้ำ</h3><br>
                  <v-text-field v-model="time" type="text" ></v-text-field><br>
                  <div v-for="time in settimejson">
                    {{ time.H }}:
                    {{ time.M }}
                  </div>
                </v-flex>
            </v-container>
          </v-card-media>
          <v-card-actions>
            <v-btn flat color="orange" @click="settime()">เพิ่มเวลา</v-btn>
            <v-btn flat color="orange" @click="pushtime()">ยืนยัน</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      </v-layout>
      <br><br>
      <v-layout row wrap>
      <v-flex >
        <v-card>
            <v-date-picker
              v-model="dateNow"
              landscape
              class="mt-3"
            ></v-date-picker>
        </v-card>
      </v-flex>
      <v-flex >
        <v-card>
          <v-card-media
            class="black--text"
            height="250px">
            <v-container fill-height fluid>
                <v-flex xs12 align-end flexbox>
                  <h3 class="headline mb-0" >วันเริ่มต้นปลูก</h3>
                  <v-text-field label="เวลาในการปลูก" v-model="timeofplant" required></v-text-field>
                  <v-text-field label="เวลาในการปลูก" v-model="dateNow" required></v-text-field>      
                </v-flex>
            </v-container>
          </v-card-media>
          <v-card-actions>
            <v-btn flat color="orange" @click="">เพิ่มเวลา</v-btn>
            <v-btn flat color="orange" @click="">ยืนยัน</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
  </v-content>
</div>
</v-app>
</template>

<script>
import { db } from './firebase.js'
import momenTime from 'moment-timezone'
export default {
  name: 'SetTime',
  data () {
    return {
      dataSensors: '',
      useData: '',
      time: '00:00',
      settimejson: [],
      dateNow: momenTime().tz('Asia/Bangkok').format('YYYY-MM-DD'),
      timeofplant: null
    }
  },
  methods: {
    settime () {
      let data = {}
      if (this.time.substring(0, 1) === '0') {
        data.H = this.time.substring(1, 2)
      } else {
        data.H = this.time.substring(0, 2)
      }
      data.M = this.time.substring(3)
      this.settimejson.push(data)
      this.time = '00:00'
    },
    pushtime () {
      this.$firebaseRefs.dataSensors.child('SetTime').set(this.settimejson)
      this.settimejson = []
    }
  },
  mounted: function () {
    var vm = this
    vm.$bindAsObject('dataSensors', db.ref('DataSensors'), null)
  },
  watch: {
    dataSensors () {
      delete this.dataSensors['.key']
      this.useData = Object.values(this.dataSensors)
    }
  }
}
</script>

