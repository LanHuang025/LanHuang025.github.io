fjGallery(document.querySelectorAll('.my-fj-gallery'), {
  itemSelector: '.my-fj-gallery-item',
  rowHeight: 220,
  gutter: 4,
  onJustify: function () {
    this.$container.style.opacity = '1'
  },
  onInit: function () {
    //alert("hello world")
  },
  onAppendImages: function () {

  }
});
async function copyContent(text) {
  try {
    await navigator.clipboard.writeText("![]("+text+")");
    btf.snackbarShow("图片被成功复制到剪贴板")
  } catch (err) {
    btf.snackbarShow("图片未被复制到剪贴板")
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  //外链 gallery 标签相册瀑布流
  const url = "https://api.github.com/repos/LanHuang025/picturebed/contents/img"
  var data=await getdata(url)
  var gallery = document.getElementById("github_img")
  let innerhtml= ''
  for (let img of data) {
    innerhtml += '<div class="my-fj-gallery-item"><a href="https://pic.zhiyiny.cn/img/'+img.name+'"'+'data-fancybox="gallery" data-caption=""><img src="https://pic.zhiyiny.cn/img/'+img.name+'"'+'></a></div>'
  }
  gallery.innerHTML = innerhtml
  fjGallery(gallery, 'appendImages', gallery.querySelectorAll(`.my-fj-gallery-item:nth-last-child(-n+` + data.length + `)`));
  var copy = document.getElementsByTagName('a');
  for (var i = 0; i < copy.length; i++) {
      copy[i].addEventListener("contextmenu", (e) => {
        e.preventDefault();
        copyContent(e.target.src)
      });
    }
});