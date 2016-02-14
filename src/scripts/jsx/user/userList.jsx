var React = require('react');
var AppContentHeader = require('../component/appContentHeader');
var Api = require('../../js/api');

import { Button, DatePicker, Table, Pagination, Modal } from 'antd';

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
			mobile: '',
			date: '',
			modalVisible: false
		}
	},
	componentDidMount: function() {
		this.getUserData(0,30);
	},
	showModal: function () {
    this.setState({
    	date: '',
    	error: '',
    	amount: '',
    	modalVisible: true
    });
  },
  handleOk: function () {
  	if (this.state.amount === '') {
  		this.setState({error:'*优惠金额不能为空'});
  		this.refs['amount'].focus();
  		return;
  	};
  	if (!/^[0-9]+[\.]{0,1}[0-9]{0,2}$/.test(this.state.amount)) {
  		this.setState({error:'*无效的金额，请重新输入'});
  		this.refs['amount'].focus();
  		return;
  	};
  	if (this.state.date === '') {
  		this.setState({error:'*请选择日期'});
  		return;
  	};
    this.setState({
    	error: '',
      modalVisible: false
    });
    Api.post('coupon',{
    	amount: this.state.amount,
    	date: this.state.date
    })
    .done(function (res) {
    	Modal.success({
    		title: '操作成功',
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
				dataSource[i].operation = ['赠送优惠券','升级为讲师','升级为助理'];
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
	onDateChange: function (value) {
  	this.setState({date:new Date(value).format('yyyy-MM-dd')})
  },
  onAmountChange: function (e) {
  	this.setState({amount:e.target.value})
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
		    		<a href="javascript:;" onClick={this.showModal}>{record.operation[0]}</a>
			    	<a href="javascript:;" onClick={this.showConfirm.bind(null,record.operation[1],'assistant')}>{record.operation[1]}</a>
			    	<a href="javascript:;" onClick={this.showConfirm.bind(null,record.operation[2],'lecturer')}>{record.operation[2]}</a>
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
							<Modal
								width="400"
								title="赠送优惠券"
								className="free-time-modal"
								visible={this.state.modalVisible}
								onOk={this.handleOk}
								onCancel={this.handleCancel}>
								<table className="form-table">
									<tbody>
										<tr>
											<td width="70" className="tar">优惠金额</td>
											<td>
												<input
													ref="amount"
													type="text"
													className="ui-input"
													placeholder="请输入优惠金额"
													style={{width:'100%'}}
													value={this.state.amount}
													onChange={this.onAmountChange} />
											</td>
										</tr>
										<tr>
											<td className="tar">截止日期</td>
											<td>
												<DatePicker
													ref="free-date"
													style={{width:282}}
													value={this.state.date}
													onChange={this.onDateChange} />
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
module.exports = UserList;