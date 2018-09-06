package com.icbc.api;

import com.api.Constant;
import com.icbc.api.request.QrcodeRejectRequestV2;
import com.icbc.api.request.QrcodeRejectRequestV2.QrcodeRejectRequestV2Biz;
import com.icbc.api.request.QrcodeRejectRequestV3;
import com.icbc.api.request.QrcodeRejectRequestV3.QrcodeRejectRequestV3Biz;
import com.icbc.api.response.QrcodeRejectResponseV2;
import com.icbc.api.response.QrcodeRejectResponseV3;

/**
 * 工银二维码退款接口
 * 
 * 请商户配置SDK中的lib文件夹中的jar包后，根据备注1-6提示进行数据替换
 */
public class QrcodeRejectV3Test {
		
	public static String QrcodeRejectV3(String merId,
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
				
		QrcodeRejectRequestV3 request = new QrcodeRejectRequestV3();
		
		//4、根据测试环境和生产环境替换相应ip和端口
		request.setServiceUrl("http://ip:port/api/qrcode/reject/V3");
		//5、请对照接口文档用bizContent.setxxx()方法对业务上送数据进行赋值
		QrcodeRejectRequestV3Biz bizContent = new QrcodeRejectRequestV3Biz();
		bizContent.setMerId(merId);
		bizContent.setCustId(custId);//该字段非必输项
		bizContent.setOutTradeNo(outTradeNo);//该字段非必输项,out_trade_no和order_id选一项上送即可
		bizContent.setOrderId(orderId);//该字段非必输项,out_trade_no和order_id选一项上送即可
		bizContent.setRejectNo(rejectNo);
		bizContent.setRejectAmt(rejectAmt);
		bizContent.setOperId(operId);//该字段非必输项
		bizContent.setMerattach(merattach);
		request.setBizContent(bizContent);
		QrcodeRejectResponseV3 response;
		
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

