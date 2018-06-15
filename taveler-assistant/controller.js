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


var baidumapAPI = new baidumap();
var interestAPI = new interest();



function Controller() {

  this.printContext =  function (payload) {
    console.log(payload.context);
  }

  this.run = function(payload, response) {
    if(payload && payload.context) {
      var origin = payload.context.origin;
      var destination = payload.context.destination;
      
    }
  
    if(origin != null && destination != null) {
      var url = baidumapAPI.citytocity(origin, destination);
      response.output.text += '<a target="_blank" href="' + url +'">路线</a>\n';
    }

  }

}




module.exports = Controller;