<style scoped>
  .layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    height: 100%;
  }

  .layout-breadcrumb {
    padding: 10px 15px 0;
  }

  .layout-content {
    min-height: 63%;
    height: auto;
    margin: 15px;
    background: #fff;
    border-radius: 4px;
  }

  .layout-content-main {
    padding: 10px;
  }

  .ivu-row-flex {
    height: 100%;
  }

  .layout-copy {
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
  }

  .layout-menu-left {
    background: #464c5b;
  }

  .layout-header {
    height: 60px;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
  }

  .layout-logo-left {
    width: 90%;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;
  }
</style>
<template>
  <div class="layout">
    <Row type="flex">
      <i-col span="4" class="layout-menu-left">
        <Menu active-name="activename" theme="dark" width="auto" :open-names="['1']">
          <div class="layout-logo-left">
          </div>
          <Submenu name="1">
            <template slot="title">
              <Icon type="ios-navigate"></Icon>
              关键词
            </template>
            <Menu-item name="关键词管理">
              <Icon type="key"></Icon>
              <span class="layout-text" @click="routerChange('/admin/keyword','关键词管理')">关键词管理</span>
            </Menu-item>
          </Submenu>
          <Submenu name="2">
            <template slot="title">
              <Icon type="ios-keypad"></Icon>
              文章管理
            </template>
            <Menu-item name="文章分类">
              <Icon type="settings"></Icon>
              <span class="layout-text" @click="routerChange('/admin/articletype','文章分类')">文章分类</span>
            </Menu-item>
            <Menu-item name="文章">
              <Icon type="document"></Icon>
              <span class="layout-text" @click="routerChange('/common/article','文章')">文章</span>
            </Menu-item>
          </Submenu>
          <Menu-item name="重置密码">
          </Menu-item>
          <Menu-item name="退出系统">
            <Icon type="log-out" @click="logOut()"></Icon>
            <span class="layout-text" @click="logOut()">退出系统</span>
          </Menu-item>
        </Menu>
      </i-col>
      <i-col span="20">
        <div class="layout-header">
          <Row type="flex" justify="end" align="middle" class="code-row-bg">
            <Col span="2" align="center" >
            <Badge  :count="count" >
              <span @click="routerChange('/common/messageLog','错误日志')" style="cursor:pointer;">
                <Icon type="ios-bell-outline" size="26" ></Icon>
              </span>
            </Badge>
            </Col>
            <Col span="2" style="cursor:pointer">
            <Icon  type="android-lock" @click="changePwd()"></Icon>
            <span  class="layout-text" @click="changePwd()">重置密码</span>
            </Col>
            <Col span="2" style="cursor:pointer">
            <Icon type="log-out" @click="logOut()"></Icon>
            <span class="layout-text" @click="logOut()">退出系统</span>
            </Col>
          </Row>
        </div>
        <div class="layout-breadcrumb">
          <Breadcrumb>
            <Breadcrumb-item>{{activeName}}</Breadcrumb-item>
          </Breadcrumb>
        </div>
        <div class="layout-content">
          <div class="layout-content-main">
            <router-view></router-view>
          </div>
        </div>
        <div class="layout-copy">
          2015-2017 &copy; 山东强比信息技术有限公司
        </div>
      </i-col>
    </Row>
    <logout ref="logout"></logout>
    <changepwd ref="changePwd"></changepwd>
  </div>
</template>
<script>
  import logout from './login/Logout.vue';
  import changepwd from './login/Changepwd.vue';
  import http from '../assets/js/http.js';
  export default {
    data(){
      return {
          activeName: '',
          count:'无'
      }
    },
    components: {
      changepwd,
      logout
    },
    methods: {
      checkAlert() {
        this.apiGet('user/getErrorStatus').then((res) => {
          this.handelResponse(res, (data, msg) => {
            this.count=data;
            console.log(data)
          }, (data, msg) => {
            this.$Message.error(msg);
          })
        }, (res) => {
          //处理错误信息
          this.$Message.error('网络异常，请稍后重试。');
        })
      },
      routerChange (path, activeName) {
        this.activeName = activeName;
        router.push(path);
      },
      logOut(){
        this.$refs.logout.modal = true
      },
      changePwd(){
        this.$refs.changePwd.modal = true
  },
      messageLog(){
        router.replace('/common/messageLog');
      }

    },
    created () {
      let _this = this;
      setInterval(function(){
        _this.checkAlert();
      },5000);
    },
    //created 是函数
    mixins: [http]
  }
</script>
