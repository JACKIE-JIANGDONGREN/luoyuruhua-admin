import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import Cookie from '../../util/cookieConfg';

Vue.use(Vuex);

let state = {
  userName: '',
  userPassword: '',
  userId: '',
  spreadInfo: false
};

let mutations = {
  isLogin(state) {
    if (Cookie.getCookie('user') != 0) {
      axios({
        method: 'post',
        url: '/isLogin',
        data: {
          user: Cookie.getCookie('user')
        }
      }).then(function (res) {
        if (res.data.msg == '1') {
          state.userPassword = res.data.password;
          state.userName = res.data.name;
          state.userId = res.data.id;
        } else {
          Cookie.setCookie('user', '0');
        }
      }).catch(function (err) {
        Cookie.setCookie('user', '0');
        console.log(err)
      });
    }
  }
};

let getters = {};

let actions = {};

/*数组去重*/

function getFilterArray(array) {
  let res = [];
  let json = {};
  for (let i = 0; i < array.length; i++) {
    let _self = array[i];
    if (!json[_self]) {
      res.push(_self);
      json[_self] = 1;
    }
  }
  return res;
}

export default new Vuex.Store({
  state, mutations, getters, actions
});
