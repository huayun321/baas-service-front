"use strict";

function baas(appId, appKey) {
    //verify id and Key
    this.appId = appId || '';
    this.appKey = appKey || '';
    this.url = 'http://localhost:28001/v1/docs/';

    //post data
    this.create = function (data, callback) {
        //todo check data

        data = {app_id: this.appId, app_key: this.appKey, obj: data};
        data = JSON.stringify(data);

        $.ajax({
            type: 'POST',
            url: this.url + 'create',
            data: data,
            dataType: 'json',
            timeout: 300,
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                //todo check error
                callback(null, data);
            },
            error: function (xhr, type) {
                console.log('create xhr type', xhr, type);
                //todo set error data
                callback(xhr.response);
            }
        });

    };
    // //get data by id
    // this.getById = function (data, callback) {
    //
    // };
    // //get data by app id
    // this.getByAppId = function (data, callback) {
    //
    // };

    this.get_page = function(data, callback) {
        data = {
            app_id: this.appId, 
            app_key: this.appKey, 
            current_page: data.page || 1,
            page_size: data.page_size || 10,
            query_key: 'obj.' + data.query_key,
            query_value: data.query_value
        };
        // data = JSON.stringify(data);

        $.ajax({
            type: 'GET',
            url: this.url + 'list',
            data: data,
            // dataType: 'json',
            timeout: 300,
            // contentType: 'application/json; charset=utf-8',
            success: function (data) {
                //todo check error
                callback(null, data);
            },
            error: function (xhr, type) {
                console.log('list xhr type', xhr, type);
                //todo set error data
                callback(xhr.response);
            }
        })
    };

    return this;
}

window.SENSORO = {};
window.SENSORO.baas = baas;

