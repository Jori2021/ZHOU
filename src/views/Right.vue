<template>
  <div>
    <el-button type="primary" @click="dialogFormVisible = true" >新增</el-button>
    <el-table
        :data="tableData"
        height="80vh"
        border
        style="width: 100%">
      <el-table-column
          prop="id"
          label="ID"
          width="50px">
      </el-table-column>
      <el-table-column
          prop="username"
          label="用户名称">
      </el-table-column>
      <el-table-column
          prop="password"
          label="用户密码">
      </el-table-column>
      <el-table-column
          prop="type"
          label="用户类型">
      </el-table-column>
      <el-table-column label="操作" width="200px">
        <template slot-scope="scope">
          <el-popconfirm
              confirm-button-text='好的'
              cancel-button-text='不用了'
              icon="el-icon-info"
              icon-color="red"
              title="这是一段内容确定删除吗？"
              @confirm="del(scope.row.id)"
          >
            <el-button slot="reference" type="danger">删除<i class="el-icon-remove-outline"/></el-button>
          </el-popconfirm>
          <el-button slot="reference" type="success" @click="handleEdit(scope.row)" style="margin-left: 10px">修改<i class="el-icon-edit"/></el-button>
        </template>
      </el-table-column>
    </el-table>


    <!--  对话框-->

    <el-dialog title="用户管理" :visible.sync="dialogFormVisible">
      <el-form :model="forms">
        <el-form-item label="用户名称" :label-width="formLabelWidth">
          <el-input v-model="forms.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" :label-width="formLabelWidth">
          <el-input v-model="forms.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户类型" :label-width="formLabelWidth">
          <el-input v-model="forms.type" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Right",
  data(){
    return{
      tableData:[],
      dialogTableVisible: false,
      dialogFormVisible: false,
      forms:{},
      formLabelWidth: '120px'
    }
  },
  methods:{
    load(){
      this.request.post("http://localhost:98/user/right",{
        params:{
          id:this.id,
          username:this.username,
          password:this.password,
          type:this.type
        }
      }).then(res=>{
        this.dialogFormVisible=false
        this.tableData=res.data
      })
    },
    handleAdd(){
      this.request.post("http://localhost:98/user/saves",this.forms).then(res=>{
        if(res.code==='200'){
          this.dialogFormVisible=false
          this.load()
          this.$message.success("保存成功")
        }else{
          this.$message.error("保存失败")
        }
      })
    },
    del(id){
      this.request.delete("http://localhost:98/user/"+id).then(res=>{
        if(res.code==='200'){
          this.load()
          this.$message.success("删除成功")
        }else{
          this.$message.error("删除失败")
        }
      })
    },
    handleEdit(row){
      this.forms=row
      this.dialogFormVisible=true
    }
  },
  created() {
    this.load()
  }
}
</script>

<style scoped>

</style>