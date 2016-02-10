var React = require('react');
var AppContentHeader = require('../component/appContentHeader');
var Api = require('../../js/api');
var Util = require('../../js/util');

import { Button, Input, Table, Pagination, Modal } from 'antd';

var UploadAvatar = React.createClass({
	getInitialState: function() {
		return {
			src: '' 
		};
	},
	componentDidMount: function () {
		this.loadUploadedAvatar();
	},
	loadUploadedAvatar: function () {
		Api.get('lecturer_Avatar',{})
		.done(function (res) {
			this.setState({
				src: res.data.src
			});
		}.bind(this))
		.fail(function (error) {
			console.log(error)
		})
	},
	onFileChange: function () {
		var formData = new FormData();
		var file = this.refs['file'].files[0];
		formData.append('resource', file, file.name);
		Util.previewFile(file,function (blobURL) {
			this.setState({
				src: blobURL 
			});
		}.bind(this))
		Api.upload('upload',formData)
		.done(function (res) {
			// body...
		})
		.fail(function (error) {
			console.log(error)
		});
	},
	triggerChange: function () {
		$(this.refs['file']).click();
	},
	render: function () {
		return(
			<div className="ui-panel last">
				<div className="ui-panel-header">
					<h1 className="">讲师头像</h1>
				</div>
				<div className="ui-panel-body clearfix">
					<div className="preview fl"><img src={this.state.src} /></div>
					<div className="trigger-area">
						<p>图片将在微信网页端显示，图片尺寸控制在750*750像素范围内为最佳</p>
						<input className="not-display" ref="file" type="file" accept="image/gif,image/jpeg,image/png" onChange={this.onFileChange} />
						<Button type="primary" ref="trigger-btn" onClick={this.triggerChange}>修改头像</Button>
					</div>
				</div>
			</div>
		)
	}
});

var BasicInfo = React.createClass({
	componentDidMount: function() {
		this.loadBasicInfo();
	},
	getInitialState: function() {
		return {
			name: '',
			title: '',
			number: '',
			description: ''
		};
	},
	loadBasicInfo: function () {
		Api.get('lecturer_info',{
			id: this.props.id
		})
		.done(function (res) {
			this.setState({
				name: res.data.name,
				title: res.data.title,
				number: res.data.number,
				description: res.data.description
			});
		}.bind(this))
		.fail(function (error) {
			console.log(error)
		});

	},
	updateBasicInfo: function () {
		Api.put('update_lecturer_info',this.state)
		.done(function (res) {
			alert('更新成功');
		})
		.fail(function (error) {
			console.log(error)
		})
	},
	render: function() {
		return (
			<div className="ui-panel last">
				<div className="ui-panel-header">
					<h1 className="">讲师信息</h1>
				</div>
				<div className="ui-panel-body">
					<table className="basic-info">
						<tbody>
							<tr>
								<td className="tar">头衔</td>
								<td>
									<input className="ui-input" name="title" ref="title" type="text" value={this.state.title} onChange={function (e) {
										this.setState({title:e.target.value})
									}.bind(this)} />
								</td>
								<td className="error-msg"></td>
							</tr>
							<tr>
								<td className="tar">真实姓名</td>
								<td><input className="ui-input" name="name" ref="name" type="text" value={this.state.name} onChange={function (e) {
									this.setState({name:e.target.value})
								}.bind(this)} /></td>
								<td className="error-msg"></td>
							</tr>
							<tr>
								<td className="tar">联系方式</td>
								<td><input className="ui-input" name="mobile" ref="mobile" type="text" value={this.state.number} onChange={function (e) {
									this.setState({number:e.target.value})
								}.bind(this)} /></td>
								<td className="error-msg"></td>
							</tr>
							<tr>
								<td className="tar vat">详细描述</td>
								<td><textarea className="ui-input" name="description" ref="description" rows="6" value={this.state.description} style={{width:500}} onChange={function (e) {
									this.setState({description:e.target.value})
								}.bind(this)}></textarea></td>
								<td className="error-msg"></td>
							</tr>
							<tr>
								<td className="tar"></td>
								<td><Button type="primary" ref="trigger-btn" onClick={this.updateBasicInfo}>保 存</Button></td>
								<td className="error-msg"></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		);
	}

});

var FreeTimeList = React.createClass({
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
				dataSource[i].operation = ['删除','安排课程'];
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
		  title: '讲师姓名',
		  dataIndex: 'userName'
		},{
		  title: '日期',
		  dataIndex: 'updateTime',
		  render: function (text,record) {
		  	return <span>{new Date(text).format('yyyy-MM-dd')}</span>
		  }
		},{
		  title: '空闲时间',
		  dataIndex: 'createTime',
		  render: function (text,record) {
		  	return <span>{new Date(text).format('HH:mm')} 至 {new Date(text).format('HH:mm')}</span>
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
			<div className="ui-panel last">
				<div className="ui-panel-header">
					<h1>讲师空闲时间表</h1>
				</div>
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
						<Button type="primary" className="fr">新增空闲时间</Button>
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
		);
	}

});

var LecturerDetail = React.createClass({
	childContextTypes: {
    history: React.PropTypes.object
  },
	crumb: {
		current: '讲师详情',
		items:[{
			href: '#/user/list',
			title: '用户管理'
		}]
	},
	render: function() {
		return (
			<div className="app-content animate">
				<AppContentHeader crumb={this.crumb} />
				<div className="app-content-body lecturer">
					<FreeTimeList />
					<BasicInfo id={this.props.routeParams.id} />
					<UploadAvatar />
				</div>
			</div>
		);
	}

});

module.exports = LecturerDetail;