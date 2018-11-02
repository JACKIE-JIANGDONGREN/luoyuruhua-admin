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
    <!-- Root element of PhotoSwipe. Must have class pswp. -->
    <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">

      <!-- Background of PhotoSwipe.
           It's a separate element as animating opacity is faster than rgba(). -->
      <div class="pswp__bg"></div>

      <!-- Slides wrapper with overflow:hidden. -->
      <div class="pswp__scroll-wrap">

        <!-- Container that holds slides.
            PhotoSwipe keeps only 3 of them in the DOM to save memory.
            Don't modify these 3 pswp__item elements, data is added later on. -->
        <div class="pswp__container">
          <div class="pswp__item"></div>
          <div class="pswp__item"></div>
          <div class="pswp__item"></div>
        </div>

        <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->
        <div class="pswp__ui pswp__ui--hidden">

          <div class="pswp__top-bar">

            <!--  Controls are self-explanatory. Order can be changed. -->

            <div class="pswp__counter"></div>

            <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>

            <button class="pswp__button pswp__button--share" title="Share"></button>

            <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>

            <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>

            <!-- Preloader demo http://codepen.io/dimsemenov/pen/yyBWoR -->
            <!-- element will get class pswp__preloader--active when preloader is running -->
            <div class="pswp__preloader">
              <div class="pswp__preloader__icn">
                <div class="pswp__preloader__cut">
                  <div class="pswp__preloader__donut"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
            <div class="pswp__share-tooltip"></div>
          </div>

          <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
          </button>

          <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">
          </button>

          <div class="pswp__caption">
            <div class="pswp__caption__center"></div>
          </div>

        </div>

      </div>

    </div>
  </gemini-scrollbar>
</template>
<script>
  import BreadCrumb from './public/BreadCrumb';
  import moment from 'moment';  // use time plugs

  import 'public_css/photoswipe.css';
  import 'public_css/default-skin.css';

  import test from '../../util/imageConfig';

  export default {
    name: 'Album',
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
        require([
          'public_js/photoswipe.min.js',
          'public_js/photoswipe-ui-default.min.js'
        ], function (PhotoSwipe, PhotoSwipeUI_Default) {
          var pswpElement = document.querySelectorAll('.pswp')[0];

          // build items array
          var items = [
            {
              src: 'https://farm2.staticflickr.com/1043/5186867718_06b2e9e551_b.jpg',
              w: 964,
              h: 1024
            },
            {
              src: 'https://farm7.staticflickr.com/6175/6176698785_7dee72237e_b.jpg',
              w: 1024,
              h: 683
            }
          ];

          // define options (if needed)
          var options = {
            // history & focus options are disabled on CodePen
            history: false,
            focus: false,

            showAnimationDuration: 0,
            hideAnimationDuration: 0

          };

          var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
          gallery.init();

        });
        /*var pswpElement = document.querySelectorAll('.pswp')[0];

        // build items array
        var items = [
          {
            src: 'https://farm2.staticflickr.com/1043/5186867718_06b2e9e551_b.jpg',
            w: 964,
            h: 1024
          },
          {
            src: 'https://farm7.staticflickr.com/6175/6176698785_7dee72237e_b.jpg',
            w: 1024,
            h: 683
          }
        ];

        // define options (if needed)
        var options = {
          // history & focus options are disabled on CodePen
          history: false,
          focus: false,

          showAnimationDuration: 0,
          hideAnimationDuration: 0

        };

        var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();*/
      }
    },
    components: {
      BreadCrumb
    },
    created() {
      console.log(test.isImages(123))
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
