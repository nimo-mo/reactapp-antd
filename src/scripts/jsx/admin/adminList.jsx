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
			uid: null,
			total: 0,
			error: '',
			method: '',
			pageSize: 30,
			currentPage: 1,
			dataSource: [],
			queryUsername: '',
			queryUserrole: '',
			modalUsername: '',
			modalPassword: '',
			modalUserrole: '',
			modalVisible: false
		}
	},
	componentDidMount: function() {
		this.getUserData(0,30);
	},
	showModal: function (record) {
    this.setState({
    	modalVisible: true,
    	error: '',
    	uid: record ? record.id : null,
    	method: record ? 'put' : 'post',
    	modalPassword: '',
    	modalUsername: record ? record.userName : '',
    	modalUserrole: record ? record.userrole : ''
    });
  },
  handleOk: function () {
  	if (this.state.modalUsername === '') {
  		this.setState({error:'*用户名不能为空'});
  		this.refs['username'].focus();
  		return;
  	};
  	if (this.state.modalPassword === '') {
  		this.setState({error:'*密码不能为空'});
  		this.refs['password'].focus();
  		return;
  	};
  	if (this.state.modalUserrole === '') {
  		this.setState({error:'*请选择用户角色'});
  		return;
  	};
    this.setState({
    	error: '',
      modalVisible: false
    });
    Api[this.state.method]('admin',{
    	id: this.state.uid,
    	userName: this.state.modalUsername,
    	userRole: this.state.modalUserrole,
    	password: this.state.modalPassword
    })
    .done(function (res) {
    	this.getUserData(0,this.state.pageSize);
    	Modal.success({
    		title: this.state.method === 'post' ? '添加成功' : '更新成功',
		    okText: '关 闭'
    	});
    }.bind(this))
    .fail(function (error) {
    	console.log(error)
    })
  },
  handleCancel: function (e) {
    this.setState({
      modalVisible: false
    });
  },
  showConfirm: function (record) {
	  Modal.confirm({
	    title: '确认要删除该用户吗',
	    content: '',
	    okText: '是的，我确定',
	    cancelText: '再考虑一下',
	    onOk: function () {
	      Api.post('delete_admin',{
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
		Api.get('boss_user/list',{
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
	onModalUsernameChange: function (e) {
		if (this.state.uid) {return}
		this.setState({modalUsername:e.target.value})
	},
	onModalPasswordChange: function (e) {
		this.setState({modalPassword:e.target.value})
	},
	onModalUserroleChange: function (value) {
		this.setState({modalUserrole:value})
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
			    	<a href="javascript:;" onClick={this.showModal.bind(null,record)}>{record.operation[1]}</a>
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
			current: '系统管理员',
			items: [{
				href: '#/admin/list',
				title: 'Admin Plus'
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
								<Button type="primary" onClick={this.resetQueryParams}>重 置</Button>
								<Button type="primary" onClick={this.queryUserData}>查 询</Button>
								<Button type="primary" onClick={this.showModal.bind(null,false)}>新 增</Button>
							</div>
						</div>
						<div className="ui-panel-body">
							<Table
								columns={this.generateColumns()}
								pagination={this.generatePagination()}
								dataSource={this.state.dataSource}
								bordered />
							<Modal
								width="400"
								title="用户信息"
								className="free-time-modal"
								visible={this.state.modalVisible}
								onOk={this.handleOk}
								onCancel={this.handleCancel}>
								<table className="form-table">
									<tbody>
										<tr>
											<td width="70" className="tar">用户名</td>
											<td>
												<input
													ref="username"
													type="text"
													className="ui-input"
													placeholder="请输入用户名"
													style={{width:'100%'}}
													value={this.state.modalUsername}
													onChange={this.onModalUsernameChange} />
											</td>
										</tr>
										<tr>
											<td className="tar">登录密码</td>
											<td>
												<input
													ref="password"
													type="password"
													className="ui-input"
													placeholder="请填输入密码"
													style={{width:'100%'}}
													value={this.state.modalPassword}
													onChange={this.onModalPasswordChange} />
											</td>
										</tr>
										<tr>
											<td className="tar">用户角色</td>
											<td>
												<Select
													defaultValue=""
													style={{width:'100%'}}
													value={this.state.modalUserrole}
													onChange={this.onModalUserroleChange}>
													<Option value="">请选择</Option>
													<Option value="admin">管理员</Option>
													<Option value="admin+">超级管理员</Option>
												</Select>
											</td>
										</tr>
										<tr>
											<td className="tar"></td>
											<td className="error-msg">{this.state.error}</td>
										</tr>
									</tbody>
								</table>
							</Modal>
						</div>
					</div>
				</div>
			</div>
		);
	}

});
module.exports = AdminList;