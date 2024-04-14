# chrome-extension-music163-download

## 介绍
下载网易云音乐对应歌单的歌曲

## 注意
本插件开发于2020年,部分 `Api` 如果已失效,请提 `issue`
仅供学习和研究，请勿用于商业用途

## Chrome插件使用
```SHELL
# 1. 使用chrome扩展程序加载source目录
# 2. 打开网易云音乐网页版,将歌单id粘贴到右下角输入框
# 3. 点击获取
# 更好：最好登录后再试，因为网易云限制了未登录时返回歌曲的数量
# 最好: 手机上将歌单歌曲全选，创建新歌单，刷新电脑，粘贴新歌单id能获取完整歌曲列表
```

## 单音质提升
1. 利用 `weapi/song/enhance/player` 接口
```JS
// "{"ids":"[1439291691]","level":"standard","encodeType":"aac","csrf_token":"6a49321dc4ef4bfec200e3c855acbad8"}"
```

## 参考
1. [网易云音乐爬虫（JS破解全过程）](https://www.jianshu.com/p/a45714d16294)
1. [标签，download属性不下载，而是打开.doc、.txt、.mp3、img，解决方法](https://blog.csdn.net/qq_25252769/article/details/91044520)
1. [网易云接口加直链下载vip歌曲](https://blog.csdn.net/x1020915098/article/details/84853468)
1. [网易云音乐官方接口解析直链下载VIP歌曲的方法](https://sunpma.com/540.html)
1. [chrome下载时跨域说明,可使用消息发送给background.js](https://www.chromium.org/Home/chromium-security/extension-content-script-fetches)
1. [flatted.js](https://github.com/WebReflection/flatted)