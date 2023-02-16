<template>
<div>
  <el-header style= "border-bottom:1px solid #ccc" >
    <div class="block" style="margin-left: 1000px">
      <el-tag style="font-size: large">用户名：{{user.username}}</el-tag>
      <el-tag type="danger" style="font-size: large;margin-top: 10px">滑动退出</el-tag>
      <el-slider v-model="value1" @change="logout(value1)" style="margin-top: -10px"></el-slider>
    </div>
  </el-header>
</div>
</template>

<script>
export default {
  name: "Header",
  data(){
    return{
      value1:0
    }
  },
  props:{
    user:Object
  },
  methods:{
    logout(value1){
      if(value1===100) {
        this.$router.push("/")
        localStorage.removeItem("user")
        this.$message.success("成功退出")
      }
    },

  }
}
</script>

<style>

</style>