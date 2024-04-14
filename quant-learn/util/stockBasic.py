#!/usr/bin/python
# -*- coding: utf-8 -*-
from jqdatasdk import *
# 获取标的基本信息
class StockBasic:
    # 获取所有标的信息
    # types: list: 可选: 'stock', 'fund', 'index', 'futures', 'options', 'etf', 'lof', 'fja', 'fjb', 'open_fund', 'bond_fund', 'stock_fund', 'QDII_fund', 'money_market_fund', 'mixture_fund'。types为空时返回所有股票, 不包括基金,指数和期货
    # date: 日期, 一个字符串或者 [datetime.datetime]/[datetime.date] 对象
    def getAll(arr, date):
        return get_all_securities(types=arr, date=date)
    # 获取单个标的信息
    def getSingle(code):
        return get_security_info(code=code)
    # 获取指数成分股
    # 指数列表: https://www.joinquant.com/indexData
    def getMembers(code):
        return get_index_stocks(code, date=None)
    # 获取基金净值/期货结算价等
    # info: ['is_st', 'acc_net_value', 'unit_net_value', 'futures_sett_price', 'futures_positions'] 中的一个
    # security_list: 股票列表
    # df: 返回[pandas.DataFrame]对象还是一个dict, 同 [history]
    # count: 数量, 与 start_date 二选一, 不可同时使用, 必须大于 0. 表示取 end_date 往前的 count 个交易日的数据
    def getSettlementPrice(info, security_list, start, end, df):
        return get_extras(info, security_list, start_date=start, end_date=end, df=df)