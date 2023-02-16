<template>
  <div class="wrapper">
    <div style="margin: 100px auto;background-color:#fff;width:300px;height:600px;padding:20px;border-radius: 10px; top: 100px; margin-right: 130px ">
      <div style="margin: 20px 0;text-align: center;font-size: 24px">
        <b>Welcome To Use</b>
      </div>
      <el-form :rules="rules" :model="user" ref="userForm">
        <el-form-item prop="username">
          <el-input size="medium" style="margin: 50px 30px 15px 30px; width: 200px;" prefix-icon="el-icon-user" v-model="user.username" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input size="medium" style="margin:15px 30px 30px 30px; width: 200px" prefix-icon="el-icon-lock" show-password v-model="user.password" placeholder="请输入密码"></el-input>
        </el-form-item>

        <div style="margin: 10px 0;text-align: center">
          <el-button type="success" size="small" autocomplete="off" @click="login" @keyup.enter="keyDown(e)">登录</el-button>
          <el-button type="success" size="small" autocomplete="off" @click="dialog =true">注册</el-button>
        </div>
      </el-form>
    </div>
    <el-drawer
        title="企业库存管理账号注册"
        :before-close="handleClose"
        :visible.sync="dialog"
        direction="rtl"
        custom-class="demo-drawer"
        ref="drawer"
    >
      <div class="demo-drawer__content">
        <el-form :model="form" ref="form">
          <el-form-item label="账号" :label-width="formLabelWidth" >
            <el-input v-model="form.username" autocomplete="off" style="width: 160px"></el-input>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth" >
            <el-input v-model="form.password" autocomplete="off" style="width: 160px"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" :label-width="formLabelWidth" >
            <el-input v-model="form.confm" autocomplete="off" style="width: 160px"></el-input>
          </el-form-item>

        </el-form>
        <div class="demo-drawer__footer" >
          <el-button @click="cancelForm" style="margin-left: 30px;margin-right: 30px">返 回</el-button>
          <el-button type="primary" @click="$refs.drawer.closeDrawer()" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import {setRoutes} from "@/router";

export default {
  name: "Login",
  data(){
    return{
      user:{},
      form:{},
      formLabelWidth: '80px',
      loading: false,
      drawer:false,
      dialog: false,
      timer: null,
      rules:{
        username:[
          {required:true,message:'请输入用户名',trigger:'blur'},
          {min:3,max:15,message:'长度在3到5个字符',trigger:'blur'}
        ],
        password:[
          {required:true,message:'请输入密码',trigger:'blur'},
          {min:3,max:5,message:'长度在3到32个字符',trigger:'blur'}
        ],
        confm:[
          {required:true,message:'请输入密码',trigger:'blur'},
          {min:3,max:5,message:'长度在3到32个字符',trigger:'blur'}
        ],
      }
    }
  },
  methods:{
    login(){
      this.$refs['userForm'].validate((valid) =>{
        if(valid){//表单校验
          this.request.post("http://localhost:98/user/login",this.user).then(res=>{
            if(res.code ==='200'){

              setTimeout(()=>{
                localStorage.setItem("user",JSON.stringify(res.data))
                localStorage.setItem("menusList",JSON.stringify(res.data.menusList))//存储用户信息到浏览器

                //动态设置当前用户的路由
                setRoutes()
                this.$router.push('/home')
                this.$message.success("登陆成功")
              },1000)
            }else{
              this.$message.error(res.msg)
            }
          })
        }
      });
    },
    keyDown(e){
      if(e.keyCode==13){
        this.login()
      }
    },
    handleClose(done) {
      if(this.form.password !== this.form.confm){
        this.$message.error("两次密码不一致")
        return
      }
      if(this.form.username ==null && this.form.password ==null){
        this.$message.error("账号或密码不能为空")
        return
      }
      if (this.loading) {
        return;
      }
      this.$confirm('确定要提交表单吗？')
          .then(_ => {
            this.loading = true;
            this.timer = setTimeout(() => {
              done();
              // 动画关闭需要一定的时间
              setTimeout(() => {
                this.$refs.form.validate().then(res => {

                  this.request.post("http://localhost:98/user/register",this.form).then(res=>{
                    if(res.code === '200'){
                      this.$message.success("注册成功")
                      this.form={}
                    }else{
                      this.$message.error("注册失败")
                    }
                  })
                }).catch(err =>{
                  console.log('表单错误信息',err);
                })
                this.loading = false;
              }, 400);
            }, 2000);
          })
          .catch(_ => {});
    },
    cancelForm() {
      this.loading = false;
      this.dialog = false;
      clearTimeout(this.timer);
    }
  },
  mounted() {
    window.addEventListener("keydown",this.keyDown)
  },
  destroyed() {
    window.removeEventListener("keydown",this.keyDown,false)
  }
}
</script>

<style>
  .wrapper{
    height: 100vh;
    background-image: linear-gradient(to bottom right, #000000, #f0fdff);
    overflow: hidden;
  }
</style>