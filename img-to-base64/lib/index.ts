/**
 * @Description: trans img to base64
 * @Author: MuYi086
 * @Email: 1258947325@qq.com
 * @Blog: https://github.com/MuYi086/blog
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
  async parse (imgSrcOrElement: string | HTMLImageElement): Promise<string | Error> {
    const self = this
    if (typeof imgSrcOrElement === 'object') {
      return this.useCanvas(imgSrcOrElement)
    }
    if (typeof imgSrcOrElement === 'string' && /^http[s]?:\/\/.*(png|jpg|jpeg|bmp|gif|svg|)$/.test(imgSrcOrElement)) {
      return self.loadImage(imgSrcOrElement)
        .then(img => self.useCanvas(img))
        .catch(err => new Error(`Failed to load image: ${err.message}`))
    }
    return Promise.reject(new Error('Invalid image source or format.'))
  }

  /**
   * 载入图片
   * @param {*} url 路径
   * @returns promise
   */
  private loadImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.src = url + '?v=' + Math.random()
      img.onload = () => resolve(img)
      img.onerror = (err) => reject(err)
    })
  }
  private useCanvas (imgObj: HTMLImageElement): string | Error {
    if (typeof uni !== 'undefined') {
      return new Error('暂不支持uniapp')
    } else {
      const canvas = document.createElement('canvas')
      canvas.width = imgObj.width
      canvas.height = imgObj.height
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        return new Error('Failed to get canvas context')
      }
      ctx.drawImage(imgObj, 0, 0, imgObj.width, imgObj.height)
      const dataUrl = canvas.toDataURL('image/png')
      return dataUrl
    }
  }
}
export const imgToBase64 = new ImgToBase64()
