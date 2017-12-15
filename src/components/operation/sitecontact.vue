<style>
  .change-pwd-form {
    padding: 20px;
  }
</style>
<template>
  <div>
    <Modal
           v-model="modal" width="400"
           title="联系方式填写"
    >
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>联系方式填写</span>
      </p>
      <div style="text-align:center">
        <Form ref="add"  :model="form" :label-width="100" :rules="companyRule" class="change-pwd-form">
          <Form-item label="联系方式" prop="site_contact">
            <Input type="text" v-model="form.site_contact" placeholder="请输入联系方式"></Input>
          </Form-item>
        </Form>
      </div>
      <div slot="footer">
        <Button type="success" size="large" :loading="modal_loading" @click="add">添加</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
  import http from '../../assets/js/http.js'

  export default {
    data() {
      return {
        modal: false,
        modal_loading: false,
        companyRule: {},
      }
    },
    created() {
    },
    methods: {
      add() {
        this.$refs.add.validate((valid) => {
          if (valid) {
            this.modal_loading = true;
            let data = {
              id:this.form.id,
              site_contact:this.form.site_contact
            }
            this.apiPost('user/siteResource', data).then((res) => {
              this.handelResponse(res, (data, msg) => {
                this.modal = false;
                this.$Message.success(msg);
                this.modal_loading = false;
                this.$refs.add.resetFields();
              }, (data, msg) => {
                this.modal_loading = false;
                this.$Message.error(msg);
              })
            }, (res) => {
              //处理错误信息
              this.modal_loading = false;
              this.$Message.error('网络异常，请稍后重试。');
            })
          }
        })
      },
    },
    props: {
      form:{

      }
    },
    mixins: [http]
  }
</script>
