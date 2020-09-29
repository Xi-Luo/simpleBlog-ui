<template>
  <el-row :gutter="10">
    <el-col :xs="{span:20,offset:2}"
            :sm="{span: 16,offset:4}" :md="{span:14,offset: 5}" :lg="{span:12,offset: 6}" >
      <h1>{{blog.articleTitle}}</h1>
      <div class="author">作者：{{blog.author}}</div>
      <time class="time">发布于{{blog.publishDate}}</time>
      <time class="time">修改于{{blog.updateDate}}</time>
      <p> </p>
      <div>{{blog.articleContent}}</div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "viewBlog",
  data(){
    return {
      id:'',
      blog:{
        id: 0,
        author:'',
        articleTitle:'',
        publishDate:'',
        updateDate:'',
        articleContent:''
      }
    }
  },
  created() {
    this.id = this.$route.query.id
    console.log('here is id ---------------',this.id)
    this.$axios.get('/view',{params:{id: this.id}})
    .then(response=>{
      this.blog = response.data
    })
  }

}
</script>

<style scoped>
.time {
  font-size: 13px;
  color: #999;
}
.author{
  font-size: 13px;
  font-weight: bold;
}
</style>