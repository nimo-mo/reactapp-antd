var React = require('react');
var AppContentHeader = require('../component/appContentHeader');
var Api = require('../../js/api');

import { Table, Pagination, Modal } from 'antd';

var currentRouteMap = {
	'normal':'普通用户',
	'lecturer':'讲师用户',
	'assistant':'助理用户'
};

var UserList = React.createClass({
	childContextTypes: {
    history: React.PropTypes.object
  },
	getInitialState: function() {
		return {
			crumb: {
				current: currentRouteMap['normal'],
				items:[{
					href: '#/user/list/normal',
					title: '用户管理'
				}]
			},
			userData: {
				list: [],
				total:0
			},
			modalVisible: false
		}
	},
	componentDidMount: function() {
		console.log(this.props.routeParams.type);
		this.getUserData(this.props.routeParams.type,1,30);
	},
	componentDidUpdate: function (prevProps,prevState) {
		var oldType = prevProps.routeParams.type;
		var newType = this.props.routeParams.type;
		if (prevProps.routeParams.type != this.props.routeParams.type) {
			this.getUserData(this.props.routeParams.type,1,30);
			this.state.crumb.current = currentRouteMap[newType];
			this.setState({crumb:this.state.crumb});
		}
	},
	showModal: function () {
    this.setState({
      visible: true
    });
  },
  handleOk: function () {
    console.log('点击了确定');
    this.setState({
      visible: false
    });
  },
  handleCancel: function (e) {
    console.log(e);
    this.setState({
      visible: false
    });
  },
	getUserData: function (type,page,size) {
		var self = this;
		var state = self.state;
		Api.get('boss_user/list',{
			type: type,
			page: page,
			size: size,
			sort: 'createTime',
			direction: 'DESC'
		}).done(function (res) {
			var list = res.data.list;
			for (var i = 0; i<list.length; i++) {
				list[i].key = i;
				list[i].operation = ['操作','详情'];
			}
			self.setState({
				dataSource: list,
				total:res.data.total
			});
		}).fail(function (error) {
			console.log(error)
		})
	},
	operation: function (argument) {
		console.log(1)
	},
	render: function() {
		var self = this;
		var state = self.state;
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
		  render: function (text,record) {
		    return (
		    	<span className="operation">
			    	<a href="javascript:;" onClick={self.showModal}>{record.operation[0]}</a>
			    	<a href={"#/detail/normal/"+record.id}>{record.operation[1]}</a>
		    	</span>
	    	)
		  }
		}];

		return (
			<div className="app-content userlist animate">
				<AppContentHeader crumb={this.state.crumb} />
				<div className="app-content-body">
					<div className="ui-panel">
						<div className="ui-panel-body">
							<Table
								columns={columns}
								pagination={pagination}
								dataSource={state.dataSource}
								bordered />
							<Modal
								title="角色变更"
								visible={this.state.visible}
								onOk={this.handleOk}
								onCancel={this.handleCancel}>
			        </Modal>
						</div>
					</div>
				</div>
			</div>
		);
	}

});

module.exports = UserList;