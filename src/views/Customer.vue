<template>
  <div>
    <el-button type="primary" @click="newdialogFormVisible = true" >新增</el-button>

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
        prop="nickname"
        label="客户编号">
    </el-table-column>
    <el-table-column
        prop="username"
        label="客户姓名">
    </el-table-column>
    <el-table-column
        prop="form"
        label="客户类型">
    </el-table-column>
    <el-table-column
        prop="contact"
        label="联系人">
    </el-table-column>
    <el-table-column
        prop="phone"
        label="联系电话">
    </el-table-column>
    <el-table-column
        prop="address"
        label="地址"
        width="180px">
    </el-table-column>
    <el-table-column
        prop="remark"
        label="备注">
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

  <el-dialog title="客户信息" :visible.sync="dialogFormVisible">
    <el-form :model="forms">
      <el-form-item label="客户编号" :label-width="formLabelWidth">
        <el-input v-model="forms.nickname" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="客户姓名" :label-width="formLabelWidth">
        <el-input v-model="forms.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="客户类型" :label-width="formLabelWidth">
        <el-input v-model="forms.form" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="联系人" :label-width="formLabelWidth">
        <el-input v-model="forms.contact" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话" :label-width="formLabelWidth">
        <el-input v-model="forms.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="地址" :label-width="formLabelWidth">
        <el-input v-model="forms.address" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="备注" :label-width="formLabelWidth">
        <el-input v-model="forms.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleAdd">确 定</el-button>
    </div>
  </el-dialog>

    <!-- 新增对话框-->
    <el-dialog title="新增客户信息" :visible.sync="newdialogFormVisible">
      <el-form :model="newforms">
        <el-form-item label="客户编号" :label-width="formLabelWidth">
          <el-input v-model="newforms.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="客户姓名" :label-width="formLabelWidth">
          <el-input v-model="newforms.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="客户类型" :label-width="formLabelWidth">
          <el-input v-model="newforms.form" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系人" :label-width="formLabelWidth">
          <el-input v-model="newforms.contact" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="newforms.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="newforms.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="newforms.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="newdialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Customer",
  data() {
    return {
      tableData: [],
      nickname:"",
      username:"",
      form:"",
      contact:"",
      phone:"",
      address:"",
      remark:"",
      dialogTableVisible: false,
      dialogFormVisible: false,
      newdialogFormVisible: false,
      forms:{},
      newforms:{},
      formLabelWidth: '120px'
    }
  },
  methods:{
    load(){
      this.request.get("http://localhost:98/customer",{
        params:{
          nickname:this.nickname,
          username:this.username,
          form:this.form,
          contact:this.contact,
          phone:this.phone,
          address:this.address,
          remark:this.remark
        }
      }).then(res=>{
        console.log(res)
        this.dialogFormVisible=false
        this.tableData=res.data
      })
    },
    handleAdd(){
      this.request.post("http://localhost:98/customer",this.newforms).then(res=>{
        if(res.code==='200') {
          this.newdialogFormVisible = false
          this.load()
          this.$message.success("保存成功")
          this.newforms={}
        }else{
          this.$message.error("保存失败")
        }
      })
    },
    del(id){
      this.request.delete("http://localhost:98/customer/"+id).then(res=>{
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
  created(){
    this.load()
  }
}
</script>

<style>

</style>