<template>
  <div class="home">
    <el-container style="min-height: 100vh">
      <el-aside width="300px" style="background-color: rgb(238, 241, 246)" >
        <Aside/>
      </el-aside>

      <el-container>
        <el-header style= "border-bottom:1px solid #ccc" >
          <Header :user="user"/>
        </el-header>

        <el-main>
          <!--          当前页面的子路由会在router-view里展示-->
          <router-view @refreshUser="getUser" />

        </el-main>
      </el-container>
    </el-container>

  </div>
</template>

<script>
import Aside from "@/components/Aside";
import Header from "@/components/Header";
export default {
  name: "Home",
  components:{
    Aside,
    Header
  },
  data(){
    return{
      user:{}
    }
  },
  methods:{
    getUser(){
      let username=localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).username : ""
      if(username){
        this.request.get("http://localhost:98/user/username/"+username).then(res=>{
          this.user=res.data
        })
      }
    }
  },
  created(){
    this.getUser()
  }
}
</script>

<style>

</style>