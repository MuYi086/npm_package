# pandas使用总结

## Head与Tail
`head()` 与 `tail()` 用于快速预览 `Series` 与 `DataFrame` ，默认显示 5 条数据，也可以指定显示数据的数量

## 属性与底层数据
Pandas 可以通过多个属性访问元数据:
* shape:
    * 输出对象的轴维度,与 ndarray　一致
* 轴标签
    * Series: Index (仅有此轴)
    * DataFrame: Index (行) 与列

.array 属性用于提取 Index 或 Series　里的数据
提取Numpy 数组, 用 to_numpy()　或 numpy.asarray()

## 加速操作
借助 numexpr 与 bottleneck 支持库，Pandas 可以加速特定类型的二进制数值与布尔操作
```python
pd.set_option('compute.use_bottleneck', False)
pd.set_option('compute.use_numexpr', False)
```

## 匹配/广播机制
1. df.iloc[1] (取每行下标为1的数据)
1. df['two'] (取每列下标为two的数据)
1. df.sub(row, axis='columns') (查找数据帧row和其他逐元素的减法,axis即轴)
1. df.copy() (拷贝)
1. divmod() (接收两个数字类型（非复数）参数，返回一个包含商和余数的元组)
1. df + df1 = df.add(df2, fill_value=0) (加法)

## 比较操作
序号|缩写|英文|中文
--|:--:|:--:|--:
1|eq|equal to|等于
2|ne|not equal to|不等于
3|lt|less than|小于
4|gt|greater than|大于
5|le|less than or equal to|小于等于
6|ge|greater than or equal to|大于等于

## 布尔简化
1. df.empty (验证Pandas对象是否为空)
1. df.bool() (验证单元素pandas对象的布尔值)

## 合并重叠数据集
1. df1.combine_first(df2) (df2并入df1)

## DataFrame通用合并方法
```python
def combiner(x, y):
  return np.where(pd.isna(x), y, x)
```

## 描述性统计
注意:mean, std, sum等方法默认不统计Series里的空值
1. df.sum() (求和)
1. df.count(value) (统计非空值数量)
1. df.mean() (求平均值,0是列)
1. df.min() (最小值)
1. df.max() (最大值)
1. df.mode() (众数)
1. df.abs() (绝对值)
1. df.std() (贝塞尔校正的样本标准偏差)
1. df.prod(arr) (数组乘积和)
1. df.var() (无偏方差)
1. df.cumsum() (累加)
1. df.cumprod() (累乘)
1. df.cummax() (累积最大值)
1. df.cummin() (累积最小值)
1. df.describe() (计算Series和DataFrame数据列的各种数据统计量)
1. df.idxmax() (最大值的索引)
1. df.idxmin() (最小值的索引)
1. df.value_counts() (统计数组中数据重复次数)
1. pd.value_counts(df) (统计数组中数据重复次数)


## 函数应用
1. 表级函数应用 pipe()

    ```python
    # 用于链式调用
    # f/g/h是提取,返回 DataFrame的函数
    # 方式一
    f(g(h(df), arg=1), arg2=2, arg3=3)
    # 方式二
    (df.pipe(h)
      .pipe(g, arg1=1)
      .pipe(f, arg2=2 arg3=3))

    ```
    1. 行列级函数应用 apply()
    该方法沿着DataFrame的轴应用函数,支持axis参数
    ```python
    # 方式一
    df.apply(np.mean)
    # 方式二
    df.apply('mean')
    ```

1. 聚合API agg() 与 transform()

    ```python
    tsdf = pd.DataFrame(np.random.randn(10, 3), 
        columns=['A', 'B', 'C'],
      index=pd.date_range('1/1/2000', periods=10))
    tsdf.iloc[3:7] = np.nan
    print(tsdf)
    # 方式一
    tsdf.agg(np.sum)
    # 方式二
    tsdf.agg('sum')
    # 方式三
    tsdf.sum()
    # 单个聚合操作返回标量值
    tsdf.A.agg('sum')

    ## 多函数聚合
    tsdf.agg(['sum', 'mean'])
    ## 聚合多函数返回结果还是Series,索引为函数名
    tsdf.A.agg(['sum', 'mean'])
    ## 传递lambda函数时输出名为<lambda>的行
    tsdf.A.agg(['sum' lambda x: x.mean()])
    ## 应用自定义函数,该函数为输出结果的行名
    def mymean(x):
      return x.mean()
    tsdf.A.agg(['sum', mymean])
    ## 用字典实现聚合
    tsdf.agg([{'A': 'mean', 'B': 'sum'}])

    ## transform 返回结果与原始数据的索引相同大小相同,与.agg类似
    tsdf.transform(np.abs)
    ```
1. 元素级函数应用 applymap()

    ```python
    df = pd.DataFrame(np.random.randn(5, 3), 
      columns=['A', 'B', 'C'],
      index=pd.date_range('1/1/2000', periods=5))
    print(df)
    def f(x):
      return len(str(x))
    print(df['A'].map(f))
    ```

Series.map() 还有个功能，可以“连接”或“映射”第二个 Series 定义的值

    ```python
    s = pd.Series(['six', 'seven', 'six', 'seven', 'six'],
        index=['a', 'b', 'c', 'd', 'e'])
    t = pd.Series({'six': 6., 'seven': 7.})
    print(s)
    print(s.map(t))
    ```

## 重置索引与更换标签
```python
s = pd.Series(np.random.randn(5), index=[1, 2, 3, 4, 5])
t = s.reindex([3,5,6,2])
print(s)
print(t)
#　drop() 删除轴上的一组标签
df.drop(['a', 'd'], axis=0)
df.drop(['one'], axis=1)
```

## 迭代
```python
#　输出列名
df = pd.DataFrame({'col1': np.random.randn(3),
'col2': np.random.randn(3)}, index=['a', 'b', 'c'])
print(df)
for col in df:
  print(col)

# items()通过键值对进行迭代
for label, ser in df.items():
  print(label)
  print(ser)

# iterrows()迭代DataFrame或Series里的每一行数据
for row_index, row in df.iterrows():
  print(row_index, row, sep='\n')
```

## .dt访问器
```python
s = pd.Series(pd.date_range('20200101 09:10:11', periods=4))
print(s)
print(s.dt.hour)
print(s.dt.second)
print(s.dt.day)
```

## 矢量化字符串方法
```python
s = pd.Series(['A', 'B', 'C', 'Aaba'])
print(s.str.lower())
```

## 排序
1. 按索引排序
    ```python
    df = pd.DataFrame({
      'one': pd.Series(np.random.randn(3), index=['a', 'b', 'c']),
      'two': pd.Series(np.random.randn(4), index=['a', 'b', 'c', 'd']),
      'three': pd.Series(np.random.randn(3), index=['b', 'c', 'd'])})

    unsorted_df = df.reindex(index=['a', 'd', 'c', 'b'],
      columns=['three', 'two', 'one'])

    print(df)
    # 打乱顺序
    print(unsorted_df)
    # 按索引排序
    print(unsorted_df.sort_index())
    # 按索引倒序
    print(unsorted_df.sort_index(ascending=False))
    # 按轴排序
    print(unsorted_df.sort_index(axis=1))
    # 列为three的按顺序排序
    print(unsorted_df['three'].sort_index())
    ```
1. 按列值排序

    ```python
    df1 = pd.DataFrame({'one': [2, 1, 1, 1],
      'two': [1, 3, 2, 4],
      'three': [5, 4, 3, 2]})

    print(df1)
    # 给two列排序
    print(df1.sort_values(by='two'))
    # 先按onw排序,后按two排序
    print(df1[['one', 'two', 'three']].sort_values(by=['one', 'two']))
    ```

1. 混合排序
    ```python
    idx = pd.MultiIndex.from_tuples([('a', 1), ('a', 2), ('a', 2),
      ('b', 2), ('b', 1), ('b', 1)])

    print(idx)
    idx.names = ['first', 'second']
    print(idx)
    df_multi = pd.DataFrame({'A': np.arange(6, 0, -1)},
      index=idx)
    print(df_multi)
    ```

## 最大值与最小值

    ```python
    # series处理
    s = pd.Series(np.random.permutation(10))
    print(s)
    print(s.sort_values())
    print(s.nsmallest(3))
    print(s.nlargest(3))

    # DataFrame也支持nlargest和nsmallest方法
    df = pd.DataFrame({'a': [-2, -1, 1, 10, 8, 11, -1],
      'b': list('abdceff'),
      'c': [1.0, 2.0, 4.0, 3.2, np.nan, 3.0, 4.0]})

    print(df)
    print(df.nlargest(3, 'a'))
    print(df.nlargest(5, ['a', 'c']))
    print(df.nsmallest(3, 'a'))
    print(df.nsmallest(5, ['a', 'c']))
    ```

## 数据类型

    ```python
    dft = pd.DataFrame({'A': np.random.rand(3),
      'B': 1,
      'C': 'foo',
      'D': pd.Timestamp('20010102'),
      'E': pd.Series([1.0] * 3).astype('float32'),
      'F': False,
      'G': pd.Series([1] * 3, dtype='int8')})

    print(dft)
    print(dft.dtypes)
    # 统计DataFrame里不同数据类型的列数
    print(dft.dtypes.value_counts())
    ```

## 对象转换
```python
import datetime
df = pd.DataFrame([[1, 2],
   ['a', 'b'],
   [datetime.datetime(2016, 3, 2),
   datetime.datetime(2016, 3, 2)]])

df = df.T
print(df)
print(df.dtypes)
print(df.infer_objects().dtypes)
```