<template>
  <div>
    <Row>
      <Col span="14" offset="5">
      <div class="alert-title">
        <Alert type="success" show-icon v-show="successShow">
          <span slot="desc"> 正在进入站点&nbsp;&nbsp;&nbsp;
            <Icon v-show="successShow" type="load-c" class="demo-spin-icon-load"></Icon></span>
        </Alert>
      </div>
      </Col>
    </Row>
    <Row>
      <Col span="14" offset="5">
      <div class="login-form">
        <h2 class="title">站点选择</h2>
        <ul>
          <li class="todo" v-for="todo in site">
            <Button class="btn" @click="change(todo.id,todo.site_name)">{{ todo.site_name }}
            </Button>
            <a class="link" :href=formatter_str(todo.url) target="_blank">{{todo.url}}</a>
          </li>
        </ul>
      </div>
      </Col>
    </Row>
  </div>
</template>
<script type="text/ecmascript-6">
  import http from '../assets/js/http.js';

  export default {
    data() {
      return {
        successShow: false,
        site: [],
        info: [],
      }
    },
    created() {
      let rememberKey = Lockr.get('site_rememberKey')
      let site_id = Lockr.get('site_id')
      if (!rememberKey || !site_id) {
        //表示没有登陆
        this.$Message.error("请先登录");
        setTimeout(() => {
          router.replace('/')
        }, 1500)
        return
      }
      this.getdata(),
        this.name = Lockr.get('userInfo').name
//      document.title = this.name
    },

    methods: {
      formatter_str(str) {
        return  str;
      },
      routerChange(path, activeName) {
        this.activeName = activeName;
        router.push(path);
      },
      getdata() {
        this.site = Lockr.get('site_info');
      },
      change(id, site_name) {
        this.successShow = true;
        let data = {
          site_id: id,
          site_name: site_name,

        }
        Lockr.set('currentSiteId', data.site_id);
        Lockr.set('currentSiteName', data.site_name);

        this.apiPost('user/siteInfo', data).then((res) => {
            this.handelResponse(res, (data, msg) => {
              Lockr.set('siteNameForever',data.site_name)
              Lockr.set('urldomain', data.domain);

              let routerUrl = '/common/count';
              setTimeout(() => {
                let path = this.$router.path
                if (routerUrl != path) {
                  router.replace(routerUrl)
                }
              }, 1000)
            }, (data, msg) => {
              this.$Message.error(msg);
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
<style scoped>
  .login-form {
    padding: 35px 35px 15px 35px;
    border-radius: 15px;
    -moz-border-radius: 15px;
    background-clip: padding-box;
    margin-bottom: 20px;
    background-color: #F9FAFC;
    margin: 20px auto;
    width: 400px;
    border: 2px solid #8492A6;
  }

  .todo {
    text-align: center;
    margin: 0 auto;
  }

  .alert-title {
    width: 450px;
    margin: 30px auto;
  }

  .title {
    margin: 0px auto 10px auto;
    text-align: center;
    color: #505458;
    font-size: 20px;
  }

  .btn {
    margin-right: 10px;
    margin-bottom: 10px;
  }

  .link {
    margin-left: 10px;
  }

  .verify-pos {
    position: absolute;
    right: 50px;
    top: 0px;
  }

  .card-box {
    padding: 20px;
    box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin-bottom: 20px;
    background-color: #F9FAFC;
    margin: 120px auto;
    width: 400px;
    height: auto;
    border: 2px solid #8492A6;
  }

  .demo-spin-icon-load {
    animation: ani-demo-spin 1s linear infinite;
  }

  @keyframes ani-demo-spin {
    from {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(180deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .demo-spin-col {
    height: 100px;
    position: relative;
    border: 1px solid #eee;
  }

</style>
