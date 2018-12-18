<template>
    <el-col :offset="8" :span="10">
      <h2 style="text-align:center;">登录</h2>
      <el-form :model="form" label-width="80px;">
        <el-form-item label="账号">
          <el-input v-model="form.username" clear="true"/>
          {{ info.text1 }}
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" type="password" clear="true"/>
          {{ info.text2 }}
        </el-form-item>
        <el-form-item label="验证码">
          <el-input v-model="form.verifyCode" clear="true" style="width: 160px;" maxlength="4" />
          <img :src="codeUrl" alt="验证码" class="codeImg" @click="changeCode">
          {{ info.text3 }}
        </el-form-item>
         
        <el-form-item>
          <el-button type="primary" @click="onSubmit" :disabled="isValid">创建</el-button>
          <el-button @click="onCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-col>
</template>

<style scoped>
  .codeImg{
    margin-left: 20px;
  }
</style>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
        verifyCode: ""
      },
      info: {
        text1: "",
        text2: "",
        text3: ""
      },
      codeUrl: 'http://localhost:8080/user/getCode.do'
    };
  },
  computed: {
    isValid: function(){
      // 此处不能为Object.values(this.info).every(i => i === '') 验证码错误时text3有值
      if(Object.values(this.form).every(i => i !== '') && this.info.text1 === '' && this.info.text2 === '') {
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    onSubmit() {
      this.$axios
        .post('/api/user/verifyCode.do',this.$qs.stringify({code: this.form.verifyCode}))
        .then((res) => {
          if(res.data.status === 0) {
            this.$axios
              .post('/api/user/login.do',this.$qs.stringify({username: this.form.username, password: this.form.password}))
              .then((res) => {
                  if(res.data.status === 0) {
                    this.$alert('登录成功','系统消息',{
                        confirmButtonText: '确认'
                    })
                    this.$router.push({
                      name: 'index'
                    })
                  } else if(res.data.status === 1) {
                      this.$alert('登录失败，账号或密码错误','系统消息',{
                          confirmButtonText: '确认'
                      })
                  }
              })
              .catch(() => this.$message.error("出现未知错误"))
          } else if(res.data.status === 1) {
            this.info.text3 = '验证码错误'
          }
        })
        .catch(() => this.$message.error("出现未知错误"))
    },
    onCancel() {
      this.form.username = '',
      this.form.password = '',
      this.form.verifyCode = ''
    },
    changeCode() {
      this.codeUrl = 'http://localhost:8080/user/getCode.do?' + 'time=' + (new Date()).valueOf();
    }
    
  },
  created() {},
  watch: {
    'form.username': function(newVal) {
      // this.info.text1 = utils.valid(newVal,1);
      if (newVal === "") {
        this.info.text1 = "该字段不能为空";
      } else if (!/^[0-9a-zA-Z]*$/.test(newVal)) {
        this.info.text1 = "该字段必须为字母或数字";
      } else {
        this.info.text1 = "";
      }
    },
    'form.password': function(newVal) {
      if (newVal === "") {
        this.info.text2 = "该字段不能为空";
      } else {
        this.info.text2 = "";
      }
    }
  }
};
</script>
