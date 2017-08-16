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
    height: 100%
  }

  .layout-header {
    height: 60px;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
  }

  .layout-logo-left {
    width: 90%;
    height: 30px;
    border-radius: 3px;
    margin: 15px auto;
  }
</style>
<template>
  <div class="layout">

    <Row type="flex">
      <i-col span="4" class="layout-menu-left">
        <Menu active-name="activename" theme="dark" width="auto" :open-names="['1']">
          <div class="layout-logo-left" style="width: 150px;height: 58px;margin: 10px auto;">
            <img style="" src="../../src/assets/logo.png" alt="">
          </div>
          <template slot="title">
            <Icon type="ios-keypad"></Icon>
            管理
          </template>
          <Menu-item name="微信公众号文章管理">
            <Icon type="settings"></Icon>
            <span class="layout-text" @click="routerChange('/common/weixinarticle','微信公众号文章管理')">微信公众号文章管理</span>
          </Menu-item>
          <Menu-item name="新闻文章管理">
            <Icon type="ios-bookmarks"></Icon>
            <span class="layout-text" @click="routerChange('/common/news','新闻文章管理')">新闻文章管理</span>
          </Menu-item>
          <Menu-item name="私有文章库">
            <Icon type="ios-book-outline"></Icon>
            <span class="layout-text" @click="routerChange('/common/article','私有文章库')">私有文章库</span>
          </Menu-item>
          <Menu-item name="文章a链接">
            <Icon type="wrench"></Icon>
            <span class="layout-text" @click="routerChange('/common/href','文章插入链接')">文章插入链接</span>
          </Menu-item>
          <Menu-item name="文章关键词替换">
            <Icon type="ios-gear"></Icon>
            <span class="layout-text" @click="routerChange('/common/substitution','文章关键词替换')">文章关键词替换</span>
          </Menu-item>
          <Menu-item name="页面生成">
            <Icon type="ios-cog"></Icon>
            <span class="layout-text" @click="operation()">页面生成</span>
          </Menu-item>
          <Menu-item name="搜索引擎优化管理">
            <Icon type="settings"></Icon>
            <span class="layout-text" @click="routerChange('/common/tdk','搜索引擎优化管理')">搜索引擎优化管理</span>
          </Menu-item>
          <Menu-item name="静态化配置">
            <Icon type="android-options"></Icon>
            <span class="layout-text" @click="routerChange('/common/staticconfig','静态化配置')">静态化配置</span>
          </Menu-item>
          <Menu-item name="关键词占比">
            <Icon type="android-cloud-circle"></Icon>
            <span class="layout-text" @click="routerChange('/common/keyword','关键词占比')">关键词占比统计</span>
          </Menu-item>
          <Menu-item name="浏览量统计">
            <Icon type="settings"></Icon>
            <span class="layout-text" @click="routerChange('/common/pv','浏览量统计')">浏览量统计</span>
          </Menu-item>
          <Menu-item name="浏览量展示">
            <Icon type="ios-monitor-outline"></Icon>
            <span class="layout-text" @click="routerChange('/common/show','浏览量展示')">浏览量展示</span>
          </Menu-item>
          <Menu-item name="爬虫统计">
            <Icon type="ios-book-outline"></Icon>
            <span class="layout-text" @click="routerChange('/common/crawler','爬虫统计')">爬虫统计</span>
          </Menu-item>
          <Menu-item name="搜索引擎占比">
            <Icon type="monitor"></Icon>
            <span class="layout-text" @click="routerChange('/common/flow','搜索引擎占比')">搜索引擎占比</span>
          </Menu-item>
          <Menu-item name="重置密码">
          </Menu-item>
        </Menu>
      </i-col>
      <i-col style="position: relative;overflow: auto" span="20" >
        <div class="layout-header">
          <Row type="flex" justify="end" align="middle" class="code-row-bg">
            <Col span="4" align="right" style="cursor: pointer">
            <Icon type="paper-airplane"></Icon>
            <a v-bind:href="url" target="_blank" title="点此预览此网站" style="font-size: 15px;">{{SiteName}}</a>
            </Col>
            <Col span="2" align="right">
            <Badge :count="count">
              <span @click="routerChange('/common/messageLog','消息')" style="cursor:pointer;">
                <Icon type="ios-bell-outline" size="26"></Icon>
              </span>
            </Badge>
            </Col>
            <Col span="2" align="right" style="cursor: pointer">
            <Icon type="home" style="font-size: 15px" @click="routerChange('/common/count')"></Icon>
            <span class="layout-text" style="font-family:Microsoft YaHei;font-size: 15px;"
                  @click="routerChange('/common/count')">首页</span>
            </Col>
            <Col span="2" align="center" style="cursor: pointer">
            <Icon type="android-lock" @click="changePwd()"></Icon>
            <span class="layout-text" @click="changePwd()">重置密码</span>
            </Col>
            <Col span="2" style="cursor: pointer">
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
          2015-2017 &copy; 北京易至信科技有限公司
        </div>
      </i-col>
    </Row>
    <logout ref="logout"></logout>
    <changepwd ref="changePwd"></changepwd>
    <operation ref="operation"></operation>
  </div>
</template>
<script>
  import logout from './login/Logout.vue';
  import changepwd from './login/Changepwd.vue';
  import operation from './operation/operation.vue';
  import http from '../assets/js/http.js';

  export default {
    data() {
      return {
        activeName: '',
        count: '无',
        SiteName:''
      }
    },
    components: {
      changepwd,
      logout,
      operation,
    },
    computed: {
      url: function () {
        this.uuudomain = "http://" + Lockr.get('urldomain')
        return this.uuudomain
      }
    },
    methods: {
      checkAlert() {
        this.apiGet('user/getErrorStatus').then((res) => {
          this.handelResponse(res, (data, msg) => {
            this.count = data;
//            console.log(data)
          }, (data, msg) => {
            this.$Message.error(msg);
          })
        }, (res) => {
          //处理错误信息
          this.$Message.error('网络异常，请稍后重试。');
        })
      },
      routerChange(path, activeName) {
        this.activeName = activeName;
        router.push(path);
      }, operation() {
        this.$refs.operation.modal = true
      },
      logOut() {
        this.$refs.logout.modal = true
      },
      changePwd() {
        this.$refs.changePwd.modal = true
      },

      messageLog() {
        router.replace('/common/messageLog');
      }

    },
    created() {
      document.title = Lockr.get('currentSiteName');
      let SiteName = Lockr.get('currentSiteName');
      this.SiteName = SiteName;
//  console.log(Lockr.get('userInfo'))
//      console.log(Lockr.get('urldomain'))
//  console.log(document.title);
//      let rememberKey = Lockr.get('site_rememberKey')
//      console.log(rememberKey)
//      let site_id = Lockr.get('site_id')
//      console.log(site_id)
      if (!Lockr.get('userInfo')) {
        //表示没有登陆
        this.$Message.error("请先登录");
        setTimeout(() => {
          router.replace('/')
        }, 1500)
        return
      }
      let _this = this;
      setInterval(function () {
        _this.checkAlert();
      }, 120000);
    },
    mixins: [http]
  }
</script>
