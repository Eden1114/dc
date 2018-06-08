
/**
 * 参数： origin    起始地
 *       destination  目的地
 *       origin_region  起始地所在城市
 *       destination_region  目的地所在城市
 * 
 * 
 * 返回结果：  百度地图url
 * 
 */


function baidumap()
{
	this.getPost = function (origin,destination,origin_region,destination_region) 
	{

		var url="http://api.map.baidu.com/direction?origin="+origin+"&destination="+ destination
				+"&mode=transit"+"&origin_region="+origin_region+"&destination_region="+ destination_region+"&output=html&src=yourCompanyName|yourAppName";
		return url;
	}

};

module.exports = baidumap;

