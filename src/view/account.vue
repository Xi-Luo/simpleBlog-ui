<template>
  <el-row>
    <el-col :xs="{span:20,offset:2}" :sm="{span: 16,offset:4}"
            :md="{span:14,offset: 5}" :lg="{span:8,offset: 8}">
      <el-card style="margin-top: 10%">
        <el-form :model="form" status-icon :rules="rules" ref="form" style="text-align: center">
          <h2>修改密码 </h2>
          <el-form-item prop="oldPass" label="旧密码" :label-width="formLabelWidth">
            <el-input v-model="form.oldPass" autocomplete="off" show-password></el-input>
          </el-form-item>
          <el-form-item prop="pass" label="新密码" :label-width="formLabelWidth">
            <el-input  v-model="form.pass" autocomplete="off" show-password></el-input>
          </el-form-item>
          <el-form-item prop="passConfirm" label="确认密码" :label-width="formLabelWidth">
            <el-input  v-model="form.passConfirm" autocomplete="off" show-password></el-input>
          </el-form-item>
          <el-button type="primary" @click="submit('form')">确认</el-button>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "account",
  data(){
    let validateOldPass = (rule, value, callback)=>{
      if(value===''){
        callback(new Error('请输入旧密码'));
      }else {
        callback()
      }
    }
    let validatePass = (rule,value, callback) =>{
      if(value===''){
        callback(new Error('请输入新密码'));
      }else {
        if (value!==''){
          this.$refs.form.validateField('passConfirm')
        }
        callback()
      }
    }
    let validatePassConfirm = (rule, value, callback) =>{
      if (value === ''){
        callback(new Error('请再次确认新密码'))
      } else if (value !== this.form.pass){
        callback(new Error('与新密码不一致'))
      } else {
        callback()
      }
    }


    return{
      form:{
        oldPass:'',
        pass:'',
        passConfirm:''
      },
      formLabelWidth: '80px',
      rules:{
        oldPass: [{validator:validateOldPass, trigger: 'blur'}],
        pass:  [{validator: validatePass, trigger: 'blur'}],
        passConfirm: [{validator: validatePassConfirm, trigger: 'blur'}]
      }
    }
  },
  methods:{
    submit(formName){
      this.$refs[formName].validate((valid)=>{
        if(valid){
          this.$axios.post('/changePass',{
            username: this.$session.get('user'),
            oldPass:this.form.oldPass,
            newPass: this.form.pass
          }).then(response=>{
            if(response.data){
              this.$message({
                type: 'success',
                message: '修改成功！'
              })
            }else {
              this.$message({
                type: 'error',
                message: '原密码错误'
              })
            }
          }).catch(error=>{console.log(error)})
        }
      })
    }
  }
}
</script>

<style scoped>

</style>