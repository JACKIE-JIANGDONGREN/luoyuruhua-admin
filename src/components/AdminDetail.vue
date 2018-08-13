<template>
  <div class="admin_detail">
    <bread-crumb></bread-crumb>
    <div class="detail_con">
      <div class="detail_msg">
        <ul>
          <li><span>姓名：</span><span>{{userData.name}}</span></li>
          <li><span>性别：</span><span>{{userData.sex=='0'?'女':'男'}}</span></li>
          <li><span>年龄：</span><span>{{userData.age}}</span></li>
          <li><span>手机号：</span><span>{{userData.phone}}</span></li>
          <li><span>邮箱：</span><span>{{userData.email}}</span></li>
          <li>
            <span>签名：</span><span>{{(!userData.signature||userData.signature=='')?'这个家伙懒的一笔！':userData.signature}}</span>
          </li>
        </ul>
        <div class="user_img">
          <img src="~public_img/726209185373770133.jpg" alt="">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import BreadCrumb from './public/BreadCrumb';
  export default {
    name: 'AdminDetail',
    data() {
      return {
        userData: '',
        active: '0'
      }
    },
    components: {
      BreadCrumb
    },
    methods: {},
    mounted() {
      this.$http({
        method: 'get',
        url: '/api/adminDetail',
        params: {
          id: this.$route.params.id
        }
      }).then(res => {
        this.userData = res.data.data;
      }).catch(err => {
        this.$notify.error({
          title: '错误',
          message: '服务器响应失败，请联系管理员！'
        });
        console.log(err)
      });
    }
  }
</script>

<style scoped>
  .detail_con {
    padding: 20px 0 0 20px;
  }

  .detail_msg {
    width: 620px;
    padding: 20px 0px;
    overflow: hidden;
  }

  .detail_msg > ul {
    float: left;
  }

  .detail_msg ul li {
    line-height: 40px;
    overflow: hidden;
  }

  .detail_msg ul li span {
    display: inline-block;
    color: #333;
  }

  .detail_msg ul li span:first-of-type {
    width: 100px;
    text-align: right;
    float: left;
  }

  .detail_msg ul li span:last-of-type {
    width: 300px;
    float: right;
    line-height: 21px;
    padding-top: 9px;
  }

  .user_img {
    float: right;
    width: 130px;
    height: 130px;
    overflow: hidden;
    border-radius: 130px;
    -webkit-border-radius: 130px;
  }

  .user_img img {
    display: block;
    width: 100%;
    height: auto;
  }
</style>
