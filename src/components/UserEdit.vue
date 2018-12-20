<template>
    <el-container>
        <el-header>
            <p style="font-size:20px; text-align:center;">AI智能停车场</p>
        </el-header>
        <el-row>
            <Menu/>
            <el-col :span="10">
                <el-collapse v-model="activeName" accordion>
                    <el-collapse-item title="车位管理权限" name="1">
                        <el-row>增加车位 <el-button size="mini" @click="onAdd(10)">授予</el-button><el-button size="mini" @click="onDel(10)">删除</el-button></el-row>
                        <el-row>删除车位 <el-button size="mini" @click="onAdd(11)">授予</el-button><el-button size="mini"  @click="onDel(11)">删除</el-button></el-row>
                        <el-row>更新车位 <el-button size="mini" @click="onAdd(12)"> 授予</el-button><el-button size="mini" @click="onDel(12)">删除</el-button></el-row>
                        <el-row>查找车位信息 <el-button size="mini" @click="onAdd(13)">授予</el-button><el-button size="mini" @click="onDel(13)">删除</el-button></el-row>
                    </el-collapse-item>
                    <el-collapse-item title="车主管理权限" name="2">
                        <el-row>增加车主 <el-button size="mini" @click="onAdd(1)">授予</el-button><el-button size="mini" @click="onDel(1)">删除</el-button></el-row>
                        <el-row>删除车主 <el-button size="mini" @click="onAdd(2)">授予</el-button><el-button size="mini" @click="onDel(2)">删除</el-button></el-row>
                        <el-row>更新车主 <el-button size="mini" @click="onAdd(3)">授予</el-button><el-button size="mini" @click="onDel(3)">删除</el-button></el-row>
                        <el-row>查找车主信息 <el-button size="mini" @click="onAdd(4)">授予</el-button><el-button size="mini" @click="onDel(4)">删除</el-button></el-row>
                    </el-collapse-item>
                    <el-collapse-item title="固定停车管理权限" name="3">
                        <el-row>进入停车场 <el-button size="mini" @click="onAdd(5)">授予</el-button><el-button size="mini" @click="onDel(5)">删除</el-button></el-row>
                        <el-row>退出停车场 <el-button size="mini" @click="onAdd(6)">授予</el-button><el-button size="mini" @click="onDel(6)">删除</el-button></el-row>
                        <el-row>删除停车记录 <el-button size="mini" @click="onAdd(7)">授予</el-button><el-button size="mini" @click="onDel(7)">删除</el-button></el-row>
                        <el-row>查找所有停车记录 <el-button size="mini" @click="onAdd(8)">授予</el-button><el-button size="mini" @click="onDel(8)">删除</el-button></el-row>
                        <el-row>查找正在停车的记录 <el-button size="mini" @click="onAdd(9)">授予</el-button><el-button size="mini" @click="onDel(9)">删除</el-button></el-row>
                    </el-collapse-item>
                    <el-collapse-item title="零时停车管理权限" name="4">
                        <el-row>进入停车场 <el-button size="mini" @click="onAdd(14)">授予</el-button><el-button size="mini" @click="onDel(14)">删除</el-button></el-row>
                        <el-row>退出停车场 <el-button size="mini" @click="onAdd(15)">授予</el-button><el-button size="mini" @click="onDel(15)">删除</el-button></el-row>
                        <el-row>删除停车记录 <el-button size="mini" @click="onAdd(16)">授予</el-button><el-button size="mini" @click="onDel(16)">删除</el-button></el-row>
                        <el-row>查找所有停车记录 <el-button size="mini" @click="onAdd(17)">授予</el-button><el-button size="mini" @click="onDel(17)">删除</el-button></el-row>
                    </el-collapse-item>
                </el-collapse>
            </el-col>
        </el-row>
    </el-container>
</template>

<script>
  import Menu from './Menu'
export default {
  name: 'UserEdit',
  data() {
    return {
      activeName: '',
      account: ''
    };
  },
  methods: {
    onAdd(pid){
      this.$confirm('是否为该用户增加权限?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios
          .post('/api/user/addPermission.do',JSON.stringify({uid:this.account,pid: parseInt(pid)}),{
            headers: {'Content-Type': 'application/json'}
          })
          .then((res) => {
            if(res.data.status === 0) {
              this.$message({
                type: 'success',
                message: '增加权限成功!'
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
              message: '出现未知错误'
            });
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消添加'
        });
      })
    },
    onDel(pid) {
      this.$confirm('是否为该用户删除权限?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios
          .post('/api/user/removePermission.do',JSON.stringify({uid:this.account,pid}),{
            headers: {'Content-Type': 'application/json'}
          })
          .then((res) => {
            console.log(res);
            if(res.data.status === 0) {
              this.$message({
                type: 'success',
                message: '删除权限成功!'
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
              message: '出现未知错误'
            });
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      })
    }
  },
  components: {
    Menu
  },
  mounted () {
    this.account = this.$route.params.account
    console.log(this.account);
  }
}
</script>

<style scoped>

</style>