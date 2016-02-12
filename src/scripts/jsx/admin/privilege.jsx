var React = require('react');
var AppContentHeader = require('../component/appContentHeader');
var Api = require('../../js/api');

import { Button, Table, Pagination, Modal } from 'antd';

var Privilege = React.createClass({
	childContextTypes: {
    history: React.PropTypes.object
  },
	getInitialState: function() {
		return {
			total: 0,
			currentPage: 1,
			pageSize: 30,
			dataSource: [],
			name: '',
			mobile: ''
		}
	},
	componentDidMount: function() {
		this.getUserData(0,30);
	},
  showConfirm: function (msg,upgradeTo) {
	  Modal.confirm({
	    title: '确认要取消该用户的讲师身份吗',
	    content: '',
	    okText: '是的，我确定',
	    cancelText: '再考虑一下',
	    onOk: function () {
	      Api.post('update_role',{
	      	from: 'lecturer',
	      	to: 'normal'
	      })
	      .done(function (res) {
	      	this.getUserData(0,this.state.pageSize);
	      	Modal.success({
				    title: '操作成功',
				    content: '该用的讲师身份已取消，可转至普通用户列表进行查询'
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
			name: this.state.name,
			mobile: this.state.mobile,
			type: 'lecturer',
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
		this.setState({name:'',mobile:''})
	},
	onNameChange: function (e) {
		this.setState({name:e.target.value})
	},
	onMobileChange: function (e) {
		this.setState({mobile:e.target.value})
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
			    	<a href="javascript:;" onClick={function () {}}>{record.operation[0]}</a>
			    	<a href={"#/detail/normal/"+record.id}>{record.operation[1]}</a>
		    	</span>
	    	)
		  }
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
			current: '讲师管理',
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
								<span className="label-name">真实姓名</span>
								<input className="ui-input" name="name" type="text" value={this.state.name} onChange={this.onNameChange} />
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
					</div>
				</div>
			</div>
		);
	}

});
module.exports = Privilege;