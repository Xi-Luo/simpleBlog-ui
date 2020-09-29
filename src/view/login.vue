<template>
  <el-row :gutter="10">
    <el-col :xs="{span:20,offset:2}"
            :sm="{span: 16,offset:4}" :md="{span:14,offset: 5}" :lg="{span:8,offset: 8}">
      <el-card style="margin-top: 10%">
        <el-form :model="form" status-icon :rules="rules" ref="form" style="text-align: center">
          <h2>登 录</h2>
          <el-form-item prop="name" label="帐号" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off" aria-required="true"></el-input>
          </el-form-item>
          <el-form-item prop="pass" label="密码" :label-width="formLabelWidth">
            <el-input  v-model="form.pass" autocomplete="off" show-password></el-input>
          </el-form-item>
          <el-button type="primary" @click="login('form')">登录</el-button>
        </el-form>
      </el-card>
    </el-col>
  </el-row>

</template>

<script>
import router from "@/router";

export default {
  name: "login",
  data(){
    let validateName = (rule, value, callback)=>{
      if (value===''){
        callback(new Error('请输入帐号'))
      } else  {
        callback();
      }
    };
    let validatePass =  (rule, value, callback)=>{
      console.log('vvvvvvvvvvvvv',value);
      if (value===''){
        callback(new Error('请输入密码'))
      }else {
        callback();
      }
    };

    return{
      form: {
        name: '',
        pass: ''
      },
      formLabelWidth: '40px',
      rules:{
        pass:[{
          validator: validatePass,trigger:'blur'
        }],
        name:[{
          validator: validateName, trigger: 'blur'
        }]
      }
    }
  },
  methods:{
    login(formName){
      this.$refs[formName].validate((valid)=>{
        if (valid){
          console.log('here in valid-------------------')
          this.$axios.post('/login',{
            username:this.form.name,
            password:this.form.pass
          }).then(response=>{
            console.log('in response -------------------------',response)
            if(response.data.code===200){
              this.$session.set('user',this.form.name)
              router.push({name:'home'})
            }else{
              this.$message({
                message:'帐号或密码错误',
                type: 'error'
              });
            }
          }).catch(error=>{console.log(error);})
        }else{
          this.$message({
            message:'帐号或密码错误',
            type: 'error'
          });
          return false;
        }
      })

    }
  }


}
</script>

<style scoped>

</style>