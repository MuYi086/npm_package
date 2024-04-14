# quant-learn
学习量化的记录和尝试

## 总结
本项目归档于2020年,记录学习量化的一些尝试和想法,应用的技术栈有`js`, `nodejs`, `python` 最终无疾而终。量化一途，博大精深，本人越是深入和尝试，越是自认无法在这个游戏中获得优势，决定放弃。现将整理内容和代码脱敏后开源,仅供学习参考使用，请勿用于商业用途。

## 背景
原设想是使用 `js` 开发的，好上手写策略回测，可是现实很残酷，在使用了 `tqsdk-js` 后，发现 `api` 残缺不全，比 `python` 版`tqsdk` 差的不是一点半点,而且考虑到后期需要本地缓存数据，最终选用了 `akshare`

## 文档说明
[JQData-本地量化数据说明书](https://www.joinquant.com/help/api/help?name=JQData 'JQData-本地量化数据说明书')

[Tqsdk文档](https://doc.shinnytech.com/tqsdk/latest/ 'Tqsdk文档')

[真格文档](https://quant.pobo.net.cn/doc?name=api '真格文档')

[tqsdk-js文档（不完善，接口没数据）](https://github.com/shinnytech/tqsdk-js 'tqsdk-js文档')

[akshare文档](https://www.akshare.xyz/zh_CN/latest/index.html 'akshare文档')


## 交易市场
交易所|示例代码|证券名称
--|:--:|--:
上海证券交易所|'600519.XSHG'|贵州茅台|
深圳证券交易所|'000001.XSHE'|平安银行|
中金所|'IC9999.CCFX'|中证500主力合约|
大商所|'A9999.XDCE'|豆一主力合约|
上期所|'AU9999.XSGE'|黄金主力合约|
郑商所|'CY8888.XZCE'|棉纱期货指数|
上海能源交易所|'SC9999.XINE'|原油主力合约|

## 使用
```SHELL
# tqsdk 下载某个合约所有月份数据, 已保存csv需前往比特球-天勤数据下载
# python获取区间交易日期
https://quant.pobo.net.cn/main#/strategy/editor/52976/0
# python获取日期对应主力合约
https://quant.pobo.net.cn/main#/strategy/editor/54126/0
# python获取全市场期货合约列表
https://quant.pobo.net.cn/main#/strategy/editor/54129/0
# dealtick/src/common/trans.js node截取并存储每个交易日对应主力合约的json
# 已保存json需前往比特球-天勤数据下载
# dealtick node处理所有json并根据策略计算出'买卖标记'
# 将标记导入tqsdk，进行回测
https://www.joinquant.com/algorithm/index/edit?algorithmId=ea6c465ca56c082fddfe5373438fe32b
```

## 策略统计
统计区间 2016-09-01 至 2020-06-01
fn_15波幅最大,从浮盈2倍到负值,感兴趣可以深入研究

策略|盈利次数|亏损次数|次数|交易日|最大回撤|收益|
--|:--:|:--:|:--:|:--:|:--:|--:|
fn_3|49|45|94|918|37.38%|18.17%|
fn_7|25|27|52|918|15.32%|48.87%|
fn_8|27|17|44|918|10.34%|14.38%|
fn_9|22|28|52|918|43.03%|39.72%|
fn_11|22|17|39|918|29.99%|13.57%|
fn_14|43|41|84|918|18.06%|51.21%|
fn总|188|175|363|918|24.71%|185.92%|
fn杠|188|175|363|918|72.37%|523.53%|

## 说明
聚宽策略 `fn` 杠加了强制平仓后策略收益159.3%,最大回撤77.93%，相比之前，损失了许多收益，自此后续日内策略，暂不考虑强制平仓.
```SHELL
# 导入策略回测
https://www.joinquant.com/algorithm/index/edit?algorithmId=332d4db097ad718184b1fdca942e2bae
```

## 常见问题
1. `node` 处理数据内存耗完
```JS
// https://segmentfault.com/a/1190000010437948
node --max-old-space-size=8192 ./trans.js // MB
node --max-new-space-size=8192 ./trans.js // KB
```
