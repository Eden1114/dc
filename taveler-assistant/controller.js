/*
    实现一个中间件，通过给定不同的参数调用不同的模块
    这里的参数应该都是payload
    通过解析payload获得当前聊天给服务器传递的值
    
    
    TODO://
    还需要获得服务器返回的值
 */
'use strict';

let baidumap = require('./baidumap');
let interest = require('./interest');
let food = require('./food');
let hotel = require('./hotel');
let icbc = require('./icbc');

let baidumapAPI = new baidumap();
let interestAPI = new interest();
let foodAPI = new food();
let hotelAPI = new hotel();
let icbcAPI = new icbc();

function Controller() {

  this.printContext =  function (payload) {
    console.log('--------------');
    console.log(payload);
    console.log('--------------');
  }

  this.run = function(payload, response) {
    // for debug
    this.printContext(payload);


    if(payload && payload.context) {
      var origin = payload.context.origin;
      var destination = payload.context.destination;
      var kind = payload.context.kind;
      var ishotel = payload.context.hotel;
    }
  
    if(origin != null && destination != null) {
      let url = baidumapAPI.citytocity(origin, destination);
      response.output.text += '<a target="_blank" href="' + url +'">路线</a>\n';
      response.output.text += '如果需要让我帮您买票，请扫下面的二维码：';
      
      let r = icbcAPI.QRcodeGenerate(
        "020002040095", //"mer_id
        "02000015087", //storeCode
        "ZHL777O15002039", //outTradeNo
        "7370", //order_amt
        "20171210", //trade_date
        "160346", //trade_time
        "abcdefg", //attach
        "1200", // pay_expire
        "127.0.0.1", // notify_url
        "127.0.0.1", // tporder_create_ip
        "0", // sp_flag
        "1" // notify_flag
      );

      console.log('---------');
      console.log(r);
      console.log('---------');
    }

    if(destination != null && kind != null) {
      response.output.text += '<a target="_blank" href="' + foodAPI.getfood(kind, destination) + '">美食</a>\n';
    }

    
    if(ishotel != null && destination != null) {
      response.output.text += '<a target="_blank" href="' + hotelAPI.gethotel(destination)+ '">住宿</a>\n';
    }

  }

}




module.exports = Controller;