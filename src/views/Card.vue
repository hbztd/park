<template>
  <el-container>
    <el-header>
      <p style="font-size:20px; text-align:center;">AI智能停车场</p>
    </el-header>
    <el-row>
      <Menu/>
      <el-col :span="10">
      <el-form :model="form" label-width="80px;" :offset="8">
        <el-form-item label="车位编号">
          <el-select v-model="form.seatId" placeholder="请选择车位">
            <el-option v-for="(item, index) in items" :label="item.label" :value="item.value" :key="index"/>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名称">
          <el-input v-model="form.userName" clear="true"/>
        </el-form-item>
        <el-form-item label="用户性别">
          <el-select v-model="form.userGender" placeholder="请选择用户性别">
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
          <el-button type="primary" @click="onSubmit" >创建</el-button>
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
        seatId: "",
        userName: "",
        userGender: "",
        userAddr: "",
        carNum: ""
      },
      items: []
    };
  },
  computed: {
      // isValid: function() {
      //   //  此处判断是否为空，应判断字符串是否为空'' 而不是 null
      //     if(Object.values(this.info).every(i => i === '') && this.form.num !== '' && this.form.area !== '') {
      //         return false;
      //     } else {
      //         return true;
      //     }
      // }
  },
  methods: {
    onSubmit() {
      this.$confirm(`是否确认创建车主`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .post('/api/card/add.do',JSON.stringify(this.form),{
              headers: {'Content-Type': 'application/json'}
            })
            .then( res => {
              if (res.data.status === 0) {
                this.$message({
                  type: "success",
                  message: "创建成功!"
                })
              }
              }
            )
            .catch(() => this.$message.error("出现未知错误"))
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消创建"
          });
        });
    },
    onCancel() {}
  },
  watch: {
    "form.num": function(newVal) {
      if (newVal === "") {
        this.info.text1 = "该字段不能为空";
      } else if (!/^[0-9a-zA-Z]*$/.test(newVal)) {
        this.info.text1 = "该字段必须为字母或数字";
      } else {
        this.info.text1 = "";
      }
    },
    "form.area": function(newVal) {
      if (newVal === "") {
        this.info.text2 = "该字段不能为空";
      } else {
        this.info.text2 = "";
      }
    }
  },
  components: {
    Menu
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
};
</script>

<style scoped>
</style>

