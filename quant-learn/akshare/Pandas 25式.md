# Pandas 25式

## 资料下载
[data资料](https://github.com/jaystone776/pandas_answered/blob/master/data/25_Pandas_Tips_by_PyCon_Master_data.zip 'data资料')

## 载入数据
```python
drinks = pd.read_csv('data/drinks.csv')
movies = pd.read_csv('data/imdb_1000.csv')
orders = pd.read_csv('data/chipotle.tsv', sep='\t')
orders['item_price'] = orders.item_price.str.replace('$', '').astype('float')
stocks = pd.read_csv('data/stocks.csv', parse_dates=['Date'])
titanic = pd.read_csv('data/titanic_train.csv')
ufo = pd.read_csv('data/ufo.csv', parse_dates=['Time'])
```

## 创建DataFrame
```python
df = pd.DataFrame({'列1': [100, 200], '列２': [300, 400]})
print(df)
# 创建多数据
df1 = pd.DataFrame(np.random.rand(5, 8))
print(df1)
## 强制命名列
df2 = pd.DataFrame(np.random.rand(5, 8), columns=list('一二三四五六七八'))
print(df2)
```

## 重命名列
```python
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
# add_prefix和add_suffix函数可以为所有列名添加前缀或后缀
df.add_prefix('X_')
df.add_suffix('_Y')
```

## 反转行序
```python
# 反转drinks表的顺序
drinks.head()
# 继续反转
drinks.loc[::-1].head()
# 索引从0到1,用reset_index()方法,并用drop关键字去掉原有索引
drinks.loc[::-1].reset_index(drop=True).head()
```

## 反转列序
```python
# 从左到右反转列序
drinks.loc[:,::-1].head()
```

## 按数据类型选择列
```python
# 查看drinks的数据类型
drinks.dtypes
# 选择所有数值型的列,用select_dtypes()
drinks.select_dtypes(include='number').head()
# 选择所有字符型的列
drinks.select_dtypes(include='object').head()
# 还可以用datetime选择日期型的列
drinks.select_dtypes(include=['number', 'object', 'category', 'datetime']).head()
# 使用exclude关键字排除制定的数据类型
drinks.select_dtypes(exclude='number').head()
```

## 把字符串转换为数值
```python
df = pd.DataFrame({'列1': ['1', '2', '3'], '列2': ['4.4', '5.5', '6.6'], '列3': ['7.7', '8.8', '-']})
print(df)
print(df.dtypes)
# 科学计算,将列转换为数值型
print(df.astype({'列1': 'float', '列2': 'float'}).dtypes)
# 使用to_numberic()函数处理第三列,将无效输入转为NaN
print(pd.to_numeric(df.列3, errors='coerce'))
# NaN代表0，可以用fillna()方法填充
print(df.apply(pd.to_numeric, errors='coerce').fillna(0))
```

## 优化DataFrame对内存的占用
```python
# 只读取切实需要的列,需要指定usecols参数
cols = ['beer_servings', 'container']
small_drinks = pd.read_csv('data/drinks.csv', usecols=cols)
small_drinks.info(memory_usage='deep')

# 把包含类别型的数据object列转换为Category数据类型,通过指定dtyp参数实现
cols = ['beer_servings', 'container']
dtyps = ['continent': 'category']
small_drinks = pd.read_csv('data/drinks.csv', usecols=cols, dtype=dtypes)
small_drinks.info(memory_usage='deep')
```

## 用多个文件建立DataFrame-按行
```python
from glob import glob
# glob返回的是无序文件名，要用 Python 内置的 sorted() 函数排序
stock_files = sorted(glob('data/stocks?.csv'))
print(stock_files)
# 用concat拼接
df1 = pd.concat((pd.read_csv(file) for file in stock_files))
print(df1)
# 使用ignore_index = True重建索引
df2 = pd.concat((pd.read_csv(file) for file in stock_files), ignore_index=True)
print(df2)
```

## 用多个文件建立 DataFrame-按列
```python
from glob import glob
drink_files = sorted(glob('data/drinks?.csv'))
df1 = pd.concat((pd.read_csv(file) for file in drink_files), axis='columns').head()
print(df1)
```

## 从剪贴板创建DataFrame
```python
# 有局限性,不建议使用
df = pd.read_clipboard()
print(df)
```

## 把DataFrame分割为俩个随机子集
```python
movies = pd.read_csv('data/imdb_1000.csv')
print(len(movies))
# 使用sample()方法随机选择75%的记录
movie_1 = movies.sample(frac=0.75, random_state=1234)
print(movie_1)
# 使用drop()方法删除movies所有的movie_1
movie_2 = movies.drop(movie_1.index)
print(movie_2)
print(len(movie_1) + len(movie_2))
```

## 根据多个类别筛选DataFrame
```python
movies = pd.read_csv('data/imdb_1000.csv')
print(movies.head())
df1 = movies[(movies.genre=='Action') | (movies.genre == 'Drama') | (movies.genre == 'Western')].head()
print(df1)
# 用isin()多条件筛选
df2 = movies[movies.genre.isin(['Action', 'Drama', 'Western'])].head()
print(df2)
# 反选可在条件前添加一个波浪符~
df3 = movies[~movies.genre.isin(['Action', 'Drama', 'Western'])].head()
print(df3)
```

## 根据最大的类别筛选DataFrame
```python
movies = pd.read_csv('data/imdb_1000.csv')
counts = movies.genre.value_counts()
# 选出种类最多的几种类型影片
df1 = movies[movies.genre.isin(counts.nlargest(3).index)].head()
print(df1)
```

## 处理缺失值
```python
ufo = pd.read_csv('data/ufo.csv')
print(ufo.head())
# 统计缺失值数量
count = ufo.isna().sum()
print(count)
# 可以用mean()函数，计算缺失值占比
percent = ufo.isna().mean()
print(percent)
# 用dropna()删除列里的所有缺失值
dl = ufo.dropna(axis='columns').head()
print(dl)
# 设置dropna()的阈值,限制删除缺失值高于10%的数据
limi = ufo.dropna(thresh=len(ufo)*0.9, axis='columns').head()
print(limi)
```

## 把字符串分割为多列
```python
df = pd.DataFrame({'姓名': ['张三', '李四', '王五'],
  '所在地': ['北京-东城区', '上海-黄浦区', '广州-白云区']})

print(df)
# 用str.split()方法分割,用expand关键字生成新的DataFrame
df1 = df.姓名.str.split('', expand=True)
print(df1)
# 把这俩列加到原DataFrame
df2 = df[['姓', '名']] = df.姓名.str.split('', expand=True)
print(df2)
```

## 把Series里的列表转换为DataFrame
```python
df = pd.DataFrame({'列1': ['a', 'b', 'c'], '列2': [[10, 20], [20, 30], [30, 40]]})
print(df)
# 把第二列转为DataFrame,使用apply()方法
df_1 = df.列2.apply(pd.Series)
print(df_1)
# 用concat函数拼接
df_2 = pd.concat([df, df_1], axis='columns')
print(df_2)
```

## 选择行与列
```python
df = pd.read_csv('data/titanic_train.csv')
print(df)
# 用describe()方法,可以得到数据集的基本统计数据
print(df.describe())
# 选择其中几行显示s
df_1 = df.describe().loc['min': 'max']
print(df_1)
# 也可以只选择几列
df_2 = df.describe().loc['min': 'max', 'Pclass': 'Parch']
print(df_2)
```

## 重塑多重索引Serise
```python
df = pd.read_csv('data/titanic_train.csv')
# 统计幸存率
print(df.Survived.mean())
# 按男女性别统计幸存率
print(df.groupby('Sex').Survived.mean())
# 按性别和船舱类型统计幸存率
print(df.groupby(['Sex', 'Pclass']).Survived.mean())
# 用unstack()把多重索引转为DataFrame
print(df.groupby(['Sex', 'Pclass']).Survived.mean().unstack())
```

## 创建透视表
```python
df = pd.read_csv('data/titanic_train.csv')
# 用pivot_table创建透视表
df_1 = df.pivot_table(index='Sex', columns='Pclass', values='Survived', aggfunc='mean')
print(df_1)
# 把聚合函数mean改为count,就可以生产交叉表
df_2 = df.pivot_table(index='Sex', columns='Pclass', values='Survived', aggfunc='count', margins=True)
print(df_2)
```

## 改变显示选项
```python
df = pd.read_csv('data/titanic_train.csv')
pd.set_option('display.float_format', '{:.2f}'.format)
print(df)
```