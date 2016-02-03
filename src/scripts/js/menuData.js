
module.exports = [{
	title: '报表总览',
	iconCls: 'dashboard',
	href: '#/dashboard',
	path: '/dashboard',
	module: 'dashboard'
},{
	title: '用户管理',
	iconCls: 'user',
	href: '#/user/list/normal',
	path: '/user',
	module: 'user',
	children: [{
		title: '普通用户',
		href: '#/user/list/normal',
		path: '/user/list/normal'
	},{
		title: '讲师用户',
		href: '#/user/list/lecturer',
		path: '/user/list/lecturer'
	},{
		title: '助理用户',
		href: '#/user/list/assistant',
		path: '/user/list/assistant'
	}]
},{
	title: '课程管理',
	iconCls: 'tasks',
	href: '#/course/list/all',
	path: '/course',
	module: 'course',
	children: [{
		title: '所有课程',
		href: '#/course/list/all',
		path: '/course/list/all'
	},{
		title: '已发布课程',
		href: '#/course/list/published',
		path: '/course/list/published'
	}]
},{
	title: '教室管理',
	iconCls: 'university',
	href: '#/classroom',
	path: '/classroom',
	module: 'classroom'
},{
	title: '微信回复管理',
	iconCls: 'wechat',
	href: '#/message/list/pushed',
	path: '/message',
	module: 'message',
	children: [{
		title: '自动回复',
		href: '#/message/list/pushed',
		path: '/message/list/pushed'
	},{
		title: '对话回复',
		href: '#/message/list/121',
		path: '/message/list/121'
	}]
}];
