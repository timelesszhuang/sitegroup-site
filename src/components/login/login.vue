<template>
  <div class="login">
    <div class="formmodal">
      <h3 class="title">后台登陆</h3>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-form-item prop="name">
          <el-input type="text" v-model="ruleForm.name" placeholder="请输入帐号"></el-input>
        </el-form-item>
        <el-form-item prop="pass">
          <el-input type="password" v-model="ruleForm.pass" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item prop="captcha">
          <el-col :span="10">
            <el-input type="text" v-model="ruleForm.captcha" placeholder="请输入验证码"></el-input>
          </el-col>
          <el-col :span="6" :offset="2">
            <img :src="captchaUrl" @click="refreshCaptcha">
          </el-col>
        </el-form-item>
        <el-form-item prop="rememberMe">
          <el-checkbox v-model="ruleForm.rememberMe">七天免登陆</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%;" v-loading="loading" @click="submitForm('ruleForm2')">提交






          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    data() {
      return {
        loading: false,
        ruleForm: {
          name: '',
          pass: '',
          captcha: '',
          rememberMe: ''
        },
        captchaUrl: '',
        rules: {
          name: [
            {required: true, message: '请输入名称', trigger: 'blur'}
          ],
          pass: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ],
          captcha: [
            {required: true, message: '请输入验证码', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      this.autoLogin()
      this.refreshCaptcha()
    },
    methods: {
      refreshCaptcha() {
        let _this = this
        this.$http.post(Window.host + '/index/login/getCaptcha').then(function (response) {
          if (response.status !== 200) return
          _this.captchaUrl = Window.host + response.data.captchaUrl + '?number=' + Math.random()
        })
      },
      // 自动登陆
      autoLogin() {
        // 判断浏览器端的cookie是否存在
        if (Window.cookie.get('autoLogin')) {
          // 加载动画
          let loadingInstance = this.$loading({text: '正在加载.....', body: true, lock: true})
          let _this = this
          this.$http.post(Window.host + '/index/login/autoLogin').then(function (response) {
            if (response.status !== 200) return
            if (response.data.errno !== 0) {
              Window.cookie.remove('autoLogin')
              loadingInstance.close()
            } else {
              _this.$router.replace('/index/menu/content')
              loadingInstance.close()
            }
          })
        }
      }
    }
  }

</script>
<style lang="stylus" rel="stylesheet/stylus">
  .login
    position: relative

  .formmodal
    width: 400px
    height: 300px
    margin: 150px 0 0 -200px
    position: absolute
    left: 50%
    right: 50%
    border: 1px solid #ccc
    border-radius: 5px
    padding: 30px
    background: #f9fafc

  .title
    text-align: center
    color: #505458
</style>
