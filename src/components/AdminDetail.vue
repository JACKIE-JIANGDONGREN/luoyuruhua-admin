<template>
  <div class="com-upload-img">
    <div class="img_group">
      <div class="img_box" v-if="allowAddImg">
        <input type="file" accept="image/*" @change="changeImg($event)">
        <div class="filter"></div>
      </div>
      <div class="img_box" v-for="(item,index) in imgArr" :key="index">
        <div class="img_show_box">
          <img :src="item" alt="">
          <i class="img_delete" @click="deleteImg(index)"
             style="width: 20px;height: 20px;background: #f00;display: block;"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'AdminDetail',
    data() {
      return {
        imgData: '',
        imgArr: [],
        imgSrc: '',
        allowAddImg: true,
      }
    },
    methods: {
      changeImg: function (e) {
        let _this = this;
        let imgLimit = 1024;
        let files = e.target.files;
        let image = new Image();
        if (files.length > 0) {
          let dd = 0;
          let timer = setInterval(function () {
            if (files.item(dd).type != 'image/png' && files.item(dd).type != 'image/jpeg' && files.item(dd).type != 'image/gif') {
              return false;
            }

            if (files.item(dd).size > imgLimit * 102400) {
              //to do sth
            } else {
              image.src = window.URL.createObjectURL(files.item(dd));
              image.onload = function () {
                // 默认按比例压缩
                let w = 100,
                  h = 100,
                  scale = w / h;
                w = 200;
                h = w / scale;
                // 默认图片质量为0.7，quality值越小，所绘制出的图像越模糊
                let quality = 0.7;
                //生成canvas
                let canvas = document.createElement('canvas');
                let ctx = canvas.getContext('2d');
                // 创建属性节点
                let anw = document.createAttribute("width");
                anw.nodeValue = w;
                let anh = document.createAttribute("height");
                anh.nodeValue = h;
                canvas.setAttributeNode(anw);
                canvas.setAttributeNode(anh);
                ctx.drawImage(image, 0, 0, w, h);
                let ext = image.src.substring(image.src.lastIndexOf(".") + 1).toLowerCase();//图片格式
                let base64 = canvas.toDataURL("image/" + ext, quality);
                // 回调函数返回base64的值
                if (_this.imgArr.length <= 4) {
                  _this.imgArr.unshift('');
                  _this.imgArr.splice(0, 1, base64);//替换数组数据的方法，此处不能使用：this.imgArr[index] = url;
                  if (_this.imgArr.length >= 5) {
                    _this.allowAddImg = false;
                  }
                }
              }
            }

            if (dd < files.length - 1) {
              dd++;
            } else {
              clearInterval(timer);
            }
          }, 1000)
        }
      },
      deleteImg: function (index) {
        this.imgArr.splice(index, 1);
        if (this.imgArr.length < 5) {
          this.allowAddImg = true;
        }
      },
    },
  }
</script>

<style scoped>

</style>
