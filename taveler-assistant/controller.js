/*
    实现一个中间件，通过给定不同的参数调用不同的模块
    这里的参数应该都是payload
    通过解析payload获得当前聊天给服务器传递的值
    
    
    TODO://
    还需要获得服务器返回的值
 */
'use strict';

var baidumap = require('./baidumap');
var interest = require('./interest');
var food = require('./food');
var hotel = require('./hotel');

var baidumapAPI = new baidumap();
var interestAPI = new interest();
var foodAPI = new food();
var hotelAPI = new hotel();

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
      var url = baidumapAPI.citytocity(origin, destination);
      response.output.text += '<a target="_blank" href="' + url +'">路线</a>\n';
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