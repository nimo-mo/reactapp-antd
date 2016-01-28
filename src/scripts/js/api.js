var api = {};

api.request = function (type,url,data,ajaxSettings) {
	return $.ajax($.extend({
		url: url,
		type: type,
		data: JSON.stringify(data),
		headers: {
			'X-User-Id': $.cookie('X-User-Id'),
			'X-User-Token': $.cookie('X-User-Token')
		}
	},ajaxSettings||{}))
};

api.get = function (url,data,ajaxSettings) {
	return api.request('GET',url,data,ajaxSettings)
};

api.put = function (url,data,ajaxSettings) {
	return api.request('PUT',url,data,ajaxSettings)
};

api.post = function (url,data,ajaxSettings) {
	return api.request('POST',url,data,ajaxSettings)
};

api.upload = function (url,data,ajaxSettings) {
	return api.request('POST',url,{},{
		data: data,
		cache: false,
		contentType: false,
		processData: false
	})
};

module.exports = api;