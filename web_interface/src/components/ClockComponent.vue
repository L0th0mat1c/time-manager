<template>
  <div class="clock_comp">
    <div class="clock">
      <button class="button_refresh" v-on:click="refresh()">Refresh</button>
      <h1>Horloge</h1>
      <div v-if="this.startDateTime">
        Lilian travaille depuis <span style="color:orange">{{this.duree['H']}}</span> heure(s), <span style="color:orange">{{this.duree['M']}}</span> minute(s) et <span style="color:orange">{{this.duree['S']}}</span> seconde(s).
      </div>
      <div v-if="!this.startDateTime">
        Lilian ne travaille pas actuellement.
      </div>

      <button class="button_stop" v-on:click="clock()" v-if="this.clockIn">Arrêter</button>
      <button class="button_start" v-on:click="clock()" v-if="!this.clockIn">Commencer</button>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: "ClockComponent",
  props: {
    msg: String,
  },
  data() {
    return {
      clockIn: false,
      startDateTime: null,
      userID: 1,
      duree: {
        'H': '00',
        'M': '00',
        'S': '00',
      },
      clockdata: {}
    }
  },
  created() {
    this.fetchClocks()
  },
  methods: {
    moment: function () {
      return moment();
    },
    fetchClocks() {
      fetch('http://localhost:4000/api/clocks/'+this.userID)
      .then(res => {
        return res.json();
      }).then(this.setClocks);
    },
    setClocks(results) {
      if(results.data[results.data.length - 1] != null && results.data[results.data.length - 1] != undefined) {
        this.clockdata = results.data[results.data.length - 1];
        this.clockIn = this.clockdata.status;
        if(this.clockIn == true) {
          this.startDateTime = this.clockdata.time.replace('T', ' ');
        } else {
          this.startDateTime = null;
        }
        var a = moment(this.clockdata.time.replace('T', ' '));
        var b = moment().format('YYYY-MM-DD HH:mm:ss');
        var ms = moment.duration(a.diff(b));
        var duration = -ms._milliseconds;
        var seconds = Math.floor((duration / 1000) % 60),
            minutes = Math.floor((duration / (1000 * 60)) % 60),
            hours = Math.floor((duration / (1000 * 60 * 60)));
        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
        this.duree['H'] = hours;
        this.duree['M'] = minutes;
        this.duree['S'] = seconds;
      }
    },
    clock() {
      if(this.clockIn == true) {
        const jsonData = JSON.stringify({"status": "false","time": moment().format('YYYY-MM-DD HH:mm:ss'),"user": this.userID,});
        fetch('http://localhost:4000/api/clocks/'+this.userID, {method: 'POST', body: jsonData})
        .then(res => res.json())
        .then(this.fetchClocks);
      }
      else {
        const jsonData = JSON.stringify({"status": "true","time": moment().format('YYYY-MM-DD HH:mm:ss'),"user": this.userID,});
        fetch('http://localhost:4000/api/clocks/'+this.userID, {method: 'POST', body: jsonData})
        .then(res => res.json())
        .then(this.fetchClocks);
      }
    },
    refresh() {
      this.fetchClocks()
    },
  }
};
</script>

<style scoped>
* {
  color: white;
}
.clock {
  padding:0;
  margin:0;
  background-color:rgb(36, 36, 36);
  text-align:center;
  padding-bottom:40px;
  padding-top:10px;
  font-size:20px;
}
.button_stop {
  background-color:rgb(238, 79, 79);
  border:none;
  padding:10px 20px;;
  border-radius:5px;
  font-size:16px;
  margin-top:20px;
}
.button_start {
  background-color:rgb(100, 236, 84);
  border:none;
  padding:10px 20px;;
  border-radius:5px;
  font-size:16px;
  margin-top:20px;
}
.button_refresh {
  background-color:rgb(60, 152, 198);
  border:none;
  padding:10px 20px;;
  border-radius:5px;
  font-size:16px;
  margin-top:10px;
  right:30px;
  position:absolute;
}
</style>
