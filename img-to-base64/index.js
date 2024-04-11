/**
 * @Description: trans img to base64
 * @Author: MuYi086
 * @Email: 1258947325@qq.com
 * @Blog: https://github.com/MuYi086/npm_package
 * @Date: 2021/04/11 08:50
 */
class ImgToBase64 {
  /**
   * 解析图片url或图片对象
   * 需要注意:未经cors批准加载的数据会导致画布被污染
   * MDN:https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image
   * 异常例如:https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png
   * 正常例如:http://img.qipeiren.com/UploadFile/UserProPic/2019/11/23/4b65b8aadcfb0ac65a91.jpg
   * @param {e} : img url or img Object
   */
  parse (e) {
    if (typeof e === 'object') {
      return this.useCanvas(e)
    }
    if (typeof e === 'string' && /^http[s]?:\/\/.*(png|jpg|jpeg|bmp|gif|svg|)$/.test(e)) {
      const that = this
      var img = new Image()
      img.crossOrigin = 'anonymous'
      img.src = e + '?v=' + Math.random()
      img.onload = function () {
        that.useCanvas(img)
      }
    }
  }

  useCanvas (imgObj) {
    if (uni) {
      return new Error('暂不支持uniapp')
    } else {
      const canvas = document.createElement('canvas')
      canvas.width = imgObj.width
      canvas.height = imgObj.height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(imgObj, 0, 0, imgObj.width, imgObj.height)
      const dataUrl = canvas.toDataURL('image/png')
      console.log(dataUrl)
      return dataUrl
    }
  }
}
const imgToBase64 = new ImgToBase64()
module.exports = imgToBase64
