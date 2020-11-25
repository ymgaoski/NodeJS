const axios = require('axios');
const projectConfig = require('../config/projectConfigResolves');

const hostBaseUrl = projectConfig.hostBaseUrl;

/**
 * 最基础的请求
 * @param {*} url 
 * @param {*} method 
 * @param {*} params 
 */
exports.doRequest = function(url,method,params){
    console.log('-----------------');
    console.log(url,method,params);
    console.log('-----------------');

    if ('GET' === method){
        return axios({
            baseUrl: hostBaseUrl,
            url: url,
            method: method,
            params: params
        });
    }else if ('PUT' === method || 'POST' === method || 'DELETE' === method) {
        return axios({
            baseUrl: hostBaseUrl,
            url: url,
            method: method,
            data: params
        });
    }
}

/**
 * Get请求
 * @param {*} url 
 * @param {*} params 
 */
exports.doGet = function(url,params){
    return this.doRequest(url,'GET',params);
}

/**
 * Post请求
 * @param {*} url 
 * @param {*} params 
 */
exports.doPost = function(url,params){
    return this.doRequest(url,'POST',params);
}

/**
 * Put请求
 * @param {*} url 
 * @param {*} params 
 */
exports.doPut = function(url,params){
    return this.doRequest(url,'PUT',params);
}

/**
 * Delete请求
 * @param {*} url 
 * @param {*} params 
 */
exports.doDelete = function(url,params){
    return this.doRequest(url,'DELETE',params);
}