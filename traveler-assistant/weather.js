/**
 * 参数： 
 * 		  location 目标城市，支持拼音和汉语
 * 返回结果：  
 * 		 	天气情况string
 * 触发条件：
 *      weatherAPI为on
 */
'use strict';
require('babel-polyfill');

function weather() {

  this.getWeatherCondition = function (location, response) {

    var UID = "UD08492217"; // 测试用 用户ID，请更换成您自己的用户ID
    var KEY = "co5hkpvb2ddse5sg"; // 测试用 key，请更换成您自己的 Key
    var LOCATION = location; // 除拼音外，还可以使用 v3 id、汉语等形式

    var Api = require('./xinzhiapi.js');
    var argv = require('optimist').default('l', LOCATION).argv;
    var api = new Api(UID, KEY);
    var weather;

    api.getWeatherNow(argv.l).then(
      function(data) {
        var weather = data.results[0].location.name +
                      "天气" +
                      data.results[0].now.text +
                      "，平均气温" +
                      data.results[0].now.temperature +
                      "度";

        response.output.text += weather;
      }
    );
  }
};

module.exports = weather;

