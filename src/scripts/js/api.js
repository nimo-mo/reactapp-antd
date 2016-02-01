var Util = require('./util');

// if needed we can create a api-kit to switch requestUrl in dev env;
var requestUrl = Util.getRequestUrl() || Util.getLocationOriginPath();
var api = {};

api.request = function (type,path,data,ajaxSettings) {
	var url = requestUrl + path;
	var data = type === 'GET' ? $.param(data) : JSON.stringify(data);
	var currentUser = Util.getCurrentUser();
	var headers = {
		'X-User-Id': currentUser.id,
		'X-User-Token': currentUser.token
	}
	return $.ajax($.extend({
		cache: false,
		url: url,
		type: type,
		data: data,
		headers: headers
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