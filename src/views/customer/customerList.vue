<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.name"
        placeholder="姓名"
        style="width: 100px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.tel"
        placeholder="电话"
        style="width: 100px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <dictionary-select v-model="listQuery.gender" style="width: 80px;" class="filter-item" type-id="122" zero-label="性别" />
      <dictionary-select v-model="listQuery.vxAdd" style="width: 110px;" class="filter-item" type-id="123" zero-label="微信添加" />
      <dictionary-select v-model="listQuery.origin" style="width: 110px;" class="filter-item" type-id="124" zero-label="来源" />
      <dictionary-select v-model="listQuery.mark" style="width: 110px;" class="filter-item" type-id="123" zero-label="标记" />
      <dictionary-select v-model="listQuery.power" style="width: 110px;" class="filter-item" type-id="125" zero-label="消费能力" />
      <dictionary-select v-model="listQuery.behaviorId" style="width: 110px;" class="filter-item" type-id="126" zero-label="消费行为" />
      <dictionary-select v-model="listQuery.likeId" style="width: 110px;" class="filter-item" type-id="127" zero-label="口感喜好" />
      <dictionary-select v-model="listQuery.demandId" style="width: 110px;" class="filter-item" type-id="128" zero-label="消费需求" />

      <el-date-picker
        v-model="insertTimeValue"
        value-format="yyyy-MM-dd"
        class="filter-item"
        type="daterange"
        align="center"
        unlink-panels
        range-separator="-"
        start-placeholder="更新开始日期"
        end-placeholder="更新结束日期"
        :picker-options="pickerOptions"
      />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        查询
      </el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >
        添加
      </el-button>
      <el-button
        v-waves
        class="filter-item"
        type="danger"
        icon="el-icon-delete"
        @click="deleteDatas"
      >
        删除
      </el-button>
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
        导出
      </el-button>
      <el-button v-waves class="filter-item" type="primary" @click="toggleAllSelection(list)">
        反选
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
          <span class="link-type" @click="handleUpdate(row)">{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="电话" min-width="110px">
        <template slot-scope="scope">
          <span>{{ scope.row.tel }}</span>
        </template>
      </el-table-column>
      <el-table-column label="性别" min-width="60px">
        <template slot-scope="scope">
          <span>{{ scope.row.genderTitle }}</span>
        </template>
      </el-table-column>
      <el-table-column label="微信添加" min-width="50px">
        <template slot-scope="scope">
          <span>{{ scope.row.vxAddTitle }}</span>
        </template>
      </el-table-column>
      <el-table-column label="微信号" min-width="80px">
        <template slot-scope="scope">
          <span>{{ scope.row.vx }}</span>
        </template>
      </el-table-column>
      <el-table-column label="来源" min-width="60px">
        <template slot-scope="scope">
          <span>{{ scope.row.originTitle }}</span>
        </template>
      </el-table-column>
      <el-table-column label="标记" min-width="60px">
        <template slot-scope="scope">
          <span>{{ scope.row.markTitle }}</span>
        </template>
      </el-table-column>
      <el-table-column label="消费能力" min-width="60px">
        <template slot-scope="scope">
          <span>{{ scope.row.powerTitle }}</span>
        </template>
      </el-table-column>
      <el-table-column label="消费行为" min-width="60px">
        <template slot-scope="scope">
          <span>{{ scope.row.behaviors }}</span>
        </template>
      </el-table-column>
      <el-table-column label="口感喜好" min-width="60px">
        <template slot-scope="scope">
          <span>{{ scope.row.likes }}</span>
        </template>
      </el-table-column>
      <el-table-column label="消费需求" min-width="60px">
        <template slot-scope="scope">
          <span>{{ scope.row.demands }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属客服" min-width="80px">
        <template slot-scope="scope">
          <span>{{ scope.row.customerServiceNickname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" min-width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.remark }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="更新日期"
        width="140px"
        align="center"
        prop="updateTime"
        sortable="custom"
        :class-name="getSortClass('updateTime')"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.updateTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="200" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button size="mini" type="danger" @click="deleteData(row.id)">
            删除
          </el-button>
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
        <el-row>
          <el-col :span="8">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="temp.name" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="电话" prop="tel">
              <el-input v-model="temp.tel" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="年龄" prop="age">
              <el-input v-model="temp.age" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="性别" prop="gender">
              <dictionary-select v-model="temp.gender" type-id="122" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="微信添加" prop="vxAdd">
              <dictionary-select v-model="temp.vxAdd" type-id="123" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="微信号" prop="vx">
              <el-input v-model="temp.vx" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="来源" prop="origin">
              <dictionary-select v-model="temp.origin" type-id="124" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="标记" prop="mark">
              <dictionary-select v-model="temp.mark" type-id="123" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="消费能力" prop="power">
              <dictionary-select v-model="temp.power" type-id="125" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="消费行为" prop="power">
              <multiple-select v-model="temp.behavior" type-id="126" zero-label="消费行为" />
            </el-form-item>
          </el-col>
          <el-col :span="8">

            <el-form-item label="口感喜好" prop="power">
              <multiple-select v-model="temp.like" type-id="127" zero-label="口感喜好" />
            </el-form-item>
          </el-col>
          <el-col :span="8">

            <el-form-item label="消费需求" prop="power">
              <multiple-select v-model="temp.demand" type-id="128" zero-label="消费行为" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="地址">
          <el-input
            v-model="temp.address"
            :autosize="{ minRows: 2, maxRows: 12}"
            type="textarea"
            show-word-limit
            placeholder="请输入"
            maxlength="128"
          />
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            v-model="temp.remark"
            :autosize="{ minRows: 2, maxRows: 12}"
            type="textarea"
            show-word-limit
            placeholder="请输入"
            maxlength="200"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, deleteOne, createOne, updateOne, deleteList } from '@/api/customer'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import lodash from 'lodash'
import DictionarySelect from '@/components/my/DictionarySelect'
import MultipleSelect from '@/components/my/MultipleSelect'

export default {
  name: 'CustomerList',
  components: { DictionarySelect, Pagination, MultipleSelect },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      multipleSelection: [],
      listQuery: {
        limit: {
          page: 1,
          limit: 20,
          sort: '+updateTime'
        },
        name: undefined,
        tel: undefined,
        gender: '0',
        vxAdd: '0',
        origin: '0',
        mark: '0',
        power: '0',
        behaviorId: '0',
        likeId: '0',
        demandId: '0',
        startTime: '',
        endTime: ''
      },
      temp: {
        id: '',
        name: '',
        tel: '',
        gender: '',
        age: '',
        vxAdd: '',
        vx: '',
        origin: '',
        mark: '',
        power: '',
        behavior: [],
        like: [],
        demand: [],
        customerService: 0,
        address: '',
        remark: ''
      },
      initTemp: {},
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '添加'
      },
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        name: [{ required: true, message: '姓名必填', trigger: 'blur' }]
      },
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
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
    this.getList()
    this.initTemp = lodash.cloneDeep(this.temp)
  },
  methods: {

    // 添加一条数据
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          createOne(this.temp).then(() => {
            this.handleFilter()
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '添加成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    // 根据id删除
    deleteData(id) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteOne(id).then(response => {
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
          this.getList()
        })
      }).catch(() => {
        this.$notify({
          title: '取消',
          message: '取消删除',
          type: 'success',
          duration: 2000
        })
      })
    },
    // 批量删除
    deleteDatas() {
      if (this.multipleSelection.length < 1) {
        return
      }
      this.$confirm('此操作将永久删除这' + this.multipleSelection.length + '条记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const ids = this.multipleSelection.map(item => item.id)
        deleteList(ids).then(response => {
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
          this.getList()
        })
      }).catch(() => {
        this.$notify({
          title: '取消',
          message: '取消删除',
          type: 'success',
          duration: 2000
        })
      })
    },
    // 处理表单更新前数据
    handleUpdate(row) {
      // this.temp = Object.assign({}, this.temp, row)
      this.resetTemp()
      this.temp = lodash.assign(this.temp, lodash.pick(row, lodash.keys(this.temp)))
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    // 根据表单更新数据
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          updateOne(tempData).then(() => {
            this.handleFilter()
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '修改成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    // 获取列表
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = Number(response.data.total)
        this.listLoading = false
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
            const tHeader = ['id', '姓名', '电话', '性别', '微信添加', '微信号', '来源', '标记', '消费能力', '消费行为', '口感喜好', '消费需求', '备注', '更新日期']
            const filterVal = ['id', 'name', 'tel', 'genderTitle', 'vxAddTitle', 'vx', 'originTitle', 'markTitle', 'powerTitle', 'behaviors', 'likes', 'demands', 'remark', 'updateTime']
            const data = this.formatJson(filterVal, this.list)
            excel.export_json_to_excel({
              header: tHeader,
              data,
              filename: 'customerList'
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
