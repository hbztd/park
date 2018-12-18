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
                        <span>添加入场信息</span>
                    </div>
                    <div  class="text item">
                        <el-row>
                            <span>车牌号码：</span>
                            <el-input v-model="carNum" clear="true" style="width: 150px; margin-right: 10px;"/>
                            <el-button type="primary" @click="onSubmit">进场</el-button>
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
        carNum: ''
      };
    },
    methods: {
      onSubmit() {
        this.$confirm(`是否确认进入停车场`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$axios
              .post('/api/temp/entry.do',this.$qs.stringify({carNum: this.carNum}))
              .then((res) => {
                console.log(res);
                if(res.data.status === 0) {
                  this.$message({
                    type: "success",
                    message: "进入停车场成功!"
                  });
                } else {
                  this.$message({
                    type: 'error',
                    message: res.data.msg
                  })
                }
              })
              .catch(() => {
                this.$message.error("进入停车场失败");
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

