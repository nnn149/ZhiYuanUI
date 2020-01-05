<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        刷新
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
      <el-table-column label="考生号" min-width="110px">
        <template slot-scope="scope">
          <span>{{ scope.row.userId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="80px" align="center">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.nickname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="填报状态" min-width="60px">
        <template slot-scope="scope">
          <span>{{ scope.row.status }}</span>
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
          <el-button type="primary" size="mini" @click="handleSubmit()">
            提交
          </el-button>
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
          <el-col :span="6">
            <el-form-item label="志愿1" prop="name">
              <el-select
                v-model="temp.speciality1"
                filterable
                remote
                reserve-keyword
                placeholder="请输入专业代码"
                :remote-method="remoteMethod"
                :loading="specialityLoading"
              >
                <el-option
                  v-for="item in specialityOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="志愿2" prop="tel">
              <el-select
                v-model="temp.speciality2"
                filterable
                remote
                reserve-keyword
                placeholder="请输入专业代码"
                :remote-method="remoteMethod"
                :loading="specialityLoading"
              >
                <el-option
                  v-for="item in specialityOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="志愿3" prop="age">
              <el-select
                v-model="temp.speciality3"
                filterable
                remote
                reserve-keyword
                placeholder="请输入专业代码"
                :remote-method="remoteMethod"
                :loading="specialityLoading"
              >
                <el-option
                  v-for="item in specialityOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="志愿4" prop="age">
              <el-select
                v-model="temp.speciality4"
                filterable
                remote
                reserve-keyword
                placeholder="请输入专业代码"
                :remote-method="remoteMethod"
                :loading="specialityLoading"
              >
                <el-option
                  v-for="item in specialityOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="6">
            <el-form-item label="志愿5" prop="name">
              <el-select
                v-model="temp.speciality5"
                filterable
                remote
                reserve-keyword
                placeholder="请输入专业代码"
                :remote-method="remoteMethod"
                :loading="specialityLoading"
              >
                <el-option
                  v-for="item in specialityOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="志愿6" prop="tel">
              <el-select
                v-model="temp.speciality6"
                filterable
                remote
                reserve-keyword
                placeholder="请输入专业代码"
                :remote-method="remoteMethod"
                :loading="specialityLoading"
              >
                <el-option
                  v-for="item in specialityOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="志愿7" prop="age">
              <el-select
                v-model="temp.speciality7"
                filterable
                remote
                reserve-keyword
                placeholder="请输入专业代码"
                :remote-method="remoteMethod"
                :loading="specialityLoading"
              >
                <el-option
                  v-for="item in specialityOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="志愿8" prop="age">
              <el-select
                v-model="temp.speciality8"
                filterable
                remote
                reserve-keyword
                placeholder="请输入专业代码"
                :remote-method="remoteMethod"
                :loading="specialityLoading"
              >
                <el-option
                  v-for="item in specialityOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="6">
            <el-form-item label="志愿9" prop="name">
              <el-select
                v-model="temp.speciality9"
                filterable
                remote
                reserve-keyword
                placeholder="请输入专业代码"
                :remote-method="remoteMethod"
                :loading="specialityLoading"
              >
                <el-option
                  v-for="item in specialityOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="志愿10" prop="tel">
              <el-select
                v-model="temp.speciality10"
                filterable
                remote
                reserve-keyword
                placeholder="请输入专业代码"
                :remote-method="remoteMethod"
                :loading="specialityLoading"
              >
                <el-option
                  v-for="item in specialityOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="志愿11" prop="age">
              <el-select
                v-model="temp.speciality11"
                filterable
                remote
                reserve-keyword
                placeholder="请输入专业代码"
                :remote-method="remoteMethod"
                :loading="specialityLoading"
              >
                <el-option
                  v-for="item in specialityOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="志愿12" prop="age">
              <el-select
                v-model="temp.speciality12"
                filterable
                remote
                reserve-keyword
                placeholder="请输入专业代码"
                :remote-method="remoteMethod"
                :loading="specialityLoading"
              >
                <el-option
                  v-for="item in specialityOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="6">
            <el-form-item label="志愿13" prop="name">
              <el-select
                v-model="temp.speciality13"
                filterable
                remote
                reserve-keyword
                placeholder="请输入专业代码"
                :remote-method="remoteMethod"
                :loading="specialityLoading"
              >
                <el-option
                  v-for="item in specialityOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="志愿14" prop="tel">
              <el-select
                v-model="temp.speciality14"
                filterable
                remote
                reserve-keyword
                placeholder="请输入专业代码"
                :remote-method="remoteMethod"
                :loading="specialityLoading"
              >
                <el-option
                  v-for="item in specialityOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="志愿15" prop="age">
              <el-select
                v-model="temp.speciality15"
                filterable
                remote
                reserve-keyword
                placeholder="请输入专业代码"
                :remote-method="remoteMethod"
                :loading="specialityLoading"
              >
                <el-option
                  v-for="item in specialityOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="志愿16" prop="age">
              <el-select
                v-model="temp.speciality16"
                filterable
                remote
                reserve-keyword
                placeholder="请输入专业代码"
                :remote-method="remoteMethod"
                :loading="specialityLoading"
              >
                <el-option
                  v-for="item in specialityOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <el-row>
            <el-col :span="6">
              <el-form-item label="志愿17" prop="name">
                <el-select
                  v-model="temp.speciality17"
                  filterable
                  remote
                  reserve-keyword
                  placeholder="请输入专业代码"
                  :remote-method="remoteMethod"
                  :loading="specialityLoading"
                >
                  <el-option
                    v-for="item in specialityOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="志愿18" prop="tel">
                <el-select
                  v-model="temp.speciality18"
                  filterable
                  remote
                  reserve-keyword
                  placeholder="请输入专业代码"
                  :remote-method="remoteMethod"
                  :loading="specialityLoading"
                >
                  <el-option
                    v-for="item in specialityOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="志愿19" prop="age">
                <el-select
                  v-model="temp.speciality19"
                  filterable
                  remote
                  reserve-keyword
                  placeholder="请输入专业代码"
                  :remote-method="remoteMethod"
                  :loading="specialityLoading"
                >
                  <el-option
                    v-for="item in specialityOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="志愿20" prop="age">
                <el-select
                  v-model="temp.speciality20"
                  filterable
                  remote
                  reserve-keyword
                  placeholder="请输入专业代码"
                  :remote-method="remoteMethod"
                  :loading="specialityLoading"
                >
                  <el-option
                    v-for="item in specialityOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          保存
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, updateOne, submit } from '@/api/voluntary'
import { fetchOne } from '@/api/speciality'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import lodash from 'lodash'

export default {
  name: 'VoluntaryList',
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
      specialityOptions: [],
      specialityLoading: false,
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
        speciality1: '4',
        speciality2: '',
        speciality3: '',
        speciality4: '',
        speciality5: '',
        speciality6: '',
        speciality7: '',
        speciality8: '',
        speciality9: '',
        speciality10: '',
        speciality11: '',
        speciality12: '',
        speciality13: '',
        speciality14: '',
        speciality15: '',
        speciality16: '',
        speciality17: '',
        speciality18: '',
        speciality19: '',
        speciality20: ''
      },
      initTemp: {},
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑志愿',
        create: '添加'
      },
      rules: {
        speciality1: [{ required: true, message: '志愿1必填', trigger: 'blur' }]
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
    handleSubmit() {
      submit().then(response => {
        this.$notify({
          title: '成功',
          message: '提交成功',
          type: 'success',
          duration: 2000
        })
        this.getList()
      }).catch(() => {
        this.$notify({
          title: '失败',
          message: '提交失败',
          type: 'success',
          duration: 2000
        })
      })
    },
    remoteMethod(query) {
      if (query !== '') {
        this.specialityLoading = true
        fetchOne(query).then(response => {
          this.specialityLoading = false
          this.specialityOptions = response.data
        })
      } else {
        this.specialityOptions = []
      }
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
            filename: 'voluntaryList'
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
