import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

let state = {};

let mutations = {};

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
