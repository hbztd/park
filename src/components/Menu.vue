<template>
    <el-col :span="6" style="display:inline-block;">
        <el-menu :default-active="activeIndex" style="width: 200px;" @select="handleSelect">
            <el-submenu index="1">
                <template slot="title">用户管理</template>
                <el-menu-item index="1-1">添加用户</el-menu-item>
                <el-menu-item index="1-2">管理用户信息</el-menu-item>
                <el-menu-item index="1-3">管理用户权限</el-menu-item>
                <el-menu-item index="1-4">修改密码</el-menu-item>
            </el-submenu>

            <el-submenu index="2">
                <template slot="title">车位信息管理</template>
                <el-menu-item index="2-1">添加车位信息</el-menu-item>
                <el-menu-item index="2-2">管理车位信息</el-menu-item>
            </el-submenu>

            <el-submenu index="3">
                <template slot="title">车主信息管理</template>
                <el-menu-item index="3-1">添加车主信息</el-menu-item>
                <el-menu-item index="3-2">管理车主信息</el-menu-item>
            </el-submenu>

            <el-submenu index="4">
                <template slot="title">固定车主停车管理</template>
                <el-menu-item index="4-1">出入场设置</el-menu-item>
                <el-menu-item index="4-2">停车信息管理</el-menu-item>
            </el-submenu>

            <el-submenu index="5">
                <template slot="title">临时车辆停车管理</template>
                <el-menu-item index="5-1">出入场设置</el-menu-item>
                <el-menu-item index="5-2">停车信息管理</el-menu-item>
            </el-submenu>

            <el-menu-item index="6">
                <template>退出系统</template>
            </el-menu-item>
        </el-menu>
    </el-col>
</template>

<style>
</style>

<script>
  export default {
    data() {
      return {
        isCollapse: true,
        activeIndex: "1"
      };
    },
    methods: {
      handleSelect(key) {
        switch (key) {
          case '1-1':
            this.$router.push({
              name: ''
            });
            break;
          case '1-2':
            break;
          case '1-3':
            break;
          case '1-4':
            break;
          case '2-1':
            this.$router.push({
              name: 'seat'
            });
            break;
          case '2-2':
            this.$router.push({
              name: 'seat2'
            });
            break;
          case '3-1':
            this.$router.push({
              name: 'card'
            });
            break;
          case '3-2':
            this.$router.push({
              name: 'card2'
            });
            break;
          case '4-1':
            this.$router.push({
              name: 'fixed'
            });
            break;
          case '4-2':
            this.$router.push({
              name: 'fixed2'
            });
            break;
          case '5-1':
            this.$router.push({
              name: 'temp'
            });
            break;
          case '5-2':
            this.$router.push({
              name: 'temp2'
            });
            break;
          case '6':
            break;
        }
        //   不知为何出错 暂不解决
        //    this.$router.push({
        //         name
        //     })
        console.log('tag', '')
      }
    }
  };
</script>