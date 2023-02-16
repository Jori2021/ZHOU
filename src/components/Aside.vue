<template>
  <div>
    <el-row class="tac" >
      <el-col :span="12">
        <el-menu
            router
            :default-openeds="opens"
            class="el-menu-vertical-demo"

            background-color="#545c64"
            text-color="#fff"
            style="width: 300px;height:100vh;"
            active-text-color="#ffd04b">
<!--          <el-menu-item index="/home">-->
<!--            <template slot="title">-->
<!--              <i class="el-icon-location"></i>-->
<!--              <span>首页</span>-->
<!--            </template>-->
<!--          </el-menu-item>-->
<!--          <el-menu-item index="/custom">-->
<!--            <i class="el-icon-user-solid"></i>-->
<!--            <span slot="title">客户信息</span>-->
<!--          </el-menu-item>-->
<!--          <el-menu-item index="/product">-->
<!--            <i class="el-icon-menu"></i>-->
<!--            <span slot="title">产品信息</span>-->
<!--          </el-menu-item>-->
<!--          <el-menu-item index="/entrepot">-->
<!--            <i class="el-icon-document"></i>-->
<!--            <span slot="title">仓库管理</span>-->
<!--          </el-menu-item>-->
<!--          <el-menu-item index="/inventory">-->
<!--            <i class="el-icon-setting"></i>-->
<!--            <span slot="title">库存管理</span>-->
<!--          </el-menu-item>-->
<!--          <el-menu-item index="/total">-->
<!--            <i class="el-icon-money"></i>-->
<!--            <span slot="title">统计</span>-->
<!--          </el-menu-item>-->
<!--          <el-menu-item index="/role">-->
<!--            <i class="el-icon-money"></i>-->
<!--            <span slot="title">用户管理</span>-->
<!--          </el-menu-item>-->
          <div v-for="item in menusList" :key="item.id">
            <div v-if="item.path">
              <el-menu-item :index="item.path">
                <i :class="item.icon"></i>
                <span slot="title">{{item.name}}</span>
              </el-menu-item>
            </div>
          </div>
        </el-menu>
      </el-col>
    </el-row>
  </div>

</template>

<script>
export default {
  name: "Aside",
  data(){
    return{
      menusList:localStorage.getItem("menusList") ? JSON.parse(localStorage.getItem("menusList")) : [],
      opens:localStorage.getItem("menusList") ? JSON.parse(localStorage.getItem("menusList")).map(v => v.id + '') : []
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },


  }
}
</script>

<style>

</style>