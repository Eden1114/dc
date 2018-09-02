'use strict';

var showapiSdk = require('showapi-sdk');

var appId='73801';
var secret='610bc4ded15049fd809ad8d28f46d2a7';

//开启debug
//showapiSdk.debug(true);
if(!(appId&&secret)){
  console.error('请先设置appId等测试参数,详见样例代码内注释!')
}
//全局默认设置
showapiSdk.setting({
  //你要调用的API对应接入点的地址,注意需要先订购了相关套餐才能调
  url:"http://route.showapi.com/909-1",
  appId:appId,//你的应用id
  secret:secret,//你的密钥
  timeout:5000,//http超时设置
  options:{//默认请求参数,极少用到
    testParam:'test'
  }
})

var request=showapiSdk.request();
request.appendText('from','北京');
request.appendText('to','上海');
request.appendText('trainDate','2018-09-30');
request.post(function(data){
  //console.info(data)
  var ticketprice = data.showapi_res_body.trains[0].ticketInfo.secondseat.price
  //此处输出的为最早的一辆车（必须是高铁）二等座的价格。如果出现错误，则说明该时间没有高铁。
  console.log(ticketprice)
})