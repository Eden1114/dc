'use strict';
/*
要单独运行该测试请使用npm安装mocha模块,
然后在包目录下在运行命令: mocha test/index.js
 */
var assert = require('assert');
var showapiSdk = require('./lib');

//设置你测试用的appId和secret,n
var appId='';
var secret='';
var img='';

//开启debug
//showapiSdk.debug(true);

if(!(appId&&secret&&img)){
  console.error('请先设置appId等测试参数,详见样例代码内注释!')
  return;
}

//全局默认设置
showapiSdk.setting({
  url:'http://route.showapi.com/44-3',//你要调用的API对应接入点的地址,注意需要先订购了相关套餐才能调
  appId:appId,//你的应用id
  secret:secret,//你的密钥
  timeout:5000,//http超时设置
  options:{//默认请求参数,极少用到
    testParam:'test'
  }
})

describe('showapi-sdk' , function () {
  it('彩票使用默认参数' , function (done) {

    var request=showapiSdk.request();
    request.appendText('code','fc3d');

    request.post(function(data){
      assert(data.showapi_res_code==0,"接口返回系统错误:"+data.showapi_res_error);
      done();
    })
  });
  it('orc使用默认参数' , function (done) {
    var request=showapiSdk.request('http://route.showapi.com/21-1');
    request.appendFile('image',img)

    request.post(function(data){
      assert(data.showapi_res_code==0,"接口返回系统错误:"+data.showapi_res_error);
      done();
    })
  });

  it('彩票指定参数' , function (done) {

    var request=showapiSdk.request('https://route.showapi.com/44-3',appId,secret);
    request.appendText('code','ssq');

    request.post(function(data){
      assert(data.showapi_res_code==0,"接口返回系统错误:"+data.showapi_res_error);
      done();
    })
  });
  it('orc指定参数' , function (done) {
    var request=showapiSdk.request('http://route.showapi.com/21-1',appId,secret);
    request.appendFile('image',img)

    request.post(function(data){
      assert(data.showapi_res_code==0,"接口返回系统错误:"+data.showapi_res_error);
      done();
    })
  });
});

