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

util.getCurrentUser = function () {
	return {
		id: $.cookie('X-User-Id'),
		name: $.cookie('X-User-Name'),
		token: $.cookie('X-User-Token'),
		mobile: $.cookie('X-User-Mobile')
	}
};

util.clearCurrentUser = function () {
	$.removeCookie('X-User-Id');
	$.removeCookie('X-User-Name');
	$.removeCookie('X-User-Token');
	$.removeCookie('X-User-Mobile');
};

util.pushToLogin = function (loginPath,reactScope) {
	reactScope.context.router.push(loginPath);
};

module.exports = util;