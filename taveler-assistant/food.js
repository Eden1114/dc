
/**
 * 参数： 
 *       kind 美食的种类，如烧烤，火锅等
 * 		 city 城市
 * 返回结果：  
 * 		 	百度地图url 
 */

function food()
{

	this.getfood= function (kind,city) 
	{

		var url="http://api.map.baidu.com/place/search?query="+kind+"&radius=1000&region="+city+"&output=html" ;
		return url;
	}
	
};


module.exports = food;