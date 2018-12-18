<template>
    <el-container>
        <el-header>
            <p style="font-size:20px; text-align:center;">AI智能停车场</p>
        </el-header>
        <el-row>
            <Menu/>
            <el-col :span="16">
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
                    查询值：
                    <el-input v-model="searchValue" autosize style="width: 150px; margin-right: 10px;"/>
                    <el-button @click="onSearch">查询</el-button>
                </el-row>

                <el-table
                        :data="tableData"
                        border
                        stripe
                        style="width: 1001px; margin-top: 10px;">
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
                            prop="outDateTime"
                            label="出场日期"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            fixed
                            label="操作"
                            width="100">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="onClickDel(scope.row)">删除</el-button>
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
            </el-col>
        </el-row>
    </el-container>
</template>

<script>
  import Menu from '../components/Menu'
  export default {
    name: 'FixedManager',
    data() {
      return{
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
        recordsNum: 1,
        tableData: [],
        selectValue: '',
        searchValue: '',
        currentPage: 1
      }
    },
    methods:{
      onSearch() {
        const find = {
          type: this.selectValue,
          value: this.searchValue,
          start: 0,
          size: 8,
        };
        this.$axios
          .post('/api/fixed/find.do',JSON.stringify(find),{
            headers: {'Content-Type': 'application/json'}
          })
          .then(res => {
            if(res.data.status !== 0) {
              this.$message.info(res.data.msg)
            } else {
              this.tableData = res.data.data
              this.tableData.forEach(i => {
                i.entryDateTime = i.entryDate + " " + i.entryTime;
                if(i.outDate != null && i.outTime != null) {
                  i.outDateTime = i.outDate + " " + i.outTime;
                } else {
                  i.outDateTime = ""
                }
              })
              this.currentPage = 1
              console.log(res.data.data);
            }
          })
          .catch(() => this.$message.error('出现未知错误'))
        this.$axios
          .post('/api/fixed/record.do',JSON.stringify(find), {
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
          .post('/api/fixed/find.do',JSON.stringify(find),{
            headers: {'Content-Type': 'application/json'}
          })
          .then(res => {
            this.tableData = res.data.data
            this.tableData.forEach(i => {
              i.entryDateTime = i.entryDate + " " + i.entryTime;
              if(i.outDate != null && i.outTime != null) {
                i.outDateTime = i.outDate + " " + i.outTime;
              } else {
                i.outDateTime = ""
              }
            })
            console.log(res.data.data);
          })
          .catch(() => this.$message.error('出现未知错误'))
      },
      onClickDel(row){
        this.$confirm('此操作将删除该车位, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios
            .post('/api/fixed/delete.do',this.$qs.stringify({fixedId: row.fixedId}))
            .then((res) => {
              if(res.data.status === 0) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              } else {
                this.$message({
                  type: 'error',
                  message: res.data.msg
                });
              }
            })
            .catch(() => {
              this.$message({
                type: 'error',
                message: '删除失败'
              });
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    },
    created() {
      this.$axios
        .post('/api/fixed/find.do', JSON.stringify({start: 0, size: 8}),{
          headers: {'Content-Type': 'application/json'}
        })
        .then(res => {
          this.tableData = res.data.data
          this.tableData.forEach(i => {
            i.entryDateTime = i.entryDate + " " + i.entryTime;
            if(i.outDate != null && i.outTime != null) {
              i.outDateTime = i.outDate + " " + i.outTime;
            } else {
              i.outDateTime = ""
            }
          })
        })
        .catch(() => this.$message.error('出现未知错误'));
      this.$axios
        .post('/api/fixed/record2.do')
        .then(res => {
          this.recordsNum = res.data.data;
        })
        .catch(() => this.$message.error('出现未知错误'))
    },
    components: {
      Menu
    }

  }
</script>

<style scoped>
    .el-table-column{
        height: 30px;
    }
</style>