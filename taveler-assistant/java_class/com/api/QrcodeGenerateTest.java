package com.api;

import com.api.Constant;
import com.icbc.api.request.QrcodeGenerateRequestV2;
import com.icbc.api.request.QrcodeGenerateRequestV2.QrcodeGenerateRequestV2Biz;
import com.icbc.api.response.QrcodeGenerateResponseV2;
import com.icbc.api.*;

/**
 * 工银二维码生成接口
 * 
 * 请商户配置SDK中的lib文件夹中的jar包后，根据备注1-6提示进行数据替换
 */
public class QrcodeGenerateTest {
		
	public static String QrcodeGenerate(String merid,
							String storeCode,
							String outTradeNum,
							String orderAmt,
							String tradeDate,
							String tradeTime,
							String attach,
							String payExpire,
							String notifyUrl,
							String tporderCreateIp,
							String spFlag,
							String notifyFlag) throws Exception {

		String APIGW_PUBLIC_KEY = Constant.APIGW_PUBLIC_KEY;
		String APP_ID = Constant.APP_ID;
		String MY_PRIVATE_KEY = Constant.MY_PRIVATE_KEY;
		String SERVICE_URL = Constant.SERVICE_URL;
		
		// 签名类型为RSA2时，需传入appid，私钥和网关公钥，
		// 签名类型使用定值IcbcConstants.SIGN_TYPE_RSA2，其他参数使用缺省值
		
		DefaultIcbcClient client = new DefaultIcbcClient(APP_ID, IcbcConstants.SIGN_TYPE_RSA, MY_PRIVATE_KEY, APIGW_PUBLIC_KEY);
		
		QrcodeGenerateRequestV2 request = new QrcodeGenerateRequestV2();
		
		//4、根据测试环境和生产环境替换相应ip和端口
		request.setServiceUrl( SERVICE_URL + "/api/qrcode/V2/generate");
		
//		5、请对照接口文档用bizContent.setxxx()方法对业务上送数据进行赋值
		QrcodeGenerateRequestV2Biz bizContent = new QrcodeGenerateRequestV2Biz();
		if(merid != null) bizContent.setMerId(merid);
		if(storeCode != null) bizContent.setStoreCode(storeCode);
		if(outTradeNum != null) bizContent.setOutTradeNo(outTradeNum);
		if(orderAmt != null) bizContent.setOrderAmt(orderAmt);
		if(tradeDate != null) bizContent.setTradeDate(tradeDate);
		if(tradeTime != null) bizContent.setTradeTime(tradeTime);
		if(attach != null) bizContent.setAttach(attach);//该字段非必输项
		if(payExpire != null) bizContent.setPayExpire(payExpire);
		if(notifyUrl != null) bizContent.setNotifyUrl(notifyUrl); //该字段非必输项
		if(tporderCreateIp != null) bizContent.setTporderCreateIp(tporderCreateIp);
		if(spFlag != null) bizContent.setSpFlag(spFlag); //该字段非必输项
		bizContent.setNotifyFlag(notifyFlag);
		
		request.setBizContent(bizContent);
		QrcodeGenerateResponseV2 response = new QrcodeGenerateResponseV2();
		
		String r = "";
		
		try {
			response = client.execute(request, "msgId");
			//msgId消息通讯唯一编号，要求每次调用独立生成，APP级唯一
			
			if (response.isSuccess()) {
				//6、业务成功处理，请根据接口文档用response.getxxx()获取同步返回的业务数据
				r += ("{\"return_code\": \""  + response.getReturnCode() + "\", ");
				r += (" \"return_msg\": \"" + response.getReturnMsg()+"\", ");
				r += ("\"msg_id\" : \"" + response.getMsgId()+"\",");
				r += ("\"qrcode\" : \"" + response.getQrcode()+"\",");
				r += ("\"attach\" : \"" + response.getAttach() + "\" }");
				return r;
			} else {
				//失败
				r += ("{\"return_code\": \""  + response.getReturnCode() + "\", ");
				r += (" \"return_msg\": \"" + response.getReturnMsg()+"\"} ");
			}
		} catch (IcbcApiException e) {
			e.printStackTrace();
		}
		return r;
	}

	public static void main(String[] args) {
		try {
			System.out.println(QrcodeGenerate("020002040095", //"mer_id
					"02000015087", //storeCode
					"ZHL777O15002039", //outTradeNo
					"7370", //order_amt
					"20171210", //trade_date
					"160346", //trade_time
					"abcdefg", //attach
					"1200", // pay_expire
					null, // notify_url
					"127.0.0.1", // tporder_create_ip
					"0", // sp_flag
					"1" // notify_flag
			));
		} catch (Exception e) {
			
		}
		
	}
}

