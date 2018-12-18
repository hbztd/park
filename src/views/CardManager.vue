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
                        style="width: 881px; margin-top: 10px;">
                    <el-table-column
                            fixed
                            prop="cardId"
                            label="车主ID"
                            width="150">
                    </el-table-column>
                    <el-table-column
                            prop="seatNum"
                            label="车位编号"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="userName"
                            label="车主名称"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="userGender"
                            label="车主性别"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="userAddr"
                            label="家庭住址"
                            width="150">
                    </el-table-column>
                    <el-table-column
                            prop="carNum"
                            label="车牌号码"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            width="100">
                        <template slot-scope="scope">
                            <el-button type="text" @click="onClickEdit(scope.row)" size="small">编辑</el-button>
                            <el-button type="text" @click="onClickDel(scope.row)" size="small">删除</el-button>
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
    name: 'SeatManager',
    data() {
      return{
        options: [{
          value: 'card_id',
          label: '车主ID'
        }, {
          value: 'seat_num',
          label: '车位编号'
        }, {
          value: 'user_name',
          label: '车主姓名'
        }, {
          value: 'user_addr',
          label: '家庭住址'
        }, {
          value: 'car_num',
          label: '车牌号码'
        }
          // , {
          //   value: 'seat_state',
          //   label: '车位状态'
          // }, {
          //   value: 'seat_type',
          //   label: '车位类型'
          // }
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
          .post('/api/card/find.do',JSON.stringify(find),{
            headers: {'Content-Type': 'application/json'}
          })
          .then(res => {
            if(res.data.status !== 0) {
              this.$message.info(res.data.msg)
            } else {
              this.tableData = res.data.data
              this.currentPage = 1
              console.log(res.data.data);
            }
          })
          .catch(() => this.$message.error('出现未知错误'))
        this.$axios
          .post('/api/card/getRecordNum.do',JSON.stringify(find), {
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
          .post('/api/card/find.do',JSON.stringify(find),{
            headers: {'Content-Type': 'application/json'}
          })
          .then(res => {
            this.tableData = res.data.data
            console.log(res.data.data);
          })
          .catch(() => this.$message.error('出现未知错误'))
      },
      onClickEdit(row){
        console.log(row);
        this.$router.push({
          name: 'card3',
          params: {
            form: row
          }
        })
      },
      onClickDel(row){
        this.$confirm('此操作将删除该车位, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios
            .post('/api/card/delete.do',JSON.stringify(row),
              {
                headers: {'Content-Type': 'application/json'}
              })
            .then((res) => {
              console.log(res);
              if(res.data.status === 0) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              } else {
                this.$message({
                  type: 'error',
                  message: '删除失败'
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
        .post('/api/card/find.do', JSON.stringify({start: 0, size: 8}),{
          headers: {'Content-Type': 'application/json'}
        })
        .then(res => {
          this.tableData = res.data.data
          this.tableData.forEach(i => {if(i.seatState === 1) i.seatState2 = "占用"
            if(i.seatState === 0) i.seatState2 = "空闲"})
        })
        .catch(() => this.$message.error('出现未知错误'));
      this.$axios
        .post('/api/card/getRecordsNum.do')
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
</style>