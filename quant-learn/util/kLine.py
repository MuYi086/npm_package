#!/usr/bin/python
# -*- coding: utf-8 -*-
class KLine:
    # 期货协会K线类型：http://edu.cfachina.org/qhxy/QHABC/jsmfx/201510/t20151023_1878339.html
    def dealKStyle(kLine):
        # 阳（收盘价>开盘价）; 阴（收盘价<开盘价）
        # open(开盘价),close(收盘价),high(最高价),low(最低价)

        # 长红或大阳线(1)
        # 表示强烈的涨势.阳线的长短代表着买盘的强劲程度,阳线越长,说明买盘越强
        if (kLine.open == kLine.low and kLine.close == kLine.high and kLine.close > kLine.open):
            return 1
        # 长黑线或大阴线(2)
        # 表示强烈的跌势.意义与大阳线相反
        if (kLine.open == kLine.high and kLine.close == kLine.low and kLine.close < kLine.open):
            return 2
        # 先跌后涨型(3)
        # 预示买盘较强,仍保持继续上升的势头
        if (kLine.close == kLine.high and kLine.open > kLine.low and kLine.close > kLine.open):
            return 3
        # 下跌抵抗型(4)
        # 预示下跌受到抵抗
        if (kLine.open == kLine.high and kLine.close > kLine.low and kLine.close < kLine.open):
            return 4
        # 上升阻力型(5)
        # 表示上升受到抵抗
        if (kLine.open == kLine.low and kLine.high > kLine.close and kLine.close > kLine.open):
            return 5
        # 先涨后跌型(6)
        # 预示卖盘较强,仍处在下降趋势之中
        if (kLine.close == kLine.low and kLine.high > kLine.open and kLine.close < kLine.open):
            return 6
        # 反转试探型(7)
        # 表示上升暂受阻,但后市仍然看涨
        if (kLine.high > kLine.close and kLine.open > kLine.low and kLine.close > kLine.open):
            return 7
        # 弹升试探型(8)
        # 表示下跌暂受阻,但后市仍然看空
        if (kLine.high > kLine.open and kLine.low < kLine.close and kLine.close < kLine.open):
            return 8
        # 十字型(9)
        # 买方与卖方几乎势均力敌
        if (kLine.high > kLine.open and kLine.open == kLine.close and kLine.open > kLine.low):
            return 9
        # T型(10)
        # 多空较量由弱转强,转跌为升的信号
        if (kLine.high == kLine.open and kLine.open == kLine.close and kLine.close > kLine.low):
            return 10
        # 倒T型(11)
        # 跟T型相反,表示多空较量由强转弱,这是转升为跌的信号
        if (kLine.high > kLine.open and kLine.open == kLine.close and kLine.close == kLine.low):
            return 11
        # 一字型：四价合一(12)
        # 常出现在涨跌停板之时,是涨势或跌势最强的走势
        if (kLine.high == kLine.open and kLine.open == kLine.close and kLine.close == kLine.low):
            return 12