## weCalendar

#### 英文阅读
[英文](./README.md '英文')

#### 安装
```
npm install wecalendar
```

#### 使用
```
// 初始化后所有信息存储在util对象中
let util = require('wecalendar')
```

#### 说明
1. currentMonthDay: 当前月的公历信息
1. currentMonthFarmDay: 当前月的农历信息

#### function
1. search: (自定义查询需输入一个字符串) 不能为空
    * arguments: 字符串格式 '2019.12.12'或'2019-12-12'或'2019/12/12'
