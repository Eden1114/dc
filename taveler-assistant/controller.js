/*
    实现一个中间件，通过给定不同的参数调用不同的模块
    这里的参数应该都是payload
    通过解析payload获得当前聊天给服务器传递的值
    
    
    TODO://
    还需要获得服务器返回的值
 */

function Controller() {
  this.printContext = function (payload) {
    console.log(payload.context);
  }

  this.run = function(context) {
    if(context) {
      console.log(context);
    }
  }

}




module.exports = Controller;