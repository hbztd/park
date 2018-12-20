<template>
    <el-container>
        <el-header>
            <p style="font-size:20px; text-align:center;">AI智能停车场</p>
        </el-header>
        <el-row>
            <Menu/>
            <el-col :span="10">
                <el-card>
                    <div slot="header" class="clearfix">
                        <span>修改密码</span>
                    </div>
                    <div  class="text item">
                        <el-row>
                            <span>旧密码：</span>
                            <el-input v-model="oldPwd" type="password" clear="true" style="width: 150px; margin-right: 10px;"/>
                        </el-row>
                        <el-row>
                            <span>新密码：</span>
                            <el-input v-model="newPwd"  type="password" clear="true" style="width: 150px; margin-right: 10px;"/>
                        </el-row>
                        <el-row>
                            <span>确认密码：</span>
                            <el-input v-model="newPwd2" clear="true" type="password" style="width: 150px; margin-right: 10px;"/>
                            {{ info }}
                        </el-row>
                        <el-row>
                            <el-button type="primary" @click="onSubmit" :disabled="isValid">确认</el-button>
                            <el-button type="primary" @click="onCancel">取消</el-button>
                        </el-row>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </el-container>
</template>

<script>
  import Menu from '../components/Menu.vue'
  export default {
    data() {
      return {
        oldPwd: '',
        newPwd: '',
        newPwd2: '',
        info: ''
      };
    },
    methods: {
      onSubmit() {
        this.$confirm(`是否确认修改密码`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$axios
              .post('/api/user/changePwd.do',this.$qs.stringify({oldPwd:this.oldPwd,newPwd:this.newPwd}))
              .then((res) => {
                console.log(res);
                if(res.data.status === 0) {
                  this.$message({
                    type: "success",
                    message: "修改密码成功!"
                  });
                } else {
                  this.$message({
                    type: 'error',
                    message: res.data.msg
                  })
                }
              })
              .catch(() => {
                this.$message.error("出现未知错误");
              })
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消"
            });
          });
      },
      onCancel() {
      }
    },
    watch: {
      newPwd2: function(newVal) {
        if(newVal !== this.newPwd) {
          this.info = "两次密码不一致"
        } else {
          this.info = ""
        }
      }
    },
    computed: {
      isValid: function() {
        return !(this.info === '' && this.newPwd2 !== "" && this.oldPwd !== "");
      }
    },
    components: {
      Menu
    }
  };
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

