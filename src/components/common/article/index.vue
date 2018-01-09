<template>
  <div>
    <div class="top">
      标题:
      <Input v-model="title" placeholder="请输入文章标题" style="width:300px;"></Input>
      文章分类:
      <Select  v-model="article_type" style="width:200px"
              label-in-value    filterable clearable    >
        <Option-group  v-for="(item,index) in articletypelist" :label="index" :key="index">
          <Option v-for="items in item"  :value="items.id" :label="items.name" :key="items.id">{{ items.name }}</Option>
        </Option-group>
      </Select>
      <Button type="primary" @click="queryData">查询</Button>
      <Button type="success" @click="add">添加</Button>
    </div>
    <div class="content" style="margin-top:10px;">
      <Table :context="self" :border="border" :stripe="stripe" :show-header="showheader"
             :size="size" :data="datas" :columns="tableColumns" style="width: 100%">
      </Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="total" :current="current" @on-change="changePage" @on-page-size-change="changePageSize"
                show-total
                show-elevator show-sizer></Page>
        </div>
      </div>
    </div>
    <articleadd ref="add" :tagname="tagname" :articletype="articletypelist"></articleadd>
    <articlesave ref="save" :tagname="tagname" :form="editinfo" :articletype="articletypelist"></articlesave>
    <articleshow ref="show" :form="editinfo"></articleshow>
  </div>

</template>

<script type="text/ecmascript-6">
  import http from '../../../assets/js/http.js';
  import common from '../../../assets/js/common.js';
  import articleadd from './add.vue';
  import articlesave from './save.vue';
  import articleshow from './show.vue';

  export default {
    data() {
      return {
        self: this,
        border: true,
        stripe: true,
        current: 1,
        showheader: true,
        showIndex: true,
        size: 'small',
        total: 0,
        page: 1,
        rows: 10,
        title: '',
        article_type: 0,
        datas: [],
        editinfo: {
          title_color:''
        },
        articletypelist: [],
        tagname:{},
      }
    },
    components: {articleadd, articlesave, articleshow},
    created() {
      this.getData();
      this.getArticleType((data) => {
        this.articletypelist = data
      });
      this.gettag();
    },
    methods: {
      getData() {
        let data = {
          params: {
            page: this.page,
            rows: this.rows,
            title: this.title,
            article_type: this.article_type
          }
        }
        this.apiGet('user/article', data).then((data) => {
          this.handelResponse(data, (data, msg) => {
            this.datas = data.rows
            this.total = data.total;
          }, (data, msg) => {
            this.$Message.error(msg);
          })
        }, (data) => {
          this.$Message.error('网络异常，请稍后重试');
        })
      },
      gettag() {
        let data = {
          type: "article",
        }
        this.apiPost('user/gettags', data).then((res) => {
          this.handelResponse(res, (data, msg) => {
            this.tagname = data
            this.modal = false;
          }, (data, msg) => {
            this.modal_loading = false;
            this.$Message.error(msg);
          })
        }, (res) => {
          //处理错误信息
          this.modal_loading = false;
          this.$Message.error('网络异常，请稍后重试。');
        })
      },
      changePage(page) {
        this.page = page;
        this.getData();
      },
      changePageSize(pagesize) {
        this.rows = pagesize;
        this.getData();
      },
      queryData() {
        this.getData();
      },
      add() {
        this.$refs.add.modal = true
      },
      edit(index) {
        this.getArticle(index);
        this.$refs.save.modal = true
      },
      show(index) {
        this.getArticle(index);
        this.$refs.show.modal = true
      },
      error(nodesc) {
        this.$Notice.error({
          title: '预览模板页被浏览器拦截,请允许',
          desc: nodesc ? '' : ''
        });
      },
      showhtml(index) {
        let data = this.datas[index]
        this.apiPost('user/articleshowhtml', data).then((res) => {
          this.handelResponse(res, (data, msg) => {
            let open = window.open(data);
            if (!open) {
              this.error(false)
            }
            this.modal = false;
          }, (data, msg) => {
            this.modal_loading = false;
            this.$Message.error(msg);
          })
        }, (res) => {
          //处理错误信息
          this.modal_loading = false;
          this.$Message.error('网络异常，请稍后重试。');
        })

      },
      getArticle(index) {
        let editid = this.datas[index].id
        this.apiGet('user/article/' + editid).then((res) => {
          this.handelResponse(res, (data, msg) => {
            this.editinfo = data
          }, (data, msg) => {
            this.$Message.error(msg);
          })
        }, (res) => {
          //处理错误信息
          this.$Message.error('网络异常，请稍后重试。');
        })
      },

    },
    computed: {
      tableColumns() {
        let columns = [];
        let _this = this;
        if (this.showCheckbox) {
          columns.push({
            type: 'selection',
            width: 60,
            align: 'center'
          })
        }
        if (this.showIndex) {
          columns.push({
            type: 'index',
            width: 60,
            align: 'center'
          })
        }
        columns.push({
          title: '标题',
          key: 'title',
          sortable: true
        });
        columns.push({
          title: '分类名称',
          key: 'articletype_name',
          sortable: true
        });
        columns.push({
          title: '作者',
          key: 'auther',
          sortable: true
        });
        columns.push(
        {
          title: '操作',
            key: 'action',
          width: 200,
          align: 'center',
          fixed: 'right',
          render(h, params) {
          return h('div', [
            h('Button', {
              props: {
                size: 'small'
              },
              style: {
                marginRight: '5px'
              },
              attrs: {
                type: 'primary'
              },
              on: {
                click: function () {
                  //不知道为什么这个地方不是我需要的this
                  _this.edit(params.index)
                }
              }
            }, '修改'),
            h('Button', {
              props: {
                size: 'small'
              },
              style: {
                marginRight: '5px'
              },
              attrs: {
                type: 'info'
              },
              on: {
                click: function () {
                  //不知道为什么这个地方不是我需要的this
                  _this.show(params.index)
                }
              }
            }, '查看'),
            h('Button', {
              props: {
                size: 'small'
              },
              attrs: {
                type: 'error'
              },
              on: {
                click: function () {
                  //不知道为什么这个地方不是我需要的this
                  _this.showhtml(params.index)
                }
              }
            }, '页面预览'),
          ]);
        },
        }
        );
        return columns;
      }
    },
    mixins: [http, common]
  }

</script>
<style>


</style>
