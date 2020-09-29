<template>
  <div>
    <router-view></router-view>
    <el-row :gutter="10">
      <el-col
          :xs="{span:20,offset:2}"
          :sm="{span: 16,offset:4}" :md="{span:14,offset: 5}" :lg="{span:12,offset: 6}" style="text-align: center">
        <div v-for="item in blogs.slice((currentPage-1)*pageSize,currentPage*pageSize)" :key="item.id" class="card-group">
          <el-card shadow="hover" :body-style="{padding:'18px'}">
            <div slot="header" class="clearfix text-head">
              <span>{{item.articleTitle}}</span>
              <el-button style="float: right; padding: 3px 0" type="text" @click="goToView(item.id)">查看原文</el-button>
            </div>
            <div  class="text item">
              <span class="author">作者：{{item.author}} </span>
              <time class="time"> 发布于{{item.publishDate}} </time>
              <time v-if="item.updateDate!==''" class="time"> 修改于{{item.updateDate}}</time>
              <p class="content">
                {{ item.articleContent }}
              </p>

            </div>
          </el-card>
        </div>
        <el-pagination
            background
            layout="prev, pager, next"
            @current-change="handleCurrentChange"
            :page-size="pageSize"
            :current-page="currentPage"
            :total="blogs.length">
        </el-pagination>
      </el-col>
    </el-row>
  </div>

</template>

<script>

export default {
  name: "home",
  data(){
    return{
      blogs:[
        {
          id: 0,
          author:'',
          articleTitle:'',
          publishDate:'',
          updateDate:'',
          articleContent:''
        }
      ],
      currentPage:1,
      pageSize:5
    }
  },
  created() {

    let d = new Date()
    let s = this.$moment(d).format("YYYY-MM-DD  HH:MM:SS")
    console.log('here is date-----------------',s)
    this.axios.get('/all')
        .then(response=>{
          if (response&&response.status===200){
            this.blogs = response.data;
          }
        }).catch()
  },
  methods:{

    goToView: function (num) {
      this.$router.push({
        path: '/view',
        query:{
          id:num
        }
      })
    },
    handleCurrentChange:function (currentPage){
      this.currentPage =currentPage
    }
  }

}
</script>

<style scoped>
.content{
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
.time {
  font-size: 13px;
  color: #999;
}
.author{
  font-size: 13px;
  font-weight: bold;
}
.text-head{
  font-weight: bold;
  font-size: large;
  font-max-size: large;
  font-min-size: small;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 0;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.card-group{
  padding: 15px;
  text-align: left;
}

</style>