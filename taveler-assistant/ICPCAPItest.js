'use strict';

const ICBCAPI = require('./ICBCAPI');

const client = new ICBCAPI({
    token:'xxxxx'
});

let general_params = {
//  通用请求参数
    app_id: 'IICAMP0000000057',
    biz_content : {
        // 请求参数
        mer_id : '020002040095',
        store_code : '02000015087',
        out_trade_no : 'ZHL777O15002039',
        order_amt : '7370',
        trade_date : '20171210',
        trade_time : '160346',
        attach : 'abcdefg',
        pay_expire : '1200',
        notify_url : '127.0.0.1',
        tporder_create_ip : '127.0.0.1',
        sp_flag : '0',
        notify_flag : '1'
    },
    msg_id : 'urcnl24ciutr9',
    sign_type : 'RSA',
    timestamp : '2016-10-29 20:44:38',
}


client.request('POST', '/qrcode/V2/generate',general_params)
    .then(ret => console.log(ret))
    .catch(err => console.error(err));