<template>
    <el-container>
        <el-header>
            <p style="font-size:20px; text-align:center;">AI智能停车场</p>
        </el-header>
        <el-row>
            <Menu/>
            <el-col :span="10">
                <el-form :model="form" label-width="80px;">
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
                        <el-button type="primary" @click="onSubmit" :disabled="isValid">创建</el-button>
                        <el-button @click="onCancel">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </el-container>
</template>

<script>
    import Menu from '../components/Menu.vue'
  export default {
    data() {
      return {
        form: {
          seatNum: "",
          seatSection: "",
          seatTag: "",
          seatType: ""
        },
        info: {
          text1: "",
          text2: "",
        }
      };
    },
    computed: {
      isValid() {
        //  此处判断是否为空，应判断字符串是否为空'' 而不是 null
        return !(Object.values(this.info).every(i => i === "") &&
          this.form.seatNum !== "" &&
          this.form.seatSection !== "");
      }
    },
    methods: {
      onSubmit() {
        this.$confirm(`是否确认创建该车位`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            // if(this.form.seatType === '1') {
            //   this.form.seatTag = '固定车主停车车位'
            // }  else if(this.form.seatType === '2') {
            //   this.form.seatTag = '临时停车位'
            // }
            console.log(this.form.seatTag);
            this.$axios
              .post('/api/seat/add.do',JSON.stringify(this.form),{
                headers: {'Content-Type': 'application/json'}
              })
              .then((res) => {
                console.log(res);
                if(res.data.status === 0) {
                  this.$message({
                    type: "success",
                    message: "创建成功!"
                  });
                } else {
                  this.$message({
                    type: 'error',
                    message: res.data.msg
                  })
                }
              })
              .catch(() => {
                this.$message.error("创建失败");
              })
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消创建"
            });
          });
      },
      onCancel() {
      }
    },
    watch: {
      "form.seatNum": function (newVal) {
        if (newVal === "") {
          this.info.text1 = "该字段不能为空";
        } else if (!/^[0-9a-zA-Z]*$/.test(newVal)) {
          this.info.text1 = "该字段必须为字母或数字";
        } else {
          this.info.text1 = "";
        }
      },
      "form.seatSection": function (newVal) {
        if (newVal === "") {
          this.info.text2 = "该字段不能为空";
        } else {
          this.info.text2 = "";
        }
      }
    },
    components: {
      Menu
    }
  };
</script>

<style scoped>
</style>

