<template>
    <el-container>
        <el-header>
            <p style="font-size:20px; text-align:center;">AI智能停车场</p>
        </el-header>
        <el-row>
            <Menu/>
            <el-col :span="16">
                <el-card>
                    <div slot="header" class="clearfix">
                        <span>添加入场信息</span>
                    </div>
                    <div  class="text item">
                        <el-row>
                            IC卡号：
                            <el-select v-model="selectValue2" placeholder="请选择车主">
                                <el-option
                                        v-for="item in options2"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                            <el-button style="margin-left:10px;" @click="onEntry">确认</el-button>
                        </el-row>
                    </div>
                </el-card>
                <el-card style="margin-top: 20px;">
                    <div slot="header" class="clearfix">
                        <span>出场信息管理</span>
                    </div>
                    <div class="text item">
                        <el-row>
                            查询：
                            <el-select v-model="selectValue" placeholder="请选择查询条件">
                                <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                            <span style="margin-left:10px;">查询值：</span>
                            <el-input v-model="searchValue" autosize style="width: 150px; margin-right: 10px;"/>
                            <el-button @click="onSearch">查询</el-button>
                        </el-row>
                        <el-table
                                :data="tableData"
                                border
                                stripe
                                style="width: 941px; margin-top: 10px;">
                            <el-table-column
                                    fixed
                                    prop="fixedId"
                                    label="记录编号"
                                    width="150">
                            </el-table-column>
                            <el-table-column
                                    fixed
                                    prop="cardId"
                                    label="IC编号"
                                    width="150">
                            </el-table-column>
                            <el-table-column
                                    fixed
                                    prop="userName"
                                    label="车主名称"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    fixed
                                    prop="carNum"
                                    label="车牌号码"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    fixed
                                    prop="entryDateTime"
                                    label="入场日期"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    fixed
                                    label="是否出场"
                                    width="120">
                                <template slot-scope="scope">
                                    未出场
                                </template>
                            </el-table-column>
                            <el-table-column
                                    fixed
                                    label="操作"
                                    width="100">
                                <template slot-scope="scope">
                                    <el-button type="text" size="small" @click="onOut(scope.row)">设置出场</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-pagination
                                @current-change="handleCurrentChange"
                                :current-page.sync="currentPage"
                                :page-size="8"
                                layout="total, prev, pager, next, jumper"
                                :total="recordsNum"
                                style="margin-top: 10px; margin-left:10px;">
                        </el-pagination>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </el-container>
</template>

<script>
    import Menu from '../components/Menu'
export default {
  name: 'Fixed',
  components: {
    Menu
  },
  data() {
    return {
      options: [
        {
          label: '记录编号',
          value: 'fixed_id'
        },
        {
          label: 'IC编号',
          value: 'card_id'
        },
        {
          label: '车主名称',
          value: 'user_name'
        },
        {
          label: '车牌号码',
          value: 'car_num'
        }
      ],
      options2: [],
      recordsNum: 1,
      tableData: [],
      selectValue: '',
      selectValue2: '',
      searchValue: '',
      currentPage: 1
    }
  },
  methods:{
    onEntry() {
      this.$confirm('是否确认进入停车场?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios
          .post('/api/fixed/entry.do',this.$qs.stringify({cardId: this.selectValue2}))
          .then((res) => {
            if(res.data.status === 0) {
              this.$message({
                type: 'success',
                message: '进入停车场成功!'
              });
            } else {
              this.$message({
                type: 'error',
                message: `${res.data.msg}`
              });
            }
          })
          .catch(() => {
            this.$message({
              type: 'error',
              message: '出现未知失败'
            });
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
    onOut(row) {
      this.$confirm('是否确认退出停车场?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios
          .post('/api/fixed/out.do',this.$qs.stringify({fixedId: row.fixedId}))
          .then((res) => {
            if(res.data.status === 0) {
              this.$message({
                type: 'success',
                message: '退出停车场成功!'
              });
            } else {
              this.$message({
                type: 'error',
                message: `${res.data.msg}`
              });
            }
          })
          .catch(() => {
            this.$message({
              type: 'error',
              message: '出现未知失败'
            });
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
    onSearch() {
      const find = {
        type: this.selectValue,
        value: this.searchValue,
        start: 0,
        size: 8,
      };
      console.log(find);
      this.$axios
        .post('/api/fixed/findEntry.do',JSON.stringify(find),{
          headers: {'Content-Type': 'application/json'}
        })
        .then(res => {
          this.tableData = res.data.data
          this.tableData.forEach(i => {i.entryDateTime = i.entryDate + " " + i.entryTime})
          this.currentPage = 1
          console.log(res.data.data);
        })
        .catch(() => this.$message.error('出现未知错误'))
      this.$axios
        .post('/api/fixed/record3.do',JSON.stringify(find), {
          headers: {'Content-Type': 'application/json'}
        })
        .then(res => {
          this.recordsNum = res.data.data
          console.log(res.data.data);
        })
        .catch(() => this.$message.error('出现未知错误'))
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      const find = {
        type: this.selectValue,
        value: this.searchValue,
        start: (val-1)*8,
        size: 8,
      };
      this.$axios
        .post('/api/card/findEntry.do',JSON.stringify(find),{
          headers: {'Content-Type': 'application/json'}
        })
        .then(res => {
          this.tableData = res.data.data
          this.tableData.forEach(i => {i.entryDateTime = i.entryDate + " " + i.entryTime})
          console.log(res.data.data);
        })
        .catch(() => this.$message.error('出现未知错误'))
    }
  },
  created() {
    this.$axios
      .post('/api/card/getInfo2.do')
      .then(res => {
        console.log(res.data.data)
        const jsonData = res.data.data;
        jsonData.forEach(i => {
          const label = i;
          const value = i.split('#')[0];
          this.options2.push({label,value})
        })
      })
      .catch(() => this.$message.error('出现未知错误'));
    this.$axios
      .post('/api/fixed/findEntry.do', JSON.stringify({start: 0, size: 8}),{
        headers: {'Content-Type': 'application/json'}
      })
      .then(res => {
        this.tableData = res.data.data
        this.tableData.forEach(i => {i.entryDateTime = i.entryDate + " " + i.entryTime})
      })
      .catch(() => this.$message.error('出现未知错误'));
    this.$axios
      .post('/api/fixed/record4.do')
      .then(res => {
        this.recordsNum = res.data.data;
      })
      .catch(() => this.$message.error('出现未知错误'))
  },
}
</script>

<style scoped>
    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }
</style>