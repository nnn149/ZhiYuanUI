<template>
  <div class="app-container">
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

      <el-table-column label="姓名" width="180px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.nickname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="考生号" min-width="110px">
        <template slot-scope="scope">
          <span>{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="院校名称" min-width="60px">
        <template slot-scope="scope">
          <span>{{ scope.row.schoolName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="专业名称" min-width="50px">
        <template slot-scope="scope">
          <span>{{ scope.row.specialityName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="说明" min-width="80px">
        <template slot-scope="scope">
          <span>{{ scope.row.remark }}</span>
        </template>
      </el-table-column>

    </el-table>

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
import { chengji } from '@/api/student'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import lodash from 'lodash'
import DictionarySelect from '@/components/my/DictionarySelect'
import MultipleSelect from '@/components/my/MultipleSelect'

export default {
  name: 'ChengjiList',
  components: { DictionarySelect, MultipleSelect },
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
        chengjiService: 0,
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
    jump() {
      this.$router.push({ path: '/voluntary/voluntaryList' })
    },
    // 获取列表
    getList() {
      this.listLoading = true
      chengji().then(response => {
        this.list = response.data
        this.total = 1
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
              filename: 'chengjiList'
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
