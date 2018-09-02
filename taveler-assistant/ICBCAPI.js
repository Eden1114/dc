'use strict';

const rawRequest = require('request');
const API_URL = 'https://apisandbox.dccnet.com.cn/api';

/*
一个用于调用工行API的类
*/
class ICBCAPI {
    
    constructor(options) {
        this.options = options = options || {};
        options.token = options.token || null;
        options.url = options.url || API_URL;
    }
    
    baseParams(params) {
        params = Object.assign({}, params || {});
        if (this.options.token) {
            params.accesstoken = this.options.token;
        }
        return params;
    }
    
    request(method, path, params, callback) {
        return new Promise((resolve, reject) => {
            const opts = {
                method: method.toUpperCase(),
                url: this.options.url + path,
                json: true,
            };

            if (opts.method === 'GET' || opts.method === 'HEAD') {
                opts.qs = this.baseParams(params);
            } else {
                opts.body = this.baseParams(params);
            }
            
            rawRequest(opts, (error, response, body) => {
                if(error) return reject(error);
                
                if (!error && response.statusCode == 200) {
                    resolve(body);
                }
                else {
                    reject(new Error(body.error_msg));
                }
            });
        });
    }
}

module.exports = ICBCAPI;