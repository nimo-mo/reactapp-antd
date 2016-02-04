var React = require('react');
var AppContentHeader = require('../component/appContentHeader');
var Api = require('../../js/api');

import { Table, Pagination, Modal } from 'antd';

var UserList = React.createClass({
	childContextTypes: {
    history: React.PropTypes.object
  },
	getInitialState: function() {
		return {
			total: 0,
			dataSource: [],
			modalVisible: false
		}
	},
	componentDidMount: function() {
		this.getUserData(1,30);
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
	getUserData: function (page,size) {
		Api.get('boss_user/list',{
			page: page,
			size: size,
			type: 'normal',
			sort: 'createTime',
			direction: 'DESC'
		})
		.done(function (res) {
			var total = res.data.total;
			var dataSource = res.data.list;
			for (var i = 0; i<dataSource.length; i++) {
				dataSource[i].key = i;
				dataSource[i].operation = ['操作','详情'];
			}
			this.setState({
				total: total,
				dataSource: dataSource
			});
		}.bind(this))
		.fail(function (error) {
			console.log(error)
		});
	},
	operation: function () {
		console.log(1)
	},
	generateColumns: function () {
		return [{
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
		  dataIndex: 'createTime',
		  render: function (text,record) {
		  	return <span>{new Date(text).format('yyyy-MM-dd HH:mm:ss')}</span>
		  }
		},{
		  title: '最后修改',
		  dataIndex: 'updateTime',
		  render: function (text,record) {
		  	return <span>{new Date(text).format('yyyy-MM-dd HH:mm:ss')}</span>
		  }
		},{
		  title: '操作',
		  dataIndex: 'operation',
		  className: 'tac',
		  render: function (text,record) {
		    return (
		    	<span className="operation">
			    	<a href="javascript:;" onClick={this.showModal}>{record.operation[0]}</a>
			    	<a href={"#/detail/normal/"+record.id}>{record.operation[1]}</a>
		    	</span>
	    	)
		  }.bind(this)
		}];
	},
	generatePagination: function () {
		return {
		  total: this.state.total,
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
		}
	},
	generateCrumb: function () {
		return {
			current: '普通用户',
			items: [{
				href: '#/user/list/normal',
				title: '用户管理'
			}]
		}
	},
	render: function() {
		return (
			<div className="app-content userlist animate">
				<AppContentHeader crumb={this.generateCrumb()} />
				<div className="app-content-body">
					<div className="ui-panel">
						<div className="ui-panel-body">
							<Table
								columns={this.generateColumns()}
								pagination={this.generatePagination()}
								dataSource={this.state.dataSource}
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