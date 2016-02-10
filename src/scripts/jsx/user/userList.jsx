var React = require('react');
var AppContentHeader = require('../component/appContentHeader');
var Api = require('../../js/api');

import { Button, Table, Pagination, Modal } from 'antd';

var UserList = React.createClass({
	childContextTypes: {
    history: React.PropTypes.object
  },
	getInitialState: function() {
		return {
			total: 0,
			currentPage: 1,
			pageSize: 30,
			dataSource: [],
			wxNickName: '',
			mobile: ''
		}
	},
	componentDidMount: function() {
		this.getUserData(0,30);
	},
  showConfirm: function (msg,upgradeTo) {
	  Modal.confirm({
	    title: '确认要将该用户'+msg+'吗',
	    content: '',
	    okText: '是的，我确定',
	    cancelText: '再考虑一下',
	    onOk: function () {
	      Api.post('update_role',{
	      	from: 'normal',
	      	to: upgradeTo
	      })
	      .done(function (res) {
	      	this.getUserData(0,this.state.pageSize);
	      	Modal.success({
				    title: '操作成功',
				    content: '该用户已'+msg+'，可转至讲师用户列表进行查询'
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
		Api.get('boss_user/list',{
			page: page,
			size: size,
			wxNickName: this.state.wxNickName,
			mobile: this.state.mobile,
			type: 'normal',
			sort: 'createTime',
			direction: 'DESC'
		})
		.done(function (res) {
			var total = res.data.total;
			var dataSource = res.data.list;
			for (var i = 0; i<dataSource.length; i++) {
				dataSource[i].key = i;
				dataSource[i].operation = ['升级为讲师','升级为助理'];
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
		this.setState({wxNickName:'',mobile:''})
	},
	onWxNickNameChange: function (e) {
		this.setState({wxNickName:e.target.value})
	},
	onMobileChange: function (e) {
		this.setState({mobile:e.target.value})
	},
	generateColumns: function () {
		return [{
			width: 48,
		  title: 'ID',
		  dataIndex: 'id',
		  className: 'tac'
		},{
		  title: '真实姓名',
		  dataIndex: 'userName'
		},{
		  title: '微信昵称',
		  dataIndex: 'wxNickName'
		},{
		  title: '联系方式',
		  dataIndex: 'mobile'
		},{
		  title: '所在地区',
		  dataIndex: 'area'
		},{
		  title: '公司名称',
		  dataIndex: 'company'
		},{
		  title: '最后登录',
		  dataIndex: 'createTime',
		  render: function (text,record) {
		  	return <span>{new Date(text).format('yyyy-MM-dd HH:mm:ss')}</span>
		  }
		},{
		  title: '关注时间',
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
			    	<a href="javascript:;" onClick={this.showConfirm.bind(null,record.operation[0],'assistant')}>{record.operation[0]}</a>
			    	<a href="javascript:;" onClick={this.showConfirm.bind(null,record.operation[1],'lecturer')}>{record.operation[1]}</a>
		    	</span>
	    	)
		  }.bind(this)
		}];
	},
	generatePagination: function () {
		return {
		  total: this.state.total,
		  current: 1,
		  pageSize: this.state.pageSize,
		  showSizeChanger: true,
		  showQuickJumper: true,
		  pageSizeOptions: ['20','30','50'],
		  onShowSizeChange: function (current, pageSize) {
		    // console.log('Current: ', current, '; PageSize: ', pageSize);
		    this.getUserData(current,pageSize);
		    this.setState({pageSize:pageSize});
		  }.bind(this),
		  onChange: function (current) {
		    // console.log(current);
		    this.getUserData(current,this.state.pageSize);
		  }.bind(this)
		}
	},
	generateCrumb: function () {
		return {
			current: '普通用户',
			items: [{
				href: '#/user/list',
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
						<div className="ui-panel-header query-bar clearfix">
							<label className="query-item fl">
								<span className="label-name">微信昵称</span>
								<input className="ui-input" name="name" type="text" value={this.state.wxNickName} onChange={this.onWxNickNameChange} />
							</label>
							<label className="query-item fl">
								<span className="label-name">联系方式</span>
								<input className="ui-input" name="address" type="text" value={this.state.mobile} onChange={this.onMobileChange} />
							</label>
							<div className="ui-btn-group fr">
								<Button type="primary" onClick={this.resetQueryParams}>重 置</Button>
								<Button type="primary" onClick={this.queryUserData}>查 询</Button>
							</div>
						</div>
						<div className="ui-panel-body">
							<Table
								columns={this.generateColumns()}
								pagination={this.generatePagination()}
								dataSource={this.state.dataSource}
								bordered />
						</div>
					</div>
				</div>
			</div>
		);
	}

});
// <Modal
// 	title="角色变更"
// 	visible={this.state.visible}
// 	onOk={this.handleOk}
// 	onCancel={this.handleCancel}>
// </Modal>
module.exports = UserList;