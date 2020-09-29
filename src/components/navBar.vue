<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-menu
            :default-active="activeIndex2"
            style="width: 100%;margin: 0"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
          <el-menu-item index="home">
            <i class="el-icon-s-home"></i>
            首页
          </el-menu-item>
          <el-menu-item index="new" v-if="this.$session.get('user')">
            <i class="el-icon-edit-outline"></i>
            发表博客
          </el-menu-item>
          <el-menu-item index="manage" v-if="this.$session.get('user')">
            <i class="el-icon-s-management"></i>
            博客管理
          </el-menu-item>
          <el-menu-item style="float: right" index="login" v-if="!this.$session.get('user')">
            <i class="el-icon-user-solid"></i>
            登录
          </el-menu-item>
          <el-menu-item style="float: right" index="out" v-if="this.$session.get('user')">
            <i class="el-icon-switch-button"></i>
            注销
          </el-menu-item>
          <el-menu-item style="float: right" index="account" v-if="this.$session.get('user')">
            <i class="el-icon-user-solid"></i>
            {{this.$session.get('user')}}
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>

</template>

<script>
import router from "@/router";

export default {
  name: "navBar",
  data(){
    return {
      activeIndex2: 'home',
      username:'',
      login: false
    };
  },
  methods:{
    handleSelect(key, keyPath) {
      if(key==='out') {
        this.$session.set('user',null)
        router.go(0)
      } else {
        router.push({path: '/'+key});
      }
      console.log('here is key keyPath',key,keyPath)

    }
  },
  watch:{
    $route(to,from){
      this.activeIndex2 = to.name;
      console.log(to , from)
    }
  },
  created() {
    this.username = this.$session.get('user')
    console.log('here is session--------------',this.username)
  }


}
</script>

<style scoped>

</style>