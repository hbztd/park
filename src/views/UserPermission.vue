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
                        style="width: 611px; margin-top: 10px;">
                    <el-table-column
                            fixed
                            prop="account"
                            label="用户账号"
                            width="150">
                    </el-table-column>
                    <el-table-column
                            prop="userName"
                            label="用户昵称"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="realName"
                            label="真实姓名"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="userPhone"
                            label="用户电话"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            width="100">
                        <template slot-scope="scope">
                            <el-button type="text" @click="onClickFind(scope.row)" size="small">查看</el-button>
                            <el-button type="text" @click="onClickEdit(scope.row)" size="small">管理</el-button>
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
      return {
        options: [{
          value: 'account',
          label: '用户账号'
        }, {
          value: 'user_name',
          label: '用户昵称'
        }, {
          value: 'real_name',
          label: '真实姓名'
        }, {
          value: 'user_phone',
          label: '用户电话'
        }
        ],
        recordsNum: 1,
        tableData: [],
        selectValue: '',
        searchValue: '',
        currentPage: 1
      }
    },
    methods: {
      onSearch() {
        const find = {
          type: this.selectValue,
          value: this.searchValue,
          start: 0,
          size: 8,
        };
        this.$axios
          .post('/api/user/find.do', JSON.stringify(find), {
            headers: {'Content-Type': 'application/json'}
          })
          .then(res => {
            if (res.data.status !== 0) {
              this.$message.info(res.data.msg)
            } else {
              this.tableData = res.data.data
              this.currentPage = 1
              console.log(res.data.data);
            }
          })
          .catch(() => this.$message.error('出现未知错误'))
        this.$axios
          .post('/api/user/record.do', JSON.stringify(find), {
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
          start: (val - 1) * 8,
          size: 8,
        };
        this.$axios
          .post('/api/user/find.do', JSON.stringify(find), {
            headers: {'Content-Type': 'application/json'}
          })
          .then(res => {
            this.tableData = res.data.data
          })
          .catch(() => this.$message.error('出现未知错误'))
      },
      onClickFind(row) {
        this.$axios
          .post('/api/user/findPermission.do', this.$qs.stringify({account: row.account}))
          .then((res) => {
            console.log(res.data);

            const h = this.$createElement;
            this.$notify({
              title: '标题名称',
              message: h('i', {style: 'color: teal'}, `${res.data.data}`)
            });
          })
          .catch(() => this.$message.error('出现未知错误'))
      },
      onClickEdit(row) {
        this.$confirm('是否确认继续操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push({
            name: 'user2',
            params: {
              account: row.account
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
    },
    created() {
      this.$axios
        .post('/api/user/find.do', JSON.stringify({start: 0, size: 8}), {
          headers: {'Content-Type': 'application/json'}
        })
        .then(res => {
          console.log(res.data);
          this.tableData = res.data.data
        })
        .catch(() => this.$message.error('出现未知错误'));
      this.$axios
        .post('/api/user/record2.do')
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