/**
 * @Description: img compress
 * @Author: MuYi086
 * @Email: 1258947325@qq.com
 * @Blog: https://github.com/MuYi086/blog
 * @Date: 2021/04/11 08:50
 */
class ImgCompress {
  compress (imgObj, quality = 1) {
    if (uni) {
      return new Error('暂不支持uniapp')
    } else {
      const canvas = document.createElement('canvas')
      canvas.width = imgObj.width
      canvas.height = imgObj.height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(imgObj, 0, 0, imgObj.width, imgObj.height)
      // 默认选定'image/jpeg'
      // mdn说明在指定图片格式为 image/jpeg 或 image/webp的情况下，可以从 0 到 1 的区间内选择图片的质量
      const dataUrl = canvas.toDataURL('image/jpeg', quality)
      return dataUrl
    }
  }

  downloadImg (imgObj, name, quality = 1) {
    const base64 = this.compress(imgObj, quality)
    const aa = document.createElement('a')
    aa.setAttribute('href', base64)
    aa.setAttribute('download', name + '.jpg')
    aa.click()
  }
}
const imgCompress = new ImgCompress()
module.exports = imgCompress
