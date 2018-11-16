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
      <el-button type="primary" icon="el-icon-search" size="small" @click="commentData()">搜索</el-button>
    </div>
    <div class="album_wall">
      <a href="javascript:void(0);" v-for="item in 50" @click="browserImg(item)">
        <img src="http://web.yswx.cn/upload/product/c/201809/19/201809191206546120.jpg" alt=""><br>
        <span>test</span>
      </a>
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
        dataRange: '',
        noData: '',
        currentPage: 1,
        totalCount: 1,
        showCount: 15,
      }
    },
    methods: {
      onPick(data) {
        this.dataRange = data;
      },
      selectChannelType(val) {
        console.log(this.channelId)
      },
      browserImg(index) {
        this.$refs.previewImg.previewImg(index);
        console.log(index);
      },
      handleSizeChange(val) {
        this.showCount = val;
      },
      handleCurrentChange(val) {
        this.currentPage = val;
      }
    },
    components: {
      BreadCrumb, ImgBrowser
    },
    created() {
      console.log(this.dataRange)
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
        console.log(data)
      }).catch((err) => {
        console.log(err)
      })
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

  .album_wall a {
    display: block;
    float: left;
    max-width: 200px;
    overflow: hidden;
    margin-right: 10px;
    margin-bottom: 10px;
    box-shadow: 0 1px 8px rgba(46, 143, 237, 0.3);
    padding: 10px;
  }

  .album_wall a:hover img {
    transform: scale(1.2);
    -webkit-transform: scale(1.2);
  }

  .album_wall a img {
    max-width: 200px;
    width: 100%;
    transition: all 0s linear .3s;
    -webkit-transition: all 0s linear .3s;
  }

  .album_wall a span {
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
