<template>
  <div>
    <div>
      <el-input style="width: 200px;margin-left: 100px;" placeholder="请输入产品编号" suffix-icon="el-icon-search" v-model="productId"></el-input>
      <el-button type="success" @click="load">搜索</el-button>
      <el-button type="warning" @click="reset">重置</el-button>
    </div>
    <el-button type="primary" @click="newdialogFormVisible = true" >新增</el-button>
    <el-button type="text" @click="handleCheck">入库记录</el-button>

    <el-dialog title="入库记录" :visible.sync="dialogTableVisible">
      <el-table :data="gridData">
        <el-table-column property="productId" label="产品编号" ></el-table-column>
        <el-table-column property="dataProduct" label="生产日期" ></el-table-column>
        <el-table-column property="inPrice" label="入库价格"></el-table-column>
        <el-table-column property="productNumber" label="入库数量"></el-table-column>
        <el-table-column property="entrepotId" label="所属仓库"></el-table-column>
        <el-table-column property="dateTime" label="入库时间"></el-table-column>
      </el-table>
    </el-dialog>
    <el-table
        :data="tableData"
        height="70vh"
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
          prop="productName"
          label="产品名称">
      </el-table-column>
      <el-table-column
          prop="productStandard"
          label="产品规格">
      </el-table-column>
      <el-table-column
          prop="productPrice"
          label="价格">
      </el-table-column>
      <el-table-column
          prop="upLimit"
          label="数量上限">
      </el-table-column>
      <el-table-column
          prop="downLimit"
          label="数量下限"
          width="180px">
      </el-table-column>
      <el-table-column label="操作" width="250px">
        <template slot-scope="scope">
          <el-popconfirm
              confirm-button-text='好的'
              cancel-button-text='不用了'
              icon="el-icon-info"
              icon-color="red"
              title="这是一段内容确定删除吗？"
              @confirm="del(scope.row.id)"
          >
            <el-button slot="reference" type="danger" style="margin-right: 10px">删除<i class="el-icon-remove-outline"/></el-button>
          </el-popconfirm>
          <el-button slot="reference" type="success" @click="handleEdit(scope.row)">修改<i class="el-icon-edit"/></el-button>
          <el-button slot="reference" type="warning" @click="handleInput(scope.row)">入库<i class="el-icon-edit"/></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="padding: 10px 0">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </div>


    <!--  产品修改对话框-->
    <el-dialog title="产品信息" :visible.sync="dialogFormVisible">
      <el-form :model="forms">
        <el-form-item label="产品编号" :label-width="formLabelWidth">
          <el-input v-model="forms.productId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="产品名称" :label-width="formLabelWidth">
          <el-input v-model="forms.productName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="产品规格" :label-width="formLabelWidth">
          <el-input v-model="forms.productStandard" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth">
          <el-input v-model="forms.productPrice" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="数量上限" :label-width="formLabelWidth">
          <el-input v-model="forms.upLimit" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="数量下限" :label-width="formLabelWidth">
          <el-input v-model="forms.downLimit" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd">确 定</el-button>
      </div>
    </el-dialog>

<!--    入库对话框-->
    <el-dialog title="入库管理" :visible.sync="formVisible">
      <el-form :model="arr">
        <el-form-item label="产品编号" :label-width="formLabelWidth">
          <el-input v-model="arr.productId" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="所属仓库" :label-width="formLabelWidth">
          <el-input v-model="arr.entrepotId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="入库价格" :label-width="formLabelWidth">
          <el-input v-model="arr.inPrice" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="入库数量" :label-width="formLabelWidth">
          <el-input v-model="arr.productNumber" autocomplete="off"></el-input>
        </el-form-item>
        <div class="block" style="margin-left: 52px">
          <span class="demonstration">生产日期</span>
          <el-date-picker
              v-model="arr.dataProduct"
              type="date"
              placeholder="选择日期"
          style="margin-left: 10px">
          </el-date-picker>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="formVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSure">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 新增对话框-->
    <el-dialog title="新增产品信息" :visible.sync="newdialogFormVisible">
      <el-form :model="newforms" ref="ruleForm">
        <el-form-item label="产品编号" :label-width="formLabelWidth" prop="product_id">
          <el-input v-model="newforms.productId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="产品名称" :label-width="formLabelWidth" prop="product_name">
          <el-input v-model="newforms.productName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="产品规格" :label-width="formLabelWidth" prop="product_standard">
          <el-input v-model="newforms.productStandard" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth" prop="product_price">
          <el-input v-model="newforms.productPrice" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="数量上限" :label-width="formLabelWidth" prop="up_limit">
          <el-input v-model="newforms.upLimit" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="数量下限" :label-width="formLabelWidth" prop="down_limit">
          <el-input v-model="newforms.downLimit" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="newdialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd">添 加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Product",
  data(){
    return{
      tableData:[],
      productId:"",
      productName:"",
      productStandard:"",
      productPrice:"",
      upLimit:"",
      downLimit:"",
      dialogTableVisible: false,
      dialogFormVisible: false,
      newdialogFormVisible: false,
      formVisible:false,
      forms:{},
      newforms:{},
      arr:{},
      gridData:[],
      formLabelWidth: '120px',
      total:0,
      pageNum:1,
      pageSize:5,

    }
  },
  methods:{
    load(){
      this.request.get("http://localhost:98/product/page",{
        params:{
          pageSize:this.pageSize,
          pageNum:this.pageNum,
          productId:this.productId

        }
      }).then(res=>{
        console.log(res)
        this.dialogTableVisible=false
        this.tableData=res.data.records
        this.total=res.data.total
      })
    },
    reset(){
      this.productId=""
      this.load()
    },
    handleSizeChange(pageSize) {
      this.pageSize=pageSize
      this.load()
    },
    handleCurrentChange(pageNum) {
      this.pageNum=pageNum
      this.load()
    },
    handleAdd() {
      this.request.post("http://localhost:98/product",this.newforms).then(res=>{
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
      this.request.delete("http://localhost:98/product/"+id).then(res=>{
        if(res.code==='200'){
          this.$message.success("删除成功")
          this.load()
        }else{
          this.$message.error("删除失败")
        }
      })
    },
    handleEdit(row) {
      this.forms=row
      this.dialogFormVisible=true
    },
    handleInput(row){
      this.formVisible=true
      this.arr=row
    },
    handleSure(){
      this.request.post("http://localhost:98/product/insave",this.arr).then(res=>{
        if(res.code==='200'){
          this.formVisible=false
          this.$message.success("入库成功")
        }else{
          this.$message.error("入库失败")
        }
      })
    },
    handleCheck(){
      this.request.get("http://localhost:98/ininventory",{
        params:{
          productId:this.productId,
          dataProduct:this.dataProduct,
          inPrice:this.inPrice,
          productNumber: this.productNumber,
          entrepotId: this.entrepotId,
          dateTime: this.dateTime
        }
      }).then(res=>{
        this.gridData=res.data
        this.dialogTableVisible=true
      })
    },
  },
  created(){
    this.load()
  }
}
</script>

<style>

</style>