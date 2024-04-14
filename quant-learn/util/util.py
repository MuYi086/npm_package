#!/usr/bin/python
# -*- coding: utf-8 -*-
from jqdatasdk import *
class Util:
    # 登录
    def login():
        auth('phone','password')
        return is_auth()
    # 剩余可调用条数
    def queryCount():
        return get_query_count()
    # 版本号
    def getVersion():
        return __version__
