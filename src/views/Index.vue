<template>
  <el-container>
    <el-header>
      <p style="font-size:20px; text-align:center;">AI智能停车场</p>
    </el-header>
    <el-row>
      <Menu/>
    </el-row>
  </el-container>
</template>

<style>
</style>

<script>
import Menu from '../components/Menu.vue'
export default {
  data() {
    return {
      isCollapse: true,
      activeIndex: '1'
    }
  },
  methods: {
   
  },
  components: {
    Menu
  }
};
</script>