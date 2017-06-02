<template>
  <div>
  <vue-highcharts :options="options" :data="data" ref="lineCharts"></vue-highcharts>
  <button @click="load">load</button>
  </div>

</template>
<script>
  import VueHighcharts from 'vue2-highcharts';
  import http from '../../../assets/js/http.js';
  export default{
    components: {
      VueHighcharts
    },
    created () {
      this.getData();
    },
    data(){
      return{
        data:[],
        options: {
          chart: {
            type: 'pie'
          },
          title: {
            text: 'Monthly Average Temperature'
          },
          subtitle: {
            text: 'Source: WorldClimate.com'
          },
          tooltip: {
            crosshairs: true,
            shared: true
          },
          credits: {
            enabled: false
          },
          plotOptions: {
            spline: {
              marker: {
                radius: 4,
                lineColor: '#666666',
                lineWidth: 1
              }
            }
          },
          series: [{
            data:
                this.data
          }]
        }
    }
    },
    methods:{
      getData() {
      this.apiGet('user/acount').then((data) => {
      this.handelResponse(data, (data, msg) => {
        this.data = data
      }, (data, msg) => {
        this.$Message.error(msg);
      })
    },)
  },
      load(){
        let lineCharts = this.$refs.lineCharts;
        lineCharts.delegateMethod('showLoading', 'Loading...');
        setTimeout(() => {
//          lineCharts.addSeries(asyncData);
          lineCharts.hideLoading();
        }, 1000)
      }
    },
    mixins: [http]
  }
</script>
