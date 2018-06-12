

/**
 * 参数： 
 * 		  city 城市
 * 返回结果：  
 * 		  酒店的string
 */
function hotel()
{
	this.gethotel = function (city) 
	{
		var request=require('request');
		var URL="http://api.map.baidu.com/place/v2/search?query=酒店&region="+city+"&filter=hotel&output=json&ak=hDzuFZ8W3ygA007ogMf4TS9SGwGvpOOy"

		request.post({ url: URL, form: { key: 'value' } }, function (error, response, data) {
			if (!error && response.statusCode == 200) 
			{
				var dataObj=eval("("+data+")");
				var hotel= dataObj.results[0].name;
				var hotelarea = dataObj.results[0].city + dataObj.results[0].area+dataObj.results[0].address;

				var ans = "最受欢迎的酒店："+ hotel +", 地点:"+hotelarea;
			    
				return ans;
			
			}
		})
	}

};

module.exports = hotel;




/*
var request=require('request');
request.post({ url: 'http://api.map.baidu.com/place/v2/search?query=酒店&region=北京&filter=hotel&output=json&ak=hDzuFZ8W3ygA007ogMf4TS9SGwGvpOOy', form: { key: 'value' } }, function (error, response, data) {
			if (!error && response.statusCode == 200) 
			{
				var dataObj=eval("("+data+")");
				var hotel= dataObj.results[0].name;
				var hotelarea = dataObj.results[0].city + dataObj.results[0].area+dataObj.results[0].address;

				var ans = "最受欢迎的酒店："+ hotel +", 地点:"+hotelarea;
			    
				console.log(ans);
			
			}
		})
*/