/**
 * Created by timeless on 17-4-7.
 * @author 赵兴壮<834916321@qq.com>
 * 该组件 主要用于ajax 相关请求
 */

const ajaxMethods = {
  methods: {
    apiGet(url, data) {
      return new Promise((resolve, reject) => {
        axios.get(url, data).then((response) => {
          resolve(response.data)
        }, (response) => {
          reject(response)
        })
      })
    },
    //ajax post相关的操作
    apiPost(url, data){
      return new Promise(function (resolve, reject) {
        axios.post(url, data).then((response) => {
          // console.log(response.data);
          resolve(response.data)
        }).catch(function (response) {
          reject(response)
        })
      })
    },
    apiDelete(url, id) {
      return new Promise((resolve, reject) => {
        axios.delete(url + id).then((response) => {
          resolve(response.data)
        }, (response) => {
          reject(response)
        })
      })
    },
    apiPut(url,obj) {
      return new Promise((resolve, reject) => {
        axios.put(url, obj).then((response) => {
          resolve(response.data)
        }, (response) => {
          reject(response)
        })
      })
    },
    handelResponse(res, cb, errCb) {
      if (res.status == 'success') {
        cb(res.data, res.msg)
      }else if(res.status == 'loginout'){
        errCb(res.data, res.msg)
        setTimeout(() => {
          router.replace('/');
        }, 1000);
      }else  {
        if (typeof errCb == 'function') {
          errCb(res.data, res.msg)
        }
      }
    },
    resetCommonData(data) {
      //sal
      Lockr.set('salt', data.user_info.salt)            // 权限认证
      //记住我
      Lockr.set('site_rememberKey', data.user_info.remember)      // 记住密码的加密字符串
      //用户基本信息
      Lockr.set('userInfo', data.user_info)
      //用户的id
      Lockr.set('site_id', data.user_info.id)
      //登陆名
      Lockr.set('name', data.user_info.name)
      //用户类型
      Lockr.set('site_info', data.site_info)
      // this.modal1 = true
      //跳转到地方
      let routerUrl ="";
      if(data.site_info.length == 0 ){
        setTimeout(() => {
          Lockr.flush();
          Cookies.remove('site_rememberMe');
          Cookies.remove('site_code');
          this.modal = false;
          this.modal_loading = false;
          this.showMsg('warning', '用户无管理网站');
          this.loading = !this.loading
        }, 1000);
      }else if(data.user_info.length ==0){
        setTimeout(() => {
          Lockr.flush();
          Cookies.remove('site_rememberMe');
          Cookies.remove('site_code');
          this.modal = false;
          this.modal_loading = false;
          this.showMsg('warning', '没有此用户');
          this.loading = !this.loading
        }, 1000);

      }

      else {
         routerUrl = '/admin';

      }
      setTimeout(() => {
        let path = this.$router.path
        if (routerUrl != path) {
          router.replace(routerUrl)
        }
      }, 1000)

    },
  }
}
export default ajaxMethods
