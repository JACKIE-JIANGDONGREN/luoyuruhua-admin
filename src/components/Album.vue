<template>
  <gemini-scrollbar class="my-scroll-bar" v-loading="loading">
    <bread-crumb></bread-crumb>
    <div class="album_list">
      <template v-if="photoData.length>0">
        <div class="album_item" v-for="(item,index) in photoData">
          <router-link :to="{name:'AlbumWall',params:{id:item._id}}"><img
            :src="item.thumbImg" alt=""></router-link>
          <p>{{item.title}}</p>
          <span>{{item.description}}</span>
          <ul>
            <li class="date_time">{{item.createTime}}</li>
            <li class="views">{{item.pageView}}</li>
            <li class="photo_num"><span>{{item.imgNum}}</span>张</li>
          </ul>
          <el-button type="danger" icon="el-icon-delete" circle class="del_kind" @click="delKind(item._id)"
                     title="删除"></el-button>
          <el-button type="primary" icon="el-icon-edit" circle class="edit_kind" title="编辑"
                     @click="editKind(item._id)"></el-button>
    </div>
      </template>
      <p style="color: #f00;text-align: center;padding: 30px 0;" v-else>没有相册集</p>
    </div>
  </gemini-scrollbar>
</template>
<script>
  import BreadCrumb from './public/BreadCrumb';
  import moment from 'moment';  // use time plugs

  export default {
    name: 'Album',
    data() {
      return {
        photoData: [],
        loading: true
      }
    },
    methods: {
      delKind(id) {
        this.$confirm('确认是否要删除该相册集', '除该相册集', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确认',
          cancelButtonText: '取消'
        }).then(() => {
          this.$http({
            method: 'delete',
            url: '/delImgKind',
            data: {
              id: id
            }
          }).then(res => {
            if (res.data.msg == 1) {
              this.photoData.forEach((item, index) => {
                if (item._id == id) {
                  this.photoData.splice(index, 1);
                  this.$message({title: '成功', message: '删除成功', type: 'success'});
                }
              })
            }
          }).catch(err => {
            console.log(err)
            alert(err);
          })
        }).catch(action => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        });
    },
      findKind() {
      this.$http({
        method: 'get',
        url: '/photoAlbum',
      }).then(res => {
        this.photoData = res.data.Data;
        this.photoData.forEach(item => {
          item.createTime = moment(item.createTime).format('YYYY-MM-DD');
        });
        this.loading = false;
      }).catch(err => {
        console.log(err)
        alert(err);
      })
      },
      editKind(id) {
        this.$router.push({name: 'EditImgKind', params: {id: id}})
      }
    },
    components: {
      BreadCrumb
    },
    created() {
      this.findKind();
    }
  }
</script>

<style scoped>
  .album_list {
    overflow: hidden;
    padding: 20px 0 0 20px;
  }

  .album_list .album_item {
    position: relative;
    background: #fff;
    float: left;
    margin-right: 24px;
    width: 276px;
    padding-bottom: 16px;
    margin-bottom: 25px;
    border-radius: 5px;
    -webkit-border-radius: 2px;
    -ms-border-radius: 2px;
    box-shadow: 0 0 8px rgba(46, 143, 237, 0.3);
    -webkit-box-shadow: 0 0 8px rgba(46, 143, 237, 0.3);
  }

  .album_list .album_item:hover a img {
    transform: scale(1.2);
    -webkit-transform: scale(1.2);
  }

  .album_list .album_item:hover .del_kind, .album_list .album_item:hover .edit_kind {
    display: block;
  }

  .album_list .album_item a {
    display: block;
    overflow: hidden;
    padding: 10px;
    width: 256px;
    height: 175px;
  }

  .album_list .album_item a img {
    display: block;
    width: 100%;
    height: auto;
    transition: all .4s linear 0s;
    -webkit-transition: all .4s linear 0s;
  }

  .album_list .album_item p {
    padding: 5px 10px 0px;
    font-size: 14px;
    color: #2C9BD8;
  }

  .album_list .album_item span {
    font-size: 12px;
    color: #838383;
    padding: 0 15px 0 10px;
    line-height: 28px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .album_list .album_item ul {
    padding: 0 10px;
    font-size: 12px;
    color: #838383;
  }

  .album_list .album_item ul li {
    width: 27%;
    display: inline-block;
  }

  .album_list .album_item ul .views {
    background: url(../../src/assets/newsbg04.png) no-repeat 40% center;
    background-size: auto;
    padding-left: 20px;
    text-align: center;
  }

  .album_list .album_item ul .date_time {
    background: url(../../src/assets/create_time.png) no-repeat left center;
    background-size: auto;
    padding-left: 20px;
    text-align: left;
  }

  .album_list .album_item ul .photo_num {
    text-align: right;
  }

  .album_list .album_item ul .photo_num span {
    display: inline;
    color: #759b08;
    text-decoration: underline;
    cursor: pointer;
  }

  .album_list .album_item .del_kind {
    right: 5px;
  }

  .album_list .album_item .del_kind, .album_list .album_item .edit_kind {
    position: absolute;
    top: 5px;
    z-index: 10;
    display: none;
  }

  .album_list .album_item .edit_kind {
    left: 5px;
  }

</style>
