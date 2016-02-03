var React = require('react');
var AppContentHeader = require('../component/appContentHeader');
var Api = require('../../js/api');

import { Tabs, Table, Pagination } from 'antd';
const TabPane = Tabs.TabPane;

var tabKeyMap = {
	'1':'all',
	'2':'lecturer',
	'3':'assistant'
};

var currentRouteMap = {
	'all':'所有用户',
	'lecturer':'讲师',
	'assistant':'助理'
};

var UserList = React.createClass({
	contextTypes: {
    router: React.PropTypes.object.isRequired
  },
	getInitialState: function() {
		return {
			crumb: {
				current: currentRouteMap[this.props.routeParams.type],
				items:[]
			},
			userData: {
				list: [],
				total:0
			}
		}
	},
	componentDidMount: function() {
		console.log(this.props.routeParams.type);
		this.getUserData(1,30);
	},
	getUserData: function (page,size) {
		var self = this;
		var state = self.state;
		Api.get('boss_user/list',{
			page: page,
			size: size,
			sort: 'createTime',
			direction: 'DESC'
		}).done(function (res) {
			var list = res.data.list;
			for (var i = 0; i<list.length; i++) {
				list[i].key = i;
				list[i].operation = '删除';
			}
			self.setState({
				dataSource: list,
				total:res.data.total
			});
		}).fail(function (error) {
			console.log(error)
		})
	},
	tabChange: function (key) {
		var type = tabKeyMap[key];
		this.context.router.push('/user/list/'+type);
		this.state.crumb.current = currentRouteMap[type];
		this.setState({crumb:this.state.crumb});
	},
	render: function() {
		var state = this.state;
		var pagination = {
		  total: state.total,
		  current: 1,
		  pageSize: 30,
		  showSizeChanger: true,
		  showQuickJumper: true,
		  pageSizeOptions: ['20','30','50'],
		  onShowSizeChange: function (current, pageSize) {
		    console.log('Current: ', current, '; PageSize: ', pageSize);
		  },
		  onChange: function (current) {
		    console.log('Current: ', current);
		  }
		};
		var columns = [{
		  title: 'ID',
		  dataIndex: 'id',
		  className: 'tac'
		}, {
		  title: '用户名',
		  dataIndex: 'userName'
		},{
		  title: '角色',
		  dataIndex: 'bossRoles'
		},{
		  title: '创建时间',
		  dataIndex: 'createTime'
		},{
		  title: '最后修改',
		  dataIndex: 'updateTime'
		},{
		  title: '操作',
		  dataIndex: 'operation',
		  className: 'tac',
		  render: function (text) {
		    return <a href="#">{text}</a>;
		  }
		}];
		return (
			<div className="app-content userlist animate">
				<AppContentHeader crumb={this.state.crumb} />
				<div className="app-content-body">
					<div className="ui-panel">
						<div className="ui-panel-body">
							<Tabs defaultActiveKey="1" onChange={this.tabChange}>
						    <TabPane tab="选项卡一" key="1"></TabPane>
						    <TabPane tab="选项卡二" key="2"></TabPane>
						    <TabPane tab="选项卡三" key="3"></TabPane>
						  </Tabs>
							<Table
								columns={columns}
								pagination={pagination}
								dataSource={state.dataSource}
								bordered />
						</div>
					</div>
				</div>
			</div>
		);
	}

});

module.exports = UserList;