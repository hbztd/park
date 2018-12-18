<template>
    <el-container>
        <el-header>
            <p style="font-size:20px; text-align:center;">AI智能停车场</p>
        </el-header>
        <el-row>
            <Menu/>
            <el-col :span="10">
                <el-form :model="form" label-width="80px;">
                    <el-form-item label="车位ID">
                        <el-input v-model="form.seatId" :disabled="true"/>
                    </el-form-item>
                    <el-form-item label="车位编号">
                        <el-input v-model="form.seatNum" clear="true"/>
                        {{ info.text1 }}
                    </el-form-item>
                    <el-form-item label="所属区域">
                        <el-select v-model="form.seatSection" placeholder="请选择所属区域">
                            <el-option label="A区" value="A区"/>
                            <el-option label="B区" value="B区"/>
                        </el-select>
                        {{ info.text2 }}
                    </el-form-item>
                    <el-form-item label="车位备注">
                        <el-input v-model="form.seatTag" clear="true"/>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onEdit" :disabled="isValid">修改</el-button>
                        <el-button @click="onCancel">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </el-container>
</template>

<script>
    import Menu from './Menu'
  export default {
    data(){
      return {
        form: {
          seatId: "",
          seatNum: "",
          seatSection: "",
          seatTag: "",
        },
        info: {
          text1: "",
          text2: "",
          text3: ""
        },
      }
    },
    computed:{
      isValid() {
        return !(Object.values(this.info).every(i => i === "") &&
          this.form.seatNum !== "" &&
          this.form.seatSection !== "" &&
          this.form.seatType !== "");
      }
    },
    methods: {
      onEdit () {
        this.$confirm('此操作将修改该车位, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios
            .post('/api/seat/update.do',JSON.stringify(this.form),
              {
                headers: {'Content-Type': 'application/json'}
              })
            .then((res) => {
              if(res.data.status === 0) {
                this.$message({
                  type: 'success',
                  message: '修改成功!'
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
                message: '修改失败'
              });
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消修改'
          });
        });
      },
      onCancel () {
        this.$router.push({
          name: 'seat2'
        });
      }
    },
    components: {
      Menu
    },
    mounted () {
      this.form = this.$route.params.form
    }
  }
</script>

<style scoped>

</style>