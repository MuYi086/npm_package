## weCalendar

[English](./README.md 'English')

#### 安装
```SHELL
npm install wecalendar
```

#### 使用
```JS
// 初始化后所有信息存储在util对象中
let util = require('wecalendar')
```

#### 属性说明
1. `currentMonthDay` : 当前月的公历信息
1. `currentMonthFarmDay` : 当前月的农历信息

#### function

函数名|参数|默认|是否必需|描述|
--|--|--|--|--|
search|时间字符串|字符串|必需|自定义查询需输入一个字符串 字符串格式 '2019.12.12'或'2019-12-12'或'2019/12/12'|
