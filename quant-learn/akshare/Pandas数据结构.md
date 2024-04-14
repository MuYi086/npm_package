# Pandas数据结构

## Series
1. 多维数组

    ```python
    # data是多维数组时,index长度必须与data长度一致
    s = pd.Series(np.random.randn(5), index=['a', 'b', 'c', 'd', 'e'])
    print(s)
    # 没有指定index参数,默认0, ..., len(data) - 1
    d = pd.Series(np.random.randn(5))
    print(d)
    ```

1. 字典

    ```python
    d = {'b': 1, 'a': 0, 'c': 2}
    print(pd.Series(d))
    # 设置了index参数,则按索引标签提取data里对应的值
    e = pd.Series(d, index=['b', 'c', 'd', 'a'])
    print(e)
    ```

1. 标量值

    ```python
    # data是标量值时,必须提供索引
    d = pd.Series(5., index=['a', 'b', 'c', 'd', 'e'])
    print(d)
    ```
1. 类多维数组

    ```python
    d = pd.Series(5., index=['a', 'b', 'c', 'd', 'e'])
    print(d.array)
    # Series只是类似多维数组,提取真正的多维数组,要用Series.to_numpy()
    e = d.to_numpy()
    print(e)
    ```

1. 名称属性

    ```python
    s = pd.Series(np.random.randn(5), name='test')
    print(s)
    # 重命名
    s2 = s.rename('different')
    print(s2.name)
    ```

## DataFrame
1. 用Series字典或字典生产DataFrame

    ```python
    d = {'one': pd.Series([1., 2., 3.], index=['a', 'b', 'c']),
      'two': pd.Series([1., 2., 3., 4.], index=['a', 'b', 'c', 'd'])}

    df = pd.DataFrame(d)
    print(df)
    # index和columns属性分别用于访问行,列标签
    df_1 = pd.DataFrame(d, index=['d', 'b', 'a'])
    print(df_1)
    df_2 = pd.DataFrame(d, index=['d', 'b', 'a'], columns=['two', 'three'])
    print(df_2)
    ```
1. 用多维数组字典,列表字典生成DataFrame

    ```python
    d = {'one': [1., 2., 3., 4.], 'two': [4., 3., 2., 1.]}
    d_1 = pd.DataFrame(d)
    print(d_1)
    # 如果传递了索引参数,index的长度必须与数组一致
    d_2 = pd.DataFrame(d, index=['a', 'b', 'c', 'd'])
    print(d_2)
    ```

1. 用结构多维数组或记录多维数组生成DataFrame

    ```python
    data = np.zeros((2,), dtype=[('A', 'i4'), ('B', 'f4'), ('C', 'a10')])
    print(data)
    print('----------')
    data[:] = [(1, 2., 'Hello'), (2, 3., 'World')]
    print(data)
    print('-----------')
    print(pd.DataFrame(data))
    print('------------')
    print(pd.DataFrame(data, index=['first', 'second']))
    print('------------')
    print(pd.DataFrame(data, columns=['C', 'A', 'B']))
    ```

1. 用列表字典生成DataFrame

  ```python

  ```