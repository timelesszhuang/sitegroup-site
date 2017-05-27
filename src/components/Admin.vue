<template>
  <div>
    <ol>
      <li v-for="todo in site">
        <span class="layout-text"  @click="change(todo.id,todo.site_name)">{{ todo.site_name }}</span>
        <a :href=formatter_str(todo.domain) target="_blank">{{todo.domain}}</a>
      </li>
    </ol>
  </div>
</template>
<script type="text/ecmascript-6">
  import http from '../assets/js/http.js';
  export default {
//    data: {
//
//    },
    data () {
      return {
        site:[],
      info:[]
      }
    },
    created () {
      this.getdata(),
        this.name = Lockr.get('userInfo').name
      document.title = this.name
      let rememberKey = Lockr.get('site_rememberKey')
      let site_id = Lockr.get('site_id')
      if (!rememberKey || !site_id ) {
        //表示没有登陆
        setTimeout(() => {
          router.replace('/')
        }, 1500)
        return
      }
    },
    methods: {
        formatter_str(str) {
          return "http://"+str;
        },
      routerChange (path, activeName) {
        this.activeName = activeName;
        router.push(path);
      },
      getdata() {
        this.site=Lockr.get('site_info');
      },
      change(id,site_name) {
          let data={
              site_id:id,
              site_name:site_name
          }
        this.apiPost('user/siteInfo',data).then((res) => {
              this.handelResponse(res, (data, msg) => {
                let routerUrl = '/common/';
                setTimeout(() => {
                  let path = this.$router.path
                  if (routerUrl != path) {
                    router.replace(routerUrl)
                  }
                }, 1000)
              }, (data, msg) => {
                this.$Message.error('没有获取到');
              })
            },
          (res) => {
          //处理错误信息
          this.$Message.error('网络异常，请稍后重试。');
        })
      },
    },
    mixins: [http]

  }

</script>
