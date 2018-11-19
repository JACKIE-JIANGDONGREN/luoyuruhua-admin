<template>
  <gemini-scrollbar class="my-scroll-bar">
    <bread-crumb></bread-crumb>
    <div class="filter_img">
      <el-date-picker
        style="margin-left: 20px;"
        v-model="dataRange"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @change="onPick($event)"
        size="small"
        :picker-options="pickerOptions2">
      </el-date-picker>
      <el-button type="primary" icon="el-icon-search" size="small" @click="getImgData()">搜索</el-button>
    </div>
    <template v-if="imgData.length>0">
    <div class="album_wall">
        <div class="album_item" v-for="(item,index) in imgData" @click="browserImg(index)">
          <a href="javascript:void(0);">
            <img :src="item.imgMsg.url" alt=""><br>
      </a>
          <span>{{item.imgMsg.name}}</span>
        </div>
    </div>
    <div class="pagination">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[15, 25, 35, 50]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount">
      </el-pagination>
    </div>
    </template>
    <template v-else>
      <p style="color: #f00;text-align: center;">没有数据</p>
    </template>
    <img-browser ref="previewImg"></img-browser>
  </gemini-scrollbar>
</template>
<script>
  import BreadCrumb from './public/BreadCrumb';
  import moment from 'moment';  // use time plugs
  import ImgBrowser from './public/ImgBrowser';

  export default {
    name: 'AlbumWall',
    data() {
      return {
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        imgData: [],
        dataRange: '',
        currentPage: 1,
        totalCount: 1,
        showCount: 15,
      }
    },
    methods: {
      onPick(data) {
        this.dataRange = data;
      },
      browserImg(index) {
        this.$refs.previewImg.previewImg(index);
      },
      handleSizeChange(val) {
        this.showCount = val;
        this.getImgData();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getImgData();
    },
      getImgData() {
      this.$http({
        method: 'get',
        url: '/findAlbumImg',
        params: {
          id: this.$route.params.id,
          dataRange: this.dataRange,
          showCount: this.showCount,
          page: this.currentPage
        }
      }).then((data) => {
          this.imgData = data.data.Datas;
          let tempArr = [];
          this.imgData.map(item => {
            let obj = {};
            obj = item.imgMsg;
            tempArr.push(obj);
          })
          this.$refs.previewImg.resData(tempArr);
      }).catch((err) => {
        console.log(err)
      })
    }
    },
    components: {
      BreadCrumb, ImgBrowser
    },
    created() {
      this.getImgData();
    }
  }
</script>

<style scoped>
  .album_wall {
    padding: 20px 10px 0 20px;
  }

  .filter_img {
    padding: 20px 0 0 20px;
  }

  .album_wall {
    overflow: hidden;
  }

  .album_wall .album_item {
    padding: 10px;
    margin-right: 10px;
    margin-bottom: 10px;
    box-shadow: 0 1px 8px rgba(46, 143, 237, 0.3);
    overflow: hidden;
    float: left;
  }

  .album_wall a {
    display: block;
    width: 235px;
    height: 175px;
    overflow: hidden;
  }

  .album_wall .album_item img {
    display: block;
    width: 100%;
    height: auto;
    transition: all .4s linear 0s;
    -webkit-transition: all .4s linear 0s;
  }

  .album_wall .album_item:hover img {
    transform: scale(1.2);
    -webkit-transform: scale(1.2);
  }

  .album_wall .album_item span {
    display: inline-block;
    margin-top: 5px;
    max-width: 200px;
    color: #b4bccc;
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .pagination {
    float: right;
    padding: 50px 50px 40px;
  }
</style>
