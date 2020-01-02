<template>
  <div class="dashboard-editor-container">
    <github-corner class="github-corner" />

    <panel-group @handleSetLineChartData="handleSetLineChartData" />

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData" />
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import GithubCorner from '@/components/GithubCorner'
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import PieChart from './components/PieChart'
import { getLineChartData } from '@/api/customer'

export default {
  name: 'DashboardAdmin',
  components: {
    GithubCorner,
    PanelGroup,
    LineChart,
    PieChart
  },
  data() {
    return {
      allLineChartData: {
        newVisitis: {
          actualData: [120, 82, 91, 154, 162, 140, 145]
        },
        messages: {
          actualData: [180, 160, 151, 106, 145, 150, 130]
        },
        purchases: {
          actualData: [120, 90, 100, 138, 142, 130, 130]
        },
        shoppings: {
          actualData: [120, 82, 91, 154, 162, 140, 130]
        }
      },
      lineChartData: undefined
    }
  },
  created() {
    getLineChartData().then(response => {
      this.allLineChartData = response.data
      this.lineChartData = this.allLineChartData.newVisitis
    })
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = this.allLineChartData[type]
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
