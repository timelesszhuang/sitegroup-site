<template>
  <div class="homemain">
    <!--<div style="margin-top:-10px;margin-left:15px;margin-bottom:10px;font-size: 18px">首页</div>-->
    <div>
      <Row style="background-color: white;margin:15px;margin-top:-10px;" :gutter="10" type="flex"
           justify="center" class="code-row-bg rowmain">
        <Col span="4">
        <div class="homehead">
          <div style="padding-bottom: 10px">
            <Icon style="font-size: 30px;" type="podium"></Icon>
            <span class="footfont" style="color: #FF0000;">{{pv}}</span>
          </div>
          <div style="font-size: 15px;">今日浏览量（pv)</div>
          <div class="footborder" style="border:3px solid rgba(255, 223, 37, 1);"></div>
        </div>
        </Col>

        <Col span="4">
        <div style="height: 130px;padding: 15px">
          <div style="padding-bottom: 10px">
            <Icon style="font-size: 30px;" type="bug"></Icon>
            <span class="footfont" style="color: #66FFFF;">{{useragent}}</span>
          </div>
          <div style="font-size: 15px;">今日爬取（spider）</div>
          <div class="footborder" style="border:3px solid  rgba(51, 204, 255, 1);"></div>
        </div>

        </Col>
        <Col span="4">
        <div style="height: 130px;padding: 15px">
          <div style="padding-bottom: 10px">
            <Icon style="font-size: 30px;" type="android-person-add"></Icon>
            <span class="footfont" style="color: #003399;">{{article}}</span>
          </div>
          <div style="font-size: 15px;">今日添加文章数量</div>
          <div class="footborder" style="border:3px solid   rgba(51, 0, 204, 1);"></div>
        </div>
        </Col>

        <Col span="4">
        <div style="height: 130px;padding: 15px">
          <div style="padding-bottom: 10px">
            <Icon style="font-size: 30px;" type="ios-search-strong"></Icon>
            <span class="footfont" style="color: #FF6600;">{{shuaidan}}</span>
          </div>
          <div style="font-size: 15px;">今日询盘数量</div>
          <div class="footborder" style="border:3px solid  rgba(255, 102, 102, 1);"></div>
        </div>
        </Col>

        <Col span="4">
        <div style="height: 130px;padding: 15px">
          <div style="padding-bottom: 10px">
            <Icon style="font-size: 30px;" type="ios-book"></Icon>
            <span class="footfont" style="color: #199ED8;">{{shoulu}}</span>
          </div>
          <div style="font-size: 15px;">文章收录总量</div>
          <div class="footborder" style="border:3px solid   rgba(0, 0, 255, 1);"></div>
        </div>
        </Col>
      </Row>
    </div>

    <div style="height: 315px;box-sizing: border-box;display:flex;justify-content: center;align-items: center;">
       <pv  style="width:32%;margin-left:0px;margin-right:10px;height:315px;background-color:white;display: inline-block"ref="pv"></pv>
       <engine ref="engine" style="width:32%;margin-right:10px;height: 315px;background-color:white;display: inline-block "></engine>
        <div style="margin-right:0px;width:32%;height: 315px;background-color:white;display: inline-block">
      <div style="padding: 10px;padding-left: 10%;padding-top: 12%" ><h2>乐销易技术服务中心</h2></div>
      <div style="padding: 10px;padding-left: 10%"><span style="font-size: 15px;text-align: left"><Icon type="paper-airplane"></Icon>&nbsp;&nbsp;北京易至信科技有限公司</span>
      </div>
      <div style="padding: 10px;padding-left: 10%"><span style="font-size: 15px;text-align: left"><Icon type="android-call"></Icon>&nbsp;&nbsp;0531-88554123</span>
      </div>
      <div style="padding: 10px;padding-left: 10%"><span style="font-size: 15px;text-align: left"><Icon type="ios-telephone-outline"></Icon> &nbsp;&nbsp; 4006360163</span>
      </div>
      <div style="padding: 10px;padding-left: 10%"><span style="font-size: 15px;text-align: left"> <Icon type="ios-email-outline"></Icon>&nbsp;&nbsp;  jishu@cio.club</span>
      </div>

    </div>
    </div>


  </div>
</template>
<script type="text/babel">
  import http from '../../../assets/js/http.js';
  import engine from './enginecount.vue';
  import pv from './pv.vue';
  export default {
    data(){
      return{
        pv: 0,
        article: 0,
        shuaidan: 0,
        useragent: 0,
        shoulu: 0,
      }
    },
    name: 'view',
    components: {
      engine,
      pv
    },
    created() {
      this.getpublictype();
    },
    methods:{
      getpublictype() {
        this.apiGet('user/getFour').then((res) => {
          this.handelResponse(res, (data, msg) => {
            this.article = data.article;
            this.pv = data.pv;
            this.shuaidan = data.shuaidan;
            this.useragent = data.useragent;
            this.shoulu = data.shoulu
          }, (data, msg) => {

            this.$Message.error(msg);
          })
        }, (res) => {
          //处理错误信息
          this.$Message.error('网络异常，请稍后重试。');
        })
      },

    },
    mixins: [http]
  };
</script>
<style>
  .homemain {
    background-color: #f5f7f9;
    margin-top: -30px;
    margin: -15px
  }
  .homehead {
    height: 130px;
    padding: 15px

  }

  .footfont {
    display: inline-block;
    margin-left: 15px;
    font-size: 25px;
  }

  .footborder {
    margin-top: 10px;
    width: 120px;
  }
</style>
