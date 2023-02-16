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
          prop="entrepotId"
          label="仓库编号">
      </el-table-column>
      <el-table-column
          prop="entrepotName"
          label="仓库名称">
      </el-table-column>
      <el-table-column
          prop="entrepotState"
          label="仓库说明">
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

    <el-dialog title="仓库管理" :visible.sync="dialogFormVisible">
      <el-form :model="forms">
        <el-form-item label="仓库编号" :label-width="formLabelWidth">
          <el-input v-model="forms.entrepotId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="仓库名称" :label-width="formLabelWidth">
          <el-input v-model="forms.entrepotName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="仓库说明" :label-width="formLabelWidth">
          <el-input v-model="forms.entrepotState" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 新增对话框 -->
    <el-dialog title="仓库管理" :visible.sync="newdialogFormVisible">
      <el-form :model="newforms">
        <el-form-item label="仓库编号" :label-width="formLabelWidth">
          <el-input v-model="newforms.entrepotId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="仓库名称" :label-width="formLabelWidth">
          <el-input v-model="newforms.entrepotName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="仓库说明" :label-width="formLabelWidth">
          <el-input v-model="newforms.entrepotState" autocomplete="off"></el-input>
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
  name: "Entrepot",
  data(){
    return{
      tableData:[],
      entrepotId:"",
      entrepotName:"",
      entrepotState:"",
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
      this.request.get("http://localhost:98/entrepot",{
        params:{
          entrepotId:this.entrepotId,
          entrepotName:this.entrepotName,
          entrepotState:this.entrepotState
        }
      }).then(res=>{
        this.dialogFormVisible=false
        this.tableData=res.data
      })
    },
    handleAdd(){
      this.request.post("http://localhost:98/entrepot",this.newforms).then(res=>{
        if(res.code==='200'){
          this.newdialogFormVisible=false
          this.load()
          this.$message.success("保存成功")
          this.newforms={}
        }else{
          this.$message.error("保存失败")
        }
      })
    },
    del(id){
      this.request.delete("http://localhost:98/entrepot/"+id).then(res=>{
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

<style scoped>

</style>