/**
 * @Description: img compress
 * @Author: MuYi086
 * @Email: 1258947325@qq.com
 * @Blog: https://github.com/MuYi086/blog
 * @Date: 2021/04/11 08:50
 */
class ImgCompress {
  compress (imgObj: HTMLImageElement, quality = 1): string {
    if (typeof uni !== 'undefined') {  
      throw new Error('暂不支持uniapp')
    } 
    const canvas = document.createElement('canvas')
    canvas.width = imgObj.width
    canvas.height = imgObj.height
    const ctx = canvas.getContext('2d')
    if (!ctx) {  
      throw new Error('Canvas 2D context is not supported')
    } 
    ctx.drawImage(imgObj, 0, 0, imgObj.width, imgObj.height)
    // 默认选定'image/jpeg'
    // mdn说明在指定图片格式为 image/jpeg 或 image/webp的情况下，可以从 0 到 1 的区间内选择图片的质量
    const dataUrl = canvas.toDataURL('image/jpeg', quality)
    return dataUrl
  }

  downloadImg (imgObj: HTMLImageElement, name: string, quality = 1): void {
    const base64 = this.compress(imgObj, quality)
    const aa = document.createElement('a')
    aa.setAttribute('href', base64)
    aa.setAttribute('download', name + '.jpg')
    aa.click()
  }
}
export const imgCompress = new ImgCompress()

