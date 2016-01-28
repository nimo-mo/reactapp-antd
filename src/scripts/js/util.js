var util = {};

util.getLocationOrigin = function () {
	return location.origin ?
		location.origin :
		location.protocol + '//' + location.host;
};

util.getLocationOriginPath = function () {
	return util.getLocationOrigin() + location.pathname
};

util.getRequestUrl = function (requestUrl) {
	return $.cookie('requestUrl');
};

util.setRequestUrl = function (requestUrl) {
	$.cookie('requestUrl',requestUrl);
};

module.exports = util;