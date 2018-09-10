package com.icbc.api;

import com.api.Constant;
import com.icbc.api.request.QrcodeReverseRequestV2;
import com.icbc.api.request.QrcodeReverseRequestV2.QrcodeReverseRequestV2Biz;
import com.icbc.api.response.QrcodeReverseResponseV2;

/**
 * 工银二维码冲正接口
 * 
 * 请商户配置SDK中的lib文件夹中的jar包后，根据备注1-6提示进行数据替换
 */
public class QrcodeReverseTest {
	
	public static String QrcodeReverse( String merId,
										String custId,
										String outTradeNo,
										String orderId,
										String rejectNo,
										String rejectAmt,
										String operId,
										String merattach) throws Exception {
		
		String APIGW_PUBLIC_KEY = Constant.APIGW_PUBLIC_KEY;
		String APP_ID = Constant.APP_ID;
		String MY_PRIVATE_KEY = Constant.MY_PRIVATE_KEY;
		String SERVICE_URL = Constant.SERVICE_URL;
		
		//签名类型为RSA2时，需传入appid，私钥和网关公钥，签名类型使用定值IcbcConstants.SIGN_TYPE_RSA2，其他参数使用缺省值
		DefaultIcbcClient client = new DefaultIcbcClient(APP_ID, IcbcConstants.SIGN_TYPE_RSA2, MY_PRIVATE_KEY, APIGW_PUBLIC_KEY);
				
		QrcodeReverseRequestV2 request = new QrcodeReverseRequestV2();
		
		//4、根据测试环境和生产环境替换相应ip和端口
		request.setServiceUrl("https://ip:port/api/qrcode/V2/reverse");

		//5、请对照接口文档用bizContent.setxxx()方法对业务上送数据进行赋值
		QrcodeReverseRequestV2Biz bizContent = new QrcodeReverseRequestV2Biz();
		bizContent.setMerId(merId);
		bizContent.setCustId(custId);//该字段非必输项
		bizContent.setOutTradeNo(outTradeNo);
		bizContent.setOrderId(orderId);//该字段非必输项
		bizContent.setRejectNo(rejectNo);//该字段非必输项
		bizContent.setRejectAmt(rejectAmt);//该字段非必输项
		bizContent.setOperId(operId);//该字段非必输项
		request.setBizContent(bizContent);

		QrcodeReverseResponseV2 response;
		
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


