<template>
  <gemini-scrollbar class="my-scroll-bar">
    <bread-crumb></bread-crumb>
    <div class="filter_img">
      <el-select v-model="channelId" placeholder="请选择" size="small" @change="selectChannelType()">
        <el-option
          v-for="item in channelType"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
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
        dataRange: [],
        channelId: 0,
        channelType: [{id: 0, name: '随笔'}, {id: 1, name: '作品集'}, {id: 2, name: '相册'}, {id: 3, name: '音乐'}, {
          id: 4,
          name: '关于'
        }, {id: 5, name: '留言'}]
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
      }
    },
    components: {
      BreadCrumb, ImgBrowser
    },
    created() {

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

  .album_wall a img {
    max-width: 200px;
    width: 100%;
    transition: all 0s linear .3s;
    -webkit-transition: all 0s linear .3s;
  }

  .album_wall a:hover img {
    transform: scale(1.2);
    -webkit-transform: scale(1.2);
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
</style>
