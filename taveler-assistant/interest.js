'use strict';

var showapiSdk = require('showapi-sdk');

function Interest() {
    
    var result = '';

    //设置你测试用的appId和secret,img
    var appId = '66752';
    var secret = '378285dfdf1e4b1483235f03a7e5501f';
    //开启debug
    //showapiSdk.debug(true);
    

    this.name = function( place ) {

        if (!(appId && secret)) {
            console.error('请先设置appId等测试参数,详见样例代码内注释!')
            return;
        }
        //全局默认设置
        showapiSdk.setting({
            url: "http://route.showapi.com/268-1",//你要调用的API对应接入点的地址,注意需要先订购了相关套餐才能调
            appId: appId,//你的应用id
            secret: secret,//你的密钥
            timeout: 5000,//http超时设置
            options: {//默认请求参数,极少用到
                testParam: 'test'
            }
        });

        var request = showapiSdk.request();
        request.appendText('keyword', place);   //景点名称的汉字
        request.appendText('proId','' );    //省级id
        request.appendText('cityId','' );   //城市id
        request.appendText('areaId','' );    //镇ID
        request.appendText('page','' );    //第几页
        request.post(function (data) {
            console.info(data);
            result = data;
        });
    }


    
};


module.exports = Interest;