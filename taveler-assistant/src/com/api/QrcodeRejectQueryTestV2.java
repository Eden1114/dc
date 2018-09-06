package com.icbc.api;

import com.api.Constant;
import com.icbc.api.request.QrcodeRejectQueryRequestV2;
import com.icbc.api.request.QrcodeRejectQueryRequestV2.QrcodeRejectQueryRequestV2Biz;
import com.icbc.api.response.QrcodeRejectQueryResponseV2;

/**
 * 工银二维码退款查询接口
 * 
 * 请商户配置SDK中的lib文件夹中的jar包后，根据备注1-6提示进行数据替换
 */
public class QrcodeRejectQueryTestV2 {
	
	public static String QrcodeRejectQueryV2(String merId,
											 String custId,
											 String outTradeNo,
											 String orderId,
											 String rejectNo) throws Exception {
		
		String APIGW_PUBLIC_KEY = Constant.APIGW_PUBLIC_KEY;
		String APP_ID = Constant.APP_ID;
		String MY_PRIVATE_KEY = Constant.MY_PRIVATE_KEY;
		String SERVICE_URL = Constant.SERVICE_URL;
		
		//签名类型为RSA2时，需传入appid，私钥和网关公钥，签名类型使用定值IcbcConstants.SIGN_TYPE_RSA2，其他参数使用缺省值
		DefaultIcbcClient client = new DefaultIcbcClient(APP_ID, IcbcConstants.SIGN_TYPE_RSA2, MY_PRIVATE_KEY, APIGW_PUBLIC_KEY);
				
		QrcodeRejectQueryRequestV2 request = new QrcodeRejectQueryRequestV2();
		
		//4、根据测试环境和生产环境替换相应ip和端口
		request.setServiceUrl("https://ip:port/api/qrcode/V2/reject/query");

		//5、请对照接口文档用bizContent.setxxx()方法对业务上送数据进行赋值
		QrcodeRejectQueryRequestV2Biz bizContent = new QrcodeRejectQueryRequestV2Biz();
		bizContent.setMerId(merId);
		bizContent.setCustId(custId);//该字段非必输项
		bizContent.setOutTradeNo(outTradeNo);
		bizContent.setOrderId(orderId);				
		bizContent.setRejectNo(rejectNo);		
		request.setBizContent(bizContent);

		QrcodeRejectQueryResponseV2 response;
		
		String r = "";
		try {
			response = client.execute(request, "msgId");
			//msgId消息通讯唯一编号，要求每次调用独立生成，APP级唯一
			
			if (response.isSuccess()) {
				//6、业务成功处理，请根据接口文档用response.getxxx()获取同步返回的业务数据
				r += ("ReturnCode:"+response.getReturnCode()+"\n");
				r += ("response:" + response + "\n");
			} else {
				//失败
				r += ("ReturnCode:" + response.getReturnCode() + "\n");
				r += ("ReturnMsg:" + response.getReturnMsg() + "\n");
			}
		} catch (IcbcApiException e) {
			e.printStackTrace();
		}
		
		return r;

	}

	public static void main(String[] args) {
		
	}
}

