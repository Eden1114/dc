'use strict';
/**
 * 这是一个调用ICBC_java API的模块
 * 使用node-java实现
 * 
 */

const java = require('java');
java.classpath.push('./java_class');


function ICBC_API () {
    this.QrcodeGenerate = function (merid,storeCode,outTradeNum,orderAmt,
        tradeDate,tradeTime,attach,payExpire,notifyUrl,tporderCreateIp,
        spFlag,notifyFlag) {
        let QrcodeGenerateTest = java.import('com.api.QrcodeGenerateTest');
        return JSON.parse(QrcodeGenerateTest.QrcodeGenerateSync(merid, storeCode, outTradeNum, orderAmt,
            tradeDate, tradeTime, attach, payExpire, notifyUrl, tporderCreateIp,
            spFlag, notifyFlag));
    }

    this.QRcodePay = function() {



    }

}

module.exports = ICBC_API;