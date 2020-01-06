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
      <el-table-column label="考生号" width="120px">
        <template slot-scope="scope">
          <span>{{ scope.row.userId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="80px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.nickname }}</span>
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
          <el-button ref="btnEdit" :style="{ display: visibleEdit }" type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button ref="btnSee" :style="{ display: visibleSee }" type="primary" size="mini" @click="handleUpdate(row)">
            查看
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
          <el-col :span="8">
            <el-form-item label="第一志愿：  学校" prop="name">
              <el-select v-model="temp.schoolIds[0]" filterable placeholder="请选择" @change="scChange1">
                <el-option
                  v-for="item in schoolOptions"
                  :key="item.id"
                  :label="item.nickname"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="专业" prop="name">
              <el-select
                v-model="temp.speciality1"
                :remote-method="remoteMethod1"
                filterable
                remote
                reserve-keyword
                placeholder="请输入专业代码"
                :loading="specialityLoading"
                @focus="clearSelect"
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
          <el-col :span="8">
            <el-form-item label="" prop="name">
              <el-checkbox v-model="temp.tiaoji1">服从调剂</el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="第二志愿：  学校" prop="name">
              <el-select v-model="temp.schoolIds[1]" filterable placeholder="请选择" @change="scChange2">
                <el-option
                  v-for="item in schoolOptions"
                  :key="item.id"
                  :label="item.nickname"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="专业" prop="name">
              <el-select
                v-model="temp.speciality2"
                :remote-method="remoteMethod2"
                filterable
                remote
                reserve-keyword
                placeholder="请输入专业代码"
                :loading="specialityLoading"
                @focus="clearSelect"
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
          <el-col :span="8">
            <el-form-item label="" prop="name">
              <el-checkbox v-model="temp.tiaoji2">服从调剂</el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="第三志愿：  学校" prop="name">
              <el-select v-model="temp.schoolIds[2]" filterable placeholder="请选择" @change="scChange3">
                <el-option
                  v-for="item in schoolOptions"
                  :key="item.id"
                  :label="item.nickname"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="专业" prop="name">
              <el-select
                v-model="temp.speciality3"
                :remote-method="remoteMethod3"
                filterable
                remote
                reserve-keyword
                placeholder="请输入专业代码"
                :loading="specialityLoading"
                @focus="clearSelect"
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
          <el-col :span="8">
            <el-form-item label="" prop="name">
              <el-checkbox v-model="temp.tiaoji3">服从调剂</el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="第四志愿：  学校" prop="name">
              <el-select v-model="temp.schoolIds[3]" filterable placeholder="请选择" @change="scChange4">
                <el-option
                  v-for="item in schoolOptions"
                  :key="item.id"
                  :label="item.nickname"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="专业" prop="name">
              <el-select
                v-model="temp.speciality4"
                :remote-method="remoteMethod4"
                filterable
                remote
                reserve-keyword
                placeholder="请输入专业代码"
                :loading="specialityLoading"
                @focus="clearSelect"
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
          <el-col :span="8">
            <el-form-item label="" prop="name">
              <el-checkbox v-model="temp.tiaoji4">服从调剂</el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="第五志愿：  学校" prop="name">
              <el-select v-model="temp.schoolIds[4]" filterable placeholder="请选择" @change="scChange5">
                <el-option
                  v-for="item in schoolOptions"
                  :key="item.id"
                  :label="item.nickname"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="专业" prop="name">
              <el-select
                v-model="temp.speciality5"
                :remote-method="remoteMethod5"
                filterable
                remote
                reserve-keyword
                placeholder="请输入专业代码"
                :loading="specialityLoading"
                @focus="clearSelect"
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
          <el-col :span="8">
            <el-form-item label="" prop="name">
              <el-checkbox v-model="temp.tiaoji5">服从调剂</el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="第六志愿：  学校" prop="name">
              <el-select v-model="temp.schoolIds[5]" filterable placeholder="请选择" @change="scChange6">
                <el-option
                  v-for="item in schoolOptions"
                  :key="item.id"
                  :label="item.nickname"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="专业" prop="name">
              <el-select
                v-model="temp.speciality6"
                :remote-method="remoteMethod6"
                filterable
                remote
                reserve-keyword
                placeholder="请输入专业代码"
                :loading="specialityLoading"
                @focus="clearSelect"
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
          <el-col :span="8">
            <el-form-item label="" prop="name">
              <el-checkbox v-model="temp.tiaoji6">服从调剂</el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="第七志愿：  学校" prop="name">
              <el-select v-model="temp.schoolIds[6]" filterable placeholder="请选择" @change="scChange7">
                <el-option
                  v-for="item in schoolOptions"
                  :key="item.id"
                  :label="item.nickname"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="专业" prop="name">
              <el-select
                v-model="temp.speciality7"
                :remote-method="remoteMethod7"
                filterable
                remote
                reserve-keyword
                placeholder="请输入专业代码"
                :loading="specialityLoading"
                @focus="clearSelect"
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
          <el-col :span="8">
            <el-form-item label="" prop="name">
              <el-checkbox v-model="temp.tiaoji7">服从调剂</el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="第八志愿：  学校" prop="name">
              <el-select v-model="temp.schoolIds[7]" filterable placeholder="请选择" @change="scChange8">
                <el-option
                  v-for="item in schoolOptions"
                  :key="item.id"
                  :label="item.nickname"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="专业" prop="name">
              <el-select
                v-model="temp.speciality8"
                :remote-method="remoteMethod8"
                filterable
                remote
                reserve-keyword
                placeholder="请输入专业代码"
                :loading="specialityLoading"
                @focus="clearSelect"
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
          <el-col :span="8">
            <el-form-item label="" prop="name">
              <el-checkbox v-model="temp.tiaoji8">服从调剂</el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="第九志愿：  学校" prop="name">
              <el-select v-model="temp.schoolIds[8]" filterable placeholder="请选择" @change="scChange9">
                <el-option
                  v-for="item in schoolOptions"
                  :key="item.id"
                  :label="item.nickname"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="专业" prop="name">
              <el-select
                v-model="temp.speciality9"
                :remote-method="remoteMethod9"
                filterable
                remote
                reserve-keyword
                placeholder="请输入专业代码"
                :loading="specialityLoading"
                @focus="clearSelect"
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
          <el-col :span="8">
            <el-form-item label="" prop="name">
              <el-checkbox v-model="temp.tiaoji9">服从调剂</el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="第十志愿：  学校" prop="name">
              <el-select v-model="temp.schoolIds[9]" filterable placeholder="请选择" @change="scChange10">
                <el-option
                  v-for="item in schoolOptions"
                  :key="item.id"
                  :label="item.nickname"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="专业" prop="name">
              <el-select
                v-model="temp.speciality10"
                :remote-method="remoteMethod10"
                filterable
                remote
                reserve-keyword
                placeholder="请输入专业代码"
                :loading="specialityLoading"
                @focus="clearSelect"
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
          <el-col :span="8">
            <el-form-item label="" prop="name">
              <el-checkbox v-model="temp.tiaoji10">服从调剂</el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="第11志愿：  学校" prop="name">
              <el-select v-model="temp.schoolIds[10]" filterable placeholder="请选择" @change="scChange11">
                <el-option
                  v-for="item in schoolOptions"
                  :key="item.id"
                  :label="item.nickname"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="专业" prop="name">
              <el-select
                v-model="temp.speciality11"
                :remote-method="remoteMethod11"
                filterable
                remote
                reserve-keyword
                placeholder="请输入专业代码"
                :loading="specialityLoading"
                @focus="clearSelect"
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
          <el-col :span="8">
            <el-form-item label="" prop="name">
              <el-checkbox v-model="temp.tiaoji11">服从调剂</el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="第12志愿：  学校" prop="name">
              <el-select v-model="temp.schoolIds[11]" filterable placeholder="请选择" @change="scChange12">
                <el-option
                  v-for="item in schoolOptions"
                  :key="item.id"
                  :label="item.nickname"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="专业" prop="name">
              <el-select
                v-model="temp.speciality12"
                :remote-method="remoteMethod12"
                filterable
                remote
                reserve-keyword
                placeholder="请输入专业代码"
                :loading="specialityLoading"
                @focus="clearSelect"
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
          <el-col :span="8">
            <el-form-item label="" prop="name">
              <el-checkbox v-model="temp.tiaoji12">服从调剂</el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="第13志愿：  学校" prop="name">
              <el-select v-model="temp.schoolIds[12]" filterable placeholder="请选择" @change="scChange13">
                <el-option
                  v-for="item in schoolOptions"
                  :key="item.id"
                  :label="item.nickname"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="专业" prop="name">
              <el-select
                v-model="temp.speciality13"
                :remote-method="remoteMethod13"
                filterable
                remote
                reserve-keyword
                placeholder="请输入专业代码"
                :loading="specialityLoading"
                @focus="clearSelect"
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
          <el-col :span="8">
            <el-form-item label="" prop="name">
              <el-checkbox v-model="temp.tiaoji13">服从调剂</el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="第14志愿：  学校" prop="name">
              <el-select v-model="temp.schoolIds[13]" filterable placeholder="请选择" @change="scChange14">
                <el-option
                  v-for="item in schoolOptions"
                  :key="item.id"
                  :label="item.nickname"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="专业" prop="name">
              <el-select
                v-model="temp.speciality14"
                :remote-method="remoteMethod14"
                filterable
                remote
                reserve-keyword
                placeholder="请输入专业代码"
                :loading="specialityLoading"
                @focus="clearSelect"
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
          <el-col :span="8">
            <el-form-item label="" prop="name">
              <el-checkbox v-model="temp.tiaoji14">服从调剂</el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="第15志愿：  学校" prop="name">
              <el-select v-model="temp.schoolIds[14]" filterable placeholder="请选择" @change="scChange15">
                <el-option
                  v-for="item in schoolOptions"
                  :key="item.id"
                  :label="item.nickname"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="专业" prop="name">
              <el-select
                v-model="temp.speciality15"
                :remote-method="remoteMethod15"
                filterable
                remote
                reserve-keyword
                placeholder="请输入专业代码"
                :loading="specialityLoading"
                @focus="clearSelect"
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
          <el-col :span="8">
            <el-form-item label="" prop="name">
              <el-checkbox v-model="temp.tiaoji15">服从调剂</el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="第16志愿：  学校" prop="name">
              <el-select v-model="temp.schoolIds[15]" filterable placeholder="请选择" @change="scChange16">
                <el-option
                  v-for="item in schoolOptions"
                  :key="item.id"
                  :label="item.nickname"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="专业" prop="name">
              <el-select
                v-model="temp.speciality16"
                :remote-method="remoteMethod16"
                filterable
                remote
                reserve-keyword
                placeholder="请输入专业代码"
                :loading="specialityLoading"
                @focus="clearSelect"
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
          <el-col :span="8">
            <el-form-item label="" prop="name">
              <el-checkbox v-model="temp.tiaoji16">服从调剂</el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="第17志愿：  学校" prop="name">
              <el-select v-model="temp.schoolIds[16]" filterable placeholder="请选择" @change="scChange17">
                <el-option
                  v-for="item in schoolOptions"
                  :key="item.id"
                  :label="item.nickname"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="专业" prop="name">
              <el-select
                v-model="temp.speciality17"
                :remote-method="remoteMethod17"
                filterable
                remote
                reserve-keyword
                placeholder="请输入专业代码"
                :loading="specialityLoading"
                @focus="clearSelect"
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
          <el-col :span="8">
            <el-form-item label="" prop="name">
              <el-checkbox v-model="temp.tiaoji17">服从调剂</el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="第18志愿：  学校" prop="name">
              <el-select v-model="temp.schoolIds[17]" filterable placeholder="请选择" @change="scChange18">
                <el-option
                  v-for="item in schoolOptions"
                  :key="item.id"
                  :label="item.nickname"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="专业" prop="name">
              <el-select
                v-model="temp.speciality18"
                :remote-method="remoteMethod18"
                filterable
                remote
                reserve-keyword
                placeholder="请输入专业代码"
                :loading="specialityLoading"
                @focus="clearSelect"
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
          <el-col :span="8">
            <el-form-item label="" prop="name">
              <el-checkbox v-model="temp.tiaoji18">服从调剂</el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="第19志愿：  学校" prop="name">
              <el-select v-model="temp.schoolIds[18]" filterable placeholder="请选择" @change="scChange19">
                <el-option
                  v-for="item in schoolOptions"
                  :key="item.id"
                  :label="item.nickname"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="专业" prop="name">
              <el-select
                v-model="temp.speciality19"
                :remote-method="remoteMethod19"
                filterable
                remote
                reserve-keyword
                placeholder="请输入专业代码"
                :loading="specialityLoading"
                @focus="clearSelect"
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
          <el-col :span="8">
            <el-form-item label="" prop="name">
              <el-checkbox v-model="temp.tiaoji19">服从调剂</el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="第20志愿：  学校" prop="name">
              <el-select v-model="temp.schoolIds[19]" filterable placeholder="请选择" @change="scChange20">
                <el-option
                  v-for="item in schoolOptions"
                  :key="item.id"
                  :label="item.nickname"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="专业" prop="name">
              <el-select
                v-model="temp.speciality20"
                :remote-method="remoteMethod20"
                filterable
                remote
                reserve-keyword
                placeholder="请输入专业代码"
                :loading="specialityLoading"
                @focus="clearSelect"
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
          <el-col :span="8">
            <el-form-item label="" prop="name">
              <el-checkbox v-model="temp.tiaoji20">服从调剂</el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          关闭
        </el-button>
        <el-button :style="{ display: visibleSave }" type="primary" @click="dialogStatus==='create'?createData():updateData()">
          保存
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, updateOne, submit, info } from '@/api/voluntary'
import { fetchOne } from '@/api/speciality'
import { getSchools } from '@/api/user'
import waves from '@/directive/waves' // waves directive
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
      schoolOptions: [],
      specialityLoading: false,
      visibleSee: 'none',
      visibleEdit: 'block',
      visibleSave: 'inline',
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
      school1: undefined,
      temp: {
        schoolIds: [],
        id: '',
        tiaoji1: false,
        tiaoji2: false,
        tiaoji3: false,
        tiaoji4: false,
        tiaoji5: false,
        tiaoji6: false,
        tiaoji7: false,
        tiaoji8: false,
        tiaoji9: false,
        tiaoji10: false,
        tiaoji11: false,
        tiaoji12: false,
        tiaoji13: false,
        tiaoji14: false,
        tiaoji15: false,
        tiaoji16: false,
        tiaoji17: false,
        tiaoji18: false,
        tiaoji19: false,
        tiaoji20: false,
        speciality1: '',
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
        create: '查看志愿'
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
      this.$confirm('志愿提交以后将无法进行修改, 请确认是否提交?', '提示', {
        confirmButtonText: '提交',
        cancelButtonText: '放弃',
        type: 'warning'
      }).then(() => {
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
      }).catch(() => {
        this.$notify({
          title: '取消',
          message: '取消提交',
          type: 'success',
          duration: 2000
        })
      })
    },
    clearSelect() {
      this.specialityOptions = []
    },
    scChange1() {
      this.specialityOptions = []
      this.temp.speciality1 = undefined
    },
    remoteMethod1(query) {
      if (query !== '') {
        this.specialityLoading = true
        fetchOne(query, this.temp.schoolIds[0]).then(response => {
          this.specialityLoading = false
          this.specialityOptions = response.data
        })
      } else {
        this.specialityOptions = []
      }
    },
    scChange2() {
      this.specialityOptions = []
      this.temp.speciality2 = undefined
    },
    remoteMethod2(query) {
      if (query !== '') {
        this.specialityLoading = true
        fetchOne(query, this.temp.schoolIds[1]).then(response => {
          this.specialityLoading = false
          this.specialityOptions = response.data
        })
      } else {
        this.specialityOptions = []
      }
    },
    scChange3() {
      this.specialityOptions = []
      this.temp.speciality3 = undefined
    },
    remoteMethod3(query) {
      if (query !== '') {
        this.specialityLoading = true
        fetchOne(query, this.temp.schoolIds[2]).then(response => {
          this.specialityLoading = false
          this.specialityOptions = response.data
        })
      } else {
        this.specialityOptions = []
      }
    },
    scChange4() {
      this.specialityOptions = []
      this.temp.speciality4 = undefined
    },
    remoteMethod4(query) {
      if (query !== '') {
        this.specialityLoading = true
        fetchOne(query, this.temp.schoolIds[3]).then(response => {
          this.specialityLoading = false
          this.specialityOptions = response.data
        })
      } else {
        this.specialityOptions = []
      }
    },
    scChange5() {
      this.specialityOptions = []
      this.temp.speciality5 = undefined
    },
    remoteMethod5(query) {
      if (query !== '') {
        this.specialityLoading = true
        fetchOne(query, this.temp.schoolIds[6]).then(response => {
          this.specialityLoading = false
          this.specialityOptions = response.data
        })
      } else {
        this.specialityOptions = []
      }
    },
    scChange6() {
      this.specialityOptions = []
      this.temp.speciality6 = undefined
    },
    remoteMethod6(query) {
      if (query !== '') {
        this.specialityLoading = true
        fetchOne(query, this.temp.schoolIds[5]).then(response => {
          this.specialityLoading = false
          this.specialityOptions = response.data
        })
      } else {
        this.specialityOptions = []
      }
    },
    scChange7() {
      this.specialityOptions = []
      this.temp.speciality7 = undefined
    },
    remoteMethod7(query) {
      if (query !== '') {
        this.specialityLoading = true
        fetchOne(query, this.temp.schoolIds[6]).then(response => {
          this.specialityLoading = false
          this.specialityOptions = response.data
        })
      } else {
        this.specialityOptions = []
      }
    },
    scChange8() {
      this.specialityOptions = []
      this.temp.speciality8 = undefined
    },
    remoteMethod8(query) {
      if (query !== '') {
        this.specialityLoading = true
        fetchOne(query, this.temp.schoolIds[7]).then(response => {
          this.specialityLoading = false
          this.specialityOptions = response.data
        })
      } else {
        this.specialityOptions = []
      }
    },
    scChange9() {
      this.specialityOptions = []
      this.temp.speciality9 = undefined
    },
    remoteMethod9(query) {
      if (query !== '') {
        this.specialityLoading = true
        fetchOne(query, this.temp.schoolIds[8]).then(response => {
          this.specialityLoading = false
          this.specialityOptions = response.data
        })
      } else {
        this.specialityOptions = []
      }
    },
    scChange10() {
      this.specialityOptions = []
      this.temp.speciality10 = undefined
    },
    remoteMethod10(query) {
      if (query !== '') {
        this.specialityLoading = true
        fetchOne(query, this.temp.schoolIds[9]).then(response => {
          this.specialityLoading = false
          this.specialityOptions = response.data
        })
      } else {
        this.specialityOptions = []
      }
    },
    scChange11() {
      this.specialityOptions = []
      this.temp.speciality11 = undefined
    },
    remoteMethod11(query) {
      if (query !== '') {
        this.specialityLoading = true
        fetchOne(query, this.temp.schoolIds[10]).then(response => {
          this.specialityLoading = false
          this.specialityOptions = response.data
        })
      } else {
        this.specialityOptions = []
      }
    },
    scChange12() {
      this.specialityOptions = []
      this.temp.speciality12 = undefined
    },
    remoteMethod12(query) {
      if (query !== '') {
        this.specialityLoading = true
        fetchOne(query, this.temp.schoolIds[11]).then(response => {
          this.specialityLoading = false
          this.specialityOptions = response.data
        })
      } else {
        this.specialityOptions = []
      }
    },
    scChange13() {
      this.specialityOptions = []
      this.temp.speciality13 = undefined
    },
    remoteMethod13(query) {
      if (query !== '') {
        this.specialityLoading = true
        fetchOne(query, this.temp.schoolIds[12]).then(response => {
          this.specialityLoading = false
          this.specialityOptions = response.data
        })
      } else {
        this.specialityOptions = []
      }
    },
    scChange14() {
      this.specialityOptions = []
      this.temp.speciality14 = undefined
    },
    remoteMethod14(query) {
      if (query !== '') {
        this.specialityLoading = true
        fetchOne(query, this.temp.schoolIds[13]).then(response => {
          this.specialityLoading = false
          this.specialityOptions = response.data
        })
      } else {
        this.specialityOptions = []
      }
    },
    scChange15() {
      this.specialityOptions = []
      this.temp.speciality15 = undefined
    },
    remoteMethod15(query) {
      if (query !== '') {
        this.specialityLoading = true
        fetchOne(query, this.temp.schoolIds[14]).then(response => {
          this.specialityLoading = false
          this.specialityOptions = response.data
        })
      } else {
        this.specialityOptions = []
      }
    },
    scChange16() {
      this.specialityOptions = []
      this.temp.speciality16 = undefined
    },
    remoteMethod16(query) {
      if (query !== '') {
        this.specialityLoading = true
        fetchOne(query, this.temp.schoolIds[15]).then(response => {
          this.specialityLoading = false
          this.specialityOptions = response.data
        })
      } else {
        this.specialityOptions = []
      }
    },
    scChange17() {
      this.specialityOptions = []
      this.temp.speciality17 = undefined
    },
    remoteMethod17(query) {
      if (query !== '') {
        this.specialityLoading = true
        fetchOne(query, this.temp.schoolIds[16]).then(response => {
          this.specialityLoading = false
          this.specialityOptions = response.data
        })
      } else {
        this.specialityOptions = []
      }
    },
    scChange18() {
      this.specialityOptions = []
      this.temp.speciality18 = undefined
    },
    remoteMethod18(query) {
      if (query !== '') {
        this.specialityLoading = true
        fetchOne(query, this.temp.schoolIds[17]).then(response => {
          this.specialityLoading = false
          this.specialityOptions = response.data
        })
      } else {
        this.specialityOptions = []
      }
    },
    scChange19() {
      this.specialityOptions = []
      this.temp.speciality19 = undefined
    },
    remoteMethod19(query) {
      if (query !== '') {
        this.specialityLoading = true
        fetchOne(query, this.temp.schoolIds[18]).then(response => {
          this.specialityLoading = false
          this.specialityOptions = response.data
        })
      } else {
        this.specialityOptions = []
      }
    },
    scChange20() {
      this.specialityOptions = []
      this.temp.speciality20 = undefined
    },
    remoteMethod20(query) {
      if (query !== '') {
        this.specialityLoading = true
        fetchOne(query, this.temp.schoolIds[19]).then(response => {
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
      // this.temp = lodash.assign(this.temp, lodash.pick(row, lodash.keys(this.temp)));
      info(row.userId).then(response => {
        this.temp = response.data
      })
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleSee(row) {
      // this.temp = Object.assign({}, this.temp, row)
      this.resetTemp()
      this.temp = lodash.assign(this.temp, lodash.pick(row, lodash.keys(this.temp)))
      this.dialogStatus = 'create'
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
        if (response.data.items[0].status === '未填报' || response.data.items[0].status === '已填报') {
          this.visibleEdit = 'inline'
          this.visibleSee = 'none'
          this.visibleSave = 'inline'
        } else {
          this.visibleEdit = 'none'
          this.visibleSee = 'inline'
          this.visibleSave = 'none'
        }
      })
      fetchOne(0, 0).then(response => {
        this.specialityOptions = response.data
      })
      getSchools().then(response => {
        this.schoolOptions = response.data
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
    }
  }
}
</script>
