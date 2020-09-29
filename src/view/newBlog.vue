<template>
  <el-row :gutter="10">
    <el-col :xs="{span:20,offset:2}" :sm="{span: 16,offset:4}" :md="{span:14,offset: 5}" :lg="{span:12,offset: 6}"  >
      <p></p>
      <el-form :model="blog">
        <el-form-item prop="articleTitle" label="标题:" label-width="45px">
          <el-input v-model="blog.articleTitle" aria-placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item prop="articleContent" label="内容:" >
          <el-input :autosize="{minRows:17,maxRows:20}" type="textarea" v-model="blog.articleContent" aria-placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-button style="float: right" type="primary" @click="submit">发布</el-button>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import router from "@/router";

export default {
  name: "newBlog",
  data(){
    return{
      newOne:true,
      blog:{
        id:'',
        author:'',
        articleTitle:'',
        publishDate:'',
        updateDate:'',
        articleContent:''
      }
    }
  },
  created() {
    if(this.$route.query.id){
      this.axios.get('/view',{params:{id:this.$route.query.id}})
          .then(response=>{this.blog=response.data;this.newOne=false})
    }
  },
  methods:{
    submit(){
      if(this.newOne){
        this.$axios.post('/post',{
          id:0,
          author:this.$session.get('user'),
          publishDate: this.$moment(new Date()).format("YYYY-MM-DD HH:MM:SS"),
          updateDate:'',
          articleTitle:this.blog.articleTitle,
          articleContent:this.blog.articleContent
        }).then(res=>{
          if(res.data){
            this.$message({
              type:'success',
              message:'发布成功'
            })
          }else {
            this.$message({
              type:'error',
              message:'发布失败'
            })
          }
        })
      }else{
        this.$axios.post('/post',{
          id:this.blog.id,
          author:this.blog.author,
          publishDate: this.blog.publishDate,
          updateDate:this.$moment(new Date()).format("YYYY-MM-DD HH:MM:SS"),
          articleTitle:this.blog.articleTitle,
          articleContent:this.blog.articleContent
        }).then(res=>{
          if(res.data){
            this.$message({
              type:'success',
              message:'发布成功'
            })
          }else {
            this.$message({
              type:'error',
              message:'发布失败'
            })
          }
        })
      }

      router.push({path:'/home'})
    }
  }


}
</script>

<style scoped>
</style>