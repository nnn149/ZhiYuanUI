<template>
  <div class="dashboard-editor-container">
    <github-corner class="github-corner" />
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData" />
    </el-row>
  </div>
</template>

<script>
import GithubCorner from '@/components/GithubCorner'
import LineChart from './components/LineChart'
import { chengjiCharts } from '@/api/student'

export default {
  name: 'DashboardAdmin',
  components: {
    GithubCorner,
    LineChart
  },
  data() {
    return {
      lineChartData: { actualData: [120, 82, 91, 154, 162, 140, 145, 120, 82, 91, 154, 162, 140, 145, 600, 500, 400] }
    }
  },
  created() {
    chengjiCharts().then(response => {
      this.lineChartData.actualData = response.data
    })
  },
  methods: {
    handleSetLineChartData() {
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
