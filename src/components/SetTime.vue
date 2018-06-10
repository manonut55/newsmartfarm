<template>
<div class="SetTime">
  <v-app>
  <v-content app>
  <v-container grid-list-{xs through xl} >
    <v-layout row wrap>
      <v-flex >
        <v-card color="purple">
          <v-card-media >
            <v-card-title>
                    <div class="headline">ค่าการปลูก</div>
              </v-card-title>
          </v-card-media>
        </v-card>
      </v-flex>
      </v-layout>
    <v-layout row wrap>
      <v-flex md6>
        <v-card>
          <v-card-media >
            <v-flex >
            <v-time-picker
              v-model="time"
              full-width
              type="month"
              class="mt-3"
              format="24hr"
            ></v-time-picker>
            </v-flex>
          </v-card-media>
        </v-card>
      </v-flex>
      <v-flex md6 >
        <v-card>
            <v-container fill-height fluid>
                <v-flex xs12 align-end flexbox>
                  <h3 class="headline mb-0" >เพิ่มเวลารดน้ำ</h3><br>
                  <v-text-field v-model="time" type="text" ></v-text-field><br>
                  <div v-for="time in settimejson">
                    {{ time.hs }}:
                    {{ time.ms }}
                  </div>
                </v-flex>
            </v-container>
          <v-card-actions>
            <v-btn flat color="orange" @click="settime()">เพิ่มเวลา</v-btn>
            <v-btn flat color="orange" @click="pushtime()">ยืนยัน</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      </v-layout>
      <br><br>
      <v-layout row wrap>
      <v-flex md6>
        <v-card>
          <v-card-media >
           <v-flex >
            <v-date-picker
              v-model="dateNow"
              full-width
              class="mt-3"
            ></v-date-picker>
           </v-flex >
            </v-card-media >
        </v-card>
      </v-flex>
      <v-flex md6>
        <v-card>
            <v-container fill-height fluid>
                <v-flex xs12 align-end flexbox>
                  <h3 class="headline mb-0" >วันเริ่มต้นปลูก</h3>
                  <v-text-field label="เวลาในการปลูก" v-model="timeofplant" required></v-text-field>
                  <v-text-field label="วันที่เริ่มปลูก" v-model="dateNow" required></v-text-field>      
                </v-flex>
            </v-container>
          <v-card-actions>
            <v-btn flat color="orange" @click="setdate();">ยืนยัน</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    {{daystp}}
  </v-container>
  </v-content>
  </v-app>
</div>
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
      timeofplant: null,
      setdatejson: [],
      daystp: ''
    }
  },
  methods: {
    settime () {
      let data = {}
      if (this.time.substring(0, 1) === '0') {
        data.hs = this.time.substring(1, 2)
      } else {
        data.hs = this.time.substring(0, 2)
      }
      data.ms = this.time.substring(3)
      this.settimejson.push(data)
      this.time = '00:00'
    },
    setdate () {
      let data = {}
      let subdate = []
      let monnum = 0
      data.datestr = this.dateNow
      data.timeofplant = this.timeofplant
      this.timeofplant = null
      subdate = this.dateNow.split('-')
      monnum = 2 + parseInt(subdate[1])
      subdate[1] = monnum.toString()
      if (parseInt(subdate[2]) > 30) {
        subdate[2] = '01'
      }
      data.daystp = this.daystp += subdate[0] + '-' + subdate[1] + '-' + subdate[2]
      this.setdatejson.push(data)
      this.$firebaseRefs.dataSensors.child('DateOfPlant').set(this.setdatejson)
      this.dateNow = momenTime().tz('Asia/Bangkok').format('YYYY-MM-DD')
      this.setdatejson = []
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

