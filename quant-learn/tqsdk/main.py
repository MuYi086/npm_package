from tqsdk import TqApi, TqAuth
api = TqApi(auth=TqAuth("phone", "password"))
quote = api.get_quote("SHFE.ni2105")
print(quote.last_price, quote.volume)