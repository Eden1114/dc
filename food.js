/**
 * 参数： 
 * 		  city 城市
 *        kind 美食类型，例如烧烤，火锅
 * 返回结果：  
 * 		  餐馆的string
 */
function food()
{
	this.getfood = function (city,kind) 
	{
		var request=require('request');
		var URL="http://api.map.baidu.com/place/v2/search?query="+kind+"&tag=美食&region="+city+"&filter=cater&output=json&ak=hDzuFZ8W3ygA007ogMf4TS9SGwGvpOOy";
		request.post({ url: URL, form: { key: 'value' } }, function (error, response, data) {
			if (!error && response.statusCode == 200) 
			{
				var dataObj=eval("("+data+")");
				var food = dataObj.results[0].name;
				var foodarea = dataObj.results[0].city + dataObj.results[0].area+dataObj.results[0].address;

				var ans = "最受欢迎的美食："+food +", 地点:"+foodarea;
				return ans;
			
			}
		})
	}

};

module.exports = food;










/*
var request=require('request');

request.post({ url: 'http://api.map.baidu.com/place/v2/search?query=烧烤&tag=美食&region=北京&filter=cater&output=json&ak=hDzuFZ8W3ygA007ogMf4TS9SGwGvpOOy', form: { key: 'value' } }, function (error, response, data) {
			if (!error && response.statusCode == 200) 
			{
				var dataObj=eval("("+data+")");
				var food = dataObj.results[0].name;
				var foodarea = dataObj.results[0].city + dataObj.results[0].area+dataObj.results[0].address;

				var ans = "最受欢迎的美食："+food +", 地点:"+foodarea;
			    console.log(ans);
			}
		})
*/