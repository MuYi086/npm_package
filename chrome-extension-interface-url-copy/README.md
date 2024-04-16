# chrome-extension-interface-url-copy

## 介绍
随着项目的迭代，不同网关下 `api` 数量不断增加。前端维护接口地址,取名和复制路径的成本也不断上升。于是考虑是否可以自动生成接口地址对应的变量名，并且拷贝变量名和路径到剪切板，方便一键粘贴。

## 适配
后续视用户需求，再考虑支持 `swagger`，`apifox`，`yapi` 等其他接口文档

平台|是否支持|
--|--|
Apipost|✅|

## Chrome插件使用
```SHELL
# 1. 使用chrome扩展程序加载source目录
# 2. 打开Apipost对应的接口链接
# 3. 右下角"点击复制"
```
