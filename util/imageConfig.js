/*init image width and height*/
export default {
  isImages: (imgObj) => {
    var winHeight = document.documentElement.offsetHeight || document.body.offsetHeight;
    var winWidth = document.documentElement.offsetWidth || document.body.offsetWidth;
    var imgBrowser = [];
    if (imgObj.length > 0) {
      for (var i = 0; i < imgObj.length; i++) {
        var img = new Image();
        var obj = {};
        // img.src = $(imgObj[i]).attr('src');
        img.src = imgObj[i].getAttribute('src');
        if (img.width > winWidth) {
          img.height = winWidth / img.width * img.height;
          img.width = winWidth;
        }
        obj.src = img.src;
        obj.w = img.width;
        obj.h = img.height;
        imgBrowser.push(obj);
      }
    }
    return imgBrowser;
  }
}
