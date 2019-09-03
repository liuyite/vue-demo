<template>
    <div class="reports">
      <v-chart :options="data"/>
    </div>
</template>

<script>

import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/polar'
import { reportsData } from '@/api/reports.js'
export default {
    data(){
        return{
            data:{}
        }
    },
     components: {
    'v-chart': ECharts
   },
   mounted() {
       reportsData(1)
       .then(res=>{
           console.log(res)
           this.data = res.data.data
       })
   }
}
</script>
<style lang="less" scoped>
.echarts {
  width: 100%;
  height: 100%;
}
.reports{
  width: 100%;
  height: 100%;
}
</style>