<template>
  <el-row style="margin-top: 3%">
    <el-col :xs="{span:20,offset:2}"
            :sm="{span: 16,offset:4}" :md="{span:14,offset: 5}" :lg="{span:12,offset: 6}">
      <el-table
          :data="tableData"
          border
          style="width: 100%">
        <el-table-column
            fixed
            prop="articleTitle"
            label="标题"
            width="150">
        </el-table-column>
        <el-table-column
            prop="author"
            label="作者"
            width="120">
        </el-table-column>
        <el-table-column
            prop="publishDate"
            label="发布时间"
            width="120">
        </el-table-column>
        <el-table-column
            prop="updateDate"
            label="修改时间"
            width="120">
        </el-table-column>
        <el-table-column
            fixed="right"
            label="操作"
            width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
            <el-button type="text" size="small" style="color: red" @click="deleteItem(scope.index,scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>

<script>
import router from "@/router";

export default {
  name: "manage",
  data(){
    return{
      tableData:[
        {
          articleTitle:'ddddddddd',
          publishDate:'sssssss',
          updateDate:'dddddddd',
          author:'sssss'
        },
        {
          articleTitle:'ddddddddd',
          publishDate:'sssssss',
          updateDate:'dddddddd',
          author:'sssss'
        }
      ]
    }
  },
  created() {
    let s = this.$session.get('user')
    this.$axios.get('/userArticle',{
      params:{
        username:s
      }
    }).then(res=>{
      if (res&&res.status===200){
        this.tableData=res.data
      }
    })

  },
  methods:{
    handleClick(row){
      router.push({
        path:'/new',
        query:{
          id: row.id
        }
      })
      console.log('click the row-------------',row,row.id)
    },
    deleteItem(index,row){

      this.$axios.post('/delete',{
        id:row.id
      }).then(res=>{
        if (res.status===200) {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.tableData=this.tableData.splice(index,1)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>