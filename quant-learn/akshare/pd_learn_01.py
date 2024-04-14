import pandas as pd
import numpy as np
pd.set_option('compute.use_bottleneck', False)
pd.set_option('compute.use_numexpr', False)

# drinks = pd.read_csv('data/drinks.csv')
# movies = pd.read_csv('data/imdb_1000.csv')
# orders = pd.read_csv('data/chipotle.tsv', sep='\t')
# orders['item_price'] = orders.item_price.str.replace('$', '').astype('float')
# stocks = pd.read_csv('data/stocks.csv', parse_dates=['Date'])
# titanic = pd.read_csv('data/titanic_train.csv')
# ufo = pd.read_csv('data/ufo.csv', parse_dates=['Time'])

df = pd.DataFrame({'列 1': [100, 200], '列 2': [300, 400]})
print(df)
# 重命名
df1 = df.rename({'列 1': '列1', '列 2': '列2'}, axis= 'columns')
print(df1)
# 直接为列赋值
df.columns = ['列1', '列2']
print(df)
# 直接替换列里空格
df.columns = df.columns.str.replace('', '_')
print(df)