import requests

r = requests.session()

data = {
    'app_id' : '2014072300007148',
    'biz_content' : '{"id":"stud ent_id","name":"student_name"}',
    'charset' : 'GBK',
    'sign_type':'RSA',
    'timestamp' : '2014‐07‐24 03:07:50',
    'trade_id' : '123456',
}


#res1 = r.post('https://gw.open.icbc.com.cn/api/preciousmetal/V1/purchase',data=data)
res2 = r.post('https://gw.open.icbc.com.cn/api/preciousmetal/V1/purchase/api/preciousmetal/V1/purchase?app_id=2014072300007148&biz_content={"id":"stud ent_id","name":"student_name"}&charset=GBK&sign_type=RSA&timestamp=2014‐07‐24 03:07:50&trade_id=123456')
print(res2.text)