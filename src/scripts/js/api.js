var Util = require('./util');

// if needed we can create a api-kit to switch requestUrl in dev env;
var requestUrl = Util.getRequestUrl() || Util.getLocationOriginPath();
var api = {};

api.request = function (type,path,data,ajaxSettings) {
	return $.ajax($.extend({
		cache: false,
		url: requestUrl + path,
		type: type,
		data: JSON.stringify(data),
		headers: {
			'X-User-Id': $.cookie('X-User-Id'),
			'X-User-Token': $.cookie('X-User-Token')
		}
	},ajaxSettings||{}))
};

api.get = function (path,data,ajaxSettings) {
	return api.request('GET',path,data,ajaxSettings)
};

api.put = function (path,data,ajaxSettings) {
	return api.request('PUT',path,data,ajaxSettings)
};

api.post = function (path,data,ajaxSettings) {
	return api.request('POST',path,data,ajaxSettings)
};

api.upload = function (path,data,ajaxSettings) {
	return api.request('POST',path,{},{
		data: data,
		contentType: false,
		processData: false
	})
};

module.exports = api;