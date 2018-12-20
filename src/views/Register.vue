<template>
  <el-form :model="form" label-width="80px">
    <el-form-item label="用户账号">
      <el-input v-model="form.account" clearable v-on:blur="checkAccount"/>
      {{ info.text1 }}
    </el-form-item>
    <el-form-item label="用户昵称">
      <el-input v-model="form.userName" clearable aria-required/>
      {{ info.text3 }}
    </el-form-item>
    <el-form-item label="真实姓名">
      <el-input v-model="form.realName" clearable/>
      {{ info.text4 }}
    </el-form-item>
    <el-form-item label="用户密码">
      <el-input v-model="form.userPwd" clearable type="password"/>
      {{ info.text5 }}
    </el-form-item>
    <el-form-item label="确认密码">
      <el-input v-model="form.password2" clearable type="password"/>
      {{ info.text6 }}
    </el-form-item>
    <el-form-item label="联系电话">
      <el-input v-model="form.userPhone" clearable/>
      {{ info.text7 }}
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit" :disabled="isValid">创建</el-button>
      <el-button @click="onCancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        account: "",
        // role: "",
        userName: "",
        realName: "",
        userPwd: "",
        password2: "",
        userPhone: ""
      },
      info: {
        text1: "",
        // text2: "", 权限设置已删除
        text3: "",
        text4: "",
        text5: "",
        text6: "",
        text7: ""
      }
    };
  },
  methods: {
    //   axios params表单：qs.stringify json: JSON.stringify,{}设置类型为JSON
    onSubmit() {
        this.$axios
            .post('/api/user/register.do',JSON.stringify(this.form),{
                headers: {'Content-Type': 'application/json'}
            })
            .then((res) => {
                if(res.data.status === 0) {
                    this.$alert('注册成功','系统消息',{
                        confirmButtonText: '确认'
                    })
                    // 注册成功，清空表单
                    this.onCancel();
                } else if(res.data.status === 1) {
                    this.$alert('注册失败','系统消息',{
                        confirmButtonText: '确认'
                    })
                }
            })
            .catch(() => {
                this.$message.error("出现未知错误");
            })
    },
    onCancel(){
        for(let i in this.form){
            this.form[i] = '';
        }
        // 在info改变后再设为空。。。。
        setTimeout(500);
        for(let i in this.info){
            this.info[i] = ''
        }
    },
    checkAccount() {
      // this.form.userName此处作用域不能获取
      const account = this.form.account;
      let params = this.$qs.stringify({
        account
      });
      //  此处刷新时会出错 应新添加一个data 暂不处理
      if (
        this.info.text1 === "" &&
        sessionStorage.getItem("parkingUserName") !== this.form.account
      ) {
        sessionStorage.setItem("parkingUserName", this.form.account);
        console.log("test");
        this.$axios
          .post("/api/user/checkValid.do", params)
          .then(res => {
            if (res.data.status === 1) {
              this.info.text1 = "用户名已存在";
            }
          })
          .catch(() => {
            this.$message.error("出现未知错误");
          });
      }
    }
  },
  computed: {
    isValid: function() {
      if (
        Object.values(this.form).every(i => i !== "") &&
        Object.values(this.info).every(i => i === "")
      ) {
        return false;
      }
      return true;
    }
  },
  watch: {
    "form.account": function(newVal) {
      const reg = /^[0-9a-zA-Z]*$/;
      if (newVal === "") {
        this.info.text1 = "该字段不能为空";
      } else if (!reg.test(newVal) || newVal.length > 10 || newVal.length < 4) {
        this.info.text1 =
          "账号必须为英文可包含数组，且不能有其他字符，长度必须大于4小于10";
      } else {
        this.info.text1 = "";
      }
    },

    //      1111111
    "form.role": function(newVal) {
      if (newVal === "") {
        this.info.text2 = "该字段不能为空";
      } else {
        this.info.text2 = "";
      }
    },

    "form.userName": function(newVal) {
      if (newVal === "") {
        this.info.text3 = "该字段不能为空";
      } else if (newVal.length > 10) {
        this.info.text3 = "昵称长度不能超过10";
      } else {
        this.info.text3 = "";
      }
    },
    "form.realName": function(newVal) {
      if (newVal === "") {
        this.info.text4 = "该字段不能为空";
      } else if (!/^[\u0391-\uFFE5]+$/.test(newVal)) {
        this.info.text4 = "必须为中文";
      } else if (newVal.length > 4 || newVal.length < 2) {
        this.info.text4 = "长度必须大于1小于5";
      } else {
        this.info.text4 = "";
      }
    },
    "form.userPwd": function(newVal) {
      if (newVal === "") {
        this.info.text5 = "该字段不能为空";
      }
      // else if(/[0-9]+$/.test(newVal)) {
      //     this.info.text5 = '密码必须包含数字'
      // } else if(/[A-Z]+$/.exec(newVal) === null) {
      //     this.info.test5 = '密码必须包含大写字母';
      // } else if (!/[a-z]+$/.exec(newVal) === null) {
      //     this.info.text5 = '密码必须含有小写字母';
      // }
      else if (newVal.length < 8) {
        this.info.text5 = "密码长度应大于8";
      } else {
        this.info.text5 = "";
      }
    },
    "form.password2": function(newVal) {
      if (newVal === "") {
        this.info.text6 = "该字段不能为空";
      } else if (this.form.userPwd !== newVal) {
        this.info.text6 = "两次密码不一致";
      } else {
        this.info.text6 = "";
      }
    },
    "form.userPhone": function(newVal) {
      if (newVal === "") {
        this.info.text7 = "该字段不能为空";
      } else if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(newVal)) {
        this.info.text7 = "请输入有效电话号码";
      } else {
        this.info.text7 = "";
      }
    }
  }
};
</script>

<style scoped>
</style>
