import akshare as ak
get_roll_yield_bar_df = ak.get_roll_yield_bar(type_method="date", var="RB", start_day="20180618", end_day="20180718", plot=True)
print(get_roll_yield_bar_df)