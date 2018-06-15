/**
 * 参数： 
 * 		 city 城市
 * 返回结果：  
 * 		 	百度地图url 
 */

function hotel()
{

	this.gethotel= function (city) 
	{

		var url="http://api.map.baidu.com/place/search?query=宾馆&radius=1000&region="+city+"&output=html" ;
		return url;
	}
	
};

module.exports = hotel;