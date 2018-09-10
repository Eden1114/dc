'use strict';

var request = require('request');
var crypto = require('crypto');
var fs = require('fs');
var _=require('underscore');
var moment=require('moment');

var DEBUG=false;
var Default_option={
    url:undefined,
    appId:undefined,
    secret:undefined,
    timeout:5000,
    options:{},
    otherOption:{}
}

function SDK(url,appId,secret,timeout){
    this.url=url||Default_option.url;
    this.appId=appId||Default_option.appId;
    this.secret=secret||Default_option.secret;
    this.timeout=timeout||Default_option.timeout;
    this.options= _.clone(Default_option.options);
    this.otherOption= _.clone(Default_option.otherOption);
    log("create request:",this);
}
SDK.prototype={
    print:function(){
        console.info('###Default_option:',Default_option)
        console.info('###request instance:',this);
        console.info('###send params:',createSecretParam(this))
    },
    appendText:function(name,value){
        if(_.isString(name)){
            this.options[name]=value;
            log('###add text params:',name,'=',value);
        }else if(_.isObject(name)){
            _.extend(this.options,name)
            log('###add Object params:',name);
        }
    },
    appendFile:function(name,pathOrReadStream){
        if(_.isString(pathOrReadStream)){
            this.otherOption[name]=fs.createReadStream(pathOrReadStream);
        }else{
            this.otherOption[name]=pathOrReadStream;
        }
        log('###add file params:',name,'=',pathOrReadStream);
    },
    //appendBuffer:function(name,buffer){
    //    this.otherOption[name]=buffer;
    //    log('###add buffer params:',name,'=',buffer);
    //},
    post:function(callback,scope){
        var ts=this;
        if(_.isEmpty(ts.url)){
            callback.call(scope,error('url不能为空'))
        }else if(_.isEmpty(ts.appId)|| _.isEmpty(ts.secret)){
            callback.call(scope,error('appId或者secret不能为空'))
        }else{
            request.post({url:ts.url, formData: createSecretParam(ts),timeout:ts.timeout},function(err, httpResponse, body){
                if(err){
                    callback.call(scope,error(err));
                }else{
                    callback.call(scope,JSON.parse(body));
                }
            })
        }
    }
}

function createSecretParam(sdk){
    var parmas= _.extend({},sdk.options,{
        showapi_appid:sdk.appId,
        showapi_timestamp:moment().format('YYYYMMDDHHmmss')
    })

    var sortArray= _.sortBy(_.pairs(parmas),function(item){
        return item[0]
    });
    log('sort params:',sortArray);
    var str="";
    _.each(sortArray,function(item){
        if(!_.isEmpty(item[0])&&!_.isEmpty(item[1])){
            str+=item[0]+item[1];
        }
    })
    str+=sdk.secret;
    log('secret string:',str)
    str=crypto.createHash('md5').update(str).digest('hex');
    _.extend(parmas,sdk.otherOption)
    parmas.showapi_sign=str;
    log('send params:',parmas)
    return parmas;
}

function error(msg){
    logError(msg);
    return {
        showapi_res_code:-1,
        showapi_res_error:msg
    }
}
function log(){
    var args=Array.apply(null,arguments)
    args.unshift("###showapiSDK debug###")
    DEBUG&&console.info.apply(console,args);
}
function logError(){
    var args=Array.apply(null,arguments)
    args.unshift("###showapiSDK debug###")
    DEBUG&&console.error.apply(console,args);
}
module.exports = {
    request:function(url,appId,secret){
        return new SDK(url,appId,secret)
    },
    setting:function(opt){
        _.each(opt,function(v,k){
            if(_.has(Default_option,k)){
                Default_option[k]=opt[k];
            }
        })
    },
    debug:function(isDebug){
        DEBUG=!!isDebug;
    }
};
