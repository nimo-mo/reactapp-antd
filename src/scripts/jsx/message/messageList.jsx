var React = require('react');
var AppContentHeader = require('../component/appContentHeader');
var Api = require('../../js/api');

import { Button, Select, Table, Pagination, Modal } from 'antd';
var Option = Select.Option;

var AdminList = React.createClass({
	childContextTypes: {
    history: React.PropTypes.object
  },
	getInitialState: function() {
		return {
			total: 0,
			error: '',
			pageSize: 30,
			currentPage: 1,
			dataSource: [],
			queryUsername: '',
			queryUserrole: ''
		}
	},
	componentDidMount: function() {
		this.getUserData(0,30);
	},
  showConfirm: function (record) {
	  Modal.confirm({
	    title: '确认要删除该条记录吗',
	    content: '',
	    okText: '是的，我确定',
	    cancelText: '再考虑一下',
	    onOk: function () {
	      Api.post('delete_message',{
	      	uid: record.id
	      })
	      .done(function (res) {
	      	this.getUserData(0,this.state.pageSize);
	      	Modal.success({
				    title: '删除成功'
				  });
	      }.bind(this))
	      .fail(function (error) {
	      	console.log(error)
	      })
	    }.bind(this),
	    onCancel: function () {}
	  });
	},
	getUserData: function (page,size) {
		Api.get('message_list',{
			page: page,
			size: size,
			name: this.state.queryUsername,
			role: this.state.queryUserrole,
			sort: 'createTime',
			direction: 'DESC'
		})
		.done(function (res) {
			var total = res.data.total;
			var dataSource = res.data.list;
			for (var i = 0; i<dataSource.length; i++) {
				dataSource[i].key = i;
				dataSource[i].operation = ['删除','修改'];
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
	queryUserData: function () {
		this.getUserData(0,this.state.pageSize);
	},
	resetQueryParams: function () {
		this.setState({queryUsername:'',queryUserrole:''})
	},
	onQueryUsernameChange: function (e) {
		this.setState({queryUsername:e.target.value})
	},
	onQueryUserroleChange: function (e) {
		this.setState({queryUserrole:e.target.value})
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
			    	<a href="javascript:;" onClick={this.showConfirm.bind(null,record)}>{record.operation[0]}</a>
			    	<a href="javascript:;" onClick={this.showConfirm.bind(null,record)}>{record.operation[1]}</a>
		    	</span>
	    	)
		  }.bind(this)
		}];
	},
	generatePagination: function () {
		return {
		  total: this.state.total,
		  current: this.state.currentPage,
		  pageSize: this.state.pageSize,
		  showSizeChanger: true,
		  showQuickJumper: true,
		  pageSizeOptions: ['20','30','50'],
		  onShowSizeChange: function (current, pageSize) {
		    this.getUserData(current,pageSize);
		    this.setState({pageSize:pageSize,currentPage:current});
		  }.bind(this),
		  onChange: function (current) {
		    this.getUserData(current,this.state.pageSize);
		    this.setState({currentPage:current});
		  }.bind(this)
		}
	},
	generateCrumb: function () {
		return {
			current: '自动回复',
			items: [{
				href: '#/message/list/pushed',
				title: '微信回复管理'
			}]
		}
	},
	render: function() {
		return (
			<div className="app-content animate">
				<AppContentHeader crumb={this.generateCrumb()} />
				<div className="app-content-body">
					<div className="ui-panel">
						<div className="ui-panel-header query-bar clearfix">
							<label className="query-item fl">
								<span className="label-name">用户名</span>
								<input className="ui-input" name="name" type="text" value={this.state.queryUsername} onChange={this.onQueryUsernameChange} />
							</label>
							<label className="query-item fl">
								<span className="label-name">角色</span>
								<input className="ui-input" name="address" type="text" value={this.state.queryUserrole} onChange={this.onQueryUserroleChange} />
							</label>
							<div className="ui-btn-group fr">
								<Button type="primary" onClick={function(){}}>重 置</Button>
								<Button type="primary" onClick={function(){}}>查 询</Button>
								<Button type="primary" onClick={function(){}}>新 增</Button>
							</div>
						</div>
						<div className="ui-panel-body">
							<Table
								columns={this.generateColumns()}
								dataSource={this.state.dataSource}
								pagination={this.generatePagination()}
								bordered />
						</div>
					</div>
				</div>
			</div>
		);
	}

});
module.exports = AdminList;