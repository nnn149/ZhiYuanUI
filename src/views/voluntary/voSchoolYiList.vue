<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="listQuery.speciality" class="filter-item" filterable placeholder="选择专业">
        <el-option label="全部专业" value="0">全部专业</el-option>
        <el-option
          v-for="item in specialityOptions"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        查询
      </el-button>

      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
        导出
      </el-button>

    </div>

    <el-table
      ref="multipleTable"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
      @selection-change="changeFun"
    >
      <el-table-column
        type="selection"
        width="50"
      />
      <el-table-column
        label="ID"
        prop="id"
        sortable="custom"
        align="center"
        width="60"
        :class-name="getSortClass('id')"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="80px" align="center">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.nickname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="考生号" min-width="110px">
        <template slot-scope="scope">
          <span>{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="数学成绩" min-width="40px">
        <template slot-scope="scope">
          <span>{{ scope.row.mathScore }}</span>
        </template>
      </el-table-column>
      <el-table-column label="英语成绩" min-width="40px">
        <template slot-scope="scope">
          <span>{{ scope.row.englishScore }}</span>
        </template>
      </el-table-column>
      <el-table-column label="专业成绩" min-width="40px">
        <template slot-scope="scope">
          <span>{{ scope.row.majorScore }}</span>
        </template>
      </el-table-column>
      <el-table-column label="总分" min-width="40px">
        <template slot-scope="scope">
          <span>{{ scope.row.totalScore }}</span>
        </template>
      </el-table-column>
      <el-table-column label="排名" min-width="60px">
        <template slot-scope="scope">
          <span>{{ scope.row.rank }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" min-width="60px">
        <template slot-scope="scope">
          <span>{{ scope.row.remark }}</span>
        </template>
      </el-table-column>
      <el-table-column label="填报专业" min-width="60px">
        <template slot-scope="scope">
          <span>{{ scope.row.speciality }}</span>
        </template>
      </el-table-column>
      <el-table-column label="志愿批次" min-width="60px">
        <template slot-scope="scope">
          <span>{{ scope.row.zhiyuan }}</span>
        </template>
      </el-table-column>
      <el-table-column label="录取状态" min-width="60px">
        <template slot-scope="scope">
          <span>{{ scope.row.status }}</span>
        </template>
      </el-table-column>

    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.limit.page"
      :limit.sync="listQuery.limit.limit"
      @pagination="getList"
    />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="center"
        label-width="auto"
      >
        <el-tag>调剂到：</el-tag>
        <el-select v-model="temp.specialityId" class="filter-item" filterable placeholder="选择专业">
          <el-option
            v-for="item in specialityOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="tiaojiOne">
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { schoolYiList, reject, preAdmission, tiaoji } from '@/api/voluntary'
import { infoByUserId } from '@/api/speciality'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import lodash from 'lodash'

export default {
  name: 'VoSchoolYiList',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    boolFormat: function(val) {
      if (val === true) {
        return '是'
      } else {
        return '否'
      }
    }
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      multipleSelection: [],
      specialityOptions: [],
      listQuery: {
        limit: {
          page: 1,
          limit: 50,
          sort: '+updateTime'
        },
        speciality: '0'
      },
      temp: {
        id: '',
        specialityId: ''
      },
      initTemp: {},
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '调剂',
        create: '添加'
      },
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        name: [{ required: true, message: '姓名必填', trigger: 'blur' }]
      },
      insertTimeValue: null,
      downloadLoading: false
    }
  },
  watch: {
    'temp.type': function(val, oldVal) {
      if (this.$refs.parentSelect) {
        this.$refs.parentSelect.refreshSelect(String(val))
      }
    }
  },
  created() {
    infoByUserId(0).then(response => {
      this.specialityOptions = response.data
    })
    this.getList()
    this.initTemp = lodash.cloneDeep(this.temp)
  },
  methods: {

    // 处理表单更新前数据
    handleUpdate(row) {
      // this.temp = Object.assign({}, this.temp, row)
      this.resetTemp()
      this.temp.id = row.id
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    // 获取列表
    getList() {
      this.listLoading = true
      schoolYiList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = Number(response.data.total)
        this.listLoading = false
      })
    },
    tiaojiOne() {
      this.$confirm('将调剂此学生, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        tiaoji(this.temp.id, this.temp.specialityId).then(response => {
          this.$notify({
            title: '成功',
            message: '调剂成功',
            type: 'success',
            duration: 2000
          })
          this.getList()
          this.dialogFormVisible = false
        })
      }).catch(() => {
        this.$notify({
          title: '取消',
          message: '取消调剂',
          type: 'success',
          duration: 2000
        })
      })
    },
    rejectOne(id) {
      this.$confirm('将拒绝录取此学生, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        reject(id).then(response => {
          this.$notify({
            title: '拒绝',
            message: '已拒绝',
            type: 'success',
            duration: 2000
          })
          this.getList()
        })
      }).catch(() => {
        this.$notify({
          title: '取消',
          message: '取消拒绝',
          type: 'success',
          duration: 2000
        })
      })
    },
    preAdmissionOne(id) {
      this.$confirm('将预录取此学生, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        preAdmission(id).then(response => {
          this.$notify({
            title: '预录取',
            message: '已预录取',
            type: 'success',
            duration: 2000
          })
          this.getList()
        })
      }).catch(() => {
        this.$notify({
          title: '取消',
          message: '取消预录取',
          type: 'success',
          duration: 2000
        })
      })
    },
    // 排序触发事件
    sortChange(data) {
      const { prop, order } = data
      if (prop) {
        this.sortByProp(order, prop)
      }
    },
    // 根据传进来的属性设置排序查询数据
    sortByProp(order, prop) {
      if (order === 'ascending') {
        this.listQuery.limit.sort = '+' + prop
      } else {
        this.listQuery.limit.sort = '-' + prop
      }
      this.handleFilter()
    },
    // 获得排序后css class
    getSortClass: function(key) {
      const sort = this.listQuery.limit.sort
      return sort === `+${key}`
        ? 'ascending'
        : sort === `-${key}`
          ? 'descending'
          : ''
    },
    changeFun(val) {
      this.multipleSelection = val
    },
    // 准备查询所需数据
    handleFilter() {
      if (this.insertTimeValue) {
        this.listQuery.startTime = this.insertTimeValue[0]
        this.listQuery.endTime = this.insertTimeValue[1]
      } else {
        delete this.listQuery.startTime
        delete this.listQuery.endTime
      }
      this.listQuery.limit.page = 1
      this.getList()
    },
    // 处理打开添加表单
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    resetTemp() {
      this.temp = lodash.cloneDeep(this.initTemp)
    },
    toggleAllSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      }
    },
    handleDownload() {
      this.downloadLoading = true
          import('@/vendor/Export2Excel').then(excel => {
            const tHeader = ['id', '姓名', '考生号', '数学成绩', '英语成绩', '专业成绩', '总分', '排名', '备注', '填报专业', '志愿批次', '录取状态']
            const filterVal = ['id', 'nickname', 'username', 'mathScore', 'englishScore', 'majorScore', 'totalScore', 'rank', 'remark', 'speciality', 'zhiyuan', 'status']
            const data = this.formatJson(filterVal, this.list)
            excel.export_json_to_excel({
              header: tHeader,
              data,
              filename: 'voSchoolList'
            })
            this.downloadLoading = false
          })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'updateTime') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>
