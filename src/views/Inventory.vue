<template>
  <div>
    <el-button type="text" @click="handleCheck">出库记录</el-button>

    <el-dialog title="出库记录" :visible.sync="dialogTableVisible">
      <el-table :data="gridData">
        <el-table-column property="productId" label="产品编号" ></el-table-column>
        <el-table-column property="dataProduct" label="生产日期" ></el-table-column>
        <el-table-column property="price" label="出库价格"></el-table-column>
        <el-table-column property="productNumber" label="出库数量"></el-table-column>
        <el-table-column property="entrepotId" label="所属仓库"></el-table-column>
        <el-table-column property="OutInventoryTime" label="出库时间"></el-table-column>
        <el-table-column property="customId" label="客户编号"></el-table-column>
        <el-table-column property="userId" label="经办人"></el-table-column>
      </el-table>
    </el-dialog>

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
          prop="productId"
          label="产品编号">
      </el-table-column>
      <el-table-column
          prop="inventoryId"
          label="存储编号">
      </el-table-column>
      <el-table-column
          prop="entrepotId"
          label="仓库编号">
      </el-table-column>
      <el-table-column
          prop="inPrice"
          label="入库价格">
      </el-table-column>
      <el-table-column
          prop="productNumber"
          label="入库数量">
      </el-table-column>
      <el-table-column
          prop="dataProduct"
          label="生产日期"
          width="180px">
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
          <el-button slot="reference" type="success" @click="handleEdit(scope.row)" style="margin-left: 10px">出库<i class="el-icon-edit"/></el-button>
        </template>
      </el-table-column>
    </el-table>


    <!--  对话框-->

    <el-dialog title="出库管理" :visible.sync="dialogFormVisible">
      <el-form :model="forms">
        <el-form-item label="产品编号" :label-width="formLabelWidth">
          <el-input v-model="forms.productId" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="存储编号" :label-width="formLabelWidth">
          <el-input v-model="forms.inventoryId" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="仓库编号" :label-width="formLabelWidth">
          <el-input v-model="forms.entrepotId" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth">
          <el-input v-model="forms.inPrice" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="数量" :label-width="formLabelWidth">
          <el-input v-model="forms.productNumber" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="客户编号" :label-width="formLabelWidth">
          <el-input v-model="forms.customId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="经办人" :label-width="formLabelWidth">
          <el-input v-model="forms.userId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="生产日期" :label-width="formLabelWidth">
          <el-input v-model="forms.dataProduct" autocomplete="off" disabled></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleOutput">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "inventory",
  data(){
    return{
      tableData:[],
      inventoryId: "",
      dialogTableVisible: false,
      dialogFormVisible: false,
      forms:{},
      gridData:{},
      formLabelWidth: '120px'
    }
  },
  methods:{
    load(){
      this.request.get("http://localhost:98/inventory",{
        params:{
          productId:this.productId,
          inventoryId:this.inventoryId,
          entrepotId:this.entrepotId,
          inPrice:this.inPrice,
          productNumber:this.productNumber,
          dataProduct:this.dataProduct
        }
      }).then(res=>{
        this.tableData=res.data
        this.dialogFormVisible=false
      })
    },
    handleEdit(row){
      this.forms=row
      this.dialogFormVisible=true

    },
    handleOutput(){
      this.request.post("http://localhost:98/inventory/output",this.forms).then(res=>{
        if(res.code==='200'){

          this.dialogFormVisible=false
          this.load()
          this.$message.success("出库成功")
        }else{
          this.$message.error("出库失败")
        }
      })
    },
    handleCheck(){
      this.request.get("http://localhost:98/outinventory",{
        params:{
          productId:this.productId,
          dataProduct:this.dataProduct,
          price:this.price,
          productNumber: this.productNumber,
          entrepotId: this.entrepotId,
          OutInventoryTime: this.OutInventoryTime,
          customId:this.customId,
          userId:this.userId
        }
      }).then(res=>{
        this.gridData=res.data
        this.dialogTableVisible=true
      })
    }
  },
  created(){
    this.load()
  }
}
</script>

<style scoped>

</style>