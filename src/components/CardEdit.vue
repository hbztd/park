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
                        <el-input v-model="form.cardId" :disabled="true"/>
                    </el-form-item>
                    <el-form-item label="车位编号">
                        <el-select v-model="form.seatId" placeholder="请选择车位">
                            <el-option v-for="(item, index) in items" :label="item.label" :value="item.value" :key="index"/>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="用户性别">
                        <el-select v-model="form.userGender" placeholder="请选择性别">
                            <el-option label="男" value="男"/>
                            <el-option label="女" value="女"/>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="家庭住址">
                        <el-input v-model="form.userAddr" clear="true"/>
                    </el-form-item>
                    <el-form-item label="车牌号码">
                        <el-input v-model="form.carNum" clear="true"/>
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
          cardId: "",
          seatId: "",
          userGender: "",
          userAddr: "",
          carNum: ""
        },
        info: {
          text1: "",
          text2: "",
          text3: ""
        },
        items: []
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
            .post('/api/card/update.do',JSON.stringify(this.form),
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
      this.form.seatId = ""
    },
    created () {
      this.$axios
        .post('/api/card/getInfo.do')
        .then(res => {
          if(res.data.status === 0) {
            res.data.data.forEach(i => {
              const label = i.split("#")[0]
              const value = i.split("#")[1]
              this.items.push({label,value})
            });
          }
          console.log('tag', res.data.data);
        })
        .catch(() => this.$message.error('出现未知错误'))
    }
  }
</script>

<style scoped>

</style>