#!/usr/bin/python
# -*- coding: utf-8 -*-
from jqdatasdk import *
# 获取行业概念成分股
class StockMembers:
    # security：股票代码或股票列表
    # date：指定日期，获取股票在指定日期所属的概念列表
    def getConceptMembers(security, date):
        return get_concept(security, date)
    
