<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="listQuery.voluntary" class="filter-item" filterable placeholder="选择志愿">
        <el-option label="第1志愿" value="1">
          第1志愿
        </el-option>
        <el-option label="第2志愿" value="2">
          第2志愿
        </el-option>
        <el-option label="第3志愿" value="3">
          第3志愿
        </el-option>
        <el-option label="第4志愿" value="4">
          第4志愿
        </el-option>
        <el-option label="第5志愿" value="5">
          第5志愿
        </el-option>
        <el-option label="第6志愿" value="6">
          第6志愿
        </el-option>
        <el-option label="第7志愿" value="7">
          第7志愿
        </el-option>
        <el-option label="第8志愿" value="8">
          第8志愿
        </el-option>
        <el-option label="第9志愿" value="9">
          第9志愿
        </el-option>
        <el-option label="第10志愿" value="10">
          第10志愿
        </el-option>
        <el-option label="第11志愿" value="11">
          第11志愿
        </el-option>
        <el-option label="第12志愿" value="12">
          第12志愿
        </el-option>
        <el-option label="第13志愿" value="13">
          第13志愿
        </el-option>
        <el-option label="第14志愿" value="14">
          第14志愿
        </el-option>
        <el-option label="第15志愿" value="15">
          第15志愿
        </el-option>
        <el-option label="第16志愿" value="16">
          第16志愿
        </el-option>
        <el-option label="第17志愿" value="17">
          第17志愿
        </el-option>
        <el-option label="第18志愿" value="18">
          第18志愿
        </el-option>
        <el-option label="第19志愿" value="19">
          第19志愿
        </el-option>
        <el-option label="第20志愿" value="20">
          第20志愿
        </el-option>
      </el-select>
      <el-select v-model="listQuery.speciality" class="filter-item" filterable placeholder="选择专业">
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
      <el-table-column label="身份证号" min-width="110px">
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
      <el-table-column label="服从调剂" min-width="60px">
        <template slot-scope="scope">
          <span>{{ scope.row.tiaoji | boolFormat }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="250" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            预录取
          </el-button>
          <el-button v-if="row.tiaoji" type="primary" size="mini" @click="handleUpdate(row)">
            调剂
          </el-button>
          <el-button size="mini" type="danger" @click="deleteData(row.id)">
            拒绝
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
import { schoolList } from '@/api/voluntary'
import { infoByUserId } from '@/api/speciality'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import lodash from 'lodash'
import DictionarySelect from '@/components/my/DictionarySelect'
import MultipleSelect from '@/components/my/MultipleSelect'

export default {
  name: 'VoSchoolList',
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
          limit: 20,
          sort: '+updateTime'
        },
        speciality: undefined,
        voluntary: '1'
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
        voSchoolService: 0,
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
      this.temp = lodash.assign(this.temp, lodash.pick(row, lodash.keys(this.temp)))
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    // 获取列表
    getList() {
      this.listLoading = true
      schoolList(this.listQuery).then(response => {
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
