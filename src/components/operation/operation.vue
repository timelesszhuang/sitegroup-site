<style>
  .change-pwd-form {
    padding: 20px;
  }
</style>
<template>
  <div>
    <Modal
      v-model="modal">
      <p slot="header" style="font-size:20px;color:#f60;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>页面静态化</span>
      </p>
      <div style="text-align:center">
        <Button type="info" @click="homepage()">生成首页</Button>
        <Button type="success" @click="article()">文章同步</Button>
        <Button type="warning" @click="menu()">更新栏目</Button>
        <Button type="error" @click="generate()">一键生成</Button>
      </div>
      <div slot="footer">
      </div>
    </Modal>
  </div>
</template>
<script>
  import http from '../../assets/js/http.js'
  export default {
    data () {
      return {
        modal: false,
        modal_loading: false,
      }
    },
    methods: {
        generate(){
        let _this = this
        this.$Modal.confirm({
          title: '确认',
          content: '您确定一键生成?',
          okText: '确认',
          cancelText: '取消',
          onOk: () => {
            _this.apiGet('allstatic').then((res) => {
              _this.handelResponse(res, (data, msg) => {
                _this.getData()
                _this.$Message.success(msg);
              }, (data, msg) => {
                _this.$Message.error(msg);
              })
            }, (res) => {
              //处理错误信息
              _this.$Message.error('网络异常，请稍后重试');
            })
          },
          onCancel: () => {
            return false
          }
        })
      },
      article(){
        let _this = this
        this.$Modal.confirm({
          title: '确认',
          content: '您确定同步文章?',
          okText: '确认',
          cancelText: '取消',
          onOk: () => {
            _this.apiGet('artilestatic').then((res) => {
              _this.handelResponse(res, (data, msg) => {
                _this.getData()
                _this.$Message.success(msg);
              }, (data, msg) => {
                _this.$Message.error(msg);
              })
            }, (res) => {
              //处理错误信息
              _this.$Message.error('网络异常，请稍后重试');
            })
          },
          onCancel: () => {
            return false
          }
        })
      },
      menu(){
        let _this = this
        this.$Modal.confirm({
          title: '确认',
          content: '您确定更新栏目?',
          okText: '确认',
          cancelText: '取消',
          onOk: () => {
            _this.apiGet('menustatic').then((res) => {
              _this.handelResponse(res, (data, msg) => {
                _this.getData()
                _this.$Message.success(msg);
              }, (data, msg) => {
                _this.$Message.error(msg);
              })
            }, (res) => {
              //处理错误信息
              _this.$Message.error('网络异常，请稍后重试');
            })
          },
          onCancel: () => {
            return false
          }
        })
      },
      homepage(){
        let _this = this
        this.$Modal.confirm({
          title: '确认',
          content: '您确定生成首页?',
          okText: '确认',
          cancelText: '取消',
          onOk: () => {
            _this.apiGet('indexstatic').then((res) => {
              _this.handelResponse(res, (data, msg) => {
                _this.getData()
                _this.$Message.success(msg);
              }, (data, msg) => {
                _this.$Message.error(msg);
              })
            }, (res) => {
              //处理错误信息
              _this.$Message.error('网络异常，请稍后重试');
            })
          },
          onCancel: () => {
            return false
          }
        })
      }

    },
    mixins: [http]
  }
</script>
